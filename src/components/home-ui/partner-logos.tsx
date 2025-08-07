import React from 'react';
import Image from 'next/image';
import Marquee from '@/components/ui/marquee'; 
import type { PartnerLogoType } from '@/app/page';

interface PartnerLogosProps {
  logos: PartnerLogoType[];
}

const PartnerLogos: React.FC<PartnerLogosProps> = ({ logos }) => {
  if (!logos || logos.length === 0) {
    return null;
  }

  const marqueeLogos = logos.map(logo => (
    <div key={logo.id} className="relative w-32 h-16 mx-4 md:mx-6 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
      <Image
        src={logo.logoUrl}
        alt={logo.name}
        layout="fill"
        objectFit="contain"
        title={logo.name}
      />
    </div>
  ));

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-6">
        <h3 className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-8 md:mb-10">
          Trusted By & In Partnership With
        </h3>
        <div className="relative">
          <Marquee pauseOnHover className="[--duration:40s]">
            {marqueeLogos}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-background to-transparent"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-background to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default PartnerLogos;