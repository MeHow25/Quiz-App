/* eslint-disable no-unused-vars */
import { IApiService } from "@/lib/services/types.ts";

export class FakeApiService implements IApiService {
  async fetchQuestions(
    _categoryId: string,
    _difficulty: string,
    _mode: string,
  ) {
    const questionObject = {
      incorrect_answers: ["False"],
      correct_answer: "True",
      all_answers: [
        { value: "False", is_correct: false },
        { value: "True", is_correct: true },
      ],
    };

    return {
      results: Array(10)
        .fill(null)
        .map(() => ({ ...questionObject })),
    };
  }

  async fetchCategories() {
    return [
      { id: 9, name: "General Knowledge" },
      { id: 10, name: "Entertainment: Books" },
    ];
  }
}
