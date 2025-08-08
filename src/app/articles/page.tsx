'use client';

import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import { Image as ImageIcon, Video as VideoIcon, FileText, Link2, X, MessageSquare, ThumbsUp, Bookmark, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
  authorAvatar: string;
  date: string;
  category: string;
  likes: number;
  comments: number;
  image: string;
  tags: string[];
}

// Category colors mapping
const categoryColors: Record<string, string> = {
  'Web Development': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  'Mobile': 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
  'UI/UX': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
  'DevOps': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  'Data Science': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
};

// Sample articles data
const sampleArticles: Article[] = [
  {
    id: '1',
    title: 'Getting Started with Next.js 14',
    content: 'Learn how to build modern web applications with the latest features of Next.js 14, including server components, app directory, and more.',
    author: 'Sarah Johnson',
    authorAvatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    date: '2025-06-15T10:30:00Z',
    category: 'Web Development',
    likes: 42,
    comments: 8,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    tags: ['Next.js', 'React', 'JavaScript']
  },
  {
    id: '2',
    title: 'Building Cross-Platform Mobile Apps',
    content: 'Learn how to build native mobile apps for iOS and Android using React Native and Flutter with best practices.',
    author: 'Michael Chen',
    authorAvatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    date: '2025-06-10T14:20:00Z',
    category: 'Mobile',
    likes: 36,
    comments: 12,
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    tags: ['React Native', 'Flutter', 'Mobile Development']
  },
  {
    id: '3',
    title: 'UI/UX Design Principles',
    content: 'Master the essential UI/UX design principles to create intuitive and engaging user experiences.',
    author: 'Emma Wilson',
    authorAvatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    date: '2025-06-05T09:15:00Z',
    category: 'UI/UX',
    likes: 28,
    comments: 5,
    image: 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    tags: ['Design', 'User Experience', 'UI Patterns']
  },
  {
    id: '4',
    title: 'Building Scalable Microservices',
    content: 'Best practices for designing, deploying, and maintaining microservices at scale with Kubernetes and Docker.',
    author: 'David Kim',
    authorAvatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    date: '2025-06-28T16:20:00Z',
    category: 'DevOps',
    likes: 31,
    comments: 7,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    tags: ['Microservices', 'DevOps', 'Cloud']
  },
  {
    id: '5',
    title: 'The Complete Guide to React Native 2023',
    content: 'Build cross-platform mobile apps with React Native and learn about the latest features and performance optimizations.',
    author: 'Alex Turner',
    authorAvatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    date: '2025-04-20T11:10:00Z',
    category: 'Mobile',
    likes: 29,
    comments: 6,
    image: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    tags: ['React Native', 'Mobile', 'JavaScript']
  },
  {
    id: '6',
    title: 'UI/UX Design Principles for Developers',
    content: 'Essential UI/UX principles every developer should know to create better user experiences in their applications.',
    author: 'Sophia Lee',
    authorAvatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    date: '2025-05-15T13:25:00Z',
    category: 'UI/UX',
    likes: 34,
    comments: 9,
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80',
    tags: ['UI/UX', 'Design', 'Frontend']
  },
  {
    id: '7',
    title: 'Data Science with Python: A Practical Guide',
    content: 'Learn how to use Python for data analysis, visualization, and machine learning with real-world examples.',
    author: 'James Wilson',
    authorAvatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    date: '2025-05-10T09:45:00Z',
    category: 'Data Science',
    likes: 27,
    comments: 4,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    tags: ['Python', 'Data Science', 'Machine Learning']
  },
  {
    id: '8',
    title: 'Cloud Architecture Patterns',
    content: 'Explore common cloud architecture patterns and best practices for building scalable and resilient applications.',
    author: 'Olivia Chen',
    authorAvatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    date: '2025-06-05T15:30:00Z',
    category: 'DevOps',
    likes: 33,
    comments: 7,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80',
    tags: ['Cloud', 'AWS', 'Azure', 'GCP']
  },
  {
    id: '9',
    title: 'Web Security Best Practices',
    content: 'Essential security practices every web developer should implement to protect their applications from common vulnerabilities.',
    author: 'Daniel Park',
    authorAvatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    date: '2025-07-28T10:20:00Z',
    category: 'DevOps',
    likes: 25,
    comments: 3,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    tags: ['Security', 'Web Dev', 'Best Practices']
  },
  {
    id: '10',
    title: 'Introduction to Blockchain Development',
    content: 'A beginner\'s guide to blockchain technology and how to get started with smart contract development.',
    author: 'Rachel Kim',
    authorAvatar: 'https://randomuser.me/api/portraits/women/5.jpg',
    date: '2025-08-22T14:15:00Z',
    category: 'DevOps',
    likes: 30,
    comments: 5,
    image: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-4.3.1&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80',
    tags: ['Blockchain', 'Ethereum', 'Smart Contracts']
  },
];

// Get all unique categories from the sample articles
const allCategories = Array.from(new Set(sampleArticles.map(article => article.category)));

