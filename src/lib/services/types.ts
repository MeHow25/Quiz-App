export interface Question {
  question: string;
  incorrect_answers: string[];
  correct_answer: string;
  all_answers: { value: string; is_correct: boolean }[];
}

export interface Category {
  id: number;
  name: string;
}

export type QuestionsResponse = { results: Question[] } | "noResults" | null;

export interface IApiService {
  fetchQuestions(
    categoryId: string,
    difficulty: string,
    mode: string,
  ): Promise<QuestionsResponse>;
  fetchCategories(): Promise<Category[] | void>;
}
