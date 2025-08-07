// src/app/games/page.tsx
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import GameCard from '@/components/games-ui/game-cards'; // We will create this next
import { cn } from '@/lib/utils';
import Link from 'next/link'; // For the CTA button link

const mockGamesData = [
    {
      id: 1,
      slug: 'run-senzero',
      title: 'Run Senzero',
      developer: 'BinaryAbyssinia',
      rating: 4.1, // Rating from Play Store (approx)
      downloads: '1K+', // Downloads from Play Store (approx)
      description: 'Help Senzero navigate obstacles in this 3D runner game and have a blast!',
      imageUrl: '/assets/images/games/run-senzero.webp', // CREATE THIS IMAGE
      genre: 'action', // Or 'casual'
    },
    {
      id: 2,
      slug: 'ethio-logo-quiz',
      title: 'Ethio Logo Quiz : Amharic Game',
      developer: 'BinaryAbyssinia',
      rating: 4.0, // Rating from Play Store (approx)
      downloads: '10K+', // Downloads from Play Store (approx)
      description: 'Calling all Ethiopians who love logo trivia guessing games - this one is for you! Ethio Logo Quiz Game: Guess Ethiopian and Others Famous Brand Quiz Game is here to test your knowledge. Can you guess the names of hundreds of popular logos from Ethiopia and around the globe? With the largest collection of logos from Ethiopia, this game is sure to keep you entertained for hours!'
,
      imageUrl: '/assets/images/games/ethio-logo-quiz.webp', // CREATE THIS IMAGE
      genre: 'puzzle', // Or 'trivia'
    },
    {
      id: 3,
      slug: 'geez-plus-arithmetic',
      title: 'Geez+ Arithmetic Game',
      developer: 'BinaryAbyssinia',
      rating: 4.6, // Rating from Play Store (approx)
      downloads: '10K+', // Downloads from Play Store (approx)
      description: "Ethiopian Ge'ez Numbers Mobile Puzzle Game To Train Your Brain and Learn Ge'ez Numbers while having fun. Play now this merge the Ge'ez Numbers to beat your best score or others in the online leaderboard.",
      imageUrl: '/assets/images/games/geez-plus.webp', // CREATE THIS IMAGE
      genre: 'educational', // Or 'puzzle'
    },
    {
      id: 4,
      slug: 'amharic-jumbled-words',
      title: 'Amharic Jumbled Words',
      developer: 'BinaryAbyssinia',
      rating: 4.4, // Rating from Play Store (approx)
      downloads: '10K+', // Downloads from Play Store (approx)
      description: 'Discover the Ultimate Amharic Word Puzzle Adventure!<br><br>Dive into &quot;Amharic Jumbled Words,&quot; the perfect game for fans of Ethiopian Amharic language and word search games. With over 1000 words across 37 challenging levels, this game offers endless fun and educational value.',
      imageUrl: '/assets/images/games/amharic-jumbled2.webp', // CREATE THIS IMAGE
      genre: 'puzzle', // Or 'word'
    },
    {
      id: 5,
      slug: 'zigzag-survival',
      title: 'ZigZag Survival',
      developer: 'BinaryAbyssinia',
      rating: 4.0, // Rating from Play Store (approx)
      downloads: '1K+', // Downloads from Play Store (approx)
      description: 'Test your reflexes controlling a ball on a zigzag path.',
      imageUrl: '/images/games/zigzag-survival.webp', // CREATE THIS IMAGE
      genre: 'arcade', // Or 'action'
    },
    // Keep previous relevant mock data if desired, or add more real ones
    {
      id: 6, // Renumbered
      slug: 'gebeta-master',
      title: 'Gebeta Master',
      developer: 'Amhara Games', // Fictional developer
      rating: 4.9,
      downloads: '100K+',
      description: 'Modern take on the traditional Ethiopian board game.',
      imageUrl: '/images/games/gebeta-master.webp', // Use existing image path
      genre: 'puzzle',
    },
     {
      id: 7, // Renumbered
      slug: 'amharic-word-master',
      title: 'Amharic Word Master',
      developer: 'Educational Games ET', // Fictional developer
      rating: 4.8,
      downloads: '80K+',
      description: 'Learn Amharic while solving puzzles with words.', // Slightly different description
      imageUrl: '/images/games/amharic-word.webp', // Use existing image path
      genre: 'puzzle',
    },
  ];

// Define type for game data
export type GameType = (typeof mockGamesData)[0];

const GamesPage = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filterTypes = [
    { label: 'All Games', value: 'all' },
    { label: 'Action', value: 'action' },
    { label: 'Strategy', value: 'strategy' },
    { label: 'Casual', value: 'casual' },
    { label: 'Sports', value: 'sports' },
    { label: 'Puzzle', value: 'puzzle' },
  ];

  // Filter games based on the active filter
  const filteredGames =
    activeFilter === 'all'
      ? mockGamesData
      : mockGamesData.filter((game) => game.genre === activeFilter);

  return (
    // Assuming dark background (bg-background) is applied globally
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="py-16 md:py-20 lg:py-24 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight text-foreground">
            Ethiopian Games
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover amazing games created by Ethiopian developers. From
            action-packed adventures to educational puzzles, explore the best
            of local game development.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="container mx-auto px-4 pb-8 md:pb-12 flex justify-center">
        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
          {filterTypes.map((filter) => (
            <Button
              key={filter.value}
              variant={activeFilter === filter.value ? 'default' : 'ghost'}
              onClick={() => setActiveFilter(filter.value)}
              className={cn(
                'rounded-md px-4 py-2 text-sm font-medium transition-colors',
                activeFilter !== filter.value &&
                  'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground' // Use semantic colors
              )}
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </section>

      {/* Games Grid Section */}
      <section className="container mx-auto px-4 pb-16 md:pb-20 lg:pb-24">
        {filteredGames.length > 0 ? (
          // Adjusted grid columns based on Figma (looks like 2 columns)
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {filteredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground/80">
              No games found matching &quot;{activeFilter}&quot; filter.
            </p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-card py-16 md:py-20 lg:py-24 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-card-foreground">
            Are You a Game Developer?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Join our community of Ethiopian game developers. Get support,
            resources, and showcase your games to a wider audience.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            {/* Adjust link href as needed */}
            <Link href="/submit-game" passHref legacyBehavior>
              <Button size="lg" variant="default"> {/* Primary button */}
                Submit Your Game
              </Button>
            </Link>
            <Link href="/developer-resources" passHref legacyBehavior>
              {/* Secondary/Outline button - using 'outline' variant might need color override */}
              <Button
                size="lg"
                variant="outline"
                className="border-muted-foreground/50 text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:border-muted-foreground" // Style to match dark outline
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default GamesPage;