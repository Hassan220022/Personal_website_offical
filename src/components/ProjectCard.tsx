import React from 'react';
import { ExternalLink, Star, GitFork, Calendar } from 'lucide-react';
import { Repository } from '../types/github';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  repo: Repository;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ repo }) => {
  const title = repo.name?.replace(/[_-]+/g, ' ').trim() || 'Untitled';
  const description = (repo.description || '').trim();
  const tags = uniqueTags([
    repo.language,
    ...(repo.topics || []),
  ]).slice(0, 5);
  const updatedLabel = safeRelativeDate(repo.updated_at);
  const year = safeYear(repo.created_at);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="bg-card border border-border rounded-xl p-5 hover:shadow-lg transition-all duration-200 flex flex-col h-full min-h-[220px]"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0 flex-1">
          <h3
            className="text-base font-semibold leading-snug break-words"
            title={repo.name}
          >
            {title}
          </h3>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            {year && (
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {year}
              </span>
            )}
            {repo.fork && (
              <span className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                fork
              </span>
            )}
            {repo.archived && (
              <span className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                archived
              </span>
            )}
          </div>
        </div>

        <div className="flex shrink-0 gap-2">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            title="View on GitHub"
            aria-label={`View ${repo.name} on GitHub`}
          >
            <ExternalLink className="w-4 h-4" />
          </a>
          {repo.homepage ? (
            <a
              href={normalizeUrl(repo.homepage)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              title="Open homepage"
              aria-label={`Open homepage for ${repo.name}`}
            >
              <ExternalLink className="w-4 h-4 opacity-70" />
            </a>
          ) : null}
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4 flex-1">
        {description || (
          <span className="italic opacity-70">No description on GitHub</span>
        )}
      </p>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary border border-primary/15"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto flex items-center justify-between gap-3 text-xs text-muted-foreground pt-2 border-t border-border">
        <div className="flex items-center gap-3 min-w-0">
          {repo.language && (
            <span className="inline-flex items-center gap-1 truncate">
              <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
              {repo.language}
            </span>
          )}
          <span className="inline-flex items-center gap-1 shrink-0">
            <Star className="w-3.5 h-3.5" />
            {Number(repo.stargazers_count || 0)}
          </span>
          {typeof repo.forks_count === 'number' && (
            <span className="inline-flex items-center gap-1 shrink-0">
              <GitFork className="w-3.5 h-3.5" />
              {repo.forks_count}
            </span>
          )}
        </div>
        {updatedLabel && (
          <span className="shrink-0 whitespace-nowrap">Updated {updatedLabel}</span>
        )}
      </div>
    </motion.article>
  );
};

function uniqueTags(values: Array<string | null | undefined>): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const value of values) {
    const v = (value || '').trim();
    if (!v) continue;
    const key = v.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(v);
  }
  return out;
}

function safeRelativeDate(value?: string): string | null {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  try {
    return formatDistanceToNow(d) + ' ago';
  } catch {
    return null;
  }
}

function safeYear(value?: string): number | null {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.getFullYear();
}

function normalizeUrl(url: string): string {
  if (/^https?:\/\//i.test(url)) return url;
  return `https://${url}`;
}

export default ProjectCard;
