import React, { useState, useMemo } from 'react';
import { useQuery } from 'react-query';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { getRepositories, getStarredRepositories, getAllRepositories } from '../services/github';
import ProjectCard from '../components/ProjectCard';

const ProjectsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'starred'>('all');
  const [techFilter, setTechFilter] = useState<string>('');

  const { data: repos = [], isLoading: reposLoading } = useQuery(
    'repositories',
    getAllRepositories,
    {
      staleTime: 5 * 60 * 1000, // Cache for 5 minutes
      retry: 2,
    }
  );

  const { data: starredRepos = [], isLoading: starredLoading } = useQuery(
    'starredRepositories',
    getStarredRepositories,
    {
      staleTime: 5 * 60 * 1000,
      retry: 2,
    }
  );

  const filteredRepos = useMemo(() => {
    const reposToFilter = filter === 'all' ? repos : starredRepos;
    
    return reposToFilter.filter(repo => {
      const matchesSearch = (
        repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (repo.description?.toLowerCase() || '').includes(searchTerm.toLowerCase())
      );
      
      const matchesTech = !techFilter || 
        repo.language?.toLowerCase() === techFilter.toLowerCase() ||
        repo.topics?.some(topic => topic.toLowerCase().includes(techFilter.toLowerCase()));

      return matchesSearch && matchesTech;
    });
  }, [repos, starredRepos, searchTerm, techFilter, filter]);

  const technologies = useMemo(() => {
    const techSet = new Set<string>();
    repos.forEach(repo => {
      if (repo.language) techSet.add(repo.language);
      repo.topics?.forEach(topic => techSet.add(topic));
    });
    return Array.from(techSet).sort();
  }, [repos]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="w-full sm:w-96">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:ring-2 ring-primary/20 focus:border-primary transition-colors"
                />
              </div>
            </div>
            <select
              value={techFilter}
              onChange={(e) => setTechFilter(e.target.value)}
              className="w-full sm:w-48 p-2 bg-card border border-border rounded-lg focus:ring-2 ring-primary/20 focus:border-primary"
            >
              <option value="">All Technologies</option>
              {technologies.map(tech => (
                <option key={tech} value={tech}>{tech}</option>
              ))}
            </select>
            <div className="flex gap-2">
              <FilterButton active={filter === 'all'} onClick={() => setFilter('all')} label="All Projects" />
              <FilterButton active={filter === 'starred'} onClick={() => setFilter('starred')} label="Starred" />
            </div>
          </div>
        </div>

        {(reposLoading || starredLoading) ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-muted-foreground">Loading repositories...</p>
          </div>
        ) : (
          <>
            <p className="text-muted-foreground">
              Found {filteredRepos.length} repositories
            </p>
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              {filteredRepos.map((repo) => (
                <ProjectCard key={repo.id} repo={repo} />
              ))}
            </motion.div>
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