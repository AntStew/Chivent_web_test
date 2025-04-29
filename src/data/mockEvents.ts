export interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  location: string;
  time: string;
}

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Chicago Jazz Festival',
    description: 'Experience the soul of Chicago with world-class jazz performances across multiple stages. From traditional to contemporary jazz, this festival showcases the best local and international talent.',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3e27e4d6?q=80&w=1000',
    location: 'Millennium Park',
    time: 'August 30 - September 2, 2024'
  },
  {
    id: '2',
    title: 'Chicago Architecture Biennial',
    description: 'Explore groundbreaking architectural designs and installations from around the world. This exhibition transforms the city into a living museum of contemporary architecture.',
    image: 'https://images.unsplash.com/photo-1513647729116-1a5f0a4a0e4a?q=80&w=1000',
    location: 'Chicago Cultural Center',
    time: 'September 15 - December 15, 2024'
  },
  {
    id: '3',
    title: 'Chicago International Film Festival',
    description: 'Celebrate the art of cinema with screenings of international films, premieres, and special events. Meet filmmakers and experience the magic of storytelling on the big screen.',
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1000',
    location: 'AMC River East 21',
    time: 'October 12 - 23, 2024'
  },
  {
    id: '4',
    title: 'Chicago Food Truck Festival',
    description: 'Taste your way through Chicago\'s vibrant food truck scene. From gourmet burgers to international cuisine, this festival brings together the city\'s best mobile eateries in one delicious location.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000',
    location: 'Grant Park',
    time: 'July 15-17, 2024'
  },
  {
    id: '5',
    title: 'Chicago Blues Festival',
    description: 'Immerse yourself in the rich history of Chicago blues. This legendary festival features performances by both established artists and rising stars, celebrating the city\'s deep musical heritage.',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3e27e4d6?q=80&w=1000',
    location: 'Millennium Park',
    time: 'June 7-9, 2024'
  },
  {
    id: '6',
    title: 'Chicago Art Week',
    description: 'Discover the city\'s thriving art scene with gallery openings, studio tours, and special exhibitions. This week-long celebration showcases both established and emerging Chicago artists.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000',
    location: 'Various Locations',
    time: 'September 20-27, 2024'
  }
]; 