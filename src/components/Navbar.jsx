import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import Logo from '../assets/Aurjobs_Logo.jpg'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileDropdowns, setMobileDropdowns] = useState({});

  const navItems = {
    solutions: {
      name: 'Solutions',
      items: [
        { name: 'AI Hiring Agent', description: 'Automate recruitment with AI' },
        { name: 'Talent Sourcing', description: 'Access a vast network of professionals' },
        { name: 'AI Screening', description: 'Intelligent resume filtering' },
        { name: 'Assessments', description: 'Skill-based candidate evaluation' },
        { name: 'AI Interviews', description: 'Automated interview scheduling & analysis' },
        { name: 'Analytics Dashboard', description: 'Data-driven hiring insights' },
        { name: 'Job Board', description: 'Easy and Advanced Job Posting Portal' },
        { name: 'One Subscription', description: 'All-In-One Subscription' }
      ]
    },
    platforms: {
      name: 'Platforms',
      items: [
        { name: 'Talent Network', description: 'Find top talent from a pre-screened database' },
        { name: 'Screening Hub', description: 'AI-powered resume parsing and ranking' },
        { name: 'Assessment Suite', description: 'Skill tests and behavioral evaluations' },
        { name: 'AI Interviewer', description: 'Automated interview management' },
        { name: 'Job Board', description: 'Post jobs and attract top candidates' }
      ]
    },
    resources: {
      name: 'Resources',
      items: [
        { name: 'News', description: 'Insights on AI hiring and recruitment trends' },
        { name: 'FAQs', description: 'Common questions answered' },
        { name: 'Case Studies', description: 'Success stories of companies using Aurjobs' },
        { name: 'Webinars & Events', description: 'Upcoming hiring-related events' }
      ]
    },
    company: {
      name: 'Company',
      items: [
        { name: 'About Us', description: 'Aurjobs\' mission and story' },
        { name: 'Founder & Leadership', description: 'Meet the team' },
        { name: 'Careers', description: 'Join Aurjobs' },
        { name: 'Contact Us', description: 'Get in touch' }
      ]
    }
  };

  const toggleMobileDropdown = (key) => {
    setMobileDropdowns(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const DropdownMenu = ({ items, isOpen, onClose }) => {
    if (!isOpen) return null;
    
    return (
      <div 
        className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-lg mt-2 py-2 z-50"
        onMouseLeave={onClose}
      >
        {items.map((item, index) => (
          <div key={index} className="px-4 py-2 hover:bg-gray-50">
            <div className="text-sm font-medium text-gray-900">{item.name}</div>
            <div className="text-xs text-gray-500">{item.description}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <nav className="w-full flex items-center justify-between px-4 md:px-8 py-4 fixed top-0 bg-white/80 backdrop-blur-md z-50">
        {/* Mobile Menu Button + Logo */}
        <div className="flex items-center space-x-4 md:space-x-0">
          <div
            className="md:hidden cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-10 h-10 text-gray-800"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </div>

          <Link to="/" className="flex items-center">
            <img src={Logo} alt="Aurjobs Logo" className="w-16 h-12 rounded-md" />
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-8 text-gray-700">
          <li>
            <Link to="/" className="hover:text-indigo-600 transition-colors">
              Home
            </Link>
          </li>
          
          {Object.entries(navItems).map(([key, { name, items }]) => (
            <li key={key} className="relative group">
              <button
                className="flex items-center space-x-1 hover:text-indigo-600 transition-colors"
                onMouseEnter={() => setActiveDropdown(key)}
                onClick={() => setActiveDropdown(activeDropdown === key ? null : key)}
              >
                <span>{name}</span>
                <ChevronDown 
                  className={`w-4 h-4 transform transition-transform duration-200 ${
                    activeDropdown === key ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <DropdownMenu
                items={items}
                isOpen={activeDropdown === key}
                onClose={() => setActiveDropdown(null)}
              />
            </li>
          ))}
          
          <li>
            <Link to="/pricing" className="hover:text-indigo-600 transition-colors">
              Pricing
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-indigo-600 transition-colors">
              Contact
            </Link>
          </li>
        </ul>

        {/* Sign Up Button */}
        <div className="md:flex space-x-4">
          <button className="bg-transparent border-2 border-indigo-600 rounded-lg px-6 py-2 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-300">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Mobile Side Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:hidden z-40 overflow-y-auto`}
      >
        <div className="flex flex-col p-8">
          <div className="flex justify-between items-center mb-8">
            <span className="text-xl font-bold text-gray-800">Menu</span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-600 hover:text-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col space-y-4">
            <Link to="/" className="text-gray-700 hover:text-indigo-600 transition-colors">
              Home
            </Link>
            
            {Object.entries(navItems).map(([key, { name, items }]) => (
              <div key={key} className="space-y-2">
                <button
                  onClick={() => toggleMobileDropdown(key)}
                  className="flex items-center justify-between w-full text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  <span className="font-medium">{name}</span>
                  <ChevronDown 
                    className={`w-4 h-4 transform transition-transform duration-200 ${
                      mobileDropdowns[key] ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div 
                  className={`pl-4 space-y-2 overflow-hidden transition-all duration-200 ${
                    mobileDropdowns[key] ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  {items.map((item, index) => (
                    <div key={index} className="py-2">
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      <div className="text-xs text-gray-500">{item.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            <Link to="/pricing" className="text-gray-700 hover:text-indigo-600 transition-colors">
              Pricing
            </Link>
          </div>

          <button className="mt-8 bg-transparent border-2 border-indigo-600 rounded-lg px-6 py-2 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-300">
            Sign Up
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;