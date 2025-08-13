'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, Search, TrendingUp, ThumbsUp, MessageSquare } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface Category {
  id: string;
  name: string;
  slug: string;
  _count?: { articles: number };
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
  author: { id: string; name: string; email: string; image?: string };
  categories: Category[];
  tags: { id: string; name: string }[];
  _count?: { comments: number; likes: number };
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

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const HomePage = () => {
  const [activeTab, setActiveTab] = useState<'latest' | 'liked' | 'commented'>('latest');

  // Sample data
  const sampleAuthor = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    image: 'https://randomuser.me/api/portraits/men/1.jpg'
  };

  const sampleCategories: Category[] = [
    { id: '1', name: 'Technology', slug: 'technology' },
    { id: '2', name: 'Programming', slug: 'programming' },
    { id: '3', name: 'Web Development', slug: 'web-development' },
  ];

  const sampleTags = [
    { id: '1', name: 'React' },
    { id: '2', name: 'Next.js' },
    { id: '3', name: 'TypeScript' },
    { id: '4', name: 'Tailwind' },
  ];

  const sampleArticles: Article[] = [
    {
      id: '1',
      title: 'Getting Started with Next.js 14',
      excerpt: 'Learn the basics of Next.js 14 and how to build modern web applications.',
      content: 'This is a detailed article about Next.js 14...',
      slug: 'getting-started-with-nextjs-14',
      coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      published: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: sampleAuthor,
      categories: [sampleCategories[0], sampleCategories[1]],
      tags: [sampleTags[0], sampleTags[1]],
      _count: { comments: 12, likes: 45 },
      isPinned: true,
      isFeatured: true,
      views: 1024
    },
    {
      id: '2',
      title: 'Mastering TypeScript in 2023',
      excerpt: 'Advanced TypeScript patterns and best practices for modern web development.',
      content: 'TypeScript has become an essential tool for web developers...',
      slug: 'mastering-typescript-2023',
      coverImage: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      published: true,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 86400000).toISOString(),
      author: sampleAuthor,
      categories: [sampleCategories[1]],
      tags: [sampleTags[2]],
      _count: { comments: 8, likes: 32 },
      views: 756
    },
    {
      id: '3',
      title: 'Building Responsive UIs with Tailwind CSS',
      excerpt: 'Create beautiful, responsive user interfaces with Tailwind CSS.',
      content: 'Tailwind CSS has revolutionized the way we build user interfaces...',
      slug: 'responsive-uis-tailwind-css',
      coverImage: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      published: true,
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      updatedAt: new Date(Date.now() - 172800000).toISOString(),
      author: sampleAuthor,
      categories: [sampleCategories[2]],
      tags: [sampleTags[3]],
      _count: { comments: 5, likes: 28 },
      views: 623
    }
  ];

  const homeData: HomeData = {
    featured: [sampleArticles[0]],
    latest: [...sampleArticles],
    popular: [...sampleArticles].sort((a, b) => (b._count?.likes || 0) - (a._count?.likes || 0)),
    categories: sampleCategories
  };

  const featuredPost = homeData.featured[0];
  const formatDate = (dateString: string) => new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(dateString));
  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return `${Math.ceil(words / wordsPerMinute)} min read`;
  };

  const getTabData = () => {
    switch (activeTab) {
      case 'latest':
        return homeData.latest;
      case 'liked':
        return homeData.popular;
      case 'commented':
        return homeData.latest.sort((a, b) => (b._count?.comments || 0) - (a._count?.comments || 0));
      default:
        return homeData.latest;
    }
  };

  const popularTags = homeData.latest.flatMap((article) => article.tags).reduce((acc, tag) => {
    acc[tag.name] = (acc[tag.name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {featuredPost ? (
            <motion.article variants={fadeIn} className="relative rounded-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
              <img
                src={featuredPost.coverImage || '/images/placeholder-article.jpg'}
                alt={featuredPost.title}
                className="w-full h-[500px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 z-20 p-8 text-white">
                <Badge className="mb-4 bg-primary/90 hover:bg-primary text-white">Featured</Badge>
                <h1 className="text-4xl font-bold mb-4 leading-tight">
                  <a href={`/articles/${featuredPost.slug}`} className="hover:underline">{featuredPost.title}</a>
                </h1>
                <p className="text-lg text-gray-200 mb-6 line-clamp-2">{featuredPost.excerpt || featuredPost.content.substring(0, 150)}...</p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 border-2 border-white/20">
                      <AvatarImage src={featuredPost.author.image || ''} alt={featuredPost.author.name} />
                      <AvatarFallback>{featuredPost.author.name.split(' ').map((n) => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <span>{featuredPost.author.name}</span>
                  </div>
                  <span className="text-gray-300">•</span>
                  <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /><span>{formatDate(featuredPost.createdAt)}</span></span>
                  <span className="text-gray-300">•</span>
                  <span className="flex items-center gap-1"><Clock className="h-4 w-4" /><span>{calculateReadTime(featuredPost.content)}</span></span>
                </div>
              </div>
            </motion.article>
          ) : (
            <div className="bg-muted/30 rounded-2xl p-8 text-center">
              <h3 className="text-xl font-medium mb-2">No featured post available</h3>
              <p className="text-muted-foreground">Check back later for featured content</p>
            </div>
          )}

          <div className="mt-12">
            <div className="flex items-center border-b border-border/30 pb-2">
              {[
                { id: 'latest', label: 'Latest Posts', icon: <TrendingUp className="h-4 w-4 text-blue-500" /> },
                { id: 'liked', label: 'Most Liked', icon: <ThumbsUp className="h-4 w-4 text-rose-500" /> },
                { id: 'commented', label: 'Most Commented', icon: <MessageSquare className="h-4 w-4 text-emerald-500" /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'latest' | 'liked' | 'commented')}
                  className={`px-4 py-2 text-sm font-medium flex items-center gap-2 rounded-t-lg transition-colors ${
                    activeTab === tab.id ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {getTabData()?.map((article) => (
                <motion.article key={article.id} whileHover={{ y: -4 }} className="group rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                  <div className="relative h-48">
                    <img src={article.coverImage || '/images/placeholder-article.jpg'} alt={article.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center gap-2 flex-wrap">
                        {article.categories?.slice(0, 2).map((category) => (
                          <Badge key={category.id} variant="secondary" className="text-xs">{category.name}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                      <a href={`/articles/${article.slug}`} className="hover:underline">{article.title}</a>
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{article.excerpt || article.content.substring(0, 100)}...</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{formatDate(article.createdAt)}</span>
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>{article._count?.likes || 0}</span>
                        <span className="flex items-center gap-1"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>{article._count?.comments || 0}</span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>

        <motion.div variants={fadeIn} className="lg:col-span-4 space-y-8">
          <motion.div whileHover={{ scale: 1.01 }} transition={{ type: 'spring', stiffness: 400, damping: 10 }} className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search articles..."
              className="w-full pl-10 bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary/50"
            />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h3 className="text-lg font-semibold mb-4">Popular Tags</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(popularTags || {})
                .sort(([, a], [, b]) => b - a)
                .slice(0, 8)
                .map(([tag, count]) => (
                  <Badge key={tag} variant="secondary" className="text-xs">{`${tag} (${count})`}</Badge>
                ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;