const ArticlesList = () => {
  const [posts, setPosts] = useState<Article[]>(sampleArticles);
  const [newPost, setNewPost] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedMedia, setSelectedMedia] = useState<{ file: File; type: 'image' | 'video' | 'document' | 'link' } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);

  // Filter posts based on selected category
  const filteredPosts = selectedCategory === 'All' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

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

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim() && !selectedMedia) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newArticle: Article = {
        id: Date.now().toString(),
        title: newPost.split('\n')[0].substring(0, 50) + (newPost.length > 50 ? '...' : '') || 'New Post',
        content: newPost || 'Check out this post!',
        author: 'You',
        authorAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        date: new Date().toISOString(),
        category: 'General',
        likes: 0,
        comments: 0,
        image: selectedMedia?.type === 'image' ? URL.createObjectURL(selectedMedia.file) : 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80',
        tags: ['New']
      };

      setPosts([newArticle, ...posts]);
      setNewPost('');
      setSelectedMedia(null);
      setIsSubmitting(false);
    }, 1000);
  };

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

  // Categories for the blog
  const categories = [
    { name: 'Web Development' },
    { name: 'Mobile' },
    { name: 'UI/UX' },
    { name: 'DevOps' },
    { name: 'Data Science' }
  ];

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Header */}
      <motion.div 
        variants={fadeIn}
        className="mb-10 text-center"
      >
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
          Latest Articles
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Discover the latest insights, tutorials, and news in the world of technology and development.
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Create Post Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-card rounded-xl border border-border/30 p-6 shadow-sm backdrop-blur-sm mb-8"
        >
          <form onSubmit={handlePostSubmit}>
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
                  <Textarea
                    placeholder="Share your thoughts, ideas, or updates..."
                    className="w-full min-h-[80px] p-3 bg-transparent rounded-xl border-0 focus:ring-0 resize-none text-foreground placeholder:text-muted-foreground/60"
                    rows={3}
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
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
                  <Button 
                    type="submit" 
                    className="rounded-full px-6"
                    disabled={isSubmitting || (!newPost.trim() && !selectedMedia)}
                  >
                    {isSubmitting ? 'Posting...' : 'Post'}
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
          </form>
        </motion.div>
        

        {/* Category Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-8 p-4 bg-card rounded-lg shadow-sm border border-border/30 overflow-x-auto"
        >
          <button
            key="all"
            onClick={() => setSelectedCategory('All')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all whitespace-nowrap border ${
              selectedCategory === 'All'
                ? 'bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20 dark:shadow-primary/10'
                : 'text-foreground/80 dark:text-foreground/80 hover:bg-muted/50 border-border/50 hover:border-border/80 dark:border-border/30 dark:hover:border-border/60'
            }`}
          >
            All
          </button>
          {allCategories.map((category) => {
            const [lightBg, lightText, lightHover, darkBg, darkText] = categoryColors[category].split(' ');
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all whitespace-nowrap border ${
                  selectedCategory === category
                    ? `${lightBg} ${lightText} ${darkBg} ${darkText} shadow-md ${lightBg.replace('bg-', 'shadow-')}/20 dark:${darkBg.replace('dark:bg-', 'shadow-')}/10`
                    : 'text-foreground/80 dark:text-foreground/80 hover:bg-muted/50 border-border/50 hover:border-border/80 dark:border-border/30 dark:hover:border-border/60'
                }`}
              >
                {category}
              </button>
            );
          })}
        </motion.div>

        {/* Articles List */}
        <motion.div 
          variants={fadeIn}
          className="space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((article) => {
            const categoryColor = categoryColors[article.category] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
            
            return (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}
                className="group relative bg-card rounded-xl border border-border/30 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full"
              >
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden bg-muted/50">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 text-xs font-medium bg-black/30 text-white rounded-full backdrop-blur-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col bg-background/50 backdrop-blur-sm">
                  {/* Category and Date */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${categoryColor}`}>
                      {article.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(article.date), { addSuffix: true })}
                    </span>
                  </div>

                  {/* Title and Excerpt */}
                  <Link href={`/articles/${article.id}`} className="block group-hover:text-primary transition-colors">
                    <h3 className="text-xl font-bold mb-2 line-clamp-2 leading-tight">{article.title}</h3>
                  </Link>
                  <p className="text-muted-foreground mb-4 line-clamp-3 text-sm">{article.content}</p>

                  {/* Author and Actions */}
                  <div className="mt-auto pt-4 border-t border-border/20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8 border border-border/20">
                        <AvatarImage src={article.authorAvatar} alt={article.author} />
                        <AvatarFallback className="text-xs bg-muted/50">
                          {article.author.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{article.author}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(article.date), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground">
                        <ThumbsUp className="h-4 w-4" />
                        <span className="sr-only">Like</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground">
                        <MessageSquare className="h-4 w-4" />
                        <span className="sr-only">Comments</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground">
                        <Bookmark className="h-4 w-4" />
                        <span className="sr-only">Save</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
    </motion.div>
  );
};

export default ArticlesList;