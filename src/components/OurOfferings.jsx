import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRobot,
  faBriefcase,
  faUsers,
  faBrain,
  faClipboardCheck,
  faChartLine,
  faVideo,
  faGift,
} from "@fortawesome/free-solid-svg-icons";
import agent from "../assets/ai-agent.png";
import subscription from '../assets/Subscription.png';
import analytics from "../assets/analytics.png";
import assessment from "../assets/assessment.png";
import talent from "../assets/talent.png";
import screening from "../assets/screening.png";
import interview from "../assets/interviews.png";
import board from '../assets/job-board.jpg';

const OurOfferings = () => {
  const [selectedOffering, setSelectedOffering] = useState("AI Agent");
  const [isMobile, setIsMobile] = useState(false);
  const [stopCarousel,setStopCarousel]=useState(false);

  const offerings = [
    {
      icon: <FontAwesomeIcon icon={faRobot} className="text-white text-2xl" />,
      label: "AI Agent",
      title: "AI-Powered Virtual Assistant",
      content:
        "Let our advanced AI algorithms find the most relevant candidates, saving you time and effort. Automate your recruitment process with intelligent matching.",
      color: "bg-blue-500",
      textColor: "text-blue-500",
      lightColor: "bg-blue-50",
      hoverColor: "hover:bg-blue-600",
      image: agent,
      tags: ["#aiassistant", "#recruitment"],
      link:"https://sourcing.aurjobs.com/"
    },
    {
      icon: <FontAwesomeIcon icon={faBriefcase} className="text-white text-2xl" />,
      label: "Job Board",
      title: "Smart Job Board",
      content:
        "Post jobs and effortlessly reach top talent. Our intelligent job board automatically matches your postings with the most qualified candidates.",
      color: "bg-indigo-500",
      textColor: "text-indigo-500",
      lightColor: "bg-indigo-50",
      hoverColor: "hover:bg-indigo-600",
      image: board,
      tags: ["#jobs", "#hiring"],
      link:"https://jobs.aurjobs.com/"
    },
    {
      icon: <FontAwesomeIcon icon={faUsers} className="text-white text-2xl" />,
      label: "Talent Pool",
      title: "Global Talent Pool",
      content:
        "Access a vast network of pre-screened candidates. Our AI continuously updates and ranks candidates based on your specific requirements.",
      color: "bg-green-500",
      textColor: "text-green-500",
      lightColor: "bg-green-50",
      hoverColor: "hover:bg-green-600",
      image: talent,
      tags: ["#talent", "#global"],
      link:"https://sourcing.aurjobs.com/"
    },
    {
      icon: <FontAwesomeIcon icon={faBrain} className="text-white text-2xl" />,
      label: "AI Screening",
      title: "AI-Powered Screening",
      content:
        "Leverage advanced AI to screen resumes and evaluate candidates. Reduce bias and find the best matches faster with intelligent screening.",
      color: "bg-purple-500",
      textColor: "text-purple-500",
      lightColor: "bg-purple-50",
      hoverColor: "hover:bg-purple-600",
      image: screening,
      tags: ["#screening", "#bias-free"],
      link:"https://screening.aurjobs.com/"
    },
    {
      icon: <FontAwesomeIcon icon={faClipboardCheck} className="text-white text-2xl" />,
      label: "Assessments",
      title: "Smart Assessments",
      content:
        "Evaluate candidates with AI-powered assessments. Get comprehensive insights into skills, personality, and job fit with custom tests.",
      color: "bg-orange-500",
      textColor: "text-orange-500",
      lightColor: "bg-orange-50",
      hoverColor: "hover:bg-orange-600",
      image: assessment,
      tags: ["#assessment", "#skills"],
      link:"https://test.aurjobs.com/"
    },
    {
      icon: <FontAwesomeIcon icon={faVideo} className="text-white text-2xl" />,
      label: "Interviews",
      title: "AI Interview Assistant",
      content:
        "Streamline your interview process with AI-powered scheduling and analysis. Get intelligent insights and candidate scorecards automatically.",
      color: "bg-pink-500",
      textColor: "text-pink-500",
      lightColor: "bg-pink-50",
      hoverColor: "hover:bg-pink-600",
      image: interview,
      tags: ["#interview", "#automation"],
      link:"https://interview.aurjobs.com/"
    },
    {
      icon: <FontAwesomeIcon icon={faChartLine} className="text-white text-2xl" />,
      label: "Analytics",
      title: "Recruitment Analytics",
      content:
        "Make data-driven decisions with comprehensive recruitment analytics. Track KPIs, identify bottlenecks, and optimize your hiring process.",
      color: "bg-cyan-500",
      textColor: "text-cyan-500",
      lightColor: "bg-cyan-50",
      hoverColor: "hover:bg-cyan-600",
      image: analytics,
      tags: ["#analytics", "#insights"],
      link:"https://interview.aurjobs.com/"
    },
    {
      icon: <FontAwesomeIcon icon={faGift} className="text-white text-2xl" />,
      label: "One Subscription",
      title: "All-In-One Solution",
      content:
        "Get access to all our powerful hiring tools with one simple subscription. Scale your recruitment process efficiently and cost-effectively.",
      color: "bg-teal-500",
      textColor: "text-teal-500",
      lightColor: "bg-teal-50",
      hoverColor: "hover:bg-teal-600",
      image: subscription,
      tags: ["#complete", "#subscription"],
      link:"https://interview.aurjobs.com/"
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Add auto-cycling effect
  useEffect(() => {
    if (!stopCarousel) {
      const interval = setInterval(() => {
        const currentIndex = offerings.findIndex(
          (item) => item.label === selectedOffering
        );
        const nextIndex = (currentIndex + 1) % offerings.length;
        setSelectedOffering(offerings[nextIndex].label);
      }, 2500);

      return () => clearInterval(interval);
    }
  }, [selectedOffering, stopCarousel]);

  const handleSelection = (label) => {
    setSelectedOffering(label);
    setStopCarousel(true);
  };
  const selectedContent = offerings.find((item) => item.label === selectedOffering);

  return (
   <section id="our-offerings" name="our-offerings">
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {isMobile ? (
        // Mobile View
        <div className="space-y-6">
          {offerings.map((item, index) => (
            <div 
              key={index} 
              className={`rounded-xl p-6 ${item.lightColor} transition-all duration-300`}
            >
              <div className="flex items-start space-x-3 mb-4">
                <div 
                  className={`p-5 rounded-lg ${item.color} shadow-lg`}
                >
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h3 className={`text-3xl font-bold ${item.textColor} mb-2`}>
                    {item.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className={`text-md ${item.textColor} font-medium`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {item.content}
              </p>
              <div className="mb-4">
                <img
                  src={item.image}
                  alt={item.label}
                  className="rounded-lg w-100 object-fit h-100"
                />
              </div>
              <a target="_blank" href={item.link}>
              <button 
                className={`${item.textColor} font-medium text-sm hover:opacity-80 transition-opacity duration-200`}
              >
                Learn More
                
              </button>
              </a>
            </div>
          ))}
        </div>
      ) : (
        // Desktop View
        <div className="mx-8">
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {offerings.map((item, index) => (
              <div
                key={index}
                onClick={() => handleSelection(item.label)}
                className={`flex flex-col items-center space-y-2 cursor-pointer group p-4 rounded-xl transition-all duration-300 ${
                  selectedOffering === item.label ? item.lightColor : 'hover:bg-gray-50'
                }`}
              >
                <div
                  className={`flex items-center justify-center w-14 h-14 rounded-lg transition-all duration-200 ${
                    item.color
                  } ${item.hoverColor} ${
                    selectedOffering === item.label 
                      ? "ring-2 ring-offset-2 ring-blue-500 transform scale-110" 
                      : ""
                  } group-hover:scale-105`}
                >
                  {item.icon}
                </div>
                <div
                  className={`text-sm font-medium transition-colors duration-200 ${
                    selectedOffering === item.label ? item.textColor : "text-gray-700"
                  }`}
                >
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {selectedContent && (
            <div className={`flex flex-row items-center rounded-2xl p-12 ${selectedContent.lightColor}`}>
              <div className="w-1/2 pr-12">
                <h2 className={`text-3xl font-bold mb-4 ${selectedContent.textColor}`}>
                  {selectedContent.title}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {selectedContent.content}
                </p>
                <a target="_blank" href={selectedContent.link}>
                <button 
                  className={`mt-6 px-6 py-2 ${selectedContent.color} text-white rounded-lg hover:opacity-90 transition-opacity duration-200`}
                >
                  Learn More
                </button>
                </a>
              </div>
              <div className="w-1/2 flex items-center justify-center">
                <img
                  src={selectedContent.image}
                  alt={selectedContent.label}
                  className="rounded-lg max-w-md w-full object-cover h-64"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
   </section>
  );
};

export default OurOfferings;
