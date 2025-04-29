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

export default function YourEventsPage() {
  const [savedEvents, setSavedEvents] = useState<Event[]>([]);
  const [savedEventIds, setSavedEventIds] = useState<string[]>([]);

  useEffect(() => {
    // Load saved event IDs from localStorage
    const saved = localStorage.getItem('savedEvents');
    if (saved) {
      const savedIds = JSON.parse(saved);
      setSavedEventIds(savedIds);

      // Use mock data instead of API call
      const savedEventsData = mockEvents.filter(event => 
        savedIds.includes(event.id)
      );
      setSavedEvents(savedEventsData);
    }
  }, []);

  const handleSaveEvent = (eventId: string) => {
    setSavedEventIds(prev => {
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
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Your Saved Events
        </h1>
        {savedEvents.length === 0 ? (
          <div className="text-center text-gray-600">
            <p className="text-xl">You haven't saved any events yet.</p>
            <p className="mt-2">Browse events and save the ones you're interested in!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedEvents.map(event => (
              <EventCard
                key={event.id}
                event={event}
                onSave={handleSaveEvent}
                isSaved={savedEventIds.includes(event.id)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
} 