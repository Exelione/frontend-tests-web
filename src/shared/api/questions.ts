import { request } from './client';
import type { Question } from './types';

export interface CreateQuestionDto {
  text: string;
  explanation?: string;
  categoryId: string;
  answers: Array<{ text: string; isCorrect: boolean }>;
}

export function createQuestion(dto: CreateQuestionDto): Promise<Question> {
  return request('/questions', {
    method: 'POST',
    body: JSON.stringify(dto),
  });
}