import React from 'react';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => (
  <section className="hero-shell">
    <div className="hero-copy">
      <p className="eyebrow">COMPUTER ENGINEERING · AI · SOFTWARE</p>
      <h1>Building useful systems at the edge of <em>ideas</em> and execution.</h1>
      <p className="hero-intro">I’m Mikawi Sherif, a Computer Engineering graduate exploring AI, full-stack development, programming languages, and connected devices.</p>
      <div className="hero-actions">
        <a className="button button-primary" href="#featured">Explore selected work <ArrowDown size={16} /></a>
        <div className="social-row" aria-label="Social links">
          <SocialLink href="https://github.com/Hassan220022" icon={<Github size={18} />} label="GitHub" />
          <SocialLink href="https://www.linkedin.com/in/hassan-mikawi-1314b9238/" icon={<Linkedin size={18} />} label="LinkedIn" />
          <SocialLink href="mailto:hassansherif122202@gmail.com" icon={<Mail size={18} />} label="Email" />
        </div>
      </div>
    </div>
    <motion.div initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} className="hero-portrait">
      <div className="portrait-frame"><img src="/images/profile.jpg" alt="Portrait of Mikawi Sherif" /></div>
      <span className="portrait-note">CURIOUS BY DEFAULT<br />PRECISE BY PRACTICE</span>
    </motion.div>
  </section>
);

const SocialLink: React.FC<{ href: string; icon: React.ReactNode; label: string }> = ({ href, icon, label }) => <a className="social-link" href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>{icon}</a>;
export default Hero;
