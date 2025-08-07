// src/app/news/page.tsx
'use client';

import React from 'react';
import NewsCard from '@/components/news-ui/news-card';
import { mockNewsItems, NewsItemType } from '@/app/page';

const NewsPage = () => {
  const allNewsItems: NewsItemType[] = mockNewsItems;

  return (
    <main className="flex-grow">
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              Latest News & Updates
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mt-3 max-w-2xl mx-auto">
              Stay informed with the latest happenings, announcements, and stories from the Ethiopian gaming scene.
            </p>
          </div>

          {allNewsItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {allNewsItems.map((item) => (
                <NewsCard key={item.id} newsItem={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">
                No news articles found at the moment. Please check back soon!
              </p>
            </div>
          )}
          {/* TODO: Add pagination if many news items */}
        </div>
      </section>
    </main>
  );
};

export default NewsPage;
