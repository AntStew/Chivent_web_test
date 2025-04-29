'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import type { Event } from '@/data/mockEvents';
import { mockEvents } from '@/data/mockEvents';

export default function HomePage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [savedEvents, setSavedEvents] = useState<Event[]>([]);
  const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set());
  const [titleTyped, setTitleTyped] = useState(false);
  const [visibleEvents, setVisibleEvents] = useState<Event[]>([]);
  const [hasMoreEvents, setHasMoreEvents] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const scrollTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Use mock data from the imported file
    setEvents(mockEvents);
    setVisibleEvents(mockEvents.slice(0, 9));
    setHasMoreEvents(mockEvents.length > 9);

    // Load saved events from localStorage
    const saved = JSON.parse(localStorage.getItem('savedEvents') || '[]');
    setSavedEvents(saved);

    // Set titleTyped to true after animation completes
    const timer = setTimeout(() => {
      setTitleTyped(true);
    }, 1000);

    // Listen for storage changes to update the cart
    const handleStorageChange = () => {
      const updatedSaved = JSON.parse(localStorage.getItem('savedEvents') || '[]');
      setSavedEvents(updatedSaved);
    };

    // Handle scroll-based transitions
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const progress = Math.min(Math.max(scrollY / windowHeight, 0), 1);
      setScrollProgress(progress);

      if (videoRef.current) {
        const video = videoRef.current;
        
        // Clear any existing timer
        if (scrollTimerRef.current) {
          clearTimeout(scrollTimerRef.current);
        }

        // Play video when scrolling
        video.play().catch(() => {
          video.muted = true;
          video.play();
        });

        // Set a timer to pause the video when scrolling stops
        scrollTimerRef.current = setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.pause();
          }
        }, 100); // Adjust this value to change how quickly the video pauses after scrolling stops
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('storage', handleStorageChange);
    
    // Initial check
    handleScroll();

    return () => {
      clearTimeout(timer);
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const loadMoreEvents = () => {
    const currentLength = visibleEvents.length;
    const nextEvents = events.slice(currentLength, currentLength + 3);
    setVisibleEvents(prev => [...prev, ...nextEvents]);
    setHasMoreEvents(currentLength + 3 < events.length);
  };

  const handleSaveEvent = (eventId: string) => {
    setSavedEvents(prev => {
      const newSavedEvents = prev.filter(event => event.id !== eventId);
      
      localStorage.setItem('savedEvents', JSON.stringify(newSavedEvents));
      return newSavedEvents;
    });
    // Dispatch storage event to update cart count in Navbar
    window.dispatchEvent(new Event('storage'));
  };

  const scrollToCart = () => {
    const cartElement = document.getElementById('cart');
    if (cartElement) {
      const offset = 50;
      const elementPosition = cartElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset + offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const toggleEventExpansion = (eventId: string) => {
    setExpandedEvents(prev => {
      const newSet = new Set(prev);
      if (newSet.has(eventId)) {
        newSet.delete(eventId);
      } else {
        newSet.add(eventId);
      }
      return newSet;
    });
  };

  const saveEvent = (event: Event) => {
    const updatedSavedEvents = [...savedEvents, event];
    setSavedEvents(updatedSavedEvents);
    localStorage.setItem('savedEvents', JSON.stringify(updatedSavedEvents));
    // Dispatch storage event to update cart count in Navbar
    window.dispatchEvent(new Event('storage'));
  };

  const removeEvent = (eventId: string) => {
    const updatedSavedEvents = savedEvents.filter(event => event.id !== eventId);
    setSavedEvents(updatedSavedEvents);
    localStorage.setItem('savedEvents', JSON.stringify(updatedSavedEvents));
    // Dispatch storage event to update cart count in Navbar
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      
      {/* Hero Section */}
      <section 
        id="home" 
        className="fixed inset-0 flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            loop
            className="w-full h-full object-cover fixed"
            style={{
              opacity: 1,
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: -1
            }}
          >
            <source src="/videos/chitown_timelapse.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div 
            className="absolute inset-0 bg-black/50 fixed"
            style={{
              opacity: 0.5
            }}
          ></div>
        </div>
        
        {/* Centered Header */}
        <div 
          className="relative z-10 text-center px-4 transition-all duration-1000"
          style={{
            opacity: 1 - (scrollProgress * 3),
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, calc(-50% - ${scrollProgress * 50}px))`,
            display: scrollProgress > 2 ? 'none' : 'block'
          }}
        >
          <div className="relative">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/40 to-transparent" style={{ filter: 'blur(8px)' }}></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/30 to-transparent" style={{ filter: 'blur(6px)' }}></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-transparent" style={{ filter: 'blur(4px)' }}></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent" style={{ filter: 'blur(2px)' }}></div>
            </div>
            <div className="relative p-8">
              <h1 className={`text-6xl font-bold text-white mb-6 typing-animation ${titleTyped ? 'completed' : ''}`}>
                Chivent
              </h1>
              <p className={`text-xl text-white mb-8 max-w-2xl mx-auto transition-opacity duration-2000 ${titleTyped ? 'opacity-100' : 'opacity-0'}`}>
                Explore the vibrant cultural scene of Chicago. From music festivals to art exhibitions, find your next adventure in the Windy City.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Button and Arrow */}
        <div 
          className="relative z-10 text-center px-4 transition-all duration-1000"
          style={{
            opacity: 1 - (scrollProgress * 10),
            position: 'fixed',
            bottom: '0%',
            left: '50%',
            transform: `translateX(-50%) translateY(${scrollProgress * 50}px)`,
            display: scrollProgress > 2 ? 'none' : 'block'
          }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/40 to-transparent backdrop-blur-lg rounded-lg" style={{ filter: 'blur(8px)' }}></div>
            <div className="relative p-6">
              <div className={`flex flex-col items-center gap-4 transition-opacity duration-2000 ${titleTyped ? 'opacity-100' : 'opacity-0'}`}>
                <button
                  onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
                  className="relative bg-white/10 backdrop-blur-lg text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.24)] border border-white/20"
                >
                  Browse Events
                </button>
                <button
                  onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-white hover:text-purple-200 transition-colors animate-bounce"
                >
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Container */}
      <div className="relative z-10">
        {/* Events Section */}
        <section 
          id="events" 
          className="relative min-h-[300vh] transition-transform duration-1000"
          style={{
            transform: `translateY(${(1 - Math.max(0, scrollProgress - 0.5)) * 100}vh)`,
            backgroundColor: 'transparent',
            paddingTop: '100vh'
          }}
        >
          <div className="container mx-auto px-4">
            {/* Events Header */}
            <div className="pt-120 pb-12 text-center">
              <h2 className="text-5xl font-bold text-white mb-4">
                Chicago Events
              </h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Discover the vibrant cultural scene of Chicago. From music festivals to art exhibitions, find your next adventure in the Windy City.
              </p>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {visibleEvents.map(event => (
                <div
                  key={event.id}
                  className="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
                >
                  <div className="relative h-80">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="p-6 bg-black/40 backdrop-blur-sm">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {event.title}
                    </h3>
                    <p className="text-white/80 mb-2">{event.location}</p>
                    <p className="text-white/60 text-sm mb-4">{event.time}</p>
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => toggleEventExpansion(event.id)}
                        className="text-white/80 hover:text-white transition-colors"
                      >
                        {expandedEvents.has(event.id) ? 'Show Less' : 'Show More'}
                      </button>
                      <button
                        onClick={() => saveEvent(event)}
                        className={`px-4 py-2 rounded-full ${
                          savedEvents.some(e => e.id === event.id)
                            ? 'bg-purple-600 text-white'
                            : 'bg-white/10 text-white hover:bg-purple-600 hover:text-white'
                        } transition-colors`}
                      >
                        {savedEvents.some(e => e.id === event.id) ? 'Saved' : 'Save'}
                      </button>
                    </div>
                    {expandedEvents.has(event.id) && (
                      <div className="mt-4 pt-4 border-t border-white/20">
                        <p className="text-white/80">{event.description}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {hasMoreEvents && (
              <div className="text-center mt-48">
                <button
                  onClick={loadMoreEvents}
                  className="bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  Load More Events
                </button>
              </div>
            )}

            {/* Cart Section */}
            <div id="cart" className="mt-[80vh]">
              <h2 className="text-4xl font-bold text-white mb-8 text-center [text-shadow:_0_0_10px_rgba(255,255,255,0.5)]">Your Cart</h2>
              {savedEvents.length === 0 ? (
                <div className="text-center text-white/60">
                  <p className="text-xl">Your cart is empty</p>
                  <p className="mt-2">Add some events to your cart to see them here</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                  {savedEvents.map((event) => (
                    <div 
                      key={event.id} 
                      className="bg-white/5 backdrop-blur-xl rounded-lg overflow-hidden shadow-lg"
                    >
                      <div className="relative h-80">
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-10">
                        <h3 className="text-xl font-bold text-white mb-2 [text-shadow:_0_0_10px_rgba(255,255,255,0.5)]">
                          {event.title}
                        </h3>
                        <p className="text-white/80 mb-2">{event.location}</p>
                        <p className="text-white/60 text-sm mb-4">{event.time}</p>
                        <button
                          onClick={() => removeEvent(event.id)}
                          className="w-full py-2 bg-red-600/80 hover:bg-red-600 text-white transition-colors"
                        >
                          Remove from Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* About Section */}
            <div id="about" className="mt-[80vh]">
              <h2 className="text-4xl font-bold text-white mb-8 text-center [text-shadow:_0_0_10px_rgba(255,255,255,0.5)]">
                About Chicago Events
              </h2>
              
              <div className="bg-white/5 backdrop-blur-xl rounded-lg shadow-lg p-10 mb-24">
                <h3 className="text-2xl font-semibold text-white mb-4 [text-shadow:_0_0_10px_rgba(255,255,255,0.5)]">
                  Our Mission
                </h3>
                <p className="text-white/80">
                  Chicago Events is dedicated to connecting people with the vibrant cultural scene of Chicago. 
                  We believe that everyone should have easy access to discover and participate in the amazing 
                  events that make Chicago one of the most exciting cities in the world.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 mb-24">
                <div className="bg-white/5 backdrop-blur-xl rounded-lg shadow-lg p-8">
                  <h3 className="text-xl font-semibold text-white mb-4 [text-shadow:_0_0_10px_rgba(255,255,255,0.5)]">
                    What We Do
                  </h3>
                  <ul className="space-y-4 text-white/80">
                    <li className="flex items-start">
                      <span className="text-purple-400 mr-2">•</span>
                      Curate the best events across Chicago
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-400 mr-2">•</span>
                      Provide detailed event information
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-400 mr-2">•</span>
                      Help you save and track events
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-400 mr-2">•</span>
                      Keep you updated on new events
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 backdrop-blur-xl rounded-lg shadow-lg p-8">
                  <h3 className="text-xl font-semibold text-white mb-4 [text-shadow:_0_0_10px_rgba(255,255,255,0.5)]">
                    Why Chicago?
                  </h3>
                  <p className="text-white/80">
                    Chicago is a city of endless possibilities, with a rich cultural heritage and 
                    a thriving arts scene. From world-class museums to underground music venues, 
                    there's always something exciting happening in the Windy City.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl rounded-lg shadow-lg p-10">
                <h3 className="text-2xl font-semibold text-white mb-4 [text-shadow:_0_0_10px_rgba(255,255,255,0.5)]">
                  Get in Touch
                </h3>
                <p className="text-white/80 mb-4">
                  Have questions or suggestions? We'd love to hear from you!
                </p>
                <div className="flex space-x-4">
                  <a
                    href="mailto:contact@chicagoevents.com"
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Email Us
                  </a>
                  <a
                    href="https://twitter.com/chicagoevents"
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Follow on Twitter
                  </a>
                  <a
                    href="https://instagram.com/chicagoevents"
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Follow on Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
