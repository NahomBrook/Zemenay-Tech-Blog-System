// src/components/home-ui/services-overview.tsx
import React from 'react';
import { Gamepad2, Users, Megaphone } from 'lucide-react'; // Example icons
import { cn } from '@/lib/utils';

interface ServiceItemProps {
  icon: React.ElementType;
  title: string;
  description: string;
  className?: string;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ icon: Icon, title, description, className }) => {
  return (
    <div className={cn("flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-lg", className)}>
      <div className="mb-4 p-4 bg-primary/10 rounded-full text-primary">
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
};

const ServicesOverview = () => {
  const services = [
    {
      icon: Gamepad2,
      title: 'Gaming Events & Tournaments',
      description: 'Participate in thrilling local tournaments and community game nights for all skill levels.',
    },
    {
      icon: Users,
      title: 'Community Building',
      description: 'Connect with fellow gamers, join teams, and be part of Ethiopia\'s growing gaming ecosystem.',
    },
    {
      icon: Megaphone,
      title: 'Developer Support',
      description: 'We provide resources, workshops, and platforms for Ethiopian game developers to shine.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background"> {/* Or a slightly different bg like bg-muted/10 */}
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            What We Offer
          </h2>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            Empowering Ethiopian gamers and developers through a range of dedicated services.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <ServiceItem
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;