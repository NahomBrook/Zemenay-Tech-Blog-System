// src/app/events/page.tsx
'use client'; // Add this because we'll use useState for filters

import React, { useState } from 'react';
import { Button } from '@/components/ui/button'; // Assuming you have this shadcn/ui component
import EventCard from '@/components/events-ui/event-cards'; // We will define/refine this next
import { cn } from '@/lib/utils'; // Utility for conditional classes

// Updated mock data structure based on Figma
const mockEventsData = [
  {
    id: 1,
    slug: 'mobile-legends-championship',
    title: 'Mobile Legends Championship',
    date: 'March 20, 2024',
    location: 'Addis Ababa',
    imageUrl: '/assets/images/events/mobile_legend_championship.webp',
    prize: '50,000 ETB',
    participants: '32 Teams',
    type: 'tournament',
  },
  {
    id: 2,
    slug: 'cs2-national-finals',
    title: 'CS2 National Finals',
    date: 'March 20, 2024',
    location: 'Addis Ababa',
    imageUrl: '/assets/images/events/cs_championship.webp',
    prize: '75,000 ETB',
    participants: '16 Teams',
    type: 'tournament',
  },
  {
    id: 3,
    slug: 'ethiopian-game-jam-2024',
    title: 'Ethiopian Game Jam 2024',
    date: 'April 1, 2024',
    location: 'Hybrid Event',
    imageUrl: '/placeholder.svg',
    prize: '25,000 ETB',
    participants: '100 Developers',
    type: 'game-jam',
  },
  {
    id: 4,
    slug: 'addis-gaming-festival',
    title: 'Addis Gaming Festival',
    date: 'April 15, 2024',
    location: 'Millennium Hall',
    imageUrl: '/placeholder.svg',
    prize: '30,000 ETB',
    participants: '500 Players',
    type: 'lan-party', // Assuming festival includes LAN elements
  },
  {
    id: 5,
    slug: 'fifa-24-cup',
    title: 'FIFA 24 Cup',
    date: 'April 20, 2024',
    location: 'Addis Ababa',
    imageUrl: '/assets/images/events/EA_Sport_FC_24_championship.webp',
    prize: '40,000 ETB',
    participants: '64 Players',
    type: 'tournament',
  },
  {
    id: 6,
    slug: 'unity-workshop-hackathon',
    title: 'Unity Workshop & Hackathon',
    date: 'May 1, 2024',
    location: 'Online',
    imageUrl: '/placeholder.svg',
    prize: '20,000 ETB', // Example prize
    participants: '50 Teams',
    type: 'game-jam', // Or workshop type if needed
  },
];

// Define type for clearer structure (optional but good practice)
export type EventType = (typeof mockEventsData)[0];

const EventsPage = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filterTypes = [
    { label: 'All Events', value: 'all' },
    { label: 'Tournaments', value: 'tournament' },
    { label: 'Game Jams', value: 'game-jam' },
    { label: 'LAN Parties', value: 'lan-party' },
  ];

  const filteredEvents =
    activeFilter === 'all'
      ? mockEventsData
      : mockEventsData.filter((event) => event.type === activeFilter);

  return (
    <main className="flex-grow text-white"> {/* Assuming dark bg set globally */}
      {/* Title Section */}
      <section className="py-16 md:py-20 lg:py-24 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
            Gaming Events
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto"> {/* Changed to zinc-400 for muted text */}
            Discover and participate in Ethiopia&apos;s biggest gaming events. From
            tournaments to game jams, there&apos;s something for everyone.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="container mx-auto px-4 pb-8 md:pb-12 flex justify-center">
        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
          {filterTypes.map((filter) => (
            <Button
              key={filter.value}
              // Use 'ghost' variant as a base for inactive state to remove default shadcn secondary background/border
              variant={activeFilter === filter.value ? 'default' : 'ghost'}
              onClick={() => setActiveFilter(filter.value)}
              className={cn(
                'rounded-md px-4 py-2 text-sm font-medium transition-colors',
                activeFilter === filter.value
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90' // Active state (Primary Purple) - Assumes this is correct
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 focus-visible:ring-offset-zinc-900' // Inactive state (Dark Grey) - Refined shades
                                                                                                 // Added focus-visible offset color matching card bg
              )}
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </section>

      {/* Events Grid Section */}
      <section className="container mx-auto px-4 pb-16 md:pb-20 lg:pb-24">
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-zinc-500"> {/* Used zinc-500 for slightly dimmer 'not found' text */}
              No events found matching &apos;{activeFilter}&apos; filter.
            </p>
          </div>
        )}
      </section>

      {/* Pagination Placeholder ... */}
    </main>
  );
};

export default EventsPage;