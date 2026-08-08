import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const categories = [
    {
      name: "Frontend",
      skills: ["React.js", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS"]
    },
    {
      name: "Backend",
      skills: ["Node.js", "Express.js", "Python", "REST APIs", "WebSockets"]
    },
    {
      name: "Database",
      skills: ["SQL","MongoDB","PostgreSQL"]
    },
    {
      name: "DevOps & Tools",
      skills: [ "Git", "Docker", "Google Gemini API"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="skills" className="section-padding bg-gray-50 dark:bg-secondary">
      <div className="container-custom" ref={ref}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h4 className="font-mono text-sm text-gray-500 dark:text-muted mb-2">EXPERTISE</h4>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-accent">Technical Skills</h2>
          <div className="w-16 h-[2px] bg-gray-900 dark:bg-light opacity-50"></div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {categories.map((category, i) => (
            <motion.div 
              key={i} 
              className="border border-gray-200 dark:border-muted dark:border-opacity-20 bg-white dark:bg-primary dark:bg-opacity-40 p-6"
              variants={itemVariants}
            >
              <h3 className="text-gray-900 dark:text-light font-medium mb-4 pb-2 border-b border-gray-200 dark:border-muted dark:border-opacity-20">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, j) => (
                  <motion.span 
                    key={j} 
                    className="text-sm bg-gray-100 dark:bg-secondary text-gray-900 dark:text-accent px-3 py-1 rounded-sm border border-transparent hover:border-gray-400 dark:hover:border-light transition-colors cursor-default"
                    whileHover={{ 
                      y: -2,
                      transition: { duration: 0.2 } 
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-16 flex flex-col md:flex-row items-center justify-between p-6 border border-gray-200 dark:border-muted dark:border-opacity-20 bg-white dark:bg-primary dark:bg-opacity-40"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-medium mb-2 text-gray-900 dark:text-accent">Ready to collaborate?</h3>
            <p className="text-gray-600 dark:text-muted">Let's discuss how my skills can help your project.</p>
          </div>
          <a href="#contact" className="btn btn-primary whitespace-nowrap">
            Get in Touch
            <span className="ml-2">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;