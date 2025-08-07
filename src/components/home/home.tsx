'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, Clock, Flame, History, LayoutGrid, MessageSquare, Search, Settings, ThumbsUp, TrendingUp, BookOpen, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

// Quick actions for the home page
const quickActions = [
  { label: 'New Post', icon: <LayoutGrid className="h-5 w-5" />, path: '/new-post' },
  { label: 'Bookmarks', icon: <Bookmark className="h-5 w-5" />, path: '/bookmarks' },
  { label: 'Drafts', icon: <Settings className="h-5 w-5" />, path: '/drafts' },
  { label: 'History', icon: <History className="h-5 w-5" />, path: '/history' }
];

// Mock data - replace with actual data from your API
const mockFeed = [
  {
    id: 1,
    title: 'Getting Started with Next.js 14',
    excerpt: 'Learn the new features and improvements in Next.js 14',
    author: 'Alex Johnson',
    date: '2h ago',
    readTime: '5 min read',
    category: 'Web Development',
    likes: 24,
    comments: 8,
    isBookmarked: true,
  },
  {
    id: 2,
    title: 'State Management in 2024',
    excerpt: 'Comparing different state management solutions for React',
    author: 'Sarah Kim',
    date: '5h ago',
    readTime: '8 min read',
    category: 'Frontend',
    likes: 42,
    comments: 15,
    isBookmarked: false,
  },
];

