import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Hero from '../components/home/Hero';
import JourneySection from '../components/home/JourneySection';
import { customProjects } from '../data/customProjects';
import { aboutMeContent, skills, githubActivity } from '../data/profileData';

const featuredIds = ['flex-language', 'g2scv', 'optavista'];

const HomePage: React.FC = () => {
  const featured = featuredIds.map((id) => customProjects.find((project) => project.id === id)).filter(Boolean);
  return <div className="page-wrap">
    <Hero />
    <section className="intro-grid section-rule">
      <div><p className="eyebrow">A SHORT INTRODUCTION</p><h2>From hardware curiosity to software systems.</h2></div>
      <div className="intro-copy"><p>{aboutMeContent.introduction}</p><p>{aboutMeContent.academicExploration}</p></div>
    </section>
    <section id="featured" className="section-block">
      <div className="section-heading"><div><p className="eyebrow">SELECTED WORK</p><h2>Projects with a point of view.</h2></div><a className="text-link" href="/projects">View all projects <ArrowUpRight size={16} /></a></div>
      <div className="featured-grid">{featured.map((project) => project && <article className="project-tile" key={project.id}><div className="tile-top"><span className="tile-index">0{featured.indexOf(project) + 1}</span><span className="tile-category">{project.category}</span></div><h3>{project.name}</h3><p>{project.description}</p><div className="tag-row">{project.technologies.slice(0, 3).map((tech) => <span key={tech}>{tech}</span>)}</div></article>)}</div>
    </section>
    <section className="capabilities section-rule"><div><p className="eyebrow">WHAT I WORK WITH</p><h2>Technical range, grounded in making.</h2></div><div className="capability-list">{skills.slice(0, 4).map((skill, i) => <div className="capability" key={skill.category}><span>0{i + 1}</span><div><h3>{skill.category}</h3><p>{skill.items.join(' · ')}</p></div></div>)}</div></section>
    <section className="section-rule">
      <div className="section-heading"><div><p className="eyebrow">RECENT GITHUB ACTIVITY</p><h2>What I’ve been building lately.</h2></div></div>
      <ul className="journey-list">
        {githubActivity.map((item) => (
          <li className="journey-item" key={item.repo}>
            <span className="journey-year">GitHub</span>
            <span aria-hidden="true" />
            <div>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '.4rem' }}>
                {item.repo}
                <a className="text-link" href={item.url} target="_blank" rel="noopener noreferrer"><ArrowUpRight size={14} /></a>
              </h3>
              <p>{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
    <JourneySection />
  </div>;
};
export default HomePage;
