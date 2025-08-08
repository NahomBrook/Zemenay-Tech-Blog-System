'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useAnimation, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, BookOpen, Code, Users, MessageSquare, Zap, Layout, UserPlus, Share2, Star, Sparkles, CheckCircle, ArrowDown, Github, Twitter, Linkedin, Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const FeatureCard = ({ icon, title, description }) => (
  <motion.div 
    variants={item}
    className="group relative bg-gradient-to-br from-card to-card/80 backdrop-blur-sm p-6 rounded-2xl border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:bg-gradient-to-br hover:from-card/90 hover:to-card/70"
    whileHover={{ scale: 1.02 }}
  >
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="relative z-10">
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-foreground dark:text-foreground mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-muted-foreground dark:text-muted-foreground">
        {description}
      </p>
    </div>
  </motion.div>
);

const StepCard = ({ number, icon, title, description }) => (
  <motion.div 
    variants={item}
    className="relative bg-gradient-to-br from-card to-card/80 backdrop-blur-sm p-6 rounded-2xl border border-border/50 shadow-lg group"
    whileHover={{ y: -5 }}
  >
    <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
      {number}
    </div>
    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-foreground dark:text-foreground mb-2">
      {title}
    </h3>
    <p className="text-muted-foreground dark:text-muted-foreground">
      {description}
    </p>
  </motion.div>
);

const TestimonialCard = ({ name, role, content, avatar }) => (
  <motion.div 
    variants={item}
    className="relative bg-gradient-to-br from-card to-card/80 backdrop-blur-sm p-6 rounded-2xl border border-border/50 shadow-lg h-full"
    whileHover={{ y: -5 }}
  >
    <div className="flex items-center mb-4">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/30 flex items-center justify-center text-primary mr-4">
        {name.charAt(0)}
      </div>
      <div>
        <h4 className="font-medium text-foreground dark:text-foreground">{name}</h4>
        <p className="text-sm text-muted-foreground dark:text-muted-foreground">{role}</p>
      </div>
    </div>
    <p className="text-foreground dark:text-foreground">"{content}"</p>
    <div className="flex mt-4 text-amber-400">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-current" />
      ))}
    </div>
  </motion.div>
);

// Floating animation for decorative elements
const floatingAnimation = (i: number) => {
  const duration = 5 + Math.random() * 5;
  const delay = i * 0.5;
  
  return {
    initial: { y: 0 },
    animate: {
      y: [0, -15, 0],
      transition: {
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
        repeatType: 'reverse' as const
      }
    }
  };
};

