import Link from 'next/link';
import Image from 'next/image';
import { ModeToggle } from './mode-toggle';
import { Button } from "@/components/ui/button";

export function LandingNavbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/90 dark:bg-background/80 backdrop-blur-md border-b border-border/40 shadow-sm transition-all duration-300">
      <div className="container flex items-center justify-between h-16 px-4 sm:px-6">
        <Link href="/" className="flex items-center space-x-3 group">
          <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            Zemenay
          </span>
        </Link>
        
        <div className="flex items-center space-x-3">
          <ModeToggle />
          <div className="hidden sm:flex items-center space-x-2">
            <Button 
              variant="ghost" 
              className="px-4 h-9 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
              asChild
            >
              <Link href="/auth/login">Log in</Link>
            </Button>
            <Button 
              className="h-9 px-4 text-sm font-medium transition-all duration-300 hover:shadow-md"
              asChild
            >
              <Link href="/auth/signup">Get Started</Link>
            </Button>
          </div>
          
          <Link href="/auth/login" className="sm:hidden">
            <Button 
              size="sm" 
              className="h-8 text-xs font-medium"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
