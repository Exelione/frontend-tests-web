import { request } from './client';
import type { AuthResponse, User, UserStats } from './types';

export function register(
  email: string,
  name: string,
  password: string,
  captchaToken?: string,
): Promise<AuthResponse> {
  return request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, name, password, captchaToken }),
  });
}

export function login(email: string, password: string): Promise<AuthResponse> {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export function getMe(): Promise<User> {
  return request('/auth/me');
}

export function getMyStats(): Promise<UserStats> {
  return request('/auth/me/stats');
}