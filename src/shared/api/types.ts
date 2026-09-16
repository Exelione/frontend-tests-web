export interface Category {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface Answer {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  explanation?: string | null;
  category: Category;
  answers: Answer[];
  createdAt: string;
  updatedAt: string;
}

export interface AnswerStats {
  questionId: string;
  totalAnswers: number;
  answers: {
    answerId: string;
    text: string;
    count: number;
    percentage: number;
    isCorrect: boolean;
  }[];
}

export interface AnswerResponse {
  correct: boolean;
  correctAnswerId?: string;
  stats: AnswerStats;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'USER' | 'ADMIN';
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface CategoryStats {
  categoryId: string;
  categoryName: string;
  answered: number;
  correct: number;
  accuracy: number;
}

export interface RecentAnswer {
  questionId: string;
  questionText: string;
  answerText: string;
  isCorrect: boolean;
  createdAt: string;
}

export interface UserStats {
  totalAnswered: number;
  correctAnswers: number;
  accuracy: number;
  byCategory: CategoryStats[];
  recentAnswers: RecentAnswer[];
}