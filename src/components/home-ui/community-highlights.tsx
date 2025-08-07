// src/components/home-ui/community-highlights.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Users, Gamepad, ShieldCheck, ArrowRight } from 'lucide-react'; // Example Icons

interface CommunityCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  link: string;
  imageUrl?: string; // Optional background image for the card
}

const CommunityCard: React.FC<CommunityCardProps> = ({ title, description, icon: Icon, link, imageUrl }) => {
  return (
    <Link href={link} passHref legacyBehavior>
      <a className="group relative block bg-card rounded-xl p-6 md:p-8 shadow-lg hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={`${title} background`}
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 z-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300"
          />
        )}
        <div className="relative z-10">
          <div className="mb-4 text-primary">
            <Icon className="h-10 w-10" />
          </div>
          <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
          <span className="text-sm font-medium text-primary group-hover:underline">
            Explore More <ArrowRight className="inline h-4 w-4 ml-1" />
          </span>
        </div>
      </a>
    </Link>
  );
};

const CommunityHighlights = () => {
  const communities = [
    {
      title: 'Casual Gamers Hub',
      description: 'Find friends, join game nights, and enjoy gaming in a relaxed atmosphere.',
      icon: Gamepad,
      link: '/communities/casual',
      imageUrl: '/images/community/casual-gamers-bg.webp', // CREATE THIS
    },
    {
      title: 'Pro Gaming League',
      description: 'Compete at the highest level, join tournaments, and make your mark.',
      icon: ShieldCheck,
      link: '/communities/pro',
      imageUrl: '/images/community/pro-gamers-bg.webp', // CREATE THIS
    },
    {
      title: 'Developer & Creator Circle',
      description: 'Collaborate, learn, and share your projects with fellow Ethiopian game makers.',
      icon: Users, // Or a more specific dev icon
      link: '/communities/developers',
      imageUrl: '/images/community/developers-bg.webp', // CREATE THIS
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/30"> {/* Slightly different background */}
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Our Vibrant Community
          </h2>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            Something for everyone. Find your niche and connect with like-minded individuals.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {communities.map((community) => (
            <CommunityCard key={community.title} {...community} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunityHighlights;