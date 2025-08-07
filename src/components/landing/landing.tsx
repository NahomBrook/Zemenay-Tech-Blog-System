import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Code, Users, MessageSquare, Zap, Layout, UserPlus, Share2, Star, Sparkles, CheckCircle } from 'lucide-react';

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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-background border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block px-4 py-1.5 text-sm font-medium text-primary bg-primary/10 rounded-full mb-6">
            Welcome to Zemenay Tech
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Empowering Developers <br />
            <span className="text-primary">Through Knowledge</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Discover the latest in technology, programming, and innovation. 
            Join our community of tech enthusiasts and stay ahead of the curve.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/get-started" 
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
            >
              Get Started for Free
            </Link>
            <Link 
              href="/about" 
              className="px-8 py-4 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all duration-300"
            >
              Learn More →
            </Link>
          </div>
          <div className="mt-12 flex justify-center">
            <div className="relative w-full max-w-4xl h-64 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl overflow-hidden shadow-inner">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="inline-flex items-center text-sm font-medium text-blue-600 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-4 shadow-sm">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Trusted by 10,000+ developers
                  </div>
                  <p className="text-gray-500">Join our growing community of tech enthusiasts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform provides all the tools and resources to help you grow as a developer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group bg-card p-8 rounded-xl border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-lg"
              >
                <div className="w-14 h-14 flex items-center justify-center bg-primary/10 rounded-xl text-primary mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  {React.cloneElement(feature.icon, { className: 'h-8 w-8' })}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                <div className="mt-4">
                  <span className="inline-flex items-center text-primary font-medium text-sm">
                    Learn more
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link 
              href="/features" 
              className="inline-flex items-center px-6 py-3 border border-border text-foreground font-medium rounded-lg hover:bg-accent transition-colors duration-300"
            >
              View all features
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get started in just a few simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-xl">{step.number}</span>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm h-full">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Loved by Developers Worldwide
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of developers who have accelerated their learning journey with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="group bg-card p-8 rounded-xl border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-xl group-hover:bg-primary/20 transition-colors duration-300">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-muted-foreground leading-relaxed italic">
                  "{testimonial.content}"
                </blockquote>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center justify-center space-x-4 bg-muted/50 py-3 px-6 rounded-full mx-auto">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-primary/10 border-2 border-background"></div>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">Join 10,000+ developers in our community</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-primary/5 to-primary/10 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Ready to level up your <span className="text-primary">tech journey</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Join our community of 10,000+ developers and get access to exclusive resources, tutorials, and a supportive network.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
              <Link 
                href="/auth/signup" 
                className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                Get Started for Free
              </Link>
              <Link 
                href="/about" 
                className="px-8 py-4 bg-background text-foreground border border-border rounded-lg font-medium hover:bg-accent transition-all duration-300 shadow-sm hover:shadow"
              >
                Learn More
              </Link>
            </div>
            
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-1.5" />
                <span>No credit card required</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-border" />
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-1.5" />
                <span>7-day free trial</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-border" />
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-1.5" />
                <span>Cancel anytime</span>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex flex-wrap items-center justify-center gap-6">
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background"></div>
                    ))}
                  </div>
                  <div className="ml-3 text-left">
                    <div className="text-sm text-muted-foreground">Trusted by developers at</div>
                    <div className="flex flex-wrap items-center gap-x-2">
                      {['Google', 'Microsoft', 'Amazon', 'Netflix'].map((company, i) => (
                        <span key={i} className="text-sm font-medium text-foreground">
                          {company}{i < 3 ? ',' : ''}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    
  );
};

export default Landing;
