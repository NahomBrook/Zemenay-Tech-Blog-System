import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Twitter, Linkedin } from 'lucide-react';

export interface ExecutiveMemberCardProps {
  imageUrl: string;
  name: string;
  title: string;
  twitterUrl?: string;
  linkedinUrl?: string;
  className?: string;
}

const ExecutiveMemberCard: React.FC<ExecutiveMemberCardProps> = ({
  imageUrl,
  name,
  title,
  twitterUrl,
  linkedinUrl,
  className,
}) => {
  return (
    <div
      className={cn(
        "group bg-card rounded-xl overflow-hidden flex flex-col shadow-lg",
        "transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2",
        className
      )}
    >
      <div className="relative w-full aspect-square bg-muted overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </div>
      <div className="p-4 text-center flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-1">{name}</h3>
          <p className="text-sm text-muted-foreground mb-3">{title}</p>
        </div>
        {(twitterUrl || linkedinUrl) && (
          <div className="flex justify-center gap-3 mt-2">
            {twitterUrl && (
              <Link href={twitterUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={18} />
                <span className="sr-only">Twitter</span>
              </Link>
            )}
            {linkedinUrl && (
              <Link href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={18} />
                <span className="sr-only">LinkedIn</span>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExecutiveMemberCard;