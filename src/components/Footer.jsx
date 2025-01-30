import React from 'react'
import Logo from "../assets/Aurjobs_Logo1.png"
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const footerSections = {
    product: {
      title: 'Product',
      links: ['Features', 'Security', 'Enterprise', 'Case Studies', 'Pricing', 'Resources']
    },
    solutions: {
      title: 'Solutions',
      links: ['AI Sourcing', 'Talent Pipeline', 'Analytics', 'Integration', 'API Access']
    },
    support: {
      title: 'Support',
      links: ['Help Center', 'Community', 'Documentation', 'Training', 'Contact Us']
    },
    company: {
      title: 'Company',
      links: ['About', 'Blog', 'Careers', 'Press', 'Partners']
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
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-white transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-6 mb-4 md:mb-0">
            <span>© 2025 Aurjobs.</span>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Privacy</a>
          </div>

          {/* Social Links */}
          <div className="flex space-x-6">
            <a href="https://www.facebook.com/people/AurjobsOfficial/61556103504038/" className="hover:text-white" aria-label="Facebook">
              <FaFacebook className="h-6 w-6" />
            </a>
            <a href="https://www.instagram.com/aurjobsofficial/" className="hover:text-white" aria-label="Instagram">
              <FaInstagram className="h-6 w-6" />
            </a>
            <a href="https://x.com/Aurjobs/" className="hover:text-white" aria-label="Twitter">
              <FaTwitter className="h-6 w-6" />
            </a>
            <a href="https://www.linkedin.com/company/aurjobs/" className="hover:text-white" aria-label="LinkedIn">
              <FaLinkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
