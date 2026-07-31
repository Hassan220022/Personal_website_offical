import React, { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { getAllRepositories, getStarredRepositories } from '../services/github';
import ProjectCard from '../components/ProjectCard';
import type { Repository } from '../types/github';

type Filter = 'all' | 'starred';

const ProjectsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [techFilter, setTechFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const {
    data: repos = [],
    isLoading: reposLoading,
    error: reposError,
  } = useQuery('repositories', getAllRepositories, {
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  const {
    data: starredRepos = [],
    isLoading: starredLoading,
    error: starredError,
  } = useQuery('starredRepositories', getStarredRepositories, {
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  const sourceRepos: Repository[] = useMemo(() => {
    const list = filter === 'starred' ? starredRepos : repos;
    // Stable sort: recently updated first, then name.
    return [...list].sort((a, b) => {
      const ta = Date.parse(a.updated_at || '') || 0;
      const tb = Date.parse(b.updated_at || '') || 0;
      if (tb !== ta) return tb - ta;
      return a.name.localeCompare(b.name);
    });
  }, [filter, repos, starredRepos]);

  const filteredRepos = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return sourceRepos.filter((repo) => {
      const haystack = [
        repo.name,
        repo.description || '',
        repo.language || '',
        ...(repo.topics || []),
        ...(repo.technologies || []),
      ]
        .join(' ')
        .toLowerCase();

      const matchesSearch = !q || haystack.includes(q);
      const tech = techFilter.toLowerCase();
      const matchesTech =
        !tech ||
        (repo.language || '').toLowerCase() === tech ||
        (repo.topics || []).some((t) => t.toLowerCase() === tech) ||
        (repo.technologies || []).some((t) => t.toLowerCase() === tech);
      const matchesCategory = !categoryFilter || repo.category === categoryFilter;

      return matchesSearch && matchesTech && matchesCategory;
    });
  }, [sourceRepos, searchTerm, techFilter, categoryFilter]);

  const technologies = useMemo(() => {
    const map = new Map<string, string>();
    for (const repo of repos) {
      for (const value of [repo.language, ...(repo.topics || []), ...(repo.technologies || [])]) {
        const v = (value || '').trim();
        if (!v) continue;
        const key = v.toLowerCase();
        if (!map.has(key)) map.set(key, v);
      }
    }
    return Array.from(map.values()).sort((a, b) => a.localeCompare(b));
  }, [repos]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const repo of repos) {
      if (repo.category) set.add(repo.category);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [repos]);

  const loading = reposLoading || (filter === 'starred' && starredLoading);
  const error = filter === 'starred' ? starredError : reposError;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">
            Live from GitHub — every public repository for Hassan220022.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
          <div className="w-full lg:flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="search"
                placeholder="Search GitHub projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:ring-2 ring-primary/20 focus:border-primary transition-colors"
              />
            </div>
          </div>

          <select
            value={techFilter}
            onChange={(e) => setTechFilter(e.target.value)}
            className="w-full lg:w-48 p-2 bg-card border border-border rounded-lg focus:ring-2 ring-primary/20 focus:border-primary"
          >
            <option value="">All Technologies</option>
            {technologies.map((tech) => (
              <option key={tech.toLowerCase()} value={tech}>
                {tech}
              </option>
            ))}
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full lg:w-48 p-2 bg-card border border-border rounded-lg focus:ring-2 ring-primary/20 focus:border-primary"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
              </option>
            ))}
          </select>

          <div className="flex gap-2 shrink-0">
            <FilterButton active={filter === 'all'} onClick={() => setFilter('all')} label="All repos" />
            <FilterButton
              active={filter === 'starred'}
              onClick={() => setFilter('starred')}
              label="Starred"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-muted-foreground">Loading repositories from GitHub...</p>
          </div>
        ) : error ? (
          <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-6 text-center space-y-3">
            <p className="font-medium">Could not load GitHub repositories.</p>
            <p className="text-sm text-muted-foreground">
              The live GitHub API request failed. Refresh, or try again in a moment.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            <p className="text-muted-foreground">
              Found {filteredRepos.length} project{filteredRepos.length === 1 ? '' : 's'}
              {filter === 'all' ? ` · ${repos.length} total public repos` : ''}
            </p>

            {filteredRepos.length === 0 ? (
              <div className="rounded-lg border border-border p-8 text-center text-muted-foreground">
                No repositories match these filters.
              </div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {filteredRepos.map((repo) => (
                  <ProjectCard key={repo.id} repo={repo} />
                ))}
              </motion.div>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
};

const FilterButton: React.FC<{
  active: boolean;
  onClick: () => void;
  label: string;
}> = ({ active, onClick, label }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`px-4 py-2 rounded-lg transition-colors ${
      active
        ? 'bg-primary text-primary-foreground'
        : 'bg-accent text-accent-foreground hover:bg-accent/80'
    }`}
  >
    {label}
  </motion.button>
);

export default ProjectsPage;
