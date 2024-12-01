import React from 'react';
import { ExternalLink, Star, GitFork } from 'lucide-react';
import { Repository } from '../types/github';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  repo: Repository;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ repo }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ y: -2 }}
      className="bg-card border border-border rounded-lg p-4 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold truncate">{repo.name}</h3>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      <p className="mt-2 text-muted-foreground text-sm line-clamp-2">
        {repo.description || 'No description available'}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {repo.topics?.slice(0, 3).map(topic => (
          <span key={topic} className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
            {topic}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-3">
          {repo.language && (
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-primary" />
              {repo.language}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4" />
            {repo.stargazers_count}
          </span>
        </div>
        <span className="text-xs">
          Updated {formatDistanceToNow(new Date(repo.updated_at))} ago
        </span>
      </div>
    </motion.div>
  );
};

export default ProjectCard;