import { IApiService } from "@/lib/services/types";

export class FakeApiService implements IApiService {
  async fetchQuestions(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _categoryId: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _difficulty: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _mode: string,
  ) {
    return {
      results: Array(10)
        .fill(null)
        .map((_, index) => ({
          question: `Question number ${index + 1}`,
          incorrect_answers: ["False"],
          correct_answer: "True",
          all_answers: [
            { value: "False", is_correct: false },
            { value: "True", is_correct: true },
          ],
        })),
    };
  }

  async fetchCategories() {
    return [
      { id: 9, name: "General Knowledge" },
      { id: 10, name: "Entertainment: Books" },
    ];
  }
}
