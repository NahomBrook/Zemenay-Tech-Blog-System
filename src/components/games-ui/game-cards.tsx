// src/components/games-ui/game-cards.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { GameType } from '@/app/games/page'; // Import type from page
import { cn } from '@/lib/utils';
import { Star, Share2 } from 'lucide-react'; // Example icons

interface GameCardProps {
  game: GameType;
  className?: string;
}

const GameCard: React.FC<GameCardProps> = ({ game, className }) => {
  const {
    slug,
    title,
    developer,
    rating,
    downloads,
    description,
    imageUrl,
  } = game;

  // Fallback image if specific one fails or isn't provided
  const imagePath = imageUrl || '/images/games/placeholder-game.webp';

  return (
    // Card container - Consider if the whole card should link or just buttons
    <div
      className={cn(
        'group rounded-lg overflow-hidden bg-card shadow-lg flex flex-col', // Use card background
        className
      )}
    >
      {/* Image Section - REQUIRES width/height for public images */}
      <div className="relative aspect-[2/1] w-full bg-muted">
        {/* Placeholder text if image fails */}
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-xl z-0">
           800 × 400
        </div>
        <Image
          src={imagePath}
          alt={`${title} game banner`}
          width={800} // REQUIRED for public images
          height={400} // REQUIRED for public images
          style={{ objectFit: 'cover' }} // Make image cover the container
          className="relative z-10 transition-opacity duration-300 group-hover:opacity-90" // Ensure image is above placeholder text
          onError={(e) => {
            // Optional: hide image container on error, showing only placeholder
            // e.currentTarget.style.opacity = '0'; // Example: hide image, keeps placeholder visible
            e.currentTarget.parentElement?.querySelector('div')?.classList.remove('hidden'); // Show text placeholder if needed
            e.currentTarget.src = '/images/games/placeholder-game.webp'; // Try loading placeholder
          }}
          onLoad={(e) => {
            // Hide text placeholder on successful load
             e.currentTarget.parentElement?.querySelector('div')?.classList.add('hidden');
          }}
        />
      </div>

      {/* Content Section */}
      <div className="p-4 md:p-5 flex flex-col flex-grow"> {/* flex-grow to push buttons down */}
        {/* Top section: Title & Developer */}
        <div className="mb-2">
           <h3 className="text-lg md:text-xl font-semibold text-card-foreground mb-0.5">
             {title}
           </h3>
           <p className="text-sm text-muted-foreground">{developer}</p>
        </div>

         {/* Middle section: Rating, Downloads, Description */}
        <div className="mb-4 flex-grow"> {/* flex-grow allows description to take space */}
            <div className="flex justify-between items-center mb-2">
                {rating && (
                <span className="flex items-center text-sm text-rating-yellow font-medium">
                <Star className="w-4 h-4 mr-1 fill-rating-yellow text-rating-yellow" /> {/* Updated fill and text */}
                {rating.toFixed(1)}
            </span>
                )}
                {downloads && (
                <span className="text-sm text-tertiary font-medium">
                    {downloads}
                </span>
                )}
            </div>
            <p className="text-sm text-muted-foreground">
                {description}
            </p>
        </div>


        {/* Bottom section: Buttons */}
        <div className="flex items-center gap-3 mt-auto"> {/* mt-auto pushes buttons down */}
          {/* Adjust Link href based on how you want 'Play Now' to work */}
          <Link href={`/games/${slug}/play`} passHref legacyBehavior>
            <Button size="sm" variant="default" className="flex-grow sm:flex-grow-0"> {/* Primary */}
              Play Now
            </Button>
          </Link>
          <Button
            size="sm"
            variant="outline"
            className="border-muted-foreground/50 text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:border-muted-foreground flex-grow sm:flex-grow-0" // Styled outline
          >
            <Share2 className="w-4 h-4 mr-2 sm:mr-0" /> {/* Example Icon */}
             <span className="hidden sm:inline sm:ml-2">Share</span> {/* Text only on larger screens */}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;