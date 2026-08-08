import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResumeRedirect from './components/ResumeRedirect.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Loader from './components/Loader.jsx';

// Lazy load components
const Projects = lazy(() => import('./components/Projects.jsx'));
const Internships = lazy(() => import('./components/Internships.jsx'));
const Skills = lazy(() => import('./components/Skills.jsx'));
const Education = lazy(() => import('./components/Education.jsx'));
const Contact = lazy(() => import('./components/Contact.jsx'));
const Footer = lazy(() => import('./components/Footer.jsx'));

// Fallback component
const LoadingFallback = () => (
  <div className="flex justify-center items-center py-20">
    <motion.div
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className="text-gray-500"
    >
      Loading...
    </motion.div>
  </div>
);


function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/resume" element={<ResumeRedirect />} />
          <Route
            path="/*"
            element={
              <AnimatePresence>
                {loading ? (
                  <Loader key="loader" />
                ) : (
                  <motion.div
                    key="app"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white dark:bg-primary text-gray-900 dark:text-accent min-h-screen transition-colors duration-300"
                  >

                    <Header />
                    <main>
                      <Hero />
                      <Suspense fallback={<LoadingFallback />}>
                        <Projects />
                      </Suspense>
                      <Suspense fallback={<LoadingFallback />}>
                        <Internships />
                      </Suspense>
                      <Suspense fallback={<LoadingFallback />}>
                        <Skills />
                      </Suspense>
                      <Suspense fallback={<LoadingFallback />}>
                        <Education />
                      </Suspense>
                      <Suspense fallback={<LoadingFallback />}>
                        <Contact />
                      </Suspense>
                    </main>
                    <Suspense fallback={<div></div>}>
                      <Footer />
                    </Suspense>
                </motion.div>
              )}
            </AnimatePresence>
          }
        />
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;