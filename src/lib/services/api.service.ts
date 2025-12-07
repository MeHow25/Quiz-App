import { shuffle } from "lodash";
import type {
  Question,
  Category,
  QuestionsResponse,
  IApiService,
} from "./types";

export class ApiService implements IApiService {
  private noResultsResponseCodes = [1, 5];

  async fetchQuestions(
    categoryId: string,
    difficulty: string,
    mode: string,
  ): Promise<QuestionsResponse> {
    let url = "https://opentdb.com/api.php?amount=10";
    if (categoryId != null) {
      url = url + "&category=" + categoryId;
    }
    if (difficulty != null) {
      url = url + "&difficulty=" + difficulty;
    }
    if (mode === "enabled") {
      url += "&type=boolean";
    }

    try {
      const response = await fetch(url);
      const result = await response.json();
      if (this.noResultsResponseCodes.includes(result?.response_code)) {
        return "noResults";
      }
      result?.results?.forEach((question: Question) => {
        let answers: string[] = [];
        answers.push(...question.incorrect_answers);
        answers.push(question.correct_answer);
        answers = shuffle(answers);
        question.all_answers = answers.map((answer) => ({
          value: answer,
          is_correct: answer === question.correct_answer,
        }));
      });
      return result;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return null;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async fetchCategories(): Promise<Category[] | void> {
    try {
      const response = await fetch("https://opentdb.com/api_category.php");
      const result = await response.json();
      console.log(result.trivia_categories);
      return result.trivia_categories;
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }
}
