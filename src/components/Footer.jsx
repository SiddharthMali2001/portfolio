import { motion } from 'framer-motion';
import { credlyBadges } from '../data/credlyBadges';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="badges" className="bg-gray-50 dark:bg-primary py-12 border-t border-gray-200 dark:border-muted dark:border-opacity-20">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6 md:mb-0"
          >
            <div className="flex items-center mb-2">
              <div className="w-[2px] h-6 bg-gray-900 dark:bg-light mr-2"></div>
              <span className="font-mono text-lg tracking-wider text-gray-900 dark:text-accent">SIDDHARTH MALI</span>
            </div>
            <p className="text-gray-600 dark:text-muted text-sm">
              Tech enthusiast building innovative solutions
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="w-full md:w-auto"
          >
            <p className="font-mono text-xs text-gray-500 dark:text-muted">BADGES</p>

            <div className="mt-3 flex gap-3 flex-wrap">
              {credlyBadges.map((badge) => (
                <a
                  key={badge.id}
                  href={badge.publicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 md:w-16 md:h-16 border border-gray-200 dark:border-muted dark:border-opacity-20 bg-white dark:bg-primary dark:bg-opacity-20 flex items-center justify-center hover:opacity-90 transition-opacity"
                  title={badge.title}
                >
                  <img
                    src={badge.imageUrl}
                    alt={badge.title}
                    className="w-full h-full object-contain p-1"
                    loading="lazy"
                  />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex space-x-6"
          >
            <a href="#home" className="text-gray-600 dark:text-muted hover:text-gray-900 dark:hover:text-light transition-colors">Home</a>
            <a href="#projects" className="text-gray-600 dark:text-muted hover:text-gray-900 dark:hover:text-light transition-colors">Projects</a>
            <a href="#skills" className="text-gray-600 dark:text-muted hover:text-gray-900 dark:hover:text-light transition-colors">Skills</a>
            <a href="#badges" className="text-gray-600 dark:text-muted hover:text-gray-900 dark:hover:text-light transition-colors">Badges</a>
            <a href="#contact" className="text-gray-600 dark:text-muted hover:text-gray-900 dark:hover:text-light transition-colors">Contact</a>
          </motion.div>
        </div>

        <div className="border-t border-gray-200 dark:border-muted dark:border-opacity-10 pt-8 flex flex-col md:flex-row items-center justify-between">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm text-gray-600 dark:text-muted mb-4 md:mb-0"
          >
            © {currentYear} SiddharthMali. All rights reserved.
          </motion.p>



        </div>
      </div>
    </footer>
  );
};

export default Footer;