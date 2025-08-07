// src/components/about-ui/stat-card.tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  value: string;
  label: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ value, label, className }) => {
  return (
    <div className={cn("bg-card p-6 rounded-lg text-center shadow-md", className)}> {/* Added shadow-md for a bit of depth */}
      <p className="text-3xl font-bold text-primary mb-1">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
};

export default StatCard;