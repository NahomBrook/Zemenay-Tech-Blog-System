'use client';

import { ReactNode } from 'react';
import { UserProvider } from '@/lib/user-context';

export function AuthProvider({ children }: { children: ReactNode }) {
  return <UserProvider>{children}</UserProvider>;
}
