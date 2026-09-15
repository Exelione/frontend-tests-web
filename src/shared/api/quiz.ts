import { request } from './client';
import type { Question, AnswerResponse } from './types';

const QUIZ_TIMEOUT = 6000;
const MAX_RETRIES = 3;

async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries = MAX_RETRIES,
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err as Error;

      // Повторяем только на таймауте
      const isTimeout = lastError.message.includes('Превышено время');
      if (!isTimeout) throw lastError;
      if (attempt === maxRetries) throw lastError;

      // Задержка: 200ms, 400ms, 600ms
      await new Promise((resolve) => setTimeout(resolve, 200 * attempt));
    }
  }

  throw lastError!;
}

export function getQuestions(
  limit = 10,
  categoryId?: string,
): Promise<Question[]> {
  const params = new URLSearchParams({ limit: String(limit) });
  if (categoryId) params.set('categoryId', categoryId);

  return withRetry(() =>
    request(`/quiz/questions?${params}`, {
      timeout: QUIZ_TIMEOUT,
    }),
  );
}

export function answerQuestion(
  questionId: string,
  answerId: string,
  sessionId?: string,
): Promise<AnswerResponse> {
  return withRetry(() =>
    request<AnswerResponse>('/quiz/answer', {
      method: 'POST',
      body: JSON.stringify({ questionId, answerId, sessionId }),
      timeout: QUIZ_TIMEOUT,
    }),
  );
}