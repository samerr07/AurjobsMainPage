import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, LogOut, User } from 'lucide-react';
import {
  Bot, Users, FileSearch, ClipboardCheck, Calendar,
  BarChart3, FileText, Briefcase, ScrollText, BookOpen,
  Building2, Phone, Globe, MessagesSquare
} from 'lucide-react';
import Logo from '../assets/Aurjobs_Logo.jpg'
import ContactPage from '../page/ContactPage';
import { useDispatch, useSelector } from 'react-redux';

import { getEmployerProfile, setEmployerAuthentication } from '../redux/employerSlice';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileDropdowns, setMobileDropdowns] = useState({});
  const { isAuthenticated: isEmployerAuthenticated, employerProfile } = useSelector((state) => state.employer);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const menuRef = useRef(null);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    
    setIsProfileMenuOpen(false);
    
    dispatch(getEmployerProfile(null));
    dispatch(setEmployerAuthentication(false));
    toast.success("Logout Successfully!" , {
              duration: 4000,
              position: 'top-right',
              
            });
   
    navigate("/");
  };


  const AuthButtons = () => {
    if (!isEmployerAuthenticated) {
      return (
        <div className="md:flex space-x-4 gap-4">

          <Link to={"/company_register"}>
            <button className="bg-transparent border-2 border-indigo-600 rounded-lg px-6 py-2 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-300">
              Sign Up
            </button>
          </Link>
        </div>
      );
    }

    return (
      <div className="relative"
        ref={menuRef}
        onMouseEnter={() => setIsProfileMenuOpen(true)}
      >
        <button
          onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
          className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
        >
          <div className="w-8 h-8  rounded-full flex items-center justify-center">
            {/* <User className="w-5 h-5 text-white" /> */}
            <img src={employerProfile?.company_logo} alt="" />
          </div>
          {/* {
            isEmployerAuthenticated &&
            (<span className="hidden md:inline text-gray-700">{employerProfile?.company_display_name}</span>)

          } */}
        </button>

        {/* Profile Dropdown Menu */}
        {isProfileMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
            onMouseLeave={() => setIsProfileMenuOpen(false)}
          >
            <Link
              to={"/employer_dashboard"}
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        )}
      </div>
    );
  };


  const navItems = {
    solutions: {
      name: 'Solutions',
      items: [
        { name: 'AI Hiring Agent', description: 'Automate recruitment with AI', link: "https://sourcing.aurjobs.com/" },
        { name: 'Talent Sourcing', description: 'Access a vast network of professionals', link: "https://sourcing.aurjobs.com/" },
        { name: 'AI Screening', description: 'Intelligent resume filtering', link: "https://screening.aurjobs.com/" },
        { name: 'Assessments', description: 'Skill-based candidate evaluation', link: "https://test.aurjobs.com/" },
        { name: 'AI Interviews', description: 'Automated interview scheduling & analysis', link: "https://interview.aurjobs.com/" },
        { name: 'Analytics Dashboard', description: 'Data-driven hiring insights', link: "https://sourcing.aurjobs.com/" },
        { name: 'Post Job', description: 'Easy and Advanced Job Posting Portal', link: "https://jobs.aurjobs.com/" },
        { name: 'One Subscription', description: 'All-In-One Subscription', link: "https://sourcing.aurjobs.com/" }
      ]
    },
    platforms: {
      name: 'Platforms',
      items: [
        { name: 'Talent Network', description: 'Find top talent from a pre-screened database', link: "https://sourcing.aurjobs.com/" },
        { name: 'Screening Hub', description: 'AI-powered resume parsing and ranking', link: "https://jobs.aurjobs.com/" },
        { name: 'Assessment Suite', description: 'Skill tests and behavioral evaluations', link: "https://test.aurjobs.com/" },
        { name: 'AI Interviewer', description: 'Automated interview management', link: "https://interview.aurjobs.com/" },
        { name: 'Job Board', description: 'Post jobs and attract top candidates', link: "https://jobs.aurjobs.com/" }
      ]
    },
    resources: {
      name: 'Resources',
      items: [
        { name: 'News', description: 'Insights on AI hiring and recruitment trends', link: "https://sourcing.aurjobs.com/" },
        { name: 'FAQs', description: 'Common questions answered', link: "https://sourcing.aurjobs.com/" },
        { name: 'Case Studies', description: 'Success stories of companies using Aurjobs', link: "https://sourcing.aurjobs.com/" },
        { name: 'Webinars & Events', description: 'Upcoming hiring-related events', link: "https://sourcing.aurjobs.com/" }
      ]
    },
    company: {
      name: 'Company',
      items: [
        { name: 'About Us', description: 'Aurjobs\' mission and story', link: () => "/about_us" },
        { name: 'Founder & Leadership', description: 'Meet the team' },
        { name: 'Careers', description: 'Join Aurjobs' ,link: "https://jobs.aurjobs.com/"},
        { name: 'Contact Us', description: 'Get in touch', link: () => "/contact" },
        { name: 'Blogs', description: 'Read our latest blogs', link: () => "/blogs" }

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
    const navigate = useNavigate();

    if (!isOpen) return null;

    const getIcon = (name) => {
      const iconMap = {
        'AI Hiring Agent': <Bot className="w-6 h-6" />,
        'Talent Sourcing': <Users className="w-6 h-6" />,
        'AI Screening': <FileSearch className="w-6 h-6" />,
        'Assessments': <ClipboardCheck className="w-6 h-6" />,
        'AI Interviews': <Calendar className="w-6 h-6" />,
        'Analytics Dashboard': <BarChart3 className="w-6 h-6" />,
        'Post Job': <FileText className="w-6 h-6" />,
        'One Subscription': <Briefcase className="w-6 h-6" />,
        'Talent Network': <Users className="w-6 h-6" />,
        'Screening Hub': <ScrollText className="w-6 h-6" />,
        'News': <BookOpen className="w-6 h-6" />,
        'About Us': <Building2 className="w-6 h-6" />,
        'Contact Us': <Phone className="w-6 h-6" />,
        'FAQs': <MessagesSquare className="w-6 h-6" />,
        'Case Studies': <Globe className="w-6 h-6" />,
        'Blogs': <BookOpen className="w-6 h-6" />
      };
      return iconMap[name] || <FileText className="w-6 h-6" />;
    };

    const getBgColor = (name) => {
      const colorMap = {
        'AI': 'bg-purple-100 text-purple-600',
        'Talent': 'bg-blue-100 text-blue-600',
        'Analytics': 'bg-green-100 text-green-600',
        'Post': 'bg-orange-100 text-orange-600',
        'News': 'bg-yellow-100 text-yellow-600',
        'About': 'bg-indigo-100 text-indigo-600',
        'Blogs': 'bg-pink-100 text-pink-600'
      };
      const prefix = Object.keys(colorMap).find(key => name.startsWith(key));
      return colorMap[prefix] || 'bg-gray-100 text-gray-600';
    };

    const handleItemClick = (item) => {
      if (!item.link) return;

      if (typeof item.link === "string") {
        // Handle absolute URLs
        if (item.link.startsWith('http://') || item.link.startsWith('https://')) {
          window.open(item.link, "_blank");
        } else {
          // Handle relative URLs
          navigate(item.link);
        }
      } else if (typeof item.link === "function") {
        const destination = item.link();
        navigate(destination);
      }

      onClose(); // Close the dropdown after navigation
    };

    return (
      <div
        className="absolute top-full left-0 w-[680px] bg-white shadow-xl rounded-xl mt-2 p-4 z-50 border border-gray-100"
        onMouseLeave={onClose}
      >
        {items.slice(0, 1).map((item, index) => (
          <div
            key={`featured-${index}`}
            className="mb-4 p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg cursor-pointer hover:bg-gradient-to-br hover:from-indigo-100 hover:to-purple-100"
            onClick={() => handleItemClick(item)}
            role="button"
            tabIndex={0}
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className={`p-2 rounded-lg ${getBgColor(item.name)}`}>
                {getIcon(item.name)}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
          </div>
        ))}

        <div className="grid grid-cols-2 gap-2">
          {items.slice(1).map((item, index) => (
            <div
              key={index}
              className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors duration-150 group"
              onClick={() => handleItemClick(item)}
              role="button"
              tabIndex={0}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${getBgColor(item.name)}`}>
                  {getIcon(item.name)}
                </div>
                <div>
                  <div className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors duration-150">
                    {item.name}
                  </div>
                  <div className="text-sm text-gray-500 mt-0.5 leading-snug">
                    {item.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const handleMobileNavigation = (item) => {
    if (!item.link) return;
    
    if (typeof item.link === "string") {
      // Handle absolute URLs
      if (item.link.startsWith('http://') || item.link.startsWith('https://')) {
        window.open(item.link, "_blank");
      } else {
        // Handle relative URLs
        navigate(item.link);
      }
    } else if (typeof item.link === "function") {
      const destination = item.link();
      navigate(destination);
    }
    
    setIsMenuOpen(false);
  };

  return (

    <>

      <nav className="w-full flex items-center justify-between px-4 md:px-8 py-3 fixed top-0 bg-white/90 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm">
        {/* Mobile Menu + Logo */}
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
        <ul className="hidden md:flex items-center space-x-1">
          <li>
            <Link
              to="/"
              className="px-3 py-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100/80 transition-colors"
            >
              Home
            </Link>
          </li>

          {Object.entries(navItems).map(([key, { name, items }]) => (
            <li key={key} className="relative">
              <button
                className="px-3 py-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100/80 transition-colors flex items-center space-x-1 group"
                onMouseEnter={() => setActiveDropdown(key)}
                // onMouseLeave={() => setActiveDropdown(null)}
                onClick={() => setActiveDropdown(activeDropdown === key ? null : key)}
              >
                <span>{name}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === key ? 'rotate-180' : ''
                  }`} />
              </button>
              <DropdownMenu
                items={items}
                isOpen={activeDropdown === key}
                onClose={() => setActiveDropdown(null)}
              />
            </li>
          ))}

          <li>
            <Link
              to="/pricing"
              className="px-3 py-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100/80 transition-colors"
            >
              Pricing
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="px-3 py-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100/80 transition-colors"
            >
              Contact
            </Link>
          </li>
         
        </ul>

     
        <AuthButtons/>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out md:hidden z-40`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">A</span>
                </div>
                <span className="text-lg font-semibold text-gray-900">Aurjobs</span>
              </Link>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-700"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>

              {/* {Object.entries(navItems).map(([key, { name, items }]) => (
                <div key={key}>
                  <button
                    onClick={() => toggleMobileDropdown(key)}
                    className="w-full px-3 py-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors flex items-center justify-between"
                  >
                    <span>{name}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileDropdowns[key] ? 'rotate-180' : ''
                      }`} />
                  </button>

                  <div className={`pl-4 space-y-1 overflow-hidden transition-all duration-200 ${mobileDropdowns[key] ? 'max-h-96 py-1' : 'max-h-0'
                    }`}>
                    {items.map((item, index) => (
                      <Link
                        key={index}
                        to={item.link}
                        className="block px-3 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))} */}
              {Object.entries(navItems).map(([key, { name, items }]) => (
                <div key={key}>
                  <button
                    onClick={() => toggleMobileDropdown(key)}
                    className="w-full px-3 py-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors flex items-center justify-between"
                  >
                    <span>{name}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileDropdowns[key] ? 'rotate-180' : ''
                      }`} />
                  </button>

                  <div className={`pl-4 space-y-1 overflow-hidden transition-all duration-200 ${mobileDropdowns[key] ? 'max-h-96 py-1' : 'max-h-0'
                    }`}>
                    {items.map((item, index) => (
                      <div
                        key={index}
                        className="block px-3 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
                        onClick={() => handleMobileNavigation(item)}
                      >
                        {item.name}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <Link
                to="/pricing"
                className="block px-3 py-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="p-4 border-t border-gray-100">
            <div className="space-y-3">
              {/* <Link
              to="/login"
              className="block w-full px-3 py-2 text-center rounded-lg border border-gray-200 text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Log in
            </Link> */}
              <Link
                to="/signup"
                className="block w-full px-3 py-2 text-center rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden z-30"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>

  );
};

export default Navbar;