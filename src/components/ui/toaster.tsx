'use client';

import * as React from 'react';
import { useToast } from './use-toast';
import { Toast, ToastProvider, ToastViewport, type ToastProps } from './toast';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, type = 'default', ...props }) => {
        return (
          <Toast key={id} variant={type === 'destructive' ? 'destructive' : 'default'} {...props}>
            <div className="grid gap-1">
              {title && <div className="font-medium">{title}</div>}
              {description && (
                <div className="text-sm opacity-90">{description}</div>
              )}
            </div>
            {action && (
              <button
                onClick={action.onClick}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-secondary hover:text-secondary-foreground h-8 px-3 py-2"
              >
                {action.label}
              </button>
            )}
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
