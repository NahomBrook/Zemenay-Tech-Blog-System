'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import { Image as ImageIcon, Video as VideoIcon, FileText, Link2, X, MessageSquare, ThumbsUp, Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';

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
  'Frontend': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
  'Backend': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  'DevOps': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  'Mobile': 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
  'UI/UX': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
};

// Available categories as objects with name (excluding 'All' as it's added separately)
const availableCategories = [
  { name: 'Web Development' },
  { name: 'Frontend' },
  { name: 'Backend' },
  { name: 'DevOps' },
  { name: 'Mobile' },
  { name: 'UI/UX' },
].filter(cat => cat.name !== 'All');

const ArticlesList = () => {
  const [posts, setPosts] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newPost, setNewPost] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedMedia, setSelectedMedia] = useState<{ file: File; type: 'image' | 'video' | 'document' | 'link' } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Get all unique categories from both available and post categories
  const allCategories = React.useMemo(() => {
    // Get unique categories from posts
    const postCategories = [...new Set(posts.map(article => article.category))]
      .filter(cat => cat !== 'All')
      .map(cat => ({ name: cat }));
    
    // Combine with available categories and remove duplicates
    const combined = [...availableCategories];
    postCategories.forEach(cat => {
      if (!combined.some(availCat => availCat.name === cat.name)) {
        combined.push(cat);
      }
    });
    
    return [{ name: 'All' }, ...combined];
  }, [posts]);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);

  // Fetch articles from the API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/articles');
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const data = await response.json();
        
        // Map API response to match the Article interface
        const formattedPosts = data.data.map((article: any) => ({
          id: article.id,
          title: article.title,
          content: article.excerpt || article.content.substring(0, 200) + '...',
          author: article.author?.name || 'Anonymous',
          authorAvatar: article.author?.image || '',
          date: new Date(article.createdAt).toLocaleDateString(),
          category: article.categories?.[0]?.name || 'Uncategorized',
          likes: article._count?.likes || 0,
          comments: article._count?.comments || 0,
          image: article.coverImage || '/placeholder-article.jpg',
          tags: article.tags?.map((tag: any) => tag.name) || []
        }));
        
        setPosts(formattedPosts);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError('Failed to load articles. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Filter posts based on selected category
  const filteredPosts = selectedCategory === 'All' 
    ? posts 
    : posts?.filter(post => post.category === selectedCategory);

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
        category: 'Web Development',
        likes: 0,
        comments: 0,
        image: selectedMedia?.type === 'image' ? URL.createObjectURL(selectedMedia.file) : 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80',
        tags: ['New']
      };

      //setPosts([newArticle, ...posts]);
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

  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Latest Articles
            </h1>
            <p className="mt-1 text-xl text-gray-500 dark:text-gray-400">
              Discover the latest insights and tutorials from our community
            </p>
          </div>
          {session && (
            <Link 
              href="/articles/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              New Post
            </Link>
          )}
        </div>
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
          {allCategories.map(({ name }) => {
            // Use a fallback color if the category is not found in the mapping
            const colorString = categoryColors[name] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
            const [lightBg, lightText, darkBg, darkText] = colorString.split(' ');
            return (
              <button
                key={name}
                onClick={() => setSelectedCategory(name)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all whitespace-nowrap border ${
                  selectedCategory === name
                    ? `${lightBg} ${lightText} ${darkBg} ${darkText} shadow-md ${lightBg.replace('bg-', 'shadow-')}/20 dark:${darkBg.replace('dark:bg-', 'shadow-')}/10`
                    : 'text-foreground/80 dark:text-foreground/80 hover:bg-muted/50 border-border/50 hover:border-border/80 dark:border-border/30 dark:hover:border-border/60'
                }`}
              >
                {name}
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
          {filteredPosts?.map((article) => {
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
    </div>
  );
};

export default ArticlesList;