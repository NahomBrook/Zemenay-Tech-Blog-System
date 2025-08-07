import React from 'react';
import { BookOpen, Code, Globe, Heart, MessageSquare, Rocket, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
  return (
    <main className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About Our Tech Blog</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Empowering developers with high-quality content, tutorials, and resources to build amazing things.
        </p>
      </section>

      {/* Mission Section */}
      <section className="mb-20">
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-8 rounded-xl border border-border/50 mb-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Globe className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-8">
              To create a platform where developers of all levels can learn, share, and grow together.
              We believe in making technology education accessible, practical, and engaging for everyone.
            </p>
            <Button size="lg">
              <MessageSquare className="mr-2 h-4 w-4" />
              Join Our Community
            </Button>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {values.map((value, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <CardTitle>{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="text-center hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Avatar className="h-24 w-24 border-4 border-background">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className="text-2xl">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle>{member.name}</CardTitle>
                <CardDescription className="text-primary font-medium">
                  {member.role}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{member.bio}</p>
                <div className="flex justify-center space-x-4">
                  <a href={member.social.twitter} className="text-muted-foreground hover:text-foreground transition-colors">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href={member.social.github} className="text-muted-foreground hover:text-foreground transition-colors">
                    <span className="sr-only">GitHub</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.699 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href={member.social.linkedin} className="text-muted-foreground hover:text-foreground transition-colors">
                    <span className="sr-only">LinkedIn</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-8 border border-border/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to join our community?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Connect with like-minded developers, share your knowledge, and grow together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2">
              <MessageSquare className="h-5 w-5" />
              Join Our Discord
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              <Code className="h-5 w-5" />
              Contribute on GitHub
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;