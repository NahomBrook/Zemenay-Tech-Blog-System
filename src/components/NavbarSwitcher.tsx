'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from "./navbar";
import { LandingNavbar } from "./landing-navbar";
import { cn } from "@/lib/utils";

const publicPaths = ['/', '/auth/login', '/auth/signup'];

export function NavbarSwitcher() {
  const pathname = usePathname();
  const isPublicPath = publicPaths.includes(pathname);

  return (
    <div className={cn('w-full', isPublicPath && 'fixed top-0 left-0 right-0 z-50')}>
      {isPublicPath ? <LandingNavbar /> : <Navbar />}
    </div>
  );
}
