'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Loader2 } from 'lucide-react';

export default function SignupPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/home';

  useEffect(() => {
    // Immediately redirect to Google OAuth with signup prompt
    signIn('google', { 
      callbackUrl,
      // This will force account selection and show the account chooser
      prompt: 'select_account'
    });
  }, [callbackUrl]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <h1 className="text-2xl font-bold">Creating Your Account</h1>
          <p className="text-muted-foreground">Redirecting you to Google to complete your signup.</p>
        </div>
      </div>
    </div>
  );
}
