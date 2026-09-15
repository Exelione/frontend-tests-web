import { createContext, useContext } from 'react';
import type { User } from '@shared/api';

export interface AuthContextValue {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  loginUser: (user: User, token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}