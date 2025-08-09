'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { ThumbsUp, MessageSquare, Bookmark, ArrowLeft, Share2, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

// This would normally be fetched from an API
const getArticleById = (id: string) => {
  // Mock data - in a real app, this would be an API call
  const mockArticles = [
    {
      id: '1',
      title: 'Getting Started with Next.js 14',
      content: `Next.js 14 introduces several exciting new features and improvements that make building React applications even more powerful and efficient. In this comprehensive guide, we'll explore the latest additions and how you can leverage them in your projects.\n\n## Server Components by Default\nOne of the biggest changes in Next.js 14 is that Server Components are now the default. This means better performance out of the box, as components are rendered on the server by default.\n\n## Improved Image Component\nThe next/image component has been enhanced with better performance optimizations and a more intuitive API.\n\n## Enhanced Developer Experience\nWith faster refresh times and better error messages, developing with Next.js 14 is smoother than ever.`,
      author: 'Sarah Johnson',
      authorAvatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      date: '2025-06-15T10:30:00Z',
      category: 'Web Development',
      likes: 42,
      comments: 8,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      tags: ['Next.js', 'React', 'JavaScript'],
      readTime: '5 min read'
    },
    // ... other articles
  ];
  
  return mockArticles.find(article => article.id === id);
};
const ArticleDetail = () => {
  const { id } = useParams();
  const article = getArticleById(id as string);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: '1',
      author: 'John Doe',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      content: 'Great article! Very informative and well-written.',
      date: '2025-06-15T12:30:00Z',
      likes: 5
    },
    {
      id: '2',
      author: 'Jane Smith',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      content: 'I learned a lot from this. Thanks for sharing!',
      date: '2025-06-15T14:45:00Z',
      likes: 2
    }
  ]);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showComments, setShowComments] = useState(true);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Article not found</h1>
          <Link href="/articles" className="text-primary hover:underline">
            Back to articles
          </Link>
        </div>
      </div>
    );
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    
    const newComment = {
      id: Date.now().toString(),
      author: 'Current User',
      avatar: '',
      content: comment,
      date: new Date().toISOString(),
      likes: 0
    };
    
    setComments([newComment, ...comments]);
    setComment('');
  };

  const toggleLike = () => setLiked(!liked);
  const toggleSave = () => setSaved(!saved);
  const toggleComments = () => setShowComments(!showComments);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <Link 
          href="/articles" 
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Articles
        </Link>
      </motion.div>

      {/* Article Header */}
      <motion.header
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="mb-8"
      >
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className={`px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200`}>
            {article.category}
          </span>
          <span className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(article.date), { addSuffix: true })}
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
          {article.title}
        </h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border border-border/20">
              <AvatarImage src={article.authorAvatar} alt={article.author} />
              <AvatarFallback className="text-xs bg-muted/50">
                {article.author.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{article.author}</p>
              <p className="text-sm text-muted-foreground">
                {article.category} Expert
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Share2 className="h-4 w-4" />
              <span className="sr-only">Share</span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More options</span>
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Article Image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="mb-10 rounded-xl overflow-hidden bg-muted/50"
      >
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-auto max-h-[500px] object-cover"
        />
      </motion.div>

      {/* Article Content */}
      <motion.article
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="prose prose-slate dark:prose-invert max-w-none mb-12"
      >
        {article.content.split('\n\n').map((paragraph, i) => {
          if (paragraph.startsWith('## ')) {
            return (
              <h2 key={i} className="text-2xl font-bold mt-8 mb-4">
                {paragraph.substring(3)}
              </h2>
            );
          }
          return (
            <p key={i} className="mb-4 text-foreground/90 leading-relaxed">
              {paragraph}
            </p>
          );
        })}
      </motion.article>

      {/* Tags */}
      <motion.div 
        className="flex flex-wrap gap-2 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {article.tags.map((tag) => (
          <span 
            key={tag} 
            className="px-3 py-1 text-sm bg-muted/50 rounded-full text-foreground/80 hover:bg-muted/80 transition-colors cursor-pointer"
          >
            #{tag}
          </span>
        ))}
      </motion.div>

      {/* Article Actions */}
      <motion.div 
        className="flex items-center justify-between py-6 border-t border-border/30 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            className={`flex items-center gap-2 ${liked ? 'text-red-500' : 'text-muted-foreground'}`}
            onClick={toggleLike}
          >
            <ThumbsUp className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
            <span>{liked ? article.likes + 1 : article.likes} Likes</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex items-center gap-2 text-muted-foreground"
            onClick={toggleComments}
          >
            <MessageSquare className="h-5 w-5" />
            <span>{article.comments} Comments</span>
          </Button>
        </div>
        <Button 
          variant={saved ? 'default' : 'outline'}
          className="flex items-center gap-2"
          onClick={toggleSave}
        >
          <Bookmark className={`h-4 w-4 ${saved ? 'fill-current' : ''}`} />
          <span>{saved ? 'Saved' : 'Save for later'}</span>
        </Button>
      </motion.div>

      {/* Comments Section */}
      {showComments && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="space-y-6"
        >
          <h3 className="text-xl font-semibold mb-6">Comments ({comments.length})</h3>
          
          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mb-8">
            <div className="flex items-start gap-3">
              <Avatar className="h-10 w-10 border border-border/20">
                <AvatarFallback className="text-xs bg-muted/50">
                  CU
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="Share your thoughts..."
                  className="min-h-[100px] resize-none"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <div className="flex justify-end mt-2">
                  <Button type="submit" disabled={!comment.trim()}>
                    Post Comment
                  </Button>
                </div>
              </div>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-3 group">
                <Avatar className="h-10 w-10 border border-border/20 flex-shrink-0">
                  {comment.avatar ? (
                    <AvatarImage src={comment.avatar} alt={comment.author} />
                  ) : (
                    <AvatarFallback className="text-xs bg-muted/50">
                      {comment.author.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="flex-1">
                  <div className="bg-muted/30 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{comment.author}</span>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(comment.date), { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-foreground/90">{comment.content}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <button className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                        <ThumbsUp className="h-3.5 w-3.5" />
                        <span>{comment.likes > 0 ? comment.likes : 'Like'}</span>
                      </button>
                      <button className="text-xs text-muted-foreground hover:text-foreground">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ArticleDetail;
