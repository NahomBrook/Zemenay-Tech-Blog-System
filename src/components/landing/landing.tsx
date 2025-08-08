'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { ArrowRight, BookOpen, Code, Users, MessageSquare, Zap, Layout, UserPlus, Share2, Star, Sparkles, CheckCircle, ArrowDown } from 'lucide-react';

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

interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string }> | React.ReactElement;
  title: string;
  description: string;
  index: number;
}

const FeatureCard = ({ icon, title, description, index }: FeatureCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      variants={item}
      className="group relative bg-gradient-to-br from-card to-card/80 backdrop-blur-sm p-6 rounded-2xl border border-border/50 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/20 hover:from-card/90 hover:to-card/70 overflow-hidden"
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100"
        animate={{ 
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.95
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />
      <div className="relative z-10">
        <motion.div 
          className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
          whileHover={{ 
            rotate: [0, 5, -5, 5, 0],
            transition: { duration: 0.8 }
          }}
        >
          {React.isValidElement(icon) ? (
            React.cloneElement(icon as React.ReactElement, {
              className: `${(icon as React.ReactElement).props?.className || ''} transition-transform duration-300 group-hover:scale-125`
            })
          ) : (
            <div className="transition-transform duration-300 group-hover:scale-125">
              {React.createElement(icon as React.ComponentType<{ className?: string }>, { className: 'w-6 h-6' })}
            </div>
          )}
        </motion.div>
        <h3 className="text-xl font-semibold text-foreground dark:text-foreground mb-3 group-hover:text-primary transition-colors">
          {title}
          <motion.div 
            className="h-0.5 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 w-0 group-hover:w-full mt-2"
            transition={{ duration: 0.6, delay: 0.1 }}
          />
        </h3>
        <p className="text-muted-foreground dark:text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

interface StepCardProps {
  number: number;
  icon: React.ReactElement;
  title: string;
  description: string;
  index: number;
  totalSteps: number;
}

const StepCard = ({ number, icon, title, description, index, totalSteps }: StepCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const isLast = index === totalSteps - 1;
  
  return (
    <div className="relative">
      {/* Timeline connector */}
      {!isLast && (
        <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 to-transparent" />
      )}
      
      <motion.div 
        variants={item}
        className="relative bg-gradient-to-br from-card to-card/80 backdrop-blur-sm p-6 rounded-2xl border border-border/50 shadow-lg group h-full"
        whileHover={{ y: -5 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: 0.1 * index, duration: 0.6 }}
      >
        {/* Animated number badge */}
        <motion.div 
          className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg z-10"
          animate={{
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? [0, 10, -10, 0] : 0,
            boxShadow: isHovered 
              ? '0 10px 25px -5px rgba(59, 130, 246, 0.4), 0 8px 10px -6px rgba(59, 130, 246, 0.4)' 
              : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          }}
          transition={{
            scale: { duration: 0.2 },
            rotate: { duration: 0.6 },
            boxShadow: { duration: 0.3 }
          }}
        >
          {number}
        </motion.div>
        
        <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
          {React.cloneElement(icon, {
            className: `${icon.props.className} transition-transform duration-300 group-hover:scale-110`
          })}
        </div>
        
        <h3 className="text-xl font-semibold text-foreground dark:text-foreground mb-3 flex items-center">
          {title}
          <motion.span 
            className="ml-2 text-primary opacity-0 group-hover:opacity-100"
            animate={{ 
              x: isHovered ? [0, 5, 0] : 0,
              opacity: isHovered ? 1 : 0
            }}
            transition={{ 
              x: { duration: 1, repeat: Infinity },
              opacity: { duration: 0.3 }
            }}
          >
            →
          </motion.span>
        </h3>
        
        <p className="text-muted-foreground dark:text-muted-foreground leading-relaxed">
          {description}
        </p>
        
        {/* Animated border highlight */}
        <motion.div 
          className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/20"
          animate={{
            borderWidth: isHovered ? 2 : 0,
            opacity: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </div>
  );
};

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  index: number;
}

const TestimonialCard = React.memo(function TestimonialCard({ name, role, content, index }: TestimonialCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  
  // Gradient animation for the avatar
  const avatarGradient = {
    hidden: { backgroundPosition: '0% 50%' },
    visible: {
      backgroundPosition: '200% 50%',
      transition: {
        duration: 10,
        repeat: Infinity,
        repeatType: 'loop' as const,
        ease: 'linear'
      }
    }
  };

  return (
    <motion.div 
      className="relative bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50 shadow-lg overflow-hidden"
      initial={isMounted ? { opacity: 0, y: 20 } : false}
      animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: isMounted ? index * 0.1 : 0, duration: 0.6 }}
      onHoverStart={() => isMounted && setIsHovered(true)}
      onHoverEnd={() => isMounted && setIsHovered(false)}
    >
      {/* Animated background highlight */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      <div className="relative z-10">
        <div className="flex items-center mb-4">
          <motion.div 
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4 relative overflow-hidden"
            variants={avatarGradient}
            initial="hidden"
            animate="visible"
            style={{
              background: `linear-gradient(90deg, 
                rgba(59, 130, 246, 0.7) 0%, 
                rgba(168, 85, 247, 0.7) 50%, 
                rgba(236, 72, 153, 0.7) 100%)`,
              backgroundSize: '200% 200%'
            }}
          >
            {name.charAt(0)}
            <motion.div 
              className="absolute inset-0 bg-white/10 rounded-full"
              animate={{ 
                scale: isHovered ? 1.5 : 1,
                opacity: isHovered ? 0.3 : 0
              }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
          
          <div>
            <h4 className="font-medium text-foreground dark:text-foreground flex items-center">
              {name}
              <motion.span 
                className="ml-2 text-primary text-xs bg-primary/10 px-2 py-0.5 rounded-full"
                animate={{ 
                  scale: isHovered ? [1, 1.1, 1] : 1,
                  rotate: isHovered ? [0, 5, -5, 0] : 0
                }}
                transition={{ 
                  scale: { duration: 0.5 },
                  rotate: { duration: 0.5 }
                }}
              >
                {role}
              </motion.span>
            </h4>
            <p className="text-sm text-muted-foreground dark:text-muted-foreground">Verified Member</p>
          </div>
        </div>
        
        <motion.p 
          className="text-foreground dark:text-foreground relative pl-4 border-l-2 border-primary/20"
          animate={{ 
            paddingLeft: isHovered ? '1.5rem' : '1rem',
            borderLeftWidth: isHovered ? '4px' : '2px'
          }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-3xl font-serif text-primary/30 absolute left-0 -top-2">"</span>
          {content}
          <span className="text-3xl font-serif text-primary/30 align-bottom">"</span>
        </motion.p>
        
        <div className="flex mt-4">
          {[1, 2, 3, 4, 5].map((_, i) => (
            <motion.div
              key={i}
              animate={isMounted ? {
                scale: isHovered ? [1, 1.3, 1] : 1,
                y: isHovered ? [-2, 2, -2] : 0
              } : {}}
              transition={{
                duration: 0.5,
                delay: isMounted ? i * 0.1 : 0,
                repeat: isMounted && isHovered ? Infinity : 0
              }}
            >
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Decorative elements */}
      <motion.div 
        className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-primary/5"
          animate={isMounted ? {
            scale: isHovered ? 1.5 : 1,
            opacity: isHovered ? 0.8 : 0.3
          } : {}}
          transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
});

const Landing = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const [isMounted, setIsMounted] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const texts = ['Empowering Developers', 'Building Community', 'Sharing Knowledge'];
  const [displayText, setDisplayText] = useState('');
  const [typingForward, setTypingForward] = useState(true);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [animationValues, setAnimationValues] = useState({
    duration1: 0,
    duration2: 0,
    delay1: 0,
    delay2: 0
  });
  
  // Set mounted state after component mounts (client-side only)
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
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
  
  // Set up client-side only values and effects
  useEffect(() => {
    const handleMount = () => {
      setIsMounted(true);
      // Set random animation values only on client side
      setAnimationValues({
        duration1: 5 + Math.random() * 5,
        duration2: 5 + Math.random() * 5,
        delay1: 0.5,
        delay2: 1
      });
    };
    
    if (typeof window !== 'undefined') {
      handleMount();
    }
    
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const typeText = () => {
      const currentText = texts[currentTextIndex];

      if (typingForward) {
        if (currentCharIndex < currentText.length) {
          setDisplayText(currentText.substring(0, currentCharIndex + 1));
          setCurrentCharIndex(prev => prev + 1);
        } else {
          setTimeout(() => setTypingForward(false), 2000);
        }
      } else {
        if (currentCharIndex > 0) {
          setDisplayText(currentText.substring(0, currentCharIndex - 1));
          setCurrentCharIndex(prev => prev - 1);
        } else {
          setTypingForward(true);
          setCurrentTextIndex(prev => (prev + 1) % texts.length);
        }
      }
    };

    const timer = setTimeout(typeText, typingForward ? 100 : 50);
    return () => clearTimeout(timer);
  }, [currentCharIndex, currentTextIndex, typingForward, isMounted, texts]);

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
    { number: 1, icon: <UserPlus className="h-6 w-6 text-white" />, title: 'Create an Account', description: 'Sign up for free and set up your profile in seconds.' },
    { number: 2, icon: <BookOpen className="h-6 w-6 text-white" />, title: 'Explore Articles', description: 'Browse through our extensive collection of tech articles.' },
    { number: 3, icon: <MessageSquare className="h-6 w-6 text-white" />, title: 'Engage', description: 'Like, comment, and share your thoughts with the community.' },
    { number: 4, icon: <Share2 className="h-6 w-6 text-white" />, title: 'Share Knowledge', description: 'Contribute your own articles and help others learn.' }
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
        {isMounted && (
          <>
            <motion.div 
              className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl"
              initial={{ y: 0 }}
              animate={{
                y: [0, -15, 0],
                transition: {
                  duration: animationValues.duration1,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: animationValues.delay1,
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
                  duration: animationValues.duration2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: animationValues.delay2,
                  repeatType: 'reverse' as const
                }
              }}
            />
          </>
        )}
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

            <motion.div 
              className="relative min-h-[200px] md:min-h-[250px] lg:min-h-[300px] flex flex-col justify-center"
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
              <motion.div 
                className="text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80 leading-tight"
                custom={0}
                variants={textReveal}
              >
                {displayText}
                <motion.span 
                  className="inline-block w-1 h-16 bg-primary ml-1 -mb-4"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, repeatType: 'loop' }}
                />
              </motion.div>
              <motion.div 
                className="text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 mt-2"
                custom={1}
                variants={textReveal}
              >
                Worldwide
              </motion.div>
              
              {/* Decorative elements */}
              <motion.div 
                className="absolute -left-10 -top-10 w-20 h-20 rounded-full bg-primary/10 blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
              <motion.div 
                className="absolute -right-10 bottom-0 w-32 h-32 rounded-full bg-primary/5 blur-xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1
                }}
              />
            </motion.div>
            
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
                <motion.div
                  className="relative"
                  whileHover="hover"
                  initial="initial"
                  animate="animate"
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/60 rounded-xl opacity-0 group-hover:opacity-100 blur-md"
                    variants={{
                      initial: { opacity: 0, scale: 0.8 },
                      hover: { 
                        opacity: 1, 
                        scale: 1.1,
                        transition: { duration: 0.3 }
                      },
                      animate: {
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                        transition: {
                          duration: 4,
                          repeat: Infinity,
                          repeatType: 'reverse',
                          ease: 'linear'
                        }
                      }
                    }}
                  />
                  <Link 
                    href="/auth/signup" 
                    className="group relative px-8 py-4 bg-gradient-to-r from-primary to-primary/90 text-white rounded-xl font-medium overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 block"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      Start Your Journey
                      <motion.span
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                        className="inline-block ml-2"
                      >
                        <ArrowRight className="h-5 w-5" />
                      </motion.span>
                    </span>
                  </Link>
                </motion.div>
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
                index={index}
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
                index={index}
                totalSteps={steps.length}
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
                index={index}
                name={testimonial.name}
                role={testimonial.role}
                content={testimonial.content}
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
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />
          <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
          
          {/* Floating elements */}
          {[...Array(8)].map((_, i) => {
            const size = 100 + Math.random() * 200;
            const duration = 15 + Math.random() * 15;
            const delay = Math.random() * 5;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            
            return (
              <motion.div
                key={i}
                className="absolute rounded-full bg-gradient-to-br from-primary/5 to-primary/20"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${x}%`,
                  top: `${y}%`,
                }}
                animate={{
                  y: [0, -50, 0],
                  x: [0, 20, 0],
                  opacity: [0.1, 0.3, 0.1],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: delay,
                  repeatType: 'reverse' as const
                }}
              />
            );
          })}
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Decorative elements */}
            <motion.div 
              className="absolute -left-20 -top-20 w-40 h-40 rounded-full bg-primary/10 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
            
            <motion.div 
              className="absolute -right-20 -bottom-20 w-60 h-60 rounded-full bg-secondary/10 blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 2
              }}
            />
            
            <motion.div 
              className="inline-block mb-6"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="inline-flex items-center px-4 py-1.5 text-sm font-medium text-primary/80 bg-primary/5 rounded-full border border-primary/10">
                <Sparkles className="w-4 h-4 mr-2" />
                Join Our Community
              </div>
            </motion.div>
            
            <motion.h2 
              className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              Ready to level up your{' '}
              <motion.span 
                className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                style={{
                  backgroundSize: '200% 200%',
                  display: 'inline-block'
                }}
              >
                tech journey
              </motion.span>?
            </motion.h2>
            
            <motion.p 
              className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Join our community of <span className="font-semibold text-primary">1000+ developers</span> and get access to exclusive resources, tutorials, and a supportive network.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="relative group"
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 rounded-xl opacity-0 group-hover:opacity-100 blur-md -z-10"
                  animate={{
                    opacity: [0, 0.8, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'loop'
                  }}
                />
                <Link 
                  href="/auth/signup" 
                  className="relative z-10 block px-8 py-4 bg-gradient-to-r from-primary to-primary/80 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <span className="flex items-center justify-center">
                    Get Started for Free
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.div>
              
              <Link 
                href="/auth/signup" 
                className="px-8 py-4 bg-background text-foreground border border-border rounded-xl font-medium hover:bg-accent/50 transition-all duration-300 shadow-sm hover:shadow flex items-center justify-center gap-2"
              >
                <span>Learn More</span>
                <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Link>
            </motion.div> 
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
