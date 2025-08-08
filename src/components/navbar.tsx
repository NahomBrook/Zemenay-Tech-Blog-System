import Link from 'next/link'
import Image from 'next/image'
import { ModeToggle } from './mode-toggle'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from 'lucide-react'

const navItems = [
  { name: 'Home', href: '/home' },
  { name: 'About', href: '/about' },
  { name: 'Articles', href: '/articles' },
]

export function Navbar() {

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/90 dark:bg-background/80 backdrop-blur-md border-b border-border/40 shadow-sm transition-all duration-300">
      <div className="container flex items-center justify-between h-16 px-4 sm:px-6">
        <Link href="/home" className="flex items-center space-x-3 group">
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
            <rect width="32" height="32" rx="8" className="fill-primary" />
            <path d="M8 16L14 22L24 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            TechPulse
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1.5 rounded-md hover:bg-accent/50"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-3">
          <ModeToggle />
          <Button 
            asChild
            className="h-9 px-4 text-sm font-medium transition-all duration-300 hover:shadow-md"
          >
            <Link href="/contact">Contact</Link>
          </Button>
        </div>

        <div className="md:hidden flex items-center">
          <ModeToggle/>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px] p-0">
              <div className="flex flex-col h-full">
                <div className="p-6 border-b border-border/40">
                  <Link href="/" className="flex items-center space-x-3">
                    <div className="relative w-8 h-8">
                      <Image
                        src="/assets/images/EGA_logo.png"
                        alt="Zemenay Tech Logo"
                        layout="fill"
                        objectFit="contain"
                        className="rounded-full"
                      />
                    </div>
                    <span className="text-xl font-bold">Zemenay</span>
                  </Link>
                </div>
                <div className="flex-1 p-6 space-y-4 overflow-y-auto">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-3 py-2 text-base font-medium rounded-md hover:bg-accent/50 transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="p-6 border-t border-border/40">
                  <Button className="w-full" size="lg" asChild>
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}