const recommendedArticles = [
  {
    id: 3,
    title: 'TypeScript Best Practices',
    excerpt: 'Advanced TypeScript patterns you should know',
    category: 'TypeScript',
    readTime: '6 min read',
  },
  {
    id: 4,
    title: 'CSS Grid vs Flexbox',
    excerpt: 'When to use each layout system in your projects',
    category: 'CSS',
    readTime: '4 min read',
  },
];

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('trending');
  const [isLoading, setIsLoading] = useState(false);

  const handleTabChange = (tab: string) => {
    setIsLoading(true);
    setActiveTab(tab);
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="grid grid-cols-1 lg:grid-cols-4 gap-8"
      >
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          {/* Welcome Section */}
          <motion.div 
            variants={fadeIn}
            className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 rounded-xl border border-border/30 backdrop-blur-sm"
          >
            <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Welcome back, User! 👋
            </h1>
            <p className="text-muted-foreground">Here's what's happening in your feed today</p>
          </motion.div>

          {/* Quick Actions */}
          <motion.div 
            variants={fadeIn}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {quickActions.map((action, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <Button 
                  variant="outline" 
                  className="w-full h-24 flex flex-col items-center justify-center gap-2 hover:bg-accent/20 transition-all duration-300 group"
                  asChild
                >
                  <a href={action.path}>
                    <span className="text-primary group-hover:scale-110 transition-transform">
                      {action.icon}
                    </span>
                    <span className="text-sm font-medium">{action.label}</span>
                  </a>
                </Button>
              </motion.div>
            ))}
          </motion.div>

          {/* Feed Tabs */}
          <motion.div 
            variants={fadeIn}
            className="flex items-center border-b border-border/30 pb-2"
          >
            {[
              { id: 'trending', label: 'Trending', icon: <Flame className="h-4 w-4" /> },
              { id: 'latest', label: 'Latest', icon: <TrendingUp className="h-4 w-4" /> },
              { id: 'following', label: 'Following', icon: <History className="h-4 w-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-4 py-2 text-sm font-medium flex items-center gap-2 rounded-t-lg transition-colors ${
                  activeTab === tab.id 
                    ? 'text-primary border-b-2 border-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </motion.div>

          {/* Feed Content */}
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {[1, 2, 3].map((i) => (
                  <motion.div 
                    key={i}
                    className="h-40 bg-muted/30 rounded-xl animate-pulse"
                    variants={fadeIn}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="content"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                {mockFeed.map((post) => (
                  <motion.div
                    key={post.id}
                    variants={fadeIn}
                    whileHover={{ y: -2 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <Card className="overflow-hidden border-border/30 hover:shadow-lg transition-all duration-300 group">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3 mb-2">
                          <Avatar className="h-9 w-9 border-2 border-background group-hover:border-primary/30 transition-colors">
                            <AvatarImage src={`/images/avatars/${post.author.toLowerCase().replace(/\s+/g, '-')}.jpg`} />
                            <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10">
                              {post.author.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium group-hover:text-primary transition-colors">
                              {post.author}
                            </p>
                            <p className="text-xs text-muted-foreground flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {post.date} · {post.readTime}
                            </p>
                          </div>
                        </div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="text-foreground/80">
                          {post.excerpt}
                        </CardDescription>
                        <Badge 
                          variant="secondary" 
                          className="w-fit mt-2 group-hover:bg-primary/10 group-hover:border-primary/30 group-hover:text-primary transition-colors"
                        >
                          {post.category}
                        </Badge>
                      </CardHeader>
                      <CardFooter className="flex justify-between items-center pt-0">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1 group-hover:text-foreground transition-colors">
                            <ThumbsUp className="h-4 w-4" />
                            {post.likes}
                          </span>
                          <span className="flex items-center gap-1 group-hover:text-foreground transition-colors">
                            <MessageSquare className="h-4 w-4" />
                            {post.comments}
                          </span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className={`group-hover:text-foreground transition-colors ${post.isBookmarked ? 'text-yellow-500' : 'text-muted-foreground'}`}
                        >
                          <Bookmark 
                            className={`h-5 w-5 ${post.isBookmarked ? 'fill-current' : ''}`} 
                          />
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar */}
        <motion.div 
          variants={fadeIn}
          className="space-y-6"
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

          {/* Recommended Articles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-border/30 overflow-hidden">
              <CardHeader className="pb-3 border-b border-border/20">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Flame className="h-5 w-5 text-orange-500" />
                  <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    Trending Now
                  </span>
                </CardTitle>
                <CardDescription>Popular articles you might like</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {recommendedArticles.map((article) => (
                  <motion.div 
                    key={article.id}
                    className="p-4 group cursor-pointer hover:bg-muted/30 transition-colors border-b border-border/20 last:border-b-0"
                    whileHover={{ x: 4 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="bg-muted/50 rounded-lg p-2 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        <BookOpen className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{article.excerpt}</p>
                        <div className="flex items-center justify-between mt-2">
                          <Badge 
                            variant="outline" 
                            className="text-xs font-normal bg-muted/30 border-border/30 group-hover:border-primary/30 group-hover:bg-primary/5 group-hover:text-primary transition-colors"
                          >
                            {article.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {article.readTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Popular Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-border/30">
              <CardHeader className="pb-3 border-b border-border/20">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Tag className="h-5 w-5 text-primary" />
                  <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    Popular Tags
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-2">
                  {['React', 'TypeScript', 'Next.js', 'CSS', 'JavaScript', 'Web Development', 'UI/UX', 'Performance'].map((tag) => (
                    <motion.div
                      key={tag}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 10 }}
                    >
                      <Badge
                        variant="outline"
                        className="px-3 py-1.5 text-xs font-normal bg-muted/30 border-border/30 text-foreground/80 hover:bg-primary/5 hover:border-primary/30 hover:text-primary transition-colors cursor-pointer"
                      >
                        {tag}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-border/30 bg-gradient-to-br from-primary/5 to-primary/10 backdrop-blur-sm overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="relative z-10">
                <CardTitle className="text-lg bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Stay Updated
                </CardTitle>
                <CardDescription className="text-foreground/80">
                  Get the latest articles and resources sent straight to your inbox.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-3">
                  <Input 
                    type="email" 
                    placeholder="Your email address" 
                    className="bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary/50"
                  />
                  <Button className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all">
                    Subscribe
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HomePage;