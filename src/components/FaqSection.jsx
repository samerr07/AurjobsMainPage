import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FaqSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px", once: true }); // Added once: true
  const [activeIndex, setActiveIndex] = React.useState(null);

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

  const headerVariants = {
    hidden: {
      opacity: 0,
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const faqItemVariants = {
    hidden: {
      opacity: 0,
      x: -30
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const faqs = [
    {
      question: "What is Aurjobs, and how does it work?",
      answer: "Aurjobs is a fully integrated, AI-driven recruitment platform designed to automate every stage of the hiring process. From sourcing talent to screening resumes, conducting interviews, and assessing skills, our AI agents streamline the recruitment journey to save time and improve efficiency."
    },
    {
      question: "How does Aurjobs' AI Agent automate the hiring process?",
      answer: "Aurjobs' AI Agent automates the entire recruitment process. You simply provide a job description (JD) or prompt, and the AI handles sourcing, screening, assessments, and interviews. Everything is managed through a centralized dashboard, giving you real-time updates and insights for smarter hiring decisions."
    },
    {
      question: "What is the Talent Network, and how does it work?",
      answer: "The Talent Network is a vast database of millions of pre-screened professionals. It allows you to search and connect with top candidates based on skills, experience, and location, ensuring you always find the best-fit talent for your needs."
    },
    {
      question: "What is the AI Resume Screener, and how does it help?",
      answer: "The AI Resume Screener uses advanced algorithms to parse resumes, rank candidates based on job requirements, and automatically shortlist the most qualified individuals. This eliminates manual effort and ensures unbiased, accurate selection."
    },
    {
      question: "Can Aurjobs help me reduce hiring biases?",
      answer: "Yes! Aurjobs' AI evaluates candidates purely on objective criteria like qualifications, experience, and skills, ensuring a fair, unbiased hiring process. This promotes diversity and inclusivity across all stages of recruitment."
    },
    {
      question: "How does the platform handle assessments?",
      answer: "Aurjobs offers AI-powered, customizable skill assessments designed to evaluate technical, analytical, and behavioral abilities. These tests provide instant results and detailed insights, helping you identify candidates with the right skills and potential."
    },
    {
      question: "What does the AI Interviewer do?",
      answer: "The AI Interviewer automates scheduling, conducting, and analyzing interviews. It evaluates candidates on soft skills and performance metrics, saving time and delivering consistent, data-backed results."
    },
    {
      question: "What is included in the Analytics Dashboard?",
      answer: "The Analytics Dashboard provides detailed insights into your recruitment metrics, including candidate performance, time-to-hire, sourcing efficiency, and more. It helps you track progress and make informed hiring decisions."
    }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div ref={ref} className="bg-gray-50">
      <motion.div 
        className="container mx-auto px-4 py-16"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div 
          className="text-center mb-16"
          variants={headerVariants}
        >
          <h2 className="text-4xl font-bold mb-2">
            Frequently Asked <span className="text-blue-600">Questions</span>
          </h2>
          <p className="text-xl text-gray-600">Find answers to common questions about our services</p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={faqItemVariants}
                className="border-b last:border-b-0"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <div
                    style={{
                      transform: `rotate(${activeIndex === index ? 180 : 0}deg)`,
                      transition: 'transform 0.3s ease'
                    }}
                  >
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  </div>
                </button>
                
                <div
                  style={{
                    height: activeIndex === index ? 'auto' : 0,
                    opacity: activeIndex === index ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'all 0.3s ease-out'
                  }}
                >
                  <div className="p-6 pt-0 text-gray-600">
                    {faq.answer}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default FaqSection;