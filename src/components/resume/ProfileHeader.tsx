import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { Tooltip } from '../ui/Tooltip';

const ProfileHeader: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-card rounded-lg shadow-md mb-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-[200px] h-[200px]"
      >
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg" />
        <img
          src="https://avatars.githubusercontent.com/u/90404558?v=4"
          alt="Hassan's Profile"
          className="w-full h-full rounded-full object-cover shadow-lg relative"
          loading="lazy"
          srcSet="https://avatars.githubusercontent.com/u/90404558?v=4 2x"
        />
      </motion.div>

      <div className="flex-1 text-center md:text-left">
        <h1 className="text-3xl font-bold mb-2">Hassan bor3i</h1>
        <p className="text-muted-foreground mb-4">Software Developer</p>
        
        <div className="flex flex-wrap justify-center md:justify-start gap-4">
          <SocialLink
            href="https://github.com/Hassan220022"
            icon={<Github />}
            label="GitHub Profile"
          />
          <SocialLink
            href="https://www.linkedin.com/in/hassan-mikawi-1314b9238/"
            icon={<Linkedin />}
            label="LinkedIn Profile"
          />
          <SocialLink
            href="mailto:Hassansherif122202@gmail.com"
            icon={<Mail />}
            label="Email Me"
          />
        </div>
      </div>
    </div>
  );
};

const SocialLink: React.FC<{
  href: string;
  icon: React.ReactNode;
  label: string;
}> = ({ href, icon, label }) => (
  <Tooltip content={label}>
    <motion.a
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent hover:bg-accent/80 transition-colors"
      aria-label={label}
    >
      {icon}
      <ExternalLink className="w-4 h-4" />
    </motion.a>
  </Tooltip>
);

export default ProfileHeader;