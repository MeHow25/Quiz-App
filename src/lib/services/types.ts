export interface Question {
  question: string;
  incorrect_answers: string[];
  correct_answer: string;
  all_answers: AnswerOption[];
}

export interface AnswerOption {
  value: string;
  is_correct: boolean;
}

export interface Category {
  id: number;
  name: string;
}

export type QuestionsResponse = { results: Question[] } | "noResults" | null;

export interface LeaderboardEntry {
  id?: number;
  nickname: string;
  time: number;
  created_at?: string;
}

export interface IApiService {
  fetchQuestions(
    categoryId: string,
    difficulty: string,
    mode: string,
  ): Promise<QuestionsResponse>;
  fetchCategories(): Promise<Category[] | void>;
}
