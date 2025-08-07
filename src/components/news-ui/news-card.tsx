import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import type { NewsItemType } from "@/app/page";
import { cn } from '@/lib/utils';
import { CalendarDays, ArrowRight } from 'lucide-react';

interface NewsCardProps {
  newsItem: NewsItemType;
  className?: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ newsItem, className }) => {
  const { slug, title, date, excerpt, imageUrl, category } = newsItem;

  return (
    <Link href={`/news/${slug}`} passHref legacyBehavior>
      <a className={cn("group block bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-1", className)}>
        <div className="relative aspect-video w-full bg-muted">
          <Image
            src={imageUrl || '/images/news/news-placeholder-default.webp'}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="transition-opacity duration-300 group-hover:opacity-90"
          />
        </div>
        <div className="p-4 md:p-5">
          {category && (
            <Badge variant="outline" className="mb-2 border-primary/50 text-primary text-xs">
              {category}
            </Badge>
          )}
          <h3 className="text-md md:text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors leading-tight">
            {title}
          </h3>
          <div className="flex items-center text-xs text-muted-foreground mb-2">
            <CalendarDays className="h-3 w-3 mr-1.5" />
            {new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
          <p className="text-sm text-muted-foreground mb-3 leading-relaxed line-clamp-3">
            {excerpt}
          </p>
          <span className="text-sm font-medium text-primary group-hover:underline">
            Read More <ArrowRight className="inline h-4 w-4 ml-1" />
          </span>
        </div>
      </a>
    </Link>
  );
};

export default NewsCard;