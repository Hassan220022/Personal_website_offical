import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, Star, Code, Lightbulb } from 'lucide-react';
import { CustomProject } from '../data/customProjects';

interface CustomProjectCardProps {
  project: CustomProject;
}

const CustomProjectCard: React.FC<CustomProjectCardProps> = ({ project }) => {
  const getCategoryIcon = (category: CustomProject['category']) => {
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
      default:
        return '💻';
    }
  };

  const getStatusColor = (status: CustomProject['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
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
          <span className="text-2xl">{getCategoryIcon(project.category)}</span>
          <div>
            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
              {project.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(project.status)}`}>
                {project.status.replace('-', ' ')}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                {project.year}
              </span>
            </div>
          </div>
        </div>
        
        {/* Links */}
        {project.links && (
          <div className="flex gap-2">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                title="View on GitHub"
              >
                <Code className="w-4 h-4" />
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                title="View Demo"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {project.links.documentation && (
              <a
                href={project.links.documentation}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                title="View Documentation"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
        {project.description}
      </p>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.slice(0, 4).map((tech, index) => (
          <span
            key={index}
            className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
          >
            {tech}
          </span>
        ))}
        {project.technologies.length > 4 && (
          <span className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground">
            +{project.technologies.length - 4} more
          </span>
        )}
      </div>

      {/* Features */}
      {project.features && project.features.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
            <Star className="w-3 h-3" />
            Key Features
          </h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            {project.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-start gap-1">
                <span className="text-primary mt-1">•</span>
                {feature}
              </li>
            ))}
            {project.features.length > 3 && (
              <li className="text-muted-foreground/70 italic">
                +{project.features.length - 3} more features...
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Highlights */}
      {project.highlights && project.highlights.length > 0 && (
        <div className="border-t border-border pt-3">
          <h4 className="text-sm font-medium mb-2 flex items-center gap-1 text-primary">
            <Lightbulb className="w-3 h-3" />
            Highlights
          </h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            {project.highlights.map((highlight, index) => (
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

export default CustomProjectCard;