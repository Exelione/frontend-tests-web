import { request } from './client';
import type { Category } from './types';

export function getCategories(): Promise<Category[]> {
  return request('/categories');
}

export function getCategory(id: string): Promise<Category> {
  return request(`/categories/${id}`);
}