const Landing = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  // Text reveal animation
  const textReveal = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }
    })
  };
  
  // Button hover animation
  const buttonHover = {
    scale: 1.05,
    transition: { 
      type: 'spring', 
      stiffness: 400, 
      damping: 10 
    }
  };
  
  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden';
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

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
    <div className="relative overflow-hidden bg-gradient-to-b from-background via-background to-background/95">
      {/* Scroll Progress Indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary/50 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:20px_20px] opacity-5" />
        
        {/* Animated floating elements */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl"
          initial={{ y: 0 }}
          animate={{
            y: [0, -15, 0],
            transition: {
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5,
              repeatType: 'reverse' as const
            }
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-secondary/10 blur-3xl"
          initial={{ y: 0 }}
          animate={{
            y: [0, -15, 0],
            transition: {
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
              repeatType: 'reverse' as const
            }
          }}
        />
      </div>

      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden bg-background/95 backdrop-blur-lg border-t border-border/10"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                {['Features', 'Pricing', 'Blog', 'About'].map((item) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="py-3 text-foreground/80 hover:text-primary transition-colors border-b border-border/10"
                    onClick={() => setIsMenuOpen(false)}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item}
                  </motion.a>
                ))}
                <motion.div
                  className="pt-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Link 
                    href="/auth/signup" 
                    className="block w-full text-center px-4 py-3 bg-gradient-to-r from-primary to-primary/90 text-white rounded-lg font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section 
        className="relative pt-24 pb-40 md:pt-32 md:pb-56 overflow-hidden min-h-screen flex items-center mt-16 transition-opacity duration-500"
        style={{ opacity: isMounted ? 1 : 0, transform: isMounted ? 'translateY(0)' : 'translateY(20px)' }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    type: 'spring', 
                    stiffness: 100 
                  } 
                }
              }}
            >
              <Sparkles className="h-4 w-4" />
              <span>Join our growing community</span>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80 mb-6 leading-tight"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1]
                  }
                }
              }}
            >
              <motion.span 
                className="block"
                custom={0}
                variants={textReveal}
              >
                Empowering Developers
              </motion.span>
              <motion.span 
                className="inline-block mt-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text"
                custom={1}
                variants={textReveal}
              >
                Worldwide
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
              custom={2}
              variants={textReveal}
            >
              Join thousands of developers sharing knowledge, solving problems, and growing together in our vibrant community.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              custom={3}
              variants={textReveal}
            >
              {/* Different styles for both buttons: "Start Your Journey" and "Explore features"*/}
              <motion.div
                whileHover={buttonHover}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href="/auth/signup" 
                  className="group relative px-8 py-4 bg-gradient-to-r from-primary to-primary/90 text-white rounded-xl font-medium overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 block"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Start Your Journey
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </motion.div>
              
              <motion.button 
                onClick={scrollToFeatures}
                className="group px-8 py-4 border border-border/50 bg-background/50 backdrop-blur-sm rounded-xl font-medium text-foreground hover:bg-accent/50 hover:border-accent/50 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2"
                whileHover={{ 
                  x: 5,
                  transition: { type: 'spring', stiffness: 400, damping: 10 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/auth/signup">Explore Features</Link>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>

            <motion.div 
              className="mt-24 relative"
              custom={4}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: (i) => ({
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.1 * i + 0.3,
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1]
                  }
                })
              }}
            >
              <div className="relative mx-auto max-w-5xl rounded-3xl border border-border/30 bg-gradient-to-br from-card/80 to-card/50 backdrop-blur-sm p-1 shadow-2xl shadow-primary/5 overflow-hidden">
                {/* Animated border gradient */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
                  initial={{ backgroundPosition: '0% 0%' }}
                  animate={{
                    backgroundPosition: '100% 100%',
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: 'reverse' as const,
                    ease: 'linear' as const
                  }}
                />
                
                <div className="relative w-full max-w-3xl mx-auto bg-background/80 backdrop-blur-sm rounded-lg border border-border/50 overflow-hidden">
                  <div className="flex items-center px-4 py-2 bg-muted/50 border-b border-border/50">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-xs text-muted-foreground mx-auto font-mono">example.jsx</div>
                  </div>
                  <div className="p-4 font-mono text-sm">
                    <div className="flex">
                      <span className="text-muted-foreground/50 w-8 text-right pr-4">1</span>
                      <span className="text-blue-400">import</span> <span className="text-foreground">React</span> <span className="text-foreground">from</span> <span className="text-yellow-400">&apos;react&apos;</span>;
                    </div>
                    <div className="flex">
                      <span className="text-muted-foreground/50 w-8 text-right pr-4">2</span>
                      <span className="text-blue-400">import</span> <span className="text-foreground">&#123; motion &#125;</span> <span className="text-foreground">from</span> <span className="text-yellow-400">&apos;framer-motion&apos;</span>;
                    </div>
                    <div className="h-4"></div>
                    <div className="flex">
                      <span className="text-muted-foreground/50 w-8 text-right pr-4">3</span>
                      <span className="text-blue-400">const</span> <span className="text-foreground">AnimatedBox</span> <span className="text-foreground">=</span> <span className="text-foreground">()</span> <span className="text-foreground">=&gt;</span> <span className="text-foreground">(</span>
                    </div>
                    <div className="flex">
                      <span className="text-muted-foreground/50 w-8 text-right pr-4">4</span>
                      <span className="text-foreground">  </span><span className="text-purple-400">&lt;motion.div</span>
                    </div>
                    <div className="flex">
                      <span className="text-muted-foreground/50 w-8 text-right pr-4">5</span>
                      <span className="text-foreground">    </span><span className="text-purple-400">initial</span><span className="text-foreground">=&#123;&#123; opacity: 0 &#125;&#125;</span>
                    </div>
                    <div className="flex">
                      <span className="text-muted-foreground/50 w-8 text-right pr-4">6</span>
                      <span className="text-foreground">    </span><span className="text-purple-400">animate</span><span className="text-foreground">=&#123;&#123; opacity: 1 &#125;&#125;</span>
                    </div>
                    <div className="flex">
                      <span className="text-muted-foreground/50 w-8 text-right pr-4">7</span>
                      <span className="text-foreground">    </span><span className="text-purple-400">transition</span><span className="text-foreground">=&#123;&#123; duration: 0.5 &#125;&#125;</span>
                    </div>
                    <div className="flex">
                      <span className="text-muted-foreground/50 w-8 text-right pr-4">8</span>
                      <span className="text-foreground">  &gt;</span>
                    </div>
                    <div className="flex">
                      <span className="text-muted-foreground/50 w-8 text-right pr-4">9</span>
                      <span className="text-foreground">    Hello, World!</span>
                    </div>
                    <div className="flex">
                      <span className="text-muted-foreground/50 w-8 text-right pr-4">10</span>
                      <span className="text-foreground">  &lt;/</span><span className="text-purple-400">motion.div</span><span className="text-foreground">&gt;</span>
                    </div>
                    <div className="flex">
                      <span className="text-muted-foreground/50 w-8 text-right pr-4">11</span>
                      <span className="text-foreground">);</span>
                    </div>
                  </div>
                  
                  {/* Cursor animation */}
                  <motion.div 
                    className="absolute w-[2px] h-6 bg-primary left-[120px] top-1/2"
                    animate={{ 
                      y: [0, 20, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      ease: 'easeInOut' as const
                    }}
                  />
                </div>
              </div>
              
              {/* Decorative elements */}
              <motion.div 
                className="absolute -top-4 -left-4 w-32 h-32 rounded-full bg-primary/10 blur-3xl -z-10"
                animate={{
                  y: [0, -20, 0],
                  x: [0, 10, 0]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut'
                }}
              />
              <motion.div 
                className="absolute -bottom-4 -right-4 w-40 h-40 rounded-full bg-secondary/10 blur-3xl -z-10"
                animate={{
                  y: [0, 20, 0],
                  x: [0, -15, 0]
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                  delay: 1
                }}
              />
              
              {/* Scroll indicator */}
              <motion.div 
                className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center text-muted-foreground text-sm"
                animate={{
                  y: [0, 10, 0],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                <span>Scroll to explore</span>
                <ArrowDown className="h-5 w-5 mt-1" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Animated grid pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      {/* Features Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        </div>
        
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-1.5 text-sm font-medium text-primary/80 bg-primary/5 rounded-full mb-4 border border-primary/10">
              <Zap className="w-4 h-4 mr-2" />
              Powerful Features
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Why Choose Zemenay Tech?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We provide the best resources and community for tech enthusiasts.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        </div>
        
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-1.5 text-sm font-medium text-primary/80 bg-primary/5 rounded-full mb-4 border border-primary/10">
              <CheckCircle className="w-4 h-4 mr-2" />
              Simple Steps
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get started in just a few simple steps.
            </p>
          </motion.div>
          
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {steps.map((step, index) => (
              <StepCard 
                key={index}
                number={step.number}
                icon={step.icon}
                title={step.title}
                description={step.description}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        </div>
        
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-1.5 text-sm font-medium text-primary/80 bg-primary/5 rounded-full mb-4 border border-primary/10">
              <Users className="w-4 h-4 mr-2" />
              Community Voices
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              What Our Community Says
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of developers who are already part of our community.
            </p>
          </motion.div>
          
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={index}
                name={testimonial.name}
                role={testimonial.role}
                content={testimonial.content}
                avatar={testimonial.avatar}
              />
            ))}
          </motion.div>
          <div className="mt-16 text-center">
            <div className="inline-flex items-center justify-center space-x-4 bg-muted/50 py-3 px-6 rounded-full mx-auto">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-primary/10 border-2 border-background"></div>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">Join 100+ developers in our community</span>
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
              Join our community of 100+ developers and get access to exclusive resources, tutorials, and a supportive network.
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
          </div>

        </div>
      </section>
    </div>
  );
};

export default Landing;
