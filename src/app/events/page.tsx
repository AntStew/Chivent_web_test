'use client';

import { useState, useEffect } from 'react';
import EventCard from '@/components/EventCard';
import Navbar from '@/components/Navbar';
import { mockEvents } from '@/data/mockEvents';

interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  location: string;
  time: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [savedEvents, setSavedEvents] = useState<string[]>([]);

  useEffect(() => {
    // Use mock data instead of API call
    setEvents(mockEvents);

    // Load saved events from localStorage
    const saved = localStorage.getItem('savedEvents');
    if (saved) {
      setSavedEvents(JSON.parse(saved));
    }
  }, []);

  const handleSaveEvent = (eventId: string) => {
    setSavedEvents(prev => {
      const newSavedEvents = prev.includes(eventId)
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId];
      
      localStorage.setItem('savedEvents', JSON.stringify(newSavedEvents));
      return newSavedEvents;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8 pt-24">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Chicago Events
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <EventCard
              key={event.id}
              event={event}
              onSave={handleSaveEvent}
              isSaved={savedEvents.includes(event.id)}
            />
          ))}
        </div>
      </main>
    </div>
  );
} 