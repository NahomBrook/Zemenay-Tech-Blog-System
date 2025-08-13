import { ApiError } from './api-utils';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function fetchJson<T>(url: string, options: RequestInit = {}): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  
  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new ApiError(
      response.status,
      data.message || data.error || 'An error occurred during the API request'
    );
  }

  return data as T;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  message?: string;
}

export const authApi = {
  // Login with email and password
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await fetchJson<AuthResponse>('/api/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    // Store the token in localStorage
    if (typeof window !== 'undefined' && response.token) {
      localStorage.setItem('token', response.token);
    }

    return response;
  },

  // Register a new user
  signup: async (userData: SignupData): Promise<AuthResponse> => {
    const response = await fetchJson<AuthResponse>('/api/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    // Store the token in localStorage
    if (typeof window !== 'undefined' && response.token) {
      localStorage.setItem('token', response.token);
    }

    return response;
  },

  // Logout the current user
  logout: async (): Promise<void> => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    // No need to call a logout endpoint since we're using JWT
  },

  // Get the current user's profile
  getCurrentUser: async (): Promise<User> => {
    return fetchJson<User>('/api/users/me');
  },
};
