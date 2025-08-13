import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Target, Heart, Microscope, Lightbulb, Users, Book, Code, Brain } from 'lucide-react';
import { timelineEvents, goals } from '../../data/profileData';

const JourneySection: React.FC = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-16"
        >
          <TimelineSection />
          <GoalsSection />
        </motion.div>
      </div>
    </section>
  );
};

const TimelineSection: React.FC = () => (
  <div className="space-y-8">
    <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">My Journey</h2>
    <div className="relative">
      {timelineEvents.map((event, index) => (
        <TimelineEvent key={index} {...event} index={index} />
      ))}
    </div>
  </div>
);

const TimelineEvent: React.FC<TimelineEventProps> = ({ year, title, description, category, index }) => {
  const Icon = getIconForCategory(category);
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className={`flex items-center gap-4 mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
        }`}
    >
      <div className="hidden md:block w-1/2" />
      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <div className={`flex-1 md:w-1/2 p-6 bg-card rounded-lg shadow-lg`}>
        <span className="text-sm text-primary font-semibold">{year}</span>
        <h3 className="text-lg font-semibold mt-1">{title}</h3>
        <p className="text-muted-foreground mt-2">{description}</p>
      </div>
    </motion.div>
  );
};

const GoalsSection: React.FC = () => (
  <div className="space-y-8">
    <h2 className="text-3xl font-bold tracking-tighter text-center">Goals & Aspirations</h2>
    <div className="grid md:grid-cols-2 gap-6">
      {goals.map((goal, index) => {
        const Icon = getGoalIcon(goal.category);
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="p-6 bg-card rounded-lg shadow-lg"
          >
            <Icon className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">{goal.title}</h3>
            <p className="text-muted-foreground">{goal.description}</p>
          </motion.div>
        );
      })}
    </div>
  </div>
);

const getIconForCategory = (category: string) => {
  switch (category) {
    case 'innovation': return Lightbulb;
    case 'project': return Code;
    case 'leadership': return Users;
    case 'education': return GraduationCap;
    case 'professional': return Briefcase;
    default: return Brain;
  }
};

const getGoalIcon = (category: string) => {
  return category === 'professional' ? Target : Heart;
};


interface TimelineEventProps {
  year: string;
  title: string;
  description: string;
  category: string;
  index: number;
}

export default JourneySection;