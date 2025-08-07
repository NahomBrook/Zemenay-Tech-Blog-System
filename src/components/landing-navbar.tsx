import Link from 'next/link';
import Image from 'next/image';
import { ModeToggle } from './mode-toggle';
import { Button } from "@/components/ui/button";

export function LandingNavbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b px-5">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative w-9 h-9">
            <Image
              src="/assets/images/EGA_logo.png"
              alt="Company Logo"
              layout="fill"
              objectFit="contain"
              className="rounded-full"
              priority
            />
          </div>
        </Link>
        
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <div className="hidden sm:flex items-center space-x-3">
            <Button variant="ghost" asChild>
              <Link href="/auth/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/signup">Sign up</Link>
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <Link href="/auth/login" className="sm:hidden">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
