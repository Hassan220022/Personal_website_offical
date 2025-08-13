import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

const Hero: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

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
            className="relative w-[280px] h-[280px] md:w-[320px] md:h-[320px] lg:w-[360px] lg:h-[360px]"
          >
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl" />
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
                <span className="text-6xl font-bold text-muted-foreground">HM</span>
              </div>
            )}

            {/* Loading skeleton */}
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 rounded-full bg-muted animate-pulse" />
            )}
          </motion.div>
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
              Hassan Mikawi
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-[700px] mx-auto">
              Computer Engineering graduate from AAST, specializing in AI, full stack development, and innovative programming languages. Creator of Flex programming language and smart home automation solutions.
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