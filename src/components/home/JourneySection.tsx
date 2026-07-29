import React from 'react';
import { ArrowUpRight, Briefcase, Code2, GraduationCap, Lightbulb, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { timelineEvents } from '../../data/profileData';

const icons = { innovation: Lightbulb, project: Code2, leadership: Users, education: GraduationCap, professional: Briefcase };
const JourneySection: React.FC = () => <section className="journey-section section-rule"><div className="section-heading"><div><p className="eyebrow">THE THREAD</p><h2>A journey that keeps changing shape.</h2></div><a className="text-link" href="/journey">Read the full journey <ArrowUpRight size={16} /></a></div><div className="journey-list">{timelineEvents.map((event, index) => { const Icon = icons[event.category]; return <motion.article initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .06 }} className="journey-item" key={`${event.year}-${event.title}`}><span className="journey-year">{event.year}</span><Icon size={19} /><div><h3>{event.title}</h3><p>{event.description}</p></div></motion.article>; })}</div></section>;
export default JourneySection;