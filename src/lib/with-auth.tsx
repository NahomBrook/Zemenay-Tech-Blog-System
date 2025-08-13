'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUser } from './user-context';

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: { redirectTo?: string } = {}
) {
  const { redirectTo = '/auth/login' } = options;
  
  const WithAuth: React.FC<P> = (props) => {
    const { user, isLoading } = useUser();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && !user) {
        router.push(redirectTo);
      }
    }, [user, isLoading, router]);

    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      );
    }

    if (!user) {
      return null; // or a loading/redirecting indicator
    }

    return <WrappedComponent {...(props as P)} />;
  };

  // Set a display name for the HOC
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithAuth.displayName = `withAuth(${displayName})`;

  return WithAuth;
}

export function withGuest<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: { redirectTo?: string } = {}
) {
  const { redirectTo = '/home' } = options;
  
  const WithGuest: React.FC<P> = (props) => {
    const { user, isLoading } = useUser();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && user) {
        router.push(redirectTo);
      }
    }, [user, isLoading, router]);

    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      );
    }

    if (user) {
      return null; // or a loading/redirecting indicator
    }

    return <WrappedComponent {...(props as P)} />;
  };

  // Set a display name for the HOC
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithGuest.displayName = `withGuest(${displayName})`;

  return WithGuest;
}
