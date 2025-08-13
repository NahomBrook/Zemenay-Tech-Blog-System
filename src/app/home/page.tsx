'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, Loader2, Search, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  coverImage?: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
  category?: Category;
  categories?: Category[];
  tags: { id: string; name: string }[];
  likes?: any[];
  _count?: {
    comments: number;
    likes?: number;
  };
  isPinned?: boolean;
  isFeatured?: boolean;
  views?: number;
}

interface HomeData {
  featured: Article[];
  latest: Article[];
  popular: Article[];
  categories: Category[];
}

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [homeData, setHomeData] = useState<HomeData | null>(null);

  // Sample data for latest posts
  const sampleLatestPosts: Article[] = [
    {
      id: '1',
      title: 'Getting Started with Next.js 14',
      excerpt: 'Learn how to build modern web applications with Next.js 14 and React Server Components.',
      content: 'Next.js 14 introduces several exciting features that make building React applications faster and more efficient than ever before. In this article, we\'ll explore the latest updates and how you can leverage them in your projects...',
      slug: 'getting-started-with-nextjs-14',
      coverImage: '/images/nextjs-blog.jpg',
      published: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        image: '/images/avatar-1.jpg'
      },
      categories: [
        { id: '1', name: 'Web Development', slug: 'web-dev' },
        { id: '2', name: 'React', slug: 'react' }
      ],
      tags: [
        { id: '1', name: 'Next.js' },
        { id: '2', name: 'React' },
        { id: '3', name: 'JavaScript' }
      ],
      _count: {
        comments: 5,
        likes: 24
      },
      views: 150
    },
    {
      id: '2',
      title: 'Mastering TypeScript for React',
      excerpt: 'A comprehensive guide to using TypeScript with React for type-safe applications.',
      content: 'TypeScript has become the go-to choice for building large-scale React applications. In this guide, we\'ll cover advanced TypeScript patterns, type safety, and best practices for React development...',
      slug: 'typescript-react-guide',
      coverImage: '/images/typescript-react.jpg',
      published: true,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      author: {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        image: '/images/avatar-2.jpg'
      },
      categories: [
        { id: '3', name: 'TypeScript', slug: 'typescript' },
        { id: '2', name: 'React', slug: 'react' }
      ],
      tags: [
        { id: '4', name: 'TypeScript' },
        { id: '5', name: 'Frontend' },
        { id: '6', name: 'Development' }
      ],
      _count: {
        comments: 8,
        likes: 32
      },
      views: 210
    },
    {
      id: '3',
      title: 'The Future of Web Development',
      excerpt: 'Exploring the latest trends and technologies shaping the future of web development.',
      content: 'The web development landscape is constantly evolving. In this article, we\'ll look at emerging technologies like WebAssembly, Web Components, and the latest JavaScript features that are changing how we build for the web...',
      slug: 'future-of-web-dev',
      coverImage: '/images/web-dev-future.jpg',
      published: true,
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      author: {
        id: '3',
        name: 'Alex Johnson',
        email: 'alex@example.com'
      },
      categories: [
        { id: '1', name: 'Web Development', slug: 'web-dev' },
        { id: '4', name: 'Technology', slug: 'technology' }
      ],
      tags: [
        { id: '7', name: 'Web' },
        { id: '8', name: 'Trends' },
        { id: '9', name: 'Future' }
      ],
      _count: {
        comments: 12,
        likes: 45
      },
      views: 320
    }
  ];

  // Load sample data
  useEffect(() => {
    const loadSampleData = () => {
      try {
        setIsLoading(true);
        
        const sampleData: HomeData = {
          featured: [sampleLatestPosts[0]], // First post as featured
          latest: sampleLatestPosts,
          popular: [], // Not used anymore
          categories: [
            { id: '1', name: 'Web Development', slug: 'web-dev' },
            { id: '2', name: 'React', slug: 'react' },
            { id: '3', name: 'TypeScript', slug: 'typescript' },
            { id: '4', name: 'Technology', slug: 'technology' },
            { id: '5', name: 'JavaScript', slug: 'javascript' }
          ]
        };
        
        setHomeData(sampleData);
      } catch (err) {
        console.error('Error loading sample data:', err);
        setError('Failed to load sample data');
      } finally {
        setIsLoading(false);
      }
    };

    loadSampleData();
  }, []);

  // Get data from home data if available
  const featuredPost = homeData?.featured[0];

  // Format date to relative time
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  // Calculate read time based on content length
  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-8">
          {/* Hero Section with Featured Post */}
          {isLoading ? (
            <div className="relative rounded-2xl overflow-hidden bg-muted/30 h-[500px] flex items-center justify-center">
              <div className="text-center space-y-4 p-8">
                <Loader2 className="h-12 w-12 mx-auto animate-spin text-primary" />
                <p className="text-muted-foreground">Loading featured content...</p>
              </div>
            </div>
          ) : error ? (
            <div className="bg-destructive/10 border border-destructive/30 rounded-2xl p-6 text-center">
              <p className="text-destructive">{error}</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => window.location.reload()}
              >
                Retry
              </Button>
            </div>
          ) : featuredPost ? (
            <motion.article 
              variants={fadeIn}
              className="relative rounded-2xl overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
              <img 
                src={featuredPost.coverImage || '/images/placeholder-article.jpg'}
                alt={featuredPost.title}
                className="w-full h-[500px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 z-20 p-8 text-white">
                <Badge className="mb-4 bg-primary/90 hover:bg-primary text-white">Featured</Badge>
                <h1 className="text-4xl font-bold mb-4 leading-tight">
                  <a href={`/articles/${featuredPost.slug}`} className="hover:underline">
                    {featuredPost.title}
                  </a>
                </h1>
                <p className="text-lg text-gray-200 mb-6 line-clamp-2">
                  {featuredPost.excerpt || featuredPost.content.substring(0, 150) + '...'}
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 border-2 border-white/20">
                      <AvatarImage src={featuredPost.author.image || ''} alt={featuredPost.author.name} />
                      <AvatarFallback>
                        {featuredPost.author.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span>{featuredPost.author.name}</span>
                  </div>
                  <span className="text-gray-300">•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(featuredPost.createdAt)}</span>
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{calculateReadTime(featuredPost.content)}</span>
                  </span>
                </div>
              </div>
            </motion.article>
          ) : (
            <div className="bg-muted/30 rounded-2xl p-8 text-center">
              <h3 className="text-xl font-medium mb-2">No featured post available</h3>
              <p className="text-muted-foreground">Check back later for featured content</p>
            </div>
          )}

          {/* Latest Posts Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-blue-500" />
              Latest Posts
            </h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {homeData?.latest?.map((article) => (
                <motion.article 
                  key={article.id}
                  whileHover={{ y: -4 }}
                  className="group rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700"
                >
                  <div className="relative h-48">
                    <img
                      src={article.coverImage || '/images/placeholder-article.jpg'}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center gap-2 flex-wrap">
                        {article.categories?.slice(0, 2).map((category) => (
                          <Badge key={category.id} variant="secondary" className="text-xs">
                            {category.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                      <a href={`/articles/${article.slug}`} className="hover:underline">
                        {article.title}
                      </a>
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {article.excerpt || article.content.substring(0, 100)}...
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{formatDate(article.createdAt)}</span>
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          {article._count?.likes || 0}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          {article._count?.comments || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <motion.div 
          variants={fadeIn}
          className="lg:col-span-4 space-y-8"
        >
          {/* Search */}
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search articles..."
              className="w-full pl-10 bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary/50"
            />
          </motion.div>

          {/* Popular Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;