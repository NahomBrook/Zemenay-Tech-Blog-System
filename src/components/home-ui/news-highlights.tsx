import React from 'react';
import Link from 'next/link';
import NewsCard from '@/components/news-ui/news-card';
import { Button } from '@/components/ui/button';
import type { NewsItemType } from '@/app/page';
import { ArrowRight } from 'lucide-react';

interface NewsHighlightsProps {
  newsItems: NewsItemType[];
}

const NewsHighlights: React.FC<NewsHighlightsProps> = ({ newsItems }) => {
  const displayNews = newsItems.slice(0, 3);

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 md:mb-0">
            Latest News
          </h2>
          <Link href="/news" passHref legacyBehavior>
            <Button variant="outline" className="border-muted-foreground/50 text-muted-foreground hover:bg-accent hover:text-accent-foreground">
              View All News
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        {displayNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {displayNews.map((item) => (
              <NewsCard key={item.id} newsItem={item} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No news highlights at the moment.</p>
        )}
      </div>
    </section>
  );
};

export default NewsHighlights;