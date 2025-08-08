'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, Clock, Flame, History, LayoutGrid, MessageSquare, Search, Settings, ThumbsUp, TrendingUp, BookOpen, Tag, Mail, ArrowRight, Calendar, User, Code, Image as ImageIcon, Video as VideoIcon, FileText, Link2, X } from 'lucide-react';
import NextJsImage from '@/assets/images/Nextjs.gif';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

// Categories for the blog
//TODO: Data will be fetched from the backend after integration
const categories = [
  { name: 'Web Development', icon: <Code className="h-4 w-4" />, count: 24 },
  { name: 'Mobile', icon: <LayoutGrid className="h-4 w-4" />, count: 15 },
  { name: 'UI/UX', icon: <BookOpen className="h-4 w-4" />, count: 18 },
  { name: 'DevOps', icon: <Settings className="h-4 w-4" />, count: 12 },
  { name: 'Data Science', icon: <TrendingUp className="h-4 w-4" />, count: 20 }
];

// Featured post
const featuredPost = {
  id: 0,
  title: 'Mastering Next.js 14: A Comprehensive Guide',
  excerpt: 'Discover the latest features and best practices for building modern web applications with Next.js 14.',
  author: 'Sarah Johnson',
  date: '1d ago',
  readTime: '8 min read',
  category: 'Web Development',
  likes: 42,
  comments: 15,
  isBookmarked: true,
  image: NextJsImage
};

// Featured Authors
//TODO: Data will be fetched from the backend after integration
const featuredAuthors = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Senior Web Developer',
    avatar: '/images/avatars/author1.jpg',
    posts: 42,
    followers: '12.5k'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'UI/UX Designer',
    avatar: '/images/avatars/author2.jpg',
    posts: 28,
    followers: '8.7k'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'DevOps Engineer',
    avatar: '/images/avatars/author3.jpg',
    posts: 35,
    followers: '15.2k'
  }
];

// Popular Posts
const popularPosts = [
  {
    id: 5,
    title: 'Building Scalable Microservices with Docker',
    excerpt: 'Learn how to design and deploy microservices at scale',
    image: '/images/posts/microservices.jpg',
    date: '3d ago',
    readTime: '10 min read',
    likes: 89,
    comments: 24
  },
  {
    id: 6,
    title: 'The Future of React Server Components',
    excerpt: 'Exploring the next generation of React architecture',
    image: '/images/posts/react-future.jpg',
    date: '5d ago',
    readTime: '7 min read',
    likes: 124,
    comments: 42
  },
  {
    id: 7,
    title: 'Getting Started with WebAssembly',
    excerpt: 'A practical guide to WebAssembly for web developers',
    image: '/images/posts/webassembly.jpg',
    date: '1w ago',
    readTime: '12 min read',
    likes: 67,
    comments: 18
  }
];

