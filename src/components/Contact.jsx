
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ContactImg from "../assets/Contact.png";
import { Link } from 'react-router-dom';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px" });

  const containerVariants = {
    hidden: { 
      opacity: 0,
      y: 50
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const textVariants = {
    hidden: { 
      opacity: 0,
      x: -50
    },
    visible: { 
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const imageVariants = {
    hidden: { 
      opacity: 0,
      x: 50,
      rotate: -5
    },
    visible: { 
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.3
      }
    },
    hover: {
      y: -10,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  return (
    <motion.div 
      ref={ref}
      className="container mx-auto px-4 py-16"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.div 
        className="bg-indigo-600 rounded-3xl text-white px-6 py-12 md:py-16"
        whileHover={{
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          {/* Text Section */}
          <motion.div 
            className="mb-8 md:mb-0 md:max-w-lg text-center md:text-left"
            variants={textVariants}
          >
            <motion.h2 
              className="w-full text-2xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Ready to Get Started With The Ai Recruitment Experience
            </motion.h2>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <motion.button 
                className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-full shadow hover:bg-gray-200 transition"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Link to={"/contact"}>Schedule a Demo</Link>
              </motion.button>
              <motion.button 
                className="px-6 py-3 bg-indigo-600 border border-gray-400 font-medium rounded-full shadow hover:bg-indigo-700 transition"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Link to={"/contact"}>Try Our Platform</Link>
              </motion.button>
            </div>
          </motion.div>

          {/* Illustration or Image */}
          <motion.div 
            className="w-full md:w-1/2"
            variants={imageVariants}
            whileHover="hover"
          >
            <motion.img
              src={ContactImg}
              alt="Contact Us Illustration"
              className="w-100 h-60 mx-auto"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Contact;