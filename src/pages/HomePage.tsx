import React from 'react';
import { motion } from 'framer-motion';
import { Code, Lightbulb, Users, Briefcase, GraduationCap, Home, Calendar, Award, Zap, Brain, Smartphone, Building2, Eye } from 'lucide-react';
import Hero from '../components/home/Hero';
import JourneySection from '../components/home/JourneySection';
import { aboutMeContent, experiences, skills } from '../data/profileData';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />
      </div>

      {/* About Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          {/* About Me Header */}
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4"
            >
              About Me
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              A journey from Mechatronics to Computer Engineering, driven by passion for innovation and technology
            </motion.p>
          </div>

          {/* Professional Timeline Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-card via-card/90 to-primary/5 p-8 rounded-2xl shadow-xl border border-border/50"
          >
            <div className="flex items-center gap-3 mb-8">
              <Calendar className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Professional Timeline
              </h2>
            </div>
            <div className="space-y-8">
              <TimelineItem
                year="2024"
                title="AI Enthusiast & Innovator"
                description="Leading initiatives in ASI Club and developing a new programming language tailored for children."
                icon={<Brain className="w-6 h-6" />}
                gradient="from-blue-500 to-purple-600"
              />
              <TimelineItem
                year="2022"
                title="Inceptum Club Leader"
                description="Head of SNCS in the Inceptum Club, bridging the gap between students and the technical world."
                icon={<Users className="w-6 h-6" />}
                gradient="from-green-500 to-blue-500"
              />
              <TimelineItem
                year="2021"
                title="Bioinformatics Engineering Student"
                description="Exploring bioinformatics and excelling in computer science studies at AASTMT."
                icon={<GraduationCap className="w-6 h-6" />}
                gradient="from-purple-500 to-pink-500"
              />
            </div>
          </motion.section>

          {/* Main Story */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-card via-card/90 to-blue-500/5 p-8 rounded-2xl shadow-xl border border-border/50"
          >
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold">My Background</h2>
            </div>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p>
                {aboutMeContent.introduction}
              </p>
              <p>
                {aboutMeContent.firstProject}
              </p>
              <p>
                {aboutMeContent.academicExploration}
              </p>
            </div>
          </motion.section>

          {/* Development Evolution */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-card via-card/90 to-green-500/5 p-8 rounded-2xl shadow-xl border border-border/50"
          >
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold">Shift in Development Approach</h2>
            </div>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p>
                {aboutMeContent.developmentApproach}
              </p>
            </div>
          </motion.section>

          {/* Project Categories Grid */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Project Portfolio
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ProjectCategory
                icon={<Smartphone className="w-8 h-8" />}
                title="Mobile Apps"
                description="Flutter applications including Quran App for Gen Z, Arcade Game App, and Optavista e-commerce with AR try-on capabilities"
                gradient="from-blue-500 to-purple-600"
              />
              <ProjectCategory
                icon={<Brain className="w-8 h-8" />}
                title="AI & Computer Vision"
                description="AI-based weapon detection system using YOLO, pose estimation for violence detection, and G2SCV AI-powered CV generator"
                gradient="from-purple-500 to-pink-600"
              />
              <ProjectCategory
                icon={<Award className="w-8 h-8" />}
                title="Graduation Project: Flex"
                description="Multi-syntax programming language supporting Pythonic, C-like, and Franco-Arabic syntaxes with AI-assisted error explanation"
                gradient="from-green-500 to-blue-500"
              />
            </div>
          </motion.section>

          {/* Professional Experience */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-card via-card/90 to-orange-500/5 p-8 rounded-2xl shadow-xl border border-border/50"
          >
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold">Professional Experience</h2>
            </div>
            <div className="space-y-6">
              {experiences.map((experience) => (
                <ExperienceCard
                  key={experience.id}
                  company={experience.company}
                  role={experience.role}
                  description={experience.description}
                  highlights={experience.highlights}
                  year={experience.year}
                  icon={<Building2 className="w-6 h-6" />}
                />
              ))}
            </div>
          </motion.section>

          {/* Smart Home Innovations */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-card via-card/90 to-green-500/5 p-8 rounded-2xl shadow-xl border border-border/50"
          >
            <div className="flex items-center gap-3 mb-6">
              <Home className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold">Smart Home Innovations</h2>
            </div>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p>
                In my spare time, I designed and built several smart devices including motorized smart curtains
                and Wi-Fi controlled smart switches. All devices are integrated with Home Assistant for seamless
                home automation. I even set up my own home server for media storage, personal websites, and local
                AI applications.
              </p>
            </div>
          </motion.section>

          {/* Skills Section with Enhanced Design */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-card via-card/90 to-purple-500/5 p-8 rounded-2xl shadow-xl border border-border/50"
          >
            <div className="flex items-center gap-3 mb-6">
              <Code className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold">Technical Skills</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skillCategory, index) => (
                <SkillCategory
                  key={index}
                  title={skillCategory.category}
                  skills={skillCategory.items}
                  icon={skillCategory.icon}
                />
              ))}
            </div>
          </motion.section>

          {/* Leadership Section Enhanced */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-card via-card/90 to-blue-500/5 p-8 rounded-2xl shadow-xl border border-border/50"
          >
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold">Leadership & Community Impact</h2>
            </div>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p>
                As Head of SNCS in the Inceptum Club, I focused on bridging the gap between students and the
                technical world through mentoring, workshops, and hands-on projects. Later, I led initiatives
                in the ASI Club, working on innovative projects including developing educational programming
                tools and fostering a community of young innovators passionate about technology and AI.
              </p>
            </div>
          </motion.section>
        </motion.div>
      </div>

      {/* Journey Section */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <JourneySection />
      </div>
    </div>
  );
};

// Enhanced Timeline Item Component
const TimelineItem: React.FC<{
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
}> = ({ year, title, description, icon, gradient }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="flex gap-4 relative"
  >
    <div className="flex flex-col items-center">
      <div className={`w-14 h-14 bg-gradient-to-r ${gradient} rounded-full flex items-center justify-center text-white shadow-lg`}>
        {icon}
      </div>
      <div className="w-0.5 h-16 bg-gradient-to-b from-primary/50 to-transparent"></div>
    </div>
    <div className="flex-1 pb-8">
      <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border/30 hover:shadow-lg transition-all duration-300">
        <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">{year}</span>
        <h3 className="text-xl font-bold mt-3 mb-2">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  </motion.div>
);

// Project Category Component
const ProjectCategory: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}> = ({ icon, title, description, gradient }) => (
  <motion.div
    whileHover={{ scale: 1.02, y: -4 }}
    className={`p-6 rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg hover:shadow-xl transition-all duration-300`}
  >
    <div className="flex items-center gap-3 mb-4">
      {icon}
      <h3 className="text-xl font-bold">{title}</h3>
    </div>
    <p className="text-white/90 leading-relaxed">{description}</p>
  </motion.div>
);

// Experience Card Component
const ExperienceCard: React.FC<{
  company: string;
  role: string;
  description: string;
  highlights?: string[];
  year: string;
  icon: React.ReactNode;
}> = ({ company, role, description, highlights, year, icon }) => (
  <motion.div
    whileHover={{ scale: 1.01 }}
    className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border/30 hover:shadow-lg transition-all duration-300"
  >
    <div className="flex items-center gap-3 mb-3">
      <div className="p-2 bg-primary/10 rounded-lg">
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-semibold">{role}</h3>
            <p className="text-sm text-primary font-medium">{company}</p>
          </div>
          <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">{year}</span>
        </div>
      </div>
    </div>
    <p className="text-muted-foreground leading-relaxed mb-3">{description}</p>
    {highlights && highlights.length > 0 && (
      <div className="space-y-1">
        <h4 className="text-sm font-semibold text-foreground">Key Achievements:</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          {highlights.map((highlight, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
    )}
  </motion.div>
);

// Skill Category Component
const SkillCategory: React.FC<{
  title: string;
  skills: string[];
  icon: string;
}> = ({ title, skills, icon }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border/30 hover:shadow-lg transition-all duration-300"
  >
    <div className="flex items-center gap-3 mb-4">
      <span className="text-2xl">{icon}</span>
      <h3 className="text-lg font-semibold text-primary">{title}</h3>
    </div>
    <div className="space-y-2">
      {skills.map((skill, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center gap-2 text-sm text-muted-foreground"
        >
          <span className="w-2 h-2 bg-primary rounded-full"></span>
          {skill}
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default HomePage;