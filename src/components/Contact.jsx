import { useEffect, useState, useRef } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from 'react-google-recaptcha';
import { supabase } from '../lib/supabaseClient';

const ContactForm = () => {
  const ref = useRef(null);
  const formRef = useRef(null);
  const recaptchaRef = useRef(null);
  const toastTimerRef = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [captchaToken, setCaptchaToken] = useState(null);

  const [toast, setToast] = useState(null);

  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: null
  });

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const showToast = (message, type = 'info') => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }

    setToast({ id: Date.now(), message, type });
    toastTimerRef.current = setTimeout(() => setToast(null), 2800);
  };

  const openCertificate = (href, label) => {
    const opened = window.open(href, '_blank', 'noopener,noreferrer');
    if (!opened) {
      showToast('Popup blocked — allow popups to open the certificate.', 'error');
      return;
    }
    showToast(`Opening ${label}...`, 'success');
  };

  const handleChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    // Map form field names to state property names
    const stateMapping = {
      'name': 'name',
      'email': 'email',
      'message': 'message'
    };

    setFormData({
      ...formData,
      [stateMapping[fieldName] || fieldName]: fieldValue
    });
  };

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, submitted: false, error: null });

    // Validate captcha
    if (!captchaToken) {
      setStatus({ 
        submitting: false, 
        submitted: false, 
        error: 'Please complete the reCAPTCHA verification' 
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({ 
        submitting: false, 
        submitted: false, 
        error: 'Please enter a valid email address' 
      });
      return;
    }

    try {
      // EmailJS configuration
      const serviceId = import.meta.env.VITE_SERVICE_ID;
      const templateId = import.meta.env.VITE_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_PUBLIC_KEY;

      console.log('Service ID:', serviceId);
      console.log('Template ID:', templateId);
      console.log('Public Key:', publicKey);

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS credentials not configured');
      }

      // Initialize EmailJS
      emailjs.init(publicKey);

      // Format the current date and time in UTC
      const now = new Date();
      const formattedDate = now.toISOString().replace('T', ' ').substring(0, 19);

      // Prepare form data for EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'siddharthmali.211@gmail.com',
        date_time: formattedDate,
        user_login: 'Siddharth Mali'
      };

      console.log('Sending email with params:', templateParams);

      // Send email
      const emailResponse = await emailjs.send(serviceId, templateId, templateParams);
      console.log('Email sent successfully:', emailResponse);

      // Try to save to Supabase (optional - won't fail if Supabase isn't available)
      try {
        if (supabase) {
          const { error: supabaseError } = await supabase
            .from('contacts')
            .insert([
              {
                name: formData.name,
                email: formData.email,
                message: formData.message,
                created_at: new Date().toISOString()
              }
            ]);

          if (supabaseError) {
            console.warn('Supabase save failed (non-critical):', supabaseError);
          } else {
            console.log('Data also saved to Supabase');
          }
        } else {
          console.warn('Supabase is not configured; skipping contact persistence.');
        }
      } catch (supabaseErr) {
        console.warn('Supabase connection failed (non-critical):', supabaseErr);
      }

      setStatus({ submitting: false, submitted: true, error: null });
      setFormData({ name: '', email: '', message: '' });
      setCaptchaToken(null);
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }

      setTimeout(() => {
        setStatus(prev => ({ ...prev, submitted: false }));
      }, 5000);
    } catch (error) {
      console.error('Error:', error);
      setStatus({ submitting: false, submitted: false, error: error.message || 'Failed to send message' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="contact" className="section-padding bg-gray-50 dark:bg-secondary">
      <div className="container-custom" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h4 className="font-mono text-sm text-gray-500 dark:text-muted mb-2">GET IN TOUCH</h4>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-accent">Contact Me</h2>
          <div className="w-16 h-[2px] bg-gray-900 dark:bg-light opacity-50"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h3
              variants={itemVariants}
              className="text-xl font-medium mb-6 text-gray-900 dark:text-accent"
            >
              Let's start a conversation
            </motion.h3>

            <motion.p
              variants={itemVariants}
              className="text-gray-600 dark:text-muted mb-8"
            >
              Have a project in mind? Want to discuss collaboration opportunities?
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
            </motion.p>

            <motion.div
              variants={containerVariants}
              className="space-y-6"
            >
              <motion.div
                variants={itemVariants}
                className="flex items-start"
              >
                <div className="mr-4 p-2 border border-gray-300 dark:border-muted dark:border-opacity-30">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="currentColor" strokeOpacity="0.8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-1 text-gray-900 dark:text-accent">Email</h4>
                  <a href="mailto:siddharthmali.211@gmail.com" className="text-gray-600 dark:text-muted hover:text-gray-900 dark:hover:text-light transition-colors">
                    siddharthmali.211@gmail.com
                  </a>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex items-start"
              >
                <div className="mr-4 p-2 border border-gray-300 dark:border-muted dark:border-opacity-30">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 4H9L11 9L8.5 10.5C9.57 12.6715 11.3285 14.43 13.5 15.5L15 13L20 15V19C20 19.5304 19.7893 20.0391 19.4142 20.4142C19.0391 20.7893 18.5304 21 18 21C14.0993 20.763 10.4202 19.1065 7.65683 16.3432C4.8935 13.5798 3.23705 9.90074 3 6C3 5.46957 3.21071 4.96086 3.58579 4.58579C3.96086 4.21071 4.46957 4 5 4" stroke="currentColor" strokeOpacity="0.8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-1 text-gray-900 dark:text-accent">Phone</h4>
                  <a href="tel:+8488999811" className="text-gray-600 dark:text-muted hover:text-gray-900 dark:hover:text-light transition-colors">
                    +91 8488999811
                  </a>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex items-start"
              >
                <div className="mr-4 p-2 border border-gray-300 dark:border-muted dark:border-opacity-30">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 19C9 20.1046 7.65685 21 6 21C4.34315 21 3 20.1046 3 19C3 17.8954 4.34315 17 6 17C7.65685 17 9 17.8954 9 19ZM9 19V5C9 3.89543 9.89543 3 11 3H21C22.1046 3 23 3.89543 23 5V19C23 20.1046 22.1046 21 21 21M21 21C19.3431 21 18 20.1046 18 19C18 17.8954 19.3431 17 21 17C22.6569 17 24 17.8954 24 19C24 20.1046 22.6569 21 21 21ZM15 19C15 20.1046 13.6569 21 12 21C10.3431 21 9 20.1046 9 19C9 17.8954 10.3431 17 12 17C13.6569 17 15 17.8954 15 19Z" stroke="currentColor" strokeOpacity="0.8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-1">Connect</h4>
                  <div className="flex gap-3 mt-2">
                    {/* Credly */}
                    <a href="https://www.credly.com/badges/ebc98f41-3b33-4c96-8061-057310c11f63/public_url" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity text-gray-900 dark:text-gray-300">
                      <span className="sr-only">Credly</span>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L20 6V12C20 16.418 16.418 20 12 22C7.582 20 4 16.418 4 12V6L12 2Z" fill="currentColor" opacity="0.9" />
                        <path d="M9.25 12.2L11.1 14.05L14.75 10.4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>

                    {/* GitHub */}
                    <a href="https://github.com/SiddharthMali2001" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity text-gray-900 dark:text-gray-300">
                      <span className="sr-only">GitHub</span>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.166 8.84 21.49C9.34 21.581 9.522 21.276 9.522 21.008C9.522 20.766 9.513 20.011 9.508 19.172C6.726 19.791 6.143 17.898 6.143 17.898C5.699 16.754 5.064 16.451 5.064 16.451C4.187 15.818 5.131 15.829 5.131 15.829C6.104 15.898 6.626 16.868 6.626 16.868C7.498 18.412 8.974 17.945 9.541 17.687C9.63 17.058 9.888 16.592 10.175 16.32C7.956 16.046 5.62 15.233 5.62 11.477C5.62 10.386 6.01 9.491 6.646 8.787C6.546 8.531 6.202 7.57 6.747 6.181C6.747 6.181 7.563 5.908 9.497 7.211C10.29 7.002 11.151 6.898 12.001 6.894C12.849 6.899 13.71 7.002 14.505 7.211C16.437 5.908 17.252 6.181 17.252 6.181C17.798 7.57 17.454 8.531 17.354 8.787C17.991 9.491 18.379 10.386 18.379 11.477C18.379 15.246 16.038 16.044 13.813 16.313C14.172 16.647 14.492 17.308 14.492 18.313C14.492 19.754 14.479 20.674 14.479 21.007C14.479 21.278 14.659 21.586 15.167 21.49C19.137 20.162 22 16.418 22 12C22 6.477 17.523 2 12 2Z" fill="currentColor" />
                      </svg>
                    </a>

                    {/* LinkedIn */}
                    <a href="https://www.linkedin.com/in/siddhathmali2001" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity text-gray-900 dark:text-gray-300">
                      <span className="sr-only">LinkedIn</span>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.447 20.452H16.893V14.883C16.893 13.555 16.866 11.846 15.041 11.846C13.217 11.846 12.934 13.291 12.934 14.785V20.452H9.38V9H12.764V10.561H12.813C13.288 9.661 14.448 8.711 16.181 8.711C19.782 8.711 20.448 11.081 20.448 14.166V20.452H20.447ZM5.339 7.433C4.193 7.433 3.274 6.507 3.274 5.368C3.274 4.23 4.194 3.305 5.339 3.305C6.482 3.305 7.404 4.23 7.404 5.368C7.404 6.507 6.483 7.433 5.339 7.433ZM7.119 20.452H3.555V9H7.119V20.452Z" fill="currentColor" />
                      </svg>
                    </a>

                    {/* Instagram */}
                    <a href="https://www.instagram.com/siddharthmali.211?igsh=MXRicWJ2MTdoOHNjZg==" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity text-gray-900 dark:text-gray-300">
                      <span className="sr-only">Instagram</span>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 2C4.239 2 2 4.239 2 7V17C2 19.761 4.239 22 7 22H17C19.761 22 22 19.761 22 17V7C22 4.239 19.761 2 17 2H7ZM17 4C18.654 4 20 5.346 20 7V17C20 18.654 18.654 20 17 20H7C5.346 20 4 18.654 4 17V7C4 5.346 5.346 4 7 4H17ZM12 7C9.239 7 7 9.239 7 12C7 14.761 9.239 17 12 17C14.761 17 17 14.761 17 12C17 9.239 14.761 7 12 7ZM12 9C13.654 9 15 10.346 15 12C15 13.654 13.654 15 12 15C10.346 15 9 13.654 9 12C9 10.346 10.346 9 12 9ZM17.5 6.5C16.672 6.5 16 7.172 16 8C16 8.828 16.672 9.5 17.5 9.5C18.328 9.5 19 8.828 19 8C19 7.172 18.328 6.5 17.5 6.5Z" fill="currentColor" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex items-start"
              >
                <div className="mr-4 p-2 border border-gray-300 dark:border-muted dark:border-opacity-30">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 3H17C18.1046 3 19 3.89543 19 5V21L12 18L5 21V5C5 3.89543 5.89543 3 7 3Z" stroke="currentColor" strokeOpacity="0.8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 8H15" stroke="currentColor" strokeOpacity="0.8" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M9 12H15" stroke="currentColor" strokeOpacity="0.8" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-1 text-gray-900 dark:text-accent">Certificates</h4>
                  <div className="flex flex-col gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => openCertificate('/certificates/PythonEssentials1.pdf', 'PythonEssentials1')}
                      className="text-left text-gray-600 dark:text-muted hover:text-gray-900 dark:hover:text-light transition-colors underline underline-offset-4"
                    >
                      PythonEssentials1
                    </button>
                    <button
                      type="button"
                      onClick={() => openCertificate('/certificates/PythonEssentials2.pdf', 'PythonEssentials2')}
                      className="text-left text-gray-600 dark:text-muted hover:text-gray-900 dark:hover:text-light transition-colors underline underline-offset-4"
                    >
                      PythonEssentials2
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="bg-white dark:bg-primary dark:bg-opacity-40 border border-gray-200 dark:border-muted dark:border-opacity-10 p-6 rounded-sm shadow-sm dark:shadow-none"
            >
              <h3 className="text-xl font-medium mb-6 text-gray-900 dark:text-accent">Send a Message</h3>

              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-300 text-gray-900 placeholder-gray-400 p-3 rounded-sm focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 dark:bg-secondary dark:bg-opacity-40 dark:border-muted dark:border-opacity-30 dark:text-light dark:placeholder-gray-400 dark:focus:border-light dark:focus:ring-1 dark:focus:ring-light"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-300 text-gray-900 placeholder-gray-400 p-3 rounded-sm focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 dark:bg-secondary dark:bg-opacity-40 dark:border-muted dark:border-opacity-30 dark:text-light dark:placeholder-gray-400 dark:focus:border-light dark:focus:ring-1 dark:focus:ring-light"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full bg-white border border-gray-300 text-gray-900 placeholder-gray-400 p-3 rounded-sm focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 dark:bg-secondary dark:bg-opacity-40 dark:border-muted dark:border-opacity-30 dark:text-light dark:placeholder-gray-400 dark:focus:border-light dark:focus:ring-1 dark:focus:ring-light"
                  required
                ></textarea>
              </div>

              {/* reCAPTCHA Badge Notice */}
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 text-center">
                This site is protected by reCAPTCHA and the Google{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-700 dark:hover:text-gray-300">Privacy Policy</a> and{' '}
                <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-700 dark:hover:text-gray-300">Terms of Service</a> apply.
              </p>

              <div className="mb-6 flex justify-center">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                  onChange={handleCaptchaChange}
                  theme="light"
                />
              </div>

              <button
                type="submit"
                className={`btn btn-primary w-full ${status.submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                disabled={status.submitting}
              >
                {status.submitting ? 'Sending...' : 'Send Message'}
              </button>

              {status.submitted && (
                <div className="mt-4 p-3 rounded-sm bg-green-50 text-green-800 border border-green-200 text-center dark:bg-green-500/10 dark:text-green-200 dark:border-green-500/40">
                  Message sent successfully!
                </div>
              )}

              {status.error && (
                <div className="mt-4 p-3 rounded-sm bg-red-50 text-red-800 border border-red-200 text-center text-sm dark:bg-red-500/10 dark:text-red-200 dark:border-red-500/40">
                  <strong>Error:</strong> {status.error}
                  <p className="text-xs mt-2 opacity-75">Check browser console (F12) for more details</p>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.18 }}
            className="fixed bottom-6 right-6 z-50"
            role="status"
            aria-live="polite"
          >
            <div
              className={
                `max-w-sm rounded-sm px-4 py-3 shadow-lg border text-sm ` +
                (toast.type === 'error'
                  ? 'bg-red-600 text-white border-red-500'
                  : toast.type === 'success'
                    ? 'bg-green-600 text-white border-green-500'
                    : 'bg-gray-900 text-white border-gray-700')
              }
            >
              {toast.message}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Contact = () => {
  return <ContactForm />;
};

export default Contact;