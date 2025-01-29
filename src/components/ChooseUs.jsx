import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ChooseUsImg from "../assets/ChooseUs.png";

const ChooseUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: (
        <svg className="w-16 h-16 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="8" strokeWidth="2" />
          <path d="M12 8v8M8 12h8" strokeWidth="2" />
        </svg>
      ),
      title: "Trusted & Quality Job",
      description: "Quis ipsum suspendisse ultrices gravida. Risus commodo viverra accumsan lacus vel facilisis."
    },
    {
      icon: (
        <svg className="w-16 h-16 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="8" strokeWidth="2" />
          <path d="M12 7l2 5h5l-4 4 2 5-5-3-5 3 2-5-4-4h5z" strokeWidth="2" />
        </svg>
      ),
      title: "Trusted & Popular",
      description: "Quis ipsum suspendisse ultrices gravida. Risus commodo viverra accumsan lacus vel facilisis."
    }
  ];

  const mainVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.8,
        staggerChildren: 0.2 
      } 
    }
  };

  const featureVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.5,
      y: 20
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { 
        duration: 0.5
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { duration: 0.3 } },
    hover: { scale: 1.1, transition: { duration: 0.2 } }
  };

  return (
    <div className="w-full overflow-hidden">
      <motion.div
        ref={ref}
        className="container mx-auto max-w-screen-xl px-4 py-16 font-poppins"
        variants={mainVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div 
          className="text-center mb-16"
          variants={featureVariants}
        >
          <h2 className="text-4xl font-bold mb-2">
            Why Choose <span className="text-indigo-600">Us</span>
          </h2>
          <p className="text-xl text-gray-600">Trusted & Popular Job Portal</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Left Features */}
          <div className="space-y-12">
            {features.map((feature, index) => (
              <motion.div key={index} variants={featureVariants} className="text-center">
                <motion.div 
                  className="flex justify-center mb-4" 
                  variants={iconVariants} 
                  whileHover="hover"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Center Image */}
          <div className="hidden lg:flex justify-center items-center">
            <motion.div 
              className="relative w-3/4 max-w-xs" 
              variants={featureVariants}
            >
              <img src={ChooseUsImg} alt="Job seeker" className="w-full object-contain" />
            </motion.div>
          </div>

          {/* Right Features */}
          <div className="space-y-12">
            {features.map((feature, index) => (
              <motion.div key={`right-${index}`} variants={featureVariants} className="text-center">
                <motion.div 
                  className="flex justify-center mb-4" 
                  variants={iconVariants} 
                  whileHover="hover"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ChooseUs;