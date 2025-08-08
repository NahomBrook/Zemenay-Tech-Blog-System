"use client";

import { useEffect } from 'react';
import Landing from '@/components/landing/landing';

export default function LandingPage() {
  useEffect(() => {
    //Add a class to the body to hide the footer
    document.body.classList.add('hide-footer');
    
    // Clean up the class when the component unmounts
    return () => {
      document.body.classList.remove('hide-footer');
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Landing />
    </div>
  );
}