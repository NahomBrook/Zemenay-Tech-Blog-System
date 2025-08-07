import React from 'react';
import { Bookmark, Clock, Flame, History, LayoutGrid, MessageSquare, Search, Settings, ThumbsUp, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

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

const quickActions = [
  { icon: <Search className="h-5 w-5" />, label: 'Search', path: '/search' },
  { icon: <Bookmark className="h-5 w-5" />, label: 'Bookmarks', path: '/bookmarks' },
  { icon: <History className="h-5 w-5" />, label: 'History', path: '/history' },
  { icon: <Settings className="h-5 w-5" />, label: 'Settings', path: '/settings' },
];

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 rounded-xl">
            <h1 className="text-2xl font-bold mb-2">Welcome back, User! 👋</h1>
            <p className="text-muted-foreground">Here's what's happening in your feed today</p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Button 
                key={index} 
                variant="outline" 
                className="flex flex-col items-center justify-center h-24 gap-2 hover:bg-accent/50 transition-colors"
                asChild
              >
                <a href={action.path}>
                  <span className="text-primary">{action.icon}</span>
                  <span className="text-sm font-medium">{action.label}</span>
                </a>
              </Button>
            ))}
          </div>

          {/* Personalized Feed */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <LayoutGrid className="h-5 w-5 text-primary" />
                Your Feed
              </h2>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                See all
              </Button>
            </div>

            <div className="space-y-6">
              {mockFeed.map((post) => (
                <Card key={post.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`/images/avatars/${post.author.toLowerCase().replace(/\s+/g, '-')}.jpg`} />
                        <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{post.author}</p>
                        <p className="text-xs text-muted-foreground">{post.date} · {post.readTime}</p>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{post.title}</CardTitle>
                    <CardDescription>{post.excerpt}</CardDescription>
                    <Badge variant="secondary" className="w-fit mt-2">{post.category}</Badge>
                  </CardHeader>
                  <CardFooter className="flex justify-between items-center pt-0">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4" />
                        {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        {post.comments}
                      </span>
                    </div>
                    <Button variant="ghost" size="icon" className={post.isBookmarked ? 'text-yellow-500' : 'text-muted-foreground'}>
                      <Bookmark className={`h-5 w-5 ${post.isBookmarked ? 'fill-current' : ''}`} />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search articles..."
              className="w-full pl-10 bg-background"
            />
          </div>

          {/* Recommended Articles */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Flame className="h-5 w-5 text-orange-500" />
                Trending Now
              </CardTitle>
              <CardDescription>Popular articles you might like</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendedArticles.map((article) => (
                <div key={article.id} className="group cursor-pointer">
                  <h3 className="font-medium group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
                  <div className="flex items-center justify-between mt-1">
                    <Badge variant="outline" className="text-xs">{article.category}</Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {article.readTime}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Saved Posts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Bookmark className="h-5 w-5 text-yellow-500" />
                Saved Posts
              </CardTitle>
              <CardDescription>Your bookmarked articles</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center py-4">
                You haven't saved any posts yet.
              </p>
              <Button variant="outline" className="w-full mt-2">
                Browse Articles
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomePage;