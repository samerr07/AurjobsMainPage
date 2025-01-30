import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

import HeroSectionImage from '../assets/HeroSectionImage.png';

const HeroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: 0.1, // Reduced threshold for mobile
    once: true,
    fallback: true // Ensures animation works on mobile
  });

  const partners = [
    'Meta', 'Invity', 'Gemini', 'Rapid', 'OpenAI', 'Nintex', 'MemO',
    'Imaging Plus', 'LangChain', 'Unity', 'Redis', 'elastic', 'BOSCH'
  ];
  const doubledPartners = [...partners, ...partners];

  // Animation variants for consistent behavior across devices
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: delay * 0.2,
        ease: [0.17, 0.55, 0.55, 1]
      }
    })
  };

  return (
    <div ref={ref} className="relative w-full bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 mt-13 md:mt-0">
      <main className="max-w-7xl mx-auto px-6 sm:px-8 py-8 pt-24 md:pt-36 relative z-20">
        <div className="text-center space-y-12 mt-4 md:space-y-10">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={1}
            className="inline-block px-6 py-3 bg-indigo-100 rounded-full text-indigo-600 font-medium mt-4 md:mt-12"
          >
            Think • Innovate • Grow
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={2}
            className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-800 px-4 leading-tight md:leading-snug lg:leading-tight"
          >
            AI Agent for<br />End-to-End Recruitment
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={3}
            className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto px-4"
          >
            Find. Evaluate. Hire. Faster than Ever Before.
          </motion.p>

          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={4}
            className="text-gray-600 text-sm sm:text-base md:text-lg max-w-3xl mx-auto px-4"
          >
            Transform your hiring process with Aurjobs, the fully automated AI-driven platform that handles every step of recruitment—from sourcing top talent to scheduling interviews.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={5}
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 px-4"
          >
            <button className="bg-indigo-600 z-20 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full hover:bg-indigo-700 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl text-sm sm:text-lg">
              Explore Our Tech
            </button>
            <button className="flex z-20 items-center justify-center space-x-3 px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full border-2 border-gray-300 hover:border-indigo-600 transition-all duration-300 hover:scale-105 active:scale-95 text-sm sm:text-lg">
              <span>Book a Free Demo</span>
            </button>
          </motion.div>
        </div>

        {/* Hero Image */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={6}
          className="relative mt-8 sm:-mt-16 md:-mt-24 lg:-mt-24 z-10 px-4 sm:px-0"
        >
          <div className="relative w-full max-w-5xl mx-auto md:-left-2 md:-top-15 z-0 lg:ml-48">
            <img
              src={HeroSectionImage}
              alt="AI Recruitment Process"
              className="w-full h-auto"
            />
          </div>
        </motion.div>

        {/* Partners Section */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={7}
          className="relative mt-8 sm:-mt-20 md:-mt-16 z-0"
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
                            className="flex-none w-32 sm:w-48 mx-2 sm:mx-8"
                          >
                            <div className="rounded-xl cursor-pointer transition-transform duration-300 hover:scale-105">
                              <div className="text-base sm:text-xl font-semibold text-gray-600 hover:text-indigo-600 transition-colors text-center">
                                {partner}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="relative">
                      <div className="flex animate-scroll-reverse">
                        {doubledPartners.reverse().map((partner, index) => (
                          <div
                            key={`scroll-2-${index}`}
                            className="flex-none w-32 sm:w-48 mx-2 sm:mx-8"
                          >
                            <div className="rounded-xl p-3 cursor-pointer transition-transform duration-300 hover:scale-105">
                              <div className="text-sm sm:text-lg font-semibold text-gray-600 hover:text-indigo-600 transition-colors text-center">
                                {partner}
                              </div>
                            </div>
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