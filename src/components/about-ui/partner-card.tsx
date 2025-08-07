// src/components/about-ui/partner-card.tsx
import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface PartnerCardProps {
  logoUrl: string;
  name: string;
  description: string;
  className?: string;
}

const PartnerCard: React.FC<PartnerCardProps> = ({ logoUrl, name, description, className }) => {
  return (
    <div className={cn(
        "bg-card rounded-xl p-6 text-center flex flex-col items-center justify-center shadow-md h-full",
        className
      )}
    >
      <div className="relative w-40 h-20 mb-4 flex items-center justify-center">
        <Image
          src={logoUrl}
          alt={`${name} logo`}
          width={150}
          height={60}
          style={{ objectFit: 'contain' }}
        />
      </div>
      <h3 className="text-lg font-bold text-foreground mb-1">{name}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default PartnerCard;