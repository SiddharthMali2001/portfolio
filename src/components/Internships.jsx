import { useState } from 'react';
import { motion } from 'framer-motion';
import { internshipsData } from '../data/internshipsData';

const InternshipCard = ({ internship, isActive, onClick }) => (
  <motion.button
    type="button"
    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
    className={`w-full text-left border-l-2 rounded-sm ${
      isActive
        ? "border-gray-500 bg-gray-100 dark:border-accent/60 dark:bg-primary/40"
        : "border-gray-200 dark:border-muted/60"
    } p-4 cursor-pointer transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 dark:focus-visible:ring-accent/60`}
    onClick={onClick}
  >
    <h3 className={`font-medium text-sm mb-1 ${isActive ? "text-gray-900 dark:text-light" : "text-gray-600 dark:text-muted"}`}>
      {internship.company}
    </h3>
    <p className="text-xs text-gray-700 dark:text-muted">{internship.duration}</p>
    <p className="text-xs text-gray-600 dark:text-muted opacity-80 mt-1">{internship.location}</p>
  </motion.button>
);

const InternshipDetails = ({ internship }) => (
  <motion.div 
    className="bg-white dark:bg-primary dark:bg-opacity-20 p-4 md:p-6 border border-gray-200 dark:border-muted dark:border-opacity-10"
    initial={{ y: 20 }}
    animate={{ y: 0 }}
    transition={{ duration: 0.4, delay: 0.1 }}
  >
    <div className="mb-4">
      <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-900 dark:text-accent">{internship.title}</h3>
      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-muted">
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
          {internship.company}
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          {internship.duration}
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          {internship.location}
        </span>
      </div>
    </div>

    <p className="text-sm md:text-base text-gray-600 dark:text-muted mb-4 md:mb-6 leading-relaxed">{internship.description}</p>
    
    <div className="mb-4 md:mb-6">
      <h4 className="text-xs md:text-sm font-mono text-gray-900 dark:text-light mb-2 md:mb-3">KEY ACHIEVEMENTS</h4>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {internship.achievements.map((achievement, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="text-gray-500 dark:text-light opacity-50 mt-1">→</span>
            <span className="text-xs md:text-sm text-gray-700 dark:text-accent">{achievement}</span>
          </li>
        ))}
      </ul>
    </div>
    
    <div>
      <h4 className="text-xs md:text-sm font-mono text-gray-900 dark:text-light mb-2 md:mb-3">TECHNOLOGIES USED</h4>
      <div className="flex flex-wrap gap-2">
        {internship.tech.map((tech, i) => (
          <span key={i} className="text-xs py-1 px-2 md:px-3 bg-gray-100 dark:bg-secondary border border-gray-300 dark:border-muted dark:border-opacity-20 rounded-sm text-gray-900 dark:text-accent">
            {tech}
          </span>
        ))}
      </div>
    </div>

    {internship.certificate && (
      <div className="mt-6 md:mt-8 flex justify-center md:justify-end">
        <a 
          href={internship.certificate}
          target="_blank" 
          rel="noopener noreferrer" 
          className="font-mono text-xs inline-flex items-center px-5 py-2 md:px-6 md:py-2 border border-gray-900 dark:border-light text-gray-900 dark:text-accent hover:bg-gray-200 dark:hover:bg-light dark:hover:bg-opacity-5 transition-all duration-300 group"
        >
          <svg className="mr-2 w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          VIEW CERTIFICATE
          <svg className="ml-2 w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
          </svg>
        </a>
      </div>
    )}

    {internship.projectLink && (
      <div className="mt-4 md:mt-6 flex justify-center md:justify-end">
        <a 
          href={internship.projectLink}
          target="_blank" 
          rel="noopener noreferrer" 
          className="font-mono text-xs inline-flex items-center px-5 py-2 md:px-6 md:py-2 border border-gray-900 dark:border-light text-gray-900 dark:text-accent hover:bg-gray-200 dark:hover:bg-light dark:hover:bg-opacity-5 transition-all duration-300 group"
        >
          <svg className="mr-2 w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
          </svg>
          VIEW PROJECT
          <svg className="ml-2 w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
          </svg>
        </a>
      </div>
    )}
  </motion.div>
);

const Internships = () => {
  const [activeInternship, setActiveInternship] = useState(0);

  return (
    <section id="internships" className="section-padding bg-gray-50 dark:bg-secondary">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-12"
        >
          <h4 className="font-mono text-sm text-gray-500 dark:text-muted mb-2">EXPERIENCE</h4>
          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-accent">Internships</h2>
          <div className="w-16 h-[2px] bg-gray-900 dark:bg-light opacity-50"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
          <motion.div
            className="col-span-1 md:col-span-4 space-y-2"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {internshipsData.map((internship, index) => (
              <InternshipCard
                key={index}
                internship={internship}
                isActive={activeInternship === index}
                onClick={() => setActiveInternship(index)}
              />
            ))}
          </motion.div>

          <motion.div 
            className="col-span-1 md:col-span-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={activeInternship}
            transition={{ duration: 0.5 }}
          >
            <InternshipDetails internship={internshipsData[activeInternship]} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Internships;
