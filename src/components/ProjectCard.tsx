import React from 'react';
import { ExternalLink, Star, Calendar, Code, Lightbulb } from 'lucide-react';
import { Repository } from '../types/github';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  repo: Repository;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ repo }) => {
  const getCategoryIcon = (category: Repository['category']) => {
    switch (category) {
      case 'mobile':
        return '📱';
      case 'academic':
        return '🎓';
      case 'graduation':
        return '🏆';
      case 'ai':
        return '🤖';
      case 'smart-home':
        return '🏠';
      case 'web':
        return '🌐';
      case 'professional':
        return '💼';
      default:
        return '💻';
    }
  };

  const getStatusColor = (status: Repository['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'in-progress':
        return 'bg-accent/20 text-accent dark:bg-accent/30 dark:text-accent-foreground';
      case 'archived':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="bg-card border border-border rounded-lg p-6 hover:shadow-xl transition-all duration-300 group"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{getCategoryIcon(repo.category)}</span>
          <div>
            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
              {repo.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              {repo.status && (
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(repo.status)}`}>
                  {repo.status.replace('-', ' ')}
                </span>
              )}
              {repo.year && (
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  {repo.year}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-2">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            title="View on GitHub"
          >
            <Code className="w-4 h-4" />
          </a>
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              title="View Demo"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
        {repo.description || 'No description available'}
      </p>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mb-4">
        {(repo.technologies || repo.topics || []).slice(0, 4).map((tech, index) => (
          <span
            key={index}
            className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
          >
            {tech}
          </span>
        ))}
        {(repo.technologies || repo.topics || []).length > 4 && (
          <span className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground">
            +{(repo.technologies || repo.topics || []).length - 4} more
          </span>
        )}
      </div>

      {/* Features */}
      {repo.features && repo.features.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
            <Star className="w-3 h-3" />
            Key Features
          </h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            {repo.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-start gap-1">
                <span className="text-primary mt-1">•</span>
                {feature}
              </li>
            ))}
            {repo.features.length > 3 && (
              <li className="text-muted-foreground/70 italic">
                +{repo.features.length - 3} more features...
              </li>
            )}
          </ul>
        </div>
      )}

      {/* GitHub Stats and Update Info */}
      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
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

      {/* Highlights */}
      {repo.highlights && repo.highlights.length > 0 && (
        <div className="border-t border-border pt-3">
          <h4 className="text-sm font-medium mb-2 flex items-center gap-1 text-primary">
            <Lightbulb className="w-3 h-3" />
            Highlights
          </h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            {repo.highlights.map((highlight, index) => (
              <li key={index} className="flex items-start gap-1">
                <span className="text-primary mt-1">✨</span>
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
};

export default ProjectCard;