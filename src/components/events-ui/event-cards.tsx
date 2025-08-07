// src/components/events-ui/event-cards.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import type { EventType } from '@/app/events/page';
import { cn } from '@/lib/utils';

interface EventCardProps {
  event: EventType;
  className?: string;
}

const EventCard: React.FC<EventCardProps> = ({ event, className }) => {
  const {
    slug,
    title,
    date,
    location,
    imageUrl,
    prize,
    participants,
  } = event;

  return (
    <Link href={`/events/${slug}`} legacyBehavior>
      <a
        className={cn(
          'group block rounded-lg overflow-hidden bg-card shadow-lg transition-transform duration-300 ease-in-out hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background', // Use semantic colors
          className
        )}
      >
        {/* Image Section */}
        <div className="relative aspect-[2/1] w-full bg-muted"> {/* Image placeholder bg */}
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-xl"> {/* Muted text for placeholder */}
            400 × 200
          </div>
          <Image
             src={imageUrl}
             alt={`${title} event banner`}
             fill
             style={{ objectFit: 'cover' }}
             className="transition-opacity duration-300 group-hover:opacity-90"
             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
             onError={(e) => { e.currentTarget.style.display = 'none'; }}
             onLoad={(e) => {
               const placeholder = e.currentTarget.parentElement?.querySelector('div');
               if (placeholder) placeholder.style.display = 'none';
             }}
          />
        </div>

        {/* Content Section */}
        <div className="p-4 md:p-5">
          <h3 className="text-lg md:text-xl font-semibold text-card-foreground mb-1 group-hover:text-primary transition-colors"> {/* Use card-foreground, hover primary */}
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mb-3"> {/* Muted text for date/location */}
            {date} • {location}
          </p>

          {/* Badges/Tags - USING CUSTOM COLORS DEFINED IN TAILWIND CONFIG */}
          <div className="flex flex-wrap gap-2">
            {prize && (
              <Badge
                 variant="outline" // Base variant - styling comes from custom classes
                 className={cn(
                   'border-transparent bg-badge-purple-bg text-badge-purple-text', // Use custom badge colors
                   // Optional: Add hover state if needed e.g. hover:bg-opacity-20
                   'px-2.5 py-0.5 text-xs font-medium'
                 )}
              >
                Prize: {prize}
              </Badge>
            )}
            {participants && (
              <Badge
                 variant="outline" // Base variant
                 className={cn(
                  'border-transparent bg-badge-grey-bg text-badge-grey-text', // Use custom badge colors
                   // Optional: Add hover state if needed
                   'px-2.5 py-0.5 text-xs font-medium'
                 )}
              >
                {participants}
              </Badge>
            )}
          </div>
        </div>
      </a>
    </Link>
  );
};

export default EventCard;