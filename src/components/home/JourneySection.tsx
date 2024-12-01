import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Target, Heart, Microscope, Lightbulb, Users, Book } from 'lucide-react';

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

const TimelineEvent: React.FC<TimelineEventProps> = ({ year, title, description, icon: Icon, index }) => (
  <motion.div
    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.2 }}
    className={`flex items-center gap-4 mb-12 ${
      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
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

const GoalsSection: React.FC = () => (
  <div className="space-y-8">
    <h2 className="text-3xl font-bold tracking-tighter text-center">Goals & Aspirations</h2>
    <div className="grid md:grid-cols-2 gap-6">
      {goals.map((goal, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.2 }}
          className="p-6 bg-card rounded-lg shadow-lg"
        >
          <goal.icon className="w-8 h-8 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">{goal.title}</h3>
          <p className="text-muted-foreground">{goal.description}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

const timelineEvents = [
  {
    year: '2024',
    title: 'AI Enthusiast & Innovator',
    description: 'Leading initiatives in ASI Club and developing a new programming language tailored for children.',
    icon: Lightbulb,
  },
  {
    year: '2023',
    title: 'Senior Python Developer',
    description: 'Specializing in building AI models from scratch and solving complex errors.',
    icon: Briefcase,
  },
  {
    year: '2022',
    title: 'Inceptum Club Leader',
    description: 'Head of SNCS in the Inceptum Club, bridging the gap between students and the technical world.',
    icon: Users,
  },
  {
    year: '2021',
    title: 'Bioinformatics Engineering Student',
    description: 'Exploring bioinformatics and excelling in computer science studies at AASTMT.',
    icon: Microscope,
  },
  {
    year: '2020',
    title: "Bachelor's in Computer Science",
    description: 'Enrolled at AASTMT with a 75% merit scholarship, aiming to excel in the field.',
    icon: GraduationCap,
  },
];

const goals = [
  {
    title: 'Professional Goals',
    description: 'To develop cutting-edge AI technologies and create impactful tools like Flux programming language.',
    icon: Target,
  },
  {
    title: 'Personal Mission',
    description: 'Empowering others through technology, knowledge sharing, and mentoring future innovators.',
    icon: Heart,
  },
];


interface TimelineEventProps {
  year: string;
  title: string;
  description: string;
  icon: React.FC<{ className?: string }>;
  index: number;
}

export default JourneySection;