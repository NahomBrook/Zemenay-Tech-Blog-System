"use client";

import { useEffect } from 'react';
import Login from '@/components/auth/Login';

export default function LoginPage() {
  useEffect(() => {
    // Add a class to the body to hide the footer
    document.body.classList.add('hide-footer');
    
    // Clean up the class when the component unmounts
    return () => {
      document.body.classList.remove('hide-footer');
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Login />
      </div>
    </div>
  );
}
