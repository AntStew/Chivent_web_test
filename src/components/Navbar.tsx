'use client';

import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'events', 'cart', 'about'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          const sectionBottom = offsetTop + offsetHeight;
          const sectionTop = offsetTop;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    const updateCartCount = () => {
      const savedEvents = JSON.parse(localStorage.getItem('savedEvents') || '[]');
      setCartCount(savedEvents.length);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('storage', updateCartCount);
    handleScroll();
    updateCartCount();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      if (sectionId === 'cart') {
        const offset = 120;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } else {
        const offset = sectionId === 'events' ? 850 : 0;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset + offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  const scrollToTop = () => {
    setIsTransitioning(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  const isActive = (section: string) => activeSection === section;

  return (
    <nav className="fixed w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white hover:text-purple-300 transition-all duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="bg-black/40 backdrop-blur-md rounded-full px-6 py-2 flex space-x-8">
              <button
                onClick={scrollToTop}
                className={`flex items-center space-x-2 text-white transition-all duration-500 group ${
                  isActive('home') ? 'text-purple-300' : 'hover:text-purple-300'
                }`}
              >
                <svg
                  className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span className="transition-transform duration-300 group-hover:scale-105">Home</span>
              </button>
              <button
                onClick={() => scrollToSection('events')}
                className={`flex items-center space-x-2 text-white transition-all duration-500 group ${
                  isActive('events') ? 'text-purple-300' : 'hover:text-purple-300'
                }`}
              >
                <svg
                  className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="transition-transform duration-300 group-hover:scale-105">Events</span>
              </button>
              <button
                onClick={() => scrollToSection('cart')}
                className={`flex items-center space-x-2 text-white transition-all duration-500 group ${
                  isActive('cart') ? 'text-purple-300' : 'hover:text-purple-300'
                }`}
              >
                <div className="relative">
                  <svg
                    className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center transform transition-all duration-300 group-hover:scale-110">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="transition-transform duration-300 group-hover:scale-105">Cart</span>
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className={`flex items-center space-x-2 text-white transition-all duration-500 group ${
                  isActive('about') ? 'text-purple-300' : 'hover:text-purple-300'
                }`}
              >
                <svg
                  className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="transition-transform duration-300 group-hover:scale-105">About</span>
              </button>
            </div>
          </div>

          {/* Placeholder for mobile menu button alignment */}
          <div className="md:hidden w-6"></div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/50 backdrop-blur-md rounded-lg transition-all duration-300">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={scrollToTop}
                className={`flex items-center space-x-2 w-full px-3 py-2 text-white transition-all duration-500 ${
                  isActive('home') ? 'text-purple-300' : 'hover:text-purple-300'
                }`}
              >
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span className="transition-transform duration-300 group-hover:scale-105">Home</span>
              </button>
              <button
                onClick={() => scrollToSection('events')}
                className={`flex items-center space-x-2 w-full px-3 py-2 text-white transition-all duration-500 ${
                  isActive('events') ? 'text-purple-300' : 'hover:text-purple-300'
                }`}
              >
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="transition-transform duration-300 group-hover:scale-105">Events</span>
              </button>
              <button
                onClick={() => scrollToSection('cart')}
                className={`flex items-center space-x-2 w-full px-3 py-2 text-white transition-all duration-500 ${
                  isActive('cart') ? 'text-purple-300' : 'hover:text-purple-300'
                }`}
              >
                <div className="relative">
                  <svg
                    className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center transform transition-all duration-300 group-hover:scale-110">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="transition-transform duration-300 group-hover:scale-105">Cart</span>
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className={`flex items-center space-x-2 w-full px-3 py-2 text-white transition-all duration-500 ${
                  isActive('about') ? 'text-purple-300' : 'hover:text-purple-300'
                }`}
              >
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="transition-transform duration-300 group-hover:scale-105">About</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 