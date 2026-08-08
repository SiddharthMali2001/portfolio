import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { credlyBadges } from '../data/credlyBadges';

const STORAGE_KEY = 'portfolio.showCredlyBadges';

const Badges = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const badgeItems = useMemo(() => credlyBadges, []);

  const [showBadges, setShowBadges] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === null) return true;
      return saved === 'true';
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(showBadges));
    } catch {
      // ignore
    }
  }, [showBadges]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55 } }
  };

  return (
    <section id="badges" className="section-padding bg-white dark:bg-primary">
      <div className="container-custom" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h4 className="font-mono text-sm text-gray-500 dark:text-muted mb-2">Badges</h4>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-accent">Badges</h2>
              <div className="w-16 h-[2px] bg-gray-900 dark:bg-light opacity-50"></div>
            </div>

            <button
              type="button"
              aria-pressed={showBadges}
              onClick={() => setShowBadges((prev) => !prev)}
              className="self-start md:self-auto font-mono text-xs inline-flex items-center gap-2 px-4 py-2 border border-gray-900 dark:border-light text-gray-900 dark:text-accent hover:bg-gray-100 dark:hover:bg-light dark:hover:bg-opacity-5 transition-colors"
            >
              <span className={`inline-block w-2.5 h-2.5 rounded-full ${showBadges ? 'bg-green-500' : 'bg-gray-400'}`} />
              {showBadges ? 'CREDENTIALS ON' : 'CREDENTIALS OFF'}
            </button>
          </div>
        </motion.div>

        {showBadges ? (
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {badgeItems.map((badge) => (
              <motion.div
                key={badge.id}
                variants={itemVariants}
                className="flex flex-col items-center"
              >
                <iframe
                  allowTransparency="true"
                  frameBorder="0"
                  scrolling="no"
                  src={`https://www.credly.com/embedded_badge/${badge.id}`}
                  style={{ width: 150, height: 270 }}
                  title="View my verified achievement on Credly."
                />

                <a
                  href={badge.publicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 text-xs font-mono text-gray-600 dark:text-muted hover:text-gray-900 dark:hover:text-light transition-colors underline underline-offset-4"
                >
                  VIEW ON CREDLY
                </a>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="border border-gray-200 dark:border-muted dark:border-opacity-20 bg-gray-50 dark:bg-secondary dark:bg-opacity-20 p-6"
          >
            <p className="text-sm text-gray-600 dark:text-muted">
              Credentials are hidden. Turn them on to load and display the Credly badge embeds.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Badges;
