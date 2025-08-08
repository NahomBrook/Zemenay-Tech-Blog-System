'use client';

import React from 'react';
import { BookOpen, Code, Globe, Heart, MessageSquare, Rocket, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Create a motion button component
const MotionButton = motion(Button);

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { 
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut'
    }
  }
};

const teamMembers = [
  {
    name: 'Alex Johnson',
    role: 'Founder & Lead Developer',
    bio: 'Passionate about building tools that make development easier and more accessible.',
    avatar: '/images/team/alex.jpg',
    social: {
      twitter: '#',
      github: '#',
      linkedin: '#'
    }
  },
  {
    name: 'Sarah Kim',
    role: 'Senior Editor',
    bio: 'Tech writer and educator with a knack for breaking down complex topics.',
    avatar: '/images/team/sarah.jpg',
    social: {
      twitter: '#',
      github: '#',
      linkedin: '#'
    }
  },
  {
    name: 'Jamal Wilson',
    role: 'Community Manager',
    bio: 'Building and nurturing our amazing community of developers and creators.',
    avatar: '/images/team/jamal.jpg',
    social: {
      twitter: '#',
      github: '#',
      linkedin: '#'
    }
  }
];

const values = [
  {
    title: 'Quality Content',
    description: 'We believe in providing well-researched, accurate, and practical content that helps developers grow.',
    icon: <BookOpen className="h-6 w-6 text-primary" />
  },
  {
    title: 'Community First',
    description: 'Our community is at the heart of everything we do. We learn and grow together.',
    icon: <Users className="h-6 w-6 text-primary" />
  },
  {
    title: 'Continuous Learning',
    description: 'Technology never stands still, and neither do we. We\'re committed to staying on the cutting edge.',
    icon: <Rocket className="h-6 w-6 text-primary" />
  },
  {
    title: 'Open Source',
    description: 'We believe in the power of open source and contribute back to the community that helps us grow.',
    icon: <Code className="h-6 w-6 text-primary" />
  }
];

const AboutPage = () => {
  const router = useRouter();
  return (
    <motion.main 
      className="container mx-auto px-4 py-12 max-w-6xl"
      initial="hidden"
      animate="show"
      variants={container}
    >
      {/* Hero Section */}
      <motion.section 
        className="text-center mb-16 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
            About Zemenay Tech Blog
          </h1>
          <motion.p 
            className="text-xl text-muted-foreground max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            A vibrant community where technology enthusiasts, developers, and innovators come together to share knowledge, experiences, and insights about the ever-evolving world of technology.
          </motion.p>
        </motion.div>
      </motion.section>

      {/* Our Story */}
      <motion.section 
        className="mb-20"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={container}
      >
        <motion.div className="grid md:grid-cols-2 gap-12 items-center mb-20" variants={item}>
          <div>
            <motion.h2 className="text-3xl font-bold mb-6" variants={item}>
              Our Story
            </motion.h2>
            <motion.p className="text-muted-foreground mb-6" variants={item}>
              Zemenay Tech Blog was born from a simple idea: to create a space where technology enthusiasts could share their knowledge and learn from one another. What started as a small blog has grown into a thriving community of developers, designers, and tech enthusiasts from around the world.
            </motion.p>
            <motion.p className="text-muted-foreground" variants={item}>
              Our name "Zemenay" comes from the Amharic word for "technology," reflecting our commitment to making tech knowledge accessible to everyone, regardless of their background or experience level.
            </motion.p>
          </div>
          <motion.div 
            className="bg-muted/50 p-8 rounded-xl border border-border/50 h-full flex items-center justify-center"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Users className="h-32 w-32 text-primary/30" />
          </motion.div>
        </motion.div>

        {/* What We Offer */}
        <motion.div className="mb-20" variants={container}>
          <motion.h2 className="text-3xl font-bold text-center mb-12" variants={item}>
            What We Offer
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <BookOpen className="h-8 w-8 text-primary" />,
                title: "In-Depth Tutorials",
                description: "Step-by-step guides on the latest technologies, frameworks, and best practices in software development."
              },
              {
                icon: <Code className="h-8 w-8 text-primary" />,
                title: "Code Snippets",
                description: "Reusable code examples and solutions to common programming challenges across various languages."
              },
              {
                icon: <Users className="h-8 w-8 text-primary" />,
                title: "Community Forum",
                description: "A supportive space to ask questions, share knowledge, and connect with fellow developers."
              }
            ].map((feature, index) => (
              <motion.div 
                key={index} 
                className="bg-card p-6 rounded-lg border border-border/50 hover:shadow-md transition-all"
                variants={item}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Community Focus */}
        <motion.div className="bg-gradient-to-r from-primary/5 to-primary/10 p-12 rounded-xl border border-border/50 mb-20 overflow-hidden" variants={item}>
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6"
              variants={item}
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart className="h-8 w-8 text-primary" />
            </motion.div>
            <motion.h2 className="text-3xl font-bold mb-6" variants={item}>
              Our Community
            </motion.h2>
            <motion.p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto" variants={item}>
              At the heart of Zemenay is our incredible community. We're more than just a blog - we're a network of passionate individuals who believe in the power of technology to transform lives. Whether you're a seasoned developer or just starting your tech journey, you'll find a welcoming space here.
            </motion.p>
            <motion.div className="flex flex-wrap justify-center gap-4" variants={item}>
              <MotionButton 
                variant="default"
                size="lg"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="gap-2"
                onClick={() => router.push('/home')}
              >
                <MessageSquare className="h-4 w-4" />
                Join the Discussion
              </MotionButton>
              <MotionButton 
                variant="outline"
                size="lg"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="gap-2"
                onClick={() => router.push('/home')}
              >
                <Code className="h-4 w-4" />
                Contribute Content
              </MotionButton>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* Values Section */}
      <motion.section 
        className="mb-20"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={container}
      >
        <motion.h2 
          className="text-3xl font-bold text-center mb-12"
          variants={item}
        >
          Our Core Values
        </motion.h2>
        <motion.div 
          className="grid md:grid-cols-2 gap-6"
          variants={container}
        >
          {values.map((value, index) => (
            <motion.div 
              key={index}
              variants={item}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card className="h-full hover:shadow-md transition-all duration-300 border-border/50">
                <CardHeader>
                  <motion.div 
                    className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                  >
                    {value.icon}
                  </motion.div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Team Section */}
      <motion.section 
        className="mb-20"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={container}
      >
        <motion.h2 
          className="text-3xl font-bold text-center mb-12"
          variants={item}
        >
          Meet Our Team
        </motion.h2>
        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={container}
        >
          {teamMembers.map((member, index) => (
            <motion.div 
              key={index}
              variants={item}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card className="h-full text-center hover:shadow-md transition-all duration-300 border-border/50">
                <CardHeader>
                  <motion.div 
                    className="flex justify-center mb-4"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Avatar className="h-24 w-24 border-4 border-background">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="text-2xl">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </motion.div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-primary font-medium">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{member.bio}</p>
                  <motion.div 
                    className="flex justify-center space-x-4"
                    initial={{ opacity: 0.7 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {Object.entries(member.social).map(([platform, url]) => (
                      <motion.a 
                        key={platform}
                        href={url}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        whileHover={{ y: -2, scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={platform}
                      >
                        {platform === 'twitter' && (
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                          </svg>
                        )}
                        {platform === 'github' && (
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.699 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                          </svg>
                        )}
                        {platform === 'linkedin' && (
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        )}
                      </motion.a>
                    ))}
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </motion.main>
  );
};

export default AboutPage;