// Mock data - replace with actual data from the API
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
  const [selectedMedia, setSelectedMedia] = useState<{ file: File; type: 'image' | 'video' | 'document' | 'link' } | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const videoInputRef = React.useRef<HTMLInputElement>(null);
  const docInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video' | 'document') => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedMedia({ file, type });
    }
  };

  const openFileDialog = (ref: React.RefObject<HTMLInputElement>) => {
    ref.current?.click();
  };

  const handleLinkClick = () => {
    const url = prompt('Enter the URL you want to share:');
    if (url) {
      // Handle the link (you can add validation here)
      console.log('Shared URL:', url);
      // You can update the UI to show the shared link
    }
  };

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
          {/* Create Post Card */}
          <motion.div 
            variants={fadeIn}
            className="bg-card rounded-xl border border-border/30 p-4 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/images/avatars/user.jpg" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="relative
                  before:absolute before:pointer-events-none before:inset-0 before:rounded-xl before:ring-1 before:ring-inset before:ring-border/30
                  focus-within:before:ring-primary/50 focus-within:before:ring-2 transition-shadow duration-200
                ">
                  <textarea
                    placeholder="Share your thoughts, ideas, or updates..."
                    className="w-full min-h-[80px] p-3 bg-transparent rounded-xl border-0 focus:ring-0 resize-none text-foreground placeholder:text-muted-foreground/60"
                    rows={3}
                  />
                </div>
                
                {/* Category Selector */}
                <div className="mt-3 flex items-center gap-2 flex-wrap">
                  <select 
                    className="text-sm bg-muted/30 dark:bg-background border border-border/30 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent
                    dark:text-foreground dark:border-muted-foreground/30 dark:bg-muted/10 dark:focus:ring-primary/70
                    [&>option]:bg-background [&>option]:text-foreground"
                    defaultValue=""
                  >
                    <option value="" disabled className="text-muted-foreground">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.name} value={category.name} className="text-foreground">
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Media Buttons */}
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, 'image')}
                    />
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      className="rounded-full text-muted-foreground hover:text-primary"
                      onClick={() => openFileDialog(fileInputRef)}
                    >
                      <ImageIcon className="h-5 w-5" />
                      <span className="sr-only">Add photo</span>
                    </Button>

                    <input
                      type="file"
                      ref={videoInputRef}
                      accept="video/*"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, 'video')}
                    />
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      className="rounded-full text-muted-foreground hover:text-primary"
                      onClick={() => openFileDialog(videoInputRef)}
                    >
                      <VideoIcon className="h-5 w-5" />
                      <span className="sr-only">Add video</span>
                    </Button>

                    <input
                      type="file"
                      ref={docInputRef}
                      accept=".pdf,.doc,.docx,.txt"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, 'document')}
                    />
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      className="rounded-full text-muted-foreground hover:text-primary"
                      onClick={() => openFileDialog(docInputRef)}
                    >
                      <FileText className="h-5 w-5" />
                      <span className="sr-only">Add document</span>
                    </Button>

                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      className="rounded-full text-muted-foreground hover:text-primary"
                      onClick={handleLinkClick}
                    >
                      <Link2 className="h-5 w-5" />
                      <span className="sr-only">Add link</span>
                    </Button>
                  </div>
                  <Button className="rounded-full px-6">
                    Post
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Preview Area */}
            {selectedMedia && (
              <div className="mt-4 border-t border-border/20 pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {selectedMedia.type === 'image' && <ImageIcon className="h-5 w-5 text-primary" />}
                    {selectedMedia.type === 'video' && <VideoIcon className="h-5 w-5 text-primary" />}
                    {selectedMedia.type === 'document' && <FileText className="h-5 w-5 text-primary" />}
                    <span className="text-sm font-medium truncate max-w-[200px]">
                      {selectedMedia.file.name}
                    </span>
                  </div>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                    onClick={() => setSelectedMedia(null)}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </div>
                {selectedMedia.type === 'image' && (
                  <div className="mt-2 rounded-lg overflow-hidden">
                    <img 
                      src={URL.createObjectURL(selectedMedia.file)} 
                      alt="Preview" 
                      className="max-h-40 w-auto max-w-full object-cover rounded"
                    />
                  </div>
                )}
                {selectedMedia.type === 'video' && (
                  <div className="mt-2 rounded-lg overflow-hidden bg-black/5 dark:bg-white/5">
                    <video 
                      src={URL.createObjectURL(selectedMedia.file)}
                      controls
                      className="max-h-40 w-full object-contain rounded"
                    />
                  </div>
                )}
              </div>
            )}
          </motion.div>

          {/* Hero Section with Featured Post */}
          <motion.article 
            variants={fadeIn}
            className="relative rounded-2xl overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
            <img 
              src={featuredPost.image.src} 
              alt={featuredPost.title}
              className="w-full h-[400px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
              <Badge className="mb-4 bg-primary/20 hover:bg-primary/30 text-primary-foreground border-primary/30">
                Featured Post
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-primary-foreground transition-colors">
                {featuredPost.title}
              </h1>
              <p className="text-muted-foreground text-white/90 mb-6 max-w-2xl">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center gap-4">
                <Button variant="secondary" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  Read Article
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <Calendar className="h-4 w-4" />
                  <span>{featuredPost.date}</span>
                  <span>•</span>
                  <span>{featuredPost.readTime}</span>
                </div>
              </div>
            </div>
          </motion.article>


          {/* Trending Now */}
          <motion.div 
            variants={fadeIn}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Trending Now</h2>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                See all
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </motion.div>

          {/* Feed Tabs */}
          <motion.div 
            variants={fadeIn}
            className="flex items-center border-b border-border/30 pb-2"
          >
            {[
              { id: 'trending', label: 'Trending', icon: <Flame className="h-4 w-4 text-orange-500" /> },
              { id: 'latest', label: 'Latest', icon: <TrendingUp className="h-4 w-4 text-blue-500" /> },
              { id: 'following', label: 'Following', icon: <History className="h-4 w-4 text-green-500" /> }
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
                    <Card className="overflow-hidden border-border/20 hover:shadow-lg transition-all duration-300 group hover:border-primary/30">
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
          className="space-y-8"
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

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-border/30 overflow-hidden">
              <CardHeader className="pb-3 border-b border-border/20">
                <CardTitle className="text-lg flex items-center gap-2">
                  <LayoutGrid className="h-5 w-5 text-primary" />
                  <span>Categories</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border/30">
                  {categories.map((category, index) => (
                    <div 
                      key={index}
                      className="px-4 py-3 hover:bg-muted/30 transition-colors cursor-pointer flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-muted-foreground group-hover:text-primary transition-colors">
                          {category.icon}
                        </span>
                        <span className="text-sm font-medium group-hover:text-primary transition-colors">
                          {category.name}
                        </span>
                      </div>
                      <Badge variant="secondary" className="px-2 py-0.5 text-xs">
                        {category.count}
                      </Badge>
                    </div>
                  ))}
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