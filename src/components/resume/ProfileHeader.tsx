import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, MapPin, Calendar } from 'lucide-react';
import { Tooltip } from '../ui/Tooltip';

const ProfileHeader: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 p-4 sm:p-6 lg:p-8 bg-card rounded-lg shadow-md mb-8"
    >
      {/* Profile Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="relative w-[150px] h-[150px] sm:w-[180px] sm:h-[180px] lg:w-[200px] lg:h-[200px] flex-shrink-0"
      >
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg" />
        {!imageError ? (
          <img
            src="https://avatars.githubusercontent.com/u/90404558?v=4"
            alt="Hassan Mikawi - Professional Profile Photo"
            className={`w-full h-full rounded-full object-cover shadow-lg relative transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            loading="lazy"
            srcSet="https://avatars.githubusercontent.com/u/90404558?v=4 2x"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full rounded-full bg-muted flex items-center justify-center shadow-lg relative">
            <span className="text-4xl font-bold text-muted-foreground">HM</span>
          </div>
        )}

        {/* Loading skeleton */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 rounded-full bg-muted animate-pulse" />
        )}
      </motion.div>

      {/* Profile Info */}
      <div className="flex-1 text-center lg:text-left max-w-none lg:max-w-2xl">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-foreground"
        >
          Hassan Mikawi
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-muted-foreground mb-4 text-sm sm:text-base leading-relaxed"
        >
          Computer Engineering Graduate | AI & Full Stack Engineering Specialist | Creator of Flex Programming Language
        </motion.p>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-wrap justify-center lg:justify-start gap-4 mb-6 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>Cairo, Egypt</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>Available for opportunities</span>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4"
        >
          <SocialLink
            href="https://github.com/Hassan220022"
            icon={<Github className="w-4 h-4" />}
            label="GitHub Profile"
            text="GitHub"
          />
          <SocialLink
            href="https://www.linkedin.com/in/mikawi"
            icon={<Linkedin className="w-4 h-4" />}
            label="LinkedIn Profile"
            text="LinkedIn"
          />
          <SocialLink
            href="mailto:Hassansherif122202@gmail.com"
            icon={<Mail className="w-4 h-4" />}
            label="Send Email"
            text="Email"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

const SocialLink: React.FC<{
  href: string;
  icon: React.ReactNode;
  label: string;
  text: string;
}> = ({ href, icon, label, text }) => (
  <Tooltip content={label}>
    <motion.a
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-accent hover:bg-accent/80 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md"
      aria-label={label}
    >
      {icon}
      <span className="hidden sm:inline">{text}</span>
      <ExternalLink className="w-3 h-3 opacity-70" />
    </motion.a>
  </Tooltip>
);

export default ProfileHeader;