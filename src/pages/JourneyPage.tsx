import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Target, Heart, Code, Building, Lightbulb, Users, Smartphone, Home as HomeIcon, Brain } from 'lucide-react';

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
              year="2024"
              title="AI Enthusiast & Innovator"
              description="Leading initiatives in ASI Club and developing a new programming language tailored for children. Graduated from AAST with Computer Engineering degree. Developed G2SCV - an AI-powered CV generator using FastAPI with LinkedIn and GitHub integration."
              icon={<Lightbulb className="w-6 h-6" />}
            />
            <TimelineEvent
              year="2023"
              title="Advanced AI & Computer Vision Projects"
              description="Developed AI-based weapon detection system using YOLO for real-time surveillance and implemented pose estimation for future violence detection research. Created multiple Flutter mobile apps including Quran App for Gen Z and Optavista e-commerce app with AR try-on capabilities."
              icon={<Code className="w-6 h-6" />}
            />
            <TimelineEvent
              year="2022"
              title="Inceptum Club Leader"
              description="Head of SNCS in the Inceptum Club, bridging the gap between students and the technical world. Focused on mentoring students and organizing technical workshops."
              icon={<Users className="w-6 h-6" />}
            />
            <TimelineEvent
              year="2021"
              title="Smart Home & Full Stack Engineering"
              description="Built smart home devices (motorized curtains, Wi‑Fi smart switches) and set up a home server for media, websites, and local AI apps. Integrated everything with Home Assistant after taking a Full Stack Engineering course at IMT."
              icon={<HomeIcon className="w-6 h-6" />}
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Professional Experience</h2>
          <div className="space-y-6">
            <TimelineEvent
              year="2023"
              title="Internship – Al-Ahram"
              description="Started in networking and server maintenance, then transitioned to the developer team after one month. Worked with Django to build and refactor websites. Created Python scripts to automate database migrations, saving significant time. Gained exposure to .NET and FastAPI."
              icon={<Briefcase className="w-6 h-6" />}
            />
            <TimelineEvent
              year="2022"
              title="Internship – Arab Organization for Industrialization (AOI)"
              description="Learned about chip and motherboard manufacturing processes. Gained hands-on knowledge of hardware production in a comprehensive two-week training program."
              icon={<Briefcase className="w-6 h-6" />}
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Education & Learning</h2>
          <div className="space-y-6">
            <TimelineEvent
              year="2024"
              title="Graduation Project: Flex Programming Language"
              description="Developed a multi-syntax programming language supporting Pythonic, C-like, and Franco-Arabic syntaxes. Features AI-assisted error explanation via OpenRouter, VS Code extension, CI/CD pipelines, and web-based compiler. Written in Python with Unicode-aware compiler pipeline."
              icon={<Code className="w-6 h-6" />}
            />
            <TimelineEvent
              year="2021"
              title="Bioinformatics Engineering Student"
              description="Exploring bioinformatics and excelling in computer science studies at AASTMT. Enrolled in Full Stack Engineering course at IMT, developing smart home projects integrated with Home Assistant including motorized curtains and Wi‑Fi controlled switches."
              icon={<GraduationCap className="w-6 h-6" />}
            />
            <TimelineEvent
              year="2020"
              title="First Coding Project"
              description="Built a terminal-based arcade game in C featuring the Minimax algorithm and multiple difficulty levels, kickstarting the computer engineering journey."
              icon={<Brain className="w-6 h-6" />}
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
                To advance AI technologies, develop innovative programming languages like Flex, and create impactful solutions in computer vision and smart home automation
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <Heart className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Personal Mission</h3>
              <p className="text-gray-600">
                Empowering others through technology, knowledge sharing, and bridging the gap between students and the technical world through leadership and mentoring
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default JourneyPage;