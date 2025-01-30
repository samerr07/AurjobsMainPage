import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import HeroSectionImage from '../assets/HeroSectionImage.png'

const HeroSection = () => {
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('down');
  const [lastScrollY, setLastScrollY] = useState(0);

  const isInView = useInView(ref, {
    amount: 0.2,
    margin: "-100px"
  });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up');
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const shouldAnimate = isInView && scrollDirection === 'down' && !hasAnimated;

  useEffect(() => {
    if (shouldAnimate) {
      setHasAnimated(true);
    }
  }, [shouldAnimate]);

  const partners = [
    'Meta', 'Invity', 'Gemini', 'Rapid', 'OpenAI', 'Nintex', 'MemO',
    'Imaging Plus', 'LangChain', 'Unity', 'Redis', 'elastic', 'BOSCH'
  ];
  const doubledPartners = [...partners, ...partners];

  return (
    <div ref={ref} className="relative w-full bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 mt-13 md:mt-0">
      <main className="max-w-7xl mx-auto px-6 sm:px-8 py-8 pt-24 md:pt-36 relative z-20">
        <motion.div
          className="text-center space-y-12 mt-4 md:space-y-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: hasAnimated ? 1 : 0,
            y: hasAnimated ? 0 : 50
          }}
          transition={{
            duration: 0.9,
            ease: [0.17, 0.55, 0.55, 1]
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: hasAnimated ? 1 : 0,
              y: hasAnimated ? 0 : 20
            }}
            transition={{
              duration: 0.6,
              delay: 0.2
            }}
            className="inline-block px-6 py-3 bg-indigo-100 rounded-full text-indigo-600 font-medium mt-6 md:mt-12"
          >
            Think • Innovate • Grow
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: hasAnimated ? 1 : 0,
              y: hasAnimated ? 0 : 30
            }}
            transition={{
              duration: 0.6,
              delay: 0.4
            }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-800 px-4 leading-tight md:leading-snug lg:leading-tight"
          >
            AI Agent for<br />End-to-End Recruitment
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: hasAnimated ? 1 : 0,
              y: hasAnimated ? 0 : 30
            }}
            transition={{
              duration: 0.6,
              delay: 0.6
            }}
            className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto px-4"
          >
            Find. Evaluate. Hire. Faster than Ever Before.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: hasAnimated ? 1 : 0,
              y: hasAnimated ? 0 : 30
            }}
            transition={{
              duration: 0.6,
              delay: 0.8
            }}
            className="text-gray-600 text-sm sm:text-base md:text-lg max-w-3xl mx-auto px-4"
          >
            Transform your hiring process with Aurjobs, the fully automated AI-driven platform that handles every step of recruitment—from sourcing top talent to scheduling interviews.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: hasAnimated ? 1 : 0,
              y: hasAnimated ? 0 : 30
            }}
            transition={{
              duration: 0.6,
              delay: 1
            }}
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 px-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-indigo-600 z-20 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl text-sm sm:text-lg"
            >
              Explore Our Tech
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex z-20 items-center justify-center space-x-3 px-6 sm:px-8 md:px-10 py-3 sm:py-5 rounded-full border-2 border-gray-300 hover:border-indigo-600 transition-colors text-sm sm:text-lg"
            >
              <span>Book a Free Demo</span>
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: hasAnimated ? 1 : 0,
            y: hasAnimated ? 0 : 50
          }}
          transition={{
            duration: 0.9,
            delay: 0.4
          }}
          className="relative mt-4 sm:-mt-16 md:-mt-24 lg:-mt-24 z-10 px-4 sm:px-0"
        >
          <div className="relative w-full max-w-5xl mx-auto top-2 left-4 md:-left-2 md:-top-15 z-0 lg:ml-48">
            <img
               src={HeroSectionImage}
              // src='https://t9016700395.p.clickup-attachments.com/t9016700395/9bd4a21a-b4eb-4f67-9b81-02e2522f40a4/Untitled_design__3_-removebg-preview.png'
              alt="AI Recruitment Process"
              className="w-full h-auto "
            />
          </div>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: hasAnimated ? 1 : 0,
            y: hasAnimated ? 0 : 50
          }}
          transition={{
            duration: 0.9,
            delay: 0.6
          }}
          className="relative mt-8 sm:-m t-20 md:-mt-16 z-0"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-0 md:mt-0">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl p-6 sm:p-8 md:p-10 transform transition-transform duration-500 hover:scale-[1.01] sm:hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-purple-50/50 to-pink-50/50 rounded-2xl sm:rounded-3xl opacity-80" />

              <div className="relative z-10">
                <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-8">
                  Trusted By{" "}
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                    10K+ Partners
                  </span>
                </h2>

                <div className="space-y-8">
                  <div className="relative overflow-hidden">
                    <div className="relative mb-8">
                      <div className="flex animate-scroll">
                        {doubledPartners.map((partner, index) => (
                          <div
                            key={`scroll-1-${index}`}
                            className="flex-none w-40 sm:w-48 mx-2 sm:mx-8"
                          >
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              className="rounded-xl cursor-pointer"
                            >
                              <div className="text-lg sm:text-xl font-semibold text-gray-600 hover:text-indigo-600 transition-colors text-center">
                                {partner}
                              </div>
                            </motion.div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="relative">
                      <div className="flex animate-scroll-reverse">
                        {doubledPartners.reverse().map((partner, index) => (
                          <div
                            key={`scroll-2-${index}`}
                            className="flex-none w-40 sm:w-48 mx-2 sm:mx-8"
                          >
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              className="rounded-xl p-3 cursor-pointer"
                            >
                              <div className="text-base sm:text-lg font-semibold text-gray-600 hover:text-indigo-600 transition-colors text-center">
                                {partner}
                              </div>
                            </motion.div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default HeroSection;