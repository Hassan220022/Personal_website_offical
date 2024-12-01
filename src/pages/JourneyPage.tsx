import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Target, Heart } from 'lucide-react';

const TimelineEvent: React.FC<{
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}> = ({ year, title, description, icon }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="flex gap-4 mb-8"
  >
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
        {icon}
      </div>
      <div className="flex-1 w-0.5 bg-blue-200 my-2"></div>
    </div>
    <div className="flex-1">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <span className="text-sm text-blue-600 font-semibold">{year}</span>
        <h3 className="text-lg font-semibold mt-1">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
    </div>
  </motion.div>
);

const JourneyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">My Journey</h1>
        <p className="text-xl text-gray-600">
          Every step of my journey has shaped who I am today
        </p>
      </motion.div>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Professional Journey</h2>
          <div className="space-y-6">
            <TimelineEvent
              year="2023"
              title="Senior Software Developer"
              description="Leading development teams and architecting scalable solutions"
              icon={<Briefcase className="w-6 h-6" />}
            />
            <TimelineEvent
              year="2021"
              title="Software Developer"
              description="Building robust web applications and mentoring junior developers"
              icon={<Briefcase className="w-6 h-6" />}
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Education</h2>
          <div className="space-y-6">
            <TimelineEvent
              year="2020"
              title="Bachelor's in Computer Science"
              description="Graduated with honors, specializing in software engineering"
              icon={<GraduationCap className="w-6 h-6" />}
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Goals & Aspirations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <Target className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Professional Goals</h3>
              <p className="text-gray-600">
                Becoming a technical leader and contributing to open-source projects
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <Heart className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Personal Mission</h3>
              <p className="text-gray-600">
                Empowering others through technology and knowledge sharing
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default JourneyPage;