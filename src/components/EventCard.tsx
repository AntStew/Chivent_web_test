import { useState } from 'react';
import Image from 'next/image';

interface EventCardProps {
  event: {
    id: string;
    title: string;
    description: string;
    image: string;
    location: string;
    time: string;
  };
  onSave: (eventId: string) => void;
  isSaved: boolean;
}

const EventCard = ({ event, onSave, isSaved }: EventCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <div className="relative h-48">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
        <p className="text-gray-600 mb-2">{event.location}</p>
        <p className="text-gray-500 text-sm mb-4">{event.time}</p>
        
        <div className="flex justify-between items-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            {isExpanded ? 'Show Less' : 'Show More'}
          </button>
          <button
            onClick={() => onSave(event.id)}
            className={`px-4 py-2 rounded-full ${
              isSaved
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-purple-600 hover:text-white'
            } transition-colors`}
          >
            {isSaved ? 'Saved' : 'Save'}
          </button>
        </div>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-gray-700">{event.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard; 