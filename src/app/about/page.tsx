'use client';

import Navbar from '@/components/Navbar';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
            About Chicago Events
          </h1>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 mb-6">
              Chicago Events is dedicated to connecting people with the vibrant cultural scene of Chicago. 
              We believe that everyone should have easy access to discover and participate in the amazing 
              events that make Chicago one of the most exciting cities in the world.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                What We Do
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  Curate the best events across Chicago
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  Provide detailed event information
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  Help you save and track events
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  Keep you updated on new events
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Why Chicago?
              </h3>
              <p className="text-gray-600">
                Chicago is a city of endless possibilities, with a rich cultural heritage and 
                a thriving arts scene. From world-class museums to underground music venues, 
                there's always something exciting happening in the Windy City.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Get in Touch
            </h2>
            <p className="text-gray-600 mb-4">
              Have questions or suggestions? We'd love to hear from you!
            </p>
            <div className="flex space-x-4">
              <a
                href="mailto:contact@chicagoevents.com"
                className="text-purple-600 hover:text-purple-800 transition-colors"
              >
                Email Us
              </a>
              <a
                href="https://twitter.com/chicagoevents"
                className="text-purple-600 hover:text-purple-800 transition-colors"
              >
                Follow on Twitter
              </a>
              <a
                href="https://instagram.com/chicagoevents"
                className="text-purple-600 hover:text-purple-800 transition-colors"
              >
                Follow on Instagram
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 