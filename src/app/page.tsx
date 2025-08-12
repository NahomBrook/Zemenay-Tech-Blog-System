'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the Landing component with SSR disabled
const Landing = dynamic(
  () => import('@/components/landing/landing'),
  { ssr: false }
);

export default function LandingPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Add a class to the body to hide the footer
    document.body.classList.add('hide-footer');
    
    // Clean up the class when the component unmounts
    return () => {
      document.body.classList.remove('hide-footer');
    };
  }, []);

  // Only render the Landing component on the client side
  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Landing />
    </div>
  );
}