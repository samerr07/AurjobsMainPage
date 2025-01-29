import React, { useState } from 'react';
import Logo from '../assets/Aurjobs_Logo.jpg';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="w-full flex items-center justify-between px-4 md:px-8 py-4 fixed top-0 bg-white/80 backdrop-blur-md z-50">
        {/* Mobile View: Menu + Logo */}
        <div className="flex items-center space-x-4 md:space-x-0">
          {/* Hamburger Icon */}
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

          {/* Logo - Appears Immediately After Menu in Mobile */}
          <div className="flex items-center">
            <Link to={"/"}><img src={Logo} alt="Aurjobs Logo" className="w-15 h-10 md:w-16 md:h-12 rounded-md" /></Link>
          </div>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-gray-700">
          <li className="hover:text-indigo-600 cursor-pointer transition-colors">Job Portal</li>
          <li className="hover:text-indigo-600 cursor-pointer transition-colors">Hire Page</li>
          <li className="hover:text-indigo-600 cursor-pointer transition-colors">About Page</li>
          <Link to={"/contact"} className="hover:text-indigo-600 cursor-pointer transition-colors">Contact</Link>
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
        } transition-transform duration-300 ease-in-out md:hidden z-40`}
      >
        <div className="flex flex-col p-8 space-y-8">
          <div className="flex justify-between items-center">
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

          <ul className="flex flex-col space-y-6">
            <li className="hover:text-indigo-600 cursor-pointer transition-colors">Job Portal</li>
            <li className="hover:text-indigo-600 cursor-pointer transition-colors">Hire Page</li>
            <li className="hover:text-indigo-600 cursor-pointer transition-colors">About Page</li>
            <Link to={"/contact"} className="hover:text-indigo-600 cursor-pointer transition-colors">Contact</Link>
          </ul>

          <button className="bg-transparent border-2 border-indigo-600 rounded-lg px-6 py-2 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-300">
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
