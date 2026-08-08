import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Education = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const education = [
    {
      institution: "Municipal Arts and Urban Bank Science College",
      degree: "Bachelor of Science",
      field: "Physics",
      period: "2019-2022"
    },
    {
      institution: "Career Break",
      degree: "Preparation for Higher Studies",
      field: "Self Study",
      period: "2022–2024"
    },
    {
      institution: "Ganpat University",
      degree: "Master of Science",
      field: "Computer Applications & IT",
      CGPA: "7.84",
      period: "2024-2026"
    }
  ];

  const achievements = [
    "Participated in Hackathon conducted by VIIT ACM Chapter"
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
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="education" className="section-padding bg-white dark:bg-primary">
      <div className="container-custom" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h4 className="font-mono text-sm text-gray-500 dark:text-muted mb-2">BACKGROUND</h4>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-accent">Education & Achievements</h2>
          <div className="w-16 h-[2px] bg-gray-900 dark:bg-light opacity-50"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            className="md:col-span-2"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h3 className="text-xl font-medium mb-6 flex items-center">
              <div className="w-4 h-4 border border-light mr-3"></div>
              Education
            </h3>

            <div className="space-y-8">
              {education.map((edu, i) => (
                <motion.div
                  key={i}
                  className="border-l-2 border-gray-300 dark:border-muted dark:border-opacity-30 pl-6 relative"
                  variants={itemVariants}
                >
                  <div className="absolute w-3 h-3 bg-white dark:bg-primary border border-gray-900 dark:border-light rounded-full -left-[7px] top-1"></div>
                  <h4 className="text-lg font-medium mb-1 text-gray-900 dark:text-accent">{edu.institution}</h4>
                  <p className="text-gray-600 dark:text-muted mb-1">{edu.degree} {edu.field && `- ${edu.field}`}</p>
                  {edu.period && <p className="text-sm font-mono text-gray-700 dark:text-light opacity-70">{edu.period} </p>}
                  {edu.CGPA && <p className="text-sm font-mono text-gray-700 dark:text-light opacity-70">CGPA: {edu.CGPA}</p>}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h3 className="text-xl font-medium mb-6 flex items-center">
              <div className="w-4 h-4 border border-light mr-3"></div>
              Achievements
            </h3>

            <ul className="space-y-4">
              {achievements.map((achievement, i) => (
                <motion.li
                  key={i}
                  className="flex items-start"
                  variants={itemVariants}
                >
                  <span className="text-light mt-1 mr-2 opacity-60">⁕</span>
                  <span>{achievement}</span>
                </motion.li>
              ))}
            </ul>

            <motion.div
              className="mt-8 p-4 border border-gray-200 dark:border-muted dark:border-opacity-20 bg-gray-50 dark:bg-secondary dark:bg-opacity-30 rounded-sm"
              variants={itemVariants}
            >
              <h4 className="text-sm font-medium mb-2 text-gray-900 dark:text-accent">Continuous Learning</h4>
              <p className="text-gray-700 dark:text-muted text-sm">
                Always exploring new technologies and participating in hackathons
                to expand my knowledge and practical experience.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;