import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-12 md:py-24 lg:py-32"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl" />
            <img
  src="https://avatars.githubusercontent.com/u/90404558?v=4"
          alt="Hassan's Profile"
          className="w-full h-full rounded-full object-cover shadow-lg relative"
          loading="lazy"
          srcSet="https://avatars.githubusercontent.com/u/90404558?v=4 2x"
            />
          </motion.div>
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
              Mikawi
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-[700px] mx-auto">
              Passionate software developer specializing in web development and creating innovative solutions.
            </p>
          </div>
          <div className="flex gap-4">
            <SocialLink href="https://github.com/Hassan220022" icon={<Github />} label="GitHub" />
            <SocialLink href="https://www.linkedin.com/in/hassan-mikawi-1314b9238/" icon={<Linkedin />} label="LinkedIn" />
            <SocialLink href="mailto:hassansherif122202@gmail.com" icon={<Mail />} label="Email" />
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const SocialLink: React.FC<{
  href: string;
  icon: React.ReactNode;
  label: string;
}> = ({ href, icon, label }) => (
  <motion.a
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-3 rounded-full bg-card hover:bg-accent transition-colors"
    aria-label={label}
  >
    {icon}
  </motion.a>
);

export default Hero;