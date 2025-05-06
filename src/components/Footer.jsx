import React from 'react'
import Logo from "../assets/Aurjobs_Logo1.png"
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = () => {


  const footerSections = {
    product: {
      title: 'Product',
      routes: [
        // { name: 'Features', path: '/#' },
        // { name: 'Security', path: '/#' },
        // { name: 'Enterprise', path: '/#' },
        // { name: 'Case Studies', path: '/#' },
        { name: 'Pricing', path: '/pricing' },
        // { name: 'Resources', path: '/#' },
      ]
    },
    solutions: {
      title: 'Solutions',
      routes: [
        { name: 'AI Sourcing', path: 'https://sourcing.aurjobs.com/', isExternal: true },
        // { name: 'Talent Pipeline', path: 'https://sourcing.aurjobs.com/', isExternal: true },
        { name: 'AI Screening',  path: "https://screening.aurjobs.com/" ,isExternal: true},
        { name: 'Assessments',  path: "https://test.aurjobs.com/" ,isExternal: true},
        { name: 'AI Interviews',  path: "https://interview.aurjobs.com/" ,isExternal: true},
        // { name: 'Post Job', path: "https://jobs.aurjobs.com/" ,isExternal: true},
        // { name: 'One Subscription', link: "https://sourcing.aurjobs.com/" }
        // { name: 'Analytics', path: '/#' },
        // { name: 'Integration', path: '/#' },
        // { name: 'API Access', path: '/#' },
      ]
    },
    support: {
      title: 'Support',
      routes: [
        // { name: 'Help Center', path: '/#' },
        { name: 'Privacy Policy', path: '/privacy_policy' },
        { name: 'Terms and Conditions', path: '/terms_and_conditions' },
        // { name: 'Community', path: '/#' },
        // { name: 'Documentation', path: '/#' },
        // { name: 'Training', path: '/#' },
        { name: 'Contact Us', path: '/contact' },
      ]
    },
    company: {
      title: 'Company',
      routes: [
        { name: 'About', path: '/about_us' },
        { name: 'Blog', path: '/blogs' },
        { name: 'Careers', path: 'https://jobs.aurjobs.com/', isExternal: true },
        // { name: 'Press', path: '/#' },
        // { name: 'Partners', path: '/#' },
      ]
    }
  };


  return (
    <footer className="bg-gray-900 relative text-gray-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Logo Section */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2">
              <img src={Logo} alt="Aurjobs" className="w-24 h-16" />
              {/* <div className="text-white text-xl font-bold">Aurjobs</div> */}
            </div>

            <p className="mt-2 text-sm">Transforming recruitment with AI-powered sourcing solutions</p>
          </div>

          {/* Navigation Sections */}
          {Object.values(footerSections).map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
              {section.routes.map((link) => (
                  <li key={link.name}>
                    {link.isExternal ? (
                      <a 
                        href={link.path}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors duration-200"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link 
                        to={link.path}  
                        className="hover:text-white transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col-reverse md:flex-row justify-between items-center">
          <div className="flex items-center space-x-6 md:mb-0">
            <span>© 2025 Aurjobs.</span>
            <Link to={"/terms_and_conditions"} className="hover:text-white">Terms</Link>
           
            <Link to={"/privacy_policy"} className="hover:text-white">Privacy</Link>
          </div>

          {/* Social Links */}
          <div className="flex mb-4 md:mb-0 md:pr-[10%] space-x-6">
            <a target='_blank' href="https://www.facebook.com/people/AurjobsOfficial/61556103504038/" className="hover:text-white" aria-label="Facebook">
              <FaFacebook className="h-6 w-6" />
            </a>
            <a target='_blank' href="https://www.instagram.com/aurjobsofficial/" className="hover:text-white" aria-label="Instagram">
              <FaInstagram className="h-6 w-6" />
            </a>
            <a target='_blank' href="https://x.com/Aurjobs/" className="hover:text-white" aria-label="Twitter">
              <FaTwitter className="h-6 w-6" />
            </a>
            <a target='_blank' href="https://www.linkedin.com/company/aurjobs/" className="hover:text-white" aria-label="LinkedIn">
              <FaLinkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
