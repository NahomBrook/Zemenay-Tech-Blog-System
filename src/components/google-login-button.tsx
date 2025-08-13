'use client';

import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';

export function GoogleLoginButton() {
  const handleGoogleLogin = () => {
    window.location.href = '/api/auth/google';
  };

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full flex items-center justify-center gap-2"
      onClick={handleGoogleLogin}
    >
      <FcGoogle className="h-5 w-5" />
      Continue with Google
    </Button>
  );
}
