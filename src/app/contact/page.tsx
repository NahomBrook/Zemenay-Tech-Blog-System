'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '../../components/ui/use-toast';
import { Mail, Phone, Github, Linkedin } from 'lucide-react';
import { TwitterLogoIcon } from '@radix-ui/react-icons';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const controls = useAnimation();
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  // 3D tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    controls.start({
      rotateY: x * 10,
      rotateX: -y * 10,
      transition: { type: 'spring', stiffness: 300, damping: 20 }
    });
  };

  const handleMouseLeave = () => {
    controls.start({
      rotateY: 0,
      rotateX: 0,
      transition: { type: 'spring', stiffness: 300, damping: 20 }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const { dismiss } = toast({
        title: 'Message Sent!',
        description: 'Thank you for contacting us. We\'ll get back to you soon!',
      });
      
      // Auto-dismiss after 5 seconds
      setTimeout(() => {
        dismiss();
      }, 5000);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again later.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Use state to store random values after component mounts
  const [blobs, setBlobs] = useState<Array<{width: number, height: number, left: string, top: string}>>([]);

  useEffect(() => {
    // Generate random values only on client side
    setBlobs(
      Array(10).fill(0).map(() => ({
        width: Math.random() * 300 + 50,
        height: Math.random() * 300 + 50,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`
      }))
    );
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {blobs.map((blob, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/10 dark:bg-primary/5"
            style={{
              width: blob.width,
              height: blob.height,
              left: blob.left,
              top: blob.top,
              filter: 'blur(40px)'
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1 + Math.random() * 0.5]
            }}
            transition={{
              duration: 20 + Math.random() * 20,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a question or want to work together? Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative"
          >
            <motion.div 
              className="bg-card/50 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-border/50"
              animate={controls}
              style={{
                transformStyle: 'preserve-3d',
                transform: 'perspective(1000px)'
              }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent -z-10" />
              
              <form onSubmit={handleSubmit} ref={formRef} className="space-y-6">
                <div className="relative">
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="peer h-14 px-4 pt-4 pb-2 text-base bg-background/50 backdrop-blur-sm"
                    placeholder=" "
                  />
                  <label 
                    htmlFor="name" 
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-1/2 peer-focus:top-3 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-xs"
                  >
                    Your Name
                  </label>
                </div>

                <div className="relative">
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="peer h-14 px-4 pt-4 pb-2 text-base bg-background/50 backdrop-blur-sm"
                    placeholder=" "
                  />
                  <label 
                    htmlFor="email" 
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-1/2 peer-focus:top-3 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-xs"
                  >
                    Email Address
                  </label>
                </div>

                <div className="relative">
                  <Input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="peer h-14 px-4 pt-4 pb-2 text-base bg-background/50 backdrop-blur-sm"
                    placeholder=" "
                  />
                  <label 
                    htmlFor="subject" 
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-1/2 peer-focus:top-3 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-xs"
                  >
                    Subject
                  </label>
                </div>

                <div className="relative">
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="min-h-[120px] px-4 pt-6 pb-2 text-base bg-background/50 backdrop-blur-sm peer"
                    placeholder=" "
                  />
                  <label 
                    htmlFor="message" 
                    className="absolute left-4 top-5 text-muted-foreground pointer-events-none transition-all duration-200 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs"
                  >
                    Your Message
                  </label>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 text-base font-medium relative overflow-hidden group"
                  disabled={isLoading}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                        Send Message
                      </>
                    )}
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Button>
              </form>
            </motion.div>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <p className="text-muted-foreground mb-8">
                Have questions? We're here to help. Reach out to us through any of these channels.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 text-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-medium">Email Us</h4>
                  <a href="mailto:contact@techpulse.com" className="text-muted-foreground hover:text-primary transition-colors">
                    contact@techpulse.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 text-primary">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-medium">Call Us</h4>
                  <a href="tel:+251912345678" className="text-muted-foreground hover:text-primary transition-colors">
                    +251 912 345 678
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-border/50">
              <h4 className="font-medium mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {[
                  { name: 'Twitter', icon: <TwitterLogoIcon className="h-5 w-5" />, url: 'https://x.com' },
                  { name: 'GitHub', icon: <Github className="h-5 w-5" />, url: 'https://github.com' },
                  { name: 'LinkedIn', icon: <Linkedin className="h-5 w-5" />, url: 'https://linkedin.com' },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 flex items-center justify-center rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                    aria-label={social.name}
                  >
                    <span className="text-lg">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
