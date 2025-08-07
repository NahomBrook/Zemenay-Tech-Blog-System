// src/components/home-ui/hero.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react'; // Or any other icon if needed

const HeroSection = () => {
  return (
    <section className="relative bg-background text-foreground pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* Optional: Background Image/Graphic Element */}
      {/* Example: Full bleed background image */}
      <div className="absolute inset-0 z-0 opacity-10 md:opacity-20">
        <Image
          src="/images/hero/home-hero-bg.webp" // CREATE THIS IMAGE in public/images/hero/
          alt="Abstract gaming background"
          layout="fill"
          objectFit="cover"
          priority // Prioritize loading for LCP element
          quality={80}
        />
        {/* Overlay to darken the image if needed */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in-down">
          <span className="block">Welcome to the</span>
          <span className="block text-primary mt-1 sm:mt-2">Ethiopian Gamers Association</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto text-lg sm:text-xl text-muted-foreground mb-10 animate-fade-in-up animation-delay-300">
          Connecting Ethiopia&apos;s vibrant gaming community. Discover events, join teams,
          and explore the future of gaming in the heart of Africa.
        </p>

        {/* CTA Button */}
        <div className="animate-fade-in-up animation-delay-600">
          <Link href="/get-involved" passHref legacyBehavior>
            <Button size="lg" className="px-8 py-3 text-lg">
              Join Our Community
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Optional: Scroll down indicator or additional elements */}
        {/* 
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
          <ArrowDown className="h-6 w-6 text-muted-foreground" />
        </div>
        */}
      </div>

      {/* Example animation styles (add to your globals.css or a utility CSS file) */}
      {/* 
      // In globals.css
      @keyframes fadeInDown {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fade-in-down { animation: fadeInDown 0.6s ease-out forwards; }
      .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
      .animation-delay-300 { animation-delay: 0.3s; }
      .animation-delay-600 { animation-delay: 0.6s; }
      */}
    </section>
  );
};

export default HeroSection;