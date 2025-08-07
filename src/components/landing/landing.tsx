import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Code, Users, MessageSquare, Zap, Layout, UserPlus, Share2, Star } from 'lucide-react';

const Landing = () => {
  // Features data
  const features = [
    { icon: <BookOpen className="h-8 w-8 text-blue-600" />, title: 'Quality Content', description: 'In-depth articles and tutorials on the latest technologies and trends.' },
    { icon: <Code className="h-8 w-8 text-blue-600" />, title: 'Code Examples', description: 'Practical code snippets and examples to help you learn by doing.' },
    { icon: <Users className="h-8 w-8 text-blue-600" />, title: 'Community', description: 'Connect with like-minded developers and tech enthusiasts.' },
    { icon: <MessageSquare className="h-8 w-8 text-blue-600" />, title: 'Discussions', description: 'Engage in meaningful discussions in the comments section.' },
    { icon: <Zap className="h-8 w-8 text-blue-600" />, title: 'Latest Updates', description: 'Stay updated with the fast-paced world of technology.' },
    { icon: <Layout className="h-8 w-8 text-blue-600" />, title: 'Responsive Design', description: 'Read comfortably on any device, anywhere, anytime.' }
  ];

  // How it works steps
  const steps = [
    { number: '01', icon: <UserPlus className="h-6 w-6 text-white" />, title: 'Create an Account', description: 'Sign up for free and set up your profile in seconds.' },
    { number: '02', icon: <BookOpen className="h-6 w-6 text-white" />, title: 'Explore Articles', description: 'Browse through our extensive collection of tech articles.' },
    { number: '03', icon: <MessageSquare className="h-6 w-6 text-white" />, title: 'Engage', description: 'Like, comment, and share your thoughts with the community.' },
    { number: '04', icon: <Share2 className="h-6 w-6 text-white" />, title: 'Share Knowledge', description: 'Contribute your own articles and help others learn.' }
  ];

  // Testimonials
  const testimonials = [
    { name: 'Alemayehu T.', role: 'Software Engineer', content: 'This platform has been instrumental in my learning journey. The quality of content is exceptional!', avatar: '/images/avatars/avatar-1.jpg' },
    { name: 'Sara M.', role: 'UI/UX Designer', content: 'I love how the community engages with each other. It\'s more than just a blog, it\'s a family.', avatar: '/images/avatars/avatar-2.jpg' },
    { name: 'Yohannes K.', role: 'Full-stack Developer', content: 'The tutorials are well-structured and easy to follow. Highly recommended for all skill levels.', avatar: '/images/avatars/avatar-3.jpg' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-20 md:py-28 lg:py-36">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 to-indigo-900/90"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Welcome to <span className="text-blue-300">Zemenay Tech Blog</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Discover, share, and connect with the latest in technology, development, and innovation in Ethiopia's tech community.
            </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-6 text-lg font-semibold rounded-lg transition-all transform hover:scale-105">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/blog">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold rounded-lg">
                Explore Articles
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default Landing;
