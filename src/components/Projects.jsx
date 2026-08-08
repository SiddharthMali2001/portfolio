import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ProjectPreview = ({ src, title, fit = 'cover' }) => {
  const [failed, setFailed] = useState(false);

  const joinBaseUrl = (baseUrl, path) => {
    const base = typeof baseUrl === 'string' ? baseUrl : '/';
    const a = base.endsWith('/') ? base : `${base}/`;
    const b = typeof path === 'string' ? path : '';
    return b.startsWith('/') ? `${a}${b.slice(1)}` : `${a}${b}`;
  };

  const resolvedSrc =
    typeof src === 'string' && src.startsWith('/')
      ? joinBaseUrl(import.meta.env.BASE_URL, src)
      : src;

  useEffect(() => {
    setFailed(false);
  }, [resolvedSrc]);

  if (!resolvedSrc || failed) {
    return (
      <div className="relative w-full aspect-[16/9] bg-white dark:bg-primary border border-gray-200 dark:border-muted dark:border-opacity-10 flex items-center justify-center">
        <div className="text-center px-6">
          <p className="text-xs md:text-sm text-gray-500 dark:text-muted">
            Preview not available.
          </p>
          <p className="text-[11px] md:text-xs text-gray-400 dark:text-gray-500 mt-2 break-all">
            Tried: <span className="font-mono">{String(resolvedSrc || src || '')}</span>
          </p>
          <p className="text-[11px] md:text-xs text-gray-400 dark:text-gray-500 mt-2">
            Put the file in <span className="font-mono">public/images</span> and reference it as <span className="font-mono">/images/filename.ext</span>
          </p>

          {resolvedSrc ? (
            <div className="mt-4 flex flex-wrap gap-3 justify-center">
              <button
                type="button"
                onClick={() => setFailed(false)}
                className="font-mono text-xs inline-flex items-center px-4 py-2 border border-gray-900 dark:border-light text-gray-900 dark:text-accent hover:bg-gray-100 dark:hover:bg-light dark:hover:bg-opacity-5 transition-colors"
              >
                RETRY
              </button>
              <a
                href={resolvedSrc}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs inline-flex items-center px-4 py-2 border border-gray-300 dark:border-muted dark:border-opacity-30 text-gray-700 dark:text-muted hover:text-gray-900 dark:hover:text-light transition-colors"
              >
                OPEN IMAGE
              </a>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-[16/9] border border-gray-200 dark:border-muted dark:border-opacity-10 bg-white dark:bg-primary overflow-hidden">
      <img
        src={resolvedSrc}
        alt={`${title} preview`}
        loading="lazy"
        className={`absolute inset-0 w-full h-full ${fit === 'contain' ? 'object-contain p-2 md:p-4' : 'object-cover'}`}
        onError={() => setFailed(true)}
      />
    </div>
  );
};

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);

  const projects = [

    {
      title: " Attendance Management System",
      description: "An innovative serverless attendance solution leveraging AWS Lambda and Python to deliver cost-effective, real-time attendance tracking for educational institutions. The system employs sophisticated HTML parsing techniques with BeautifulSoup to extract attendance data from various sources, processes it through a highly optimized pipeline, and delivers accurate, instantaneous results to thousands of users daily without incurring operational costs, making it an ideal solution for resource-constrained educational environments.",
      tech: ["AWS Lambda", "Python", "WebSocket", "DynamoDB", "BeautifulSoup"],
      image: "/images/attendance-preview.svg",
      imageFit: "contain",
      liveLink: "",
      highlights: [
        "Handles ~100 unique daily users",
        "10,000+ requests/day at zero cost",
        "Avg response time of 1.5-2 seconds",
        "Real-time HTML parsing"
      ]
    },
  
   
    {
      title: "Bus Tracking System - Android App",
      description: "An innovative Android application born from everyday necessity, designed to automate the mundane task of counting pressure cooker whistles during cooking. This offline-first app utilizes sophisticated audio processing algorithms to detect and count whistles in real-time using the device's microphone, without requiring an internet connection. With a focus on privacy, the application processes all audio data locally and on-the-fly without storing any recordings. The implementation includes custom sound analysis using Fast Fourier Transform (FFT) and Tarsos DSP library to accurately identify the distinctive whistle frequency pattern amid background noise, making cooking precision effortless for users.",
      tech: ["capacitorjs", "Kotlin", "Android Studio"],
      image: "/images/bus-tracking-preview.svg",
      imageFit: "contain",
      liveLink: "https://university-bus-tracker-app.web.app/",
      highlights: [
        "Offline operation for areas with limited connectivity",
        "Privacy-focused with no data storage",
        "Real-time audio processing and frequency analysis",
        "Future ML integration for multi-cooker scenarios"
      ]
    }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="projects" className="section-padding bg-white dark:bg-primary">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-12"
        >
          <h4 className="font-mono text-sm text-gray-500 dark:text-muted mb-2">PORTFOLIO</h4>
          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-accent">Featured Projects</h2>
          <div className="w-16 h-[2px] bg-gray-900 dark:bg-light opacity-50"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
          {/* Project selector - mobile version */}
          <motion.div 
            className="md:hidden w-full mb-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-gray-500 dark:text-muted">SELECT PROJECT</p>
              <div className="text-xs text-gray-500 dark:text-muted">{activeProject + 1}/{projects.length}</div>
            </div>
            <div className="flex overflow-x-auto pb-3 scrollbar-hide snap-x snap-mandatory">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`snap-start flex-shrink-0 w-[75%] mr-3 p-4 cursor-pointer transition-all duration-300 ${
                    activeProject === index 
                      ? "bg-gray-100 dark:bg-secondary dark:bg-opacity-50 border border-gray-300 dark:border-light dark:border-opacity-20" 
                      : "bg-gray-50 dark:bg-secondary dark:bg-opacity-10 border border-gray-200 dark:border-muted dark:border-opacity-10"
                  }`}
                  onClick={() => setActiveProject(index)}
                  whileTap={{ scale: 0.98 }}
                >
                  <h3 className={`font-medium text-sm mb-1 ${
                    activeProject === index ? "text-gray-900 dark:text-light" : "text-gray-600 dark:text-muted"
                  }`}>
                    {project.title.split(" - ")[0]}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-muted line-clamp-1">
                    {project.tech.slice(0, 3).join(", ")}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Project selector - desktop version */}
          <motion.div 
            className="hidden md:block md:col-span-4" 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`border-l border-gray-300 dark:border-muted ${
                  activeProject === index ? "border-opacity-100" : "border-opacity-20"
                } p-4 cursor-pointer transition-all duration-300 ${
                  activeProject === index ? "bg-gray-100 dark:bg-secondary dark:bg-opacity-30" : ""
                }`}
                onClick={() => setActiveProject(index)}
                whileHover={{
                  backgroundColor: "rgba(0, 0, 0, 0.05)",
                  transition: { duration: 0.2 }
                }}
              >
                <h3 className={`font-medium text-sm mb-1 ${
                  activeProject === index ? "text-gray-900 dark:text-light" : "text-gray-600 dark:text-muted"
                }`}>
                  {project.title.split(" - ")[0]}
                </h3>
                <p className="text-xs text-gray-600 dark:text-muted line-clamp-1">
                  {project.tech.slice(0, 3).join(", ")}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Project details */}
          <motion.div 
            className="col-span-1 md:col-span-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={activeProject}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="bg-gray-100 dark:bg-secondary dark:bg-opacity-20 p-4 md:p-6 border border-gray-200 dark:border-muted dark:border-opacity-10 min-h-[520px] md:min-h-[480px]"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="mb-4 md:mb-6">
                <ProjectPreview
                  key={projects[activeProject].image || projects[activeProject].title}
                  src={projects[activeProject].image}
                  title={projects[activeProject].title}
                  fit={projects[activeProject].imageFit}
                />
              </div>

              <h3 className="text-lg md:text-xl font-semibold mb-3 text-gray-900 dark:text-accent">{projects[activeProject].title}</h3>
              <p className="text-sm md:text-base text-gray-600 dark:text-muted mb-4 md:mb-6 leading-relaxed">
                {projects[activeProject].description}
              </p>
              
              <div className="mb-4 md:mb-6">
                <h4 className="text-xs md:text-sm font-mono text-gray-900 dark:text-light mb-2 md:mb-3">KEY HIGHLIGHTS</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {projects[activeProject].highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-gray-500 dark:text-light opacity-50 mt-1">→</span>
                      <span className="text-xs md:text-sm text-gray-700 dark:text-accent">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-xs md:text-sm font-mono text-gray-900 dark:text-light mb-2 md:mb-3">TECHNOLOGIES</h4>
                <div className="flex flex-wrap gap-2">
                  {projects[activeProject].tech.map((tech, i) => (
                    <span 
                      key={i} 
                      className="text-xs py-1 px-2 md:px-3 bg-white dark:bg-primary border border-gray-300 dark:border-muted dark:border-opacity-20 rounded-sm text-gray-900 dark:text-accent"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {projects[activeProject].liveLink && (
                <div className="mt-6 md:mt-8 flex justify-center md:justify-end">
                  <a 
                    href={projects[activeProject].liveLink}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-mono text-xs inline-flex items-center px-5 py-2 md:px-6 md:py-2 border border-gray-900 dark:border-light text-gray-900 dark:text-accent hover:bg-gray-200 dark:hover:bg-light dark:hover:bg-opacity-5 transition-all duration-300 group"
                  >
                    VIEW PROJECT
                    <svg className="ml-2 w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                  </a>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Projects;