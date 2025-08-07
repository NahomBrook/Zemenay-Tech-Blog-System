// src/components/home-ui/testimonials.tsx
import React from 'react';
import TestimonialCard from './testimonial-card';
import type { TestimonialType } from '@/app/page';
// Consider using a carousel/slider component if you have many testimonials
// For now, a simple grid layout.

interface TestimonialsProps {
  testimonials: TestimonialType[];
}

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  // Display up to 3 testimonials in a grid, or implement a slider
  const displayTestimonials = testimonials.slice(0, 3);

  return (
    <section className="py-16 md:py-24 bg-muted/30"> {/* Or bg-background */}
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Words From Our Community
          </h2>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            Hear what players, developers, and partners say about EGA.
          </p>
        </div>
        {displayTestimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {displayTestimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        ) : (
           <p className="text-center text-muted-foreground">No testimonials yet.</p>
        )}
      </div>
    </section>
  );
};

export default Testimonials;