// src/components/home-ui/testimonial-card.tsx
import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { TestimonialType } from '@/app/page';
import { Quote } from 'lucide-react';

interface TestimonialCardProps {
  testimonial: TestimonialType;
  className?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, className }) => {
  const { quote, name, role, avatarUrl } = testimonial;

  return (
    <div className={cn("bg-card p-6 rounded-lg shadow-lg flex flex-col items-center text-center h-full", className)}>
      <Quote className="h-8 w-8 text-primary mb-4" />
      <p className="text-base text-muted-foreground italic mb-6 flex-grow leading-relaxed">
        “{quote}”
      </p>
      <div className="flex flex-col items-center">
        {avatarUrl && (
          <div className="relative w-16 h-16 rounded-full overflow-hidden mb-3 border-2 border-primary/50">
            <Image src={avatarUrl} alt={name} layout="fill" objectFit="cover" />
          </div>
        )}
        <p className="font-semibold text-foreground">{name}</p>
        <p className="text-xs text-muted-foreground">{role}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;