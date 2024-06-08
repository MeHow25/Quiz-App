import { shuffle } from "lodash";

const noResultsResponseCodes = [1, 5];

export async function fetchQuestions(categoryId, difficulty, mode) {
  let url = "https://opentdb.com/api.php?amount=10";
  if (categoryId != null) {
    url = url + "&category=" + categoryId;
  }
  if (difficulty != null) {
    url = url + "&difficulty=" + difficulty;
  }
  if (mode === "enabled") {
    url = url + "&type=boolean";
  }

  try {
    const response = await fetch(url);
    const result = await response.json();
    if (noResultsResponseCodes.includes(result?.["response_code"])) {
      return "noResults";
    }
    //                setIsFetchingQuestions(false);
    //                 if (result == null) {
    //                     setNoResults(true);
    //                 } else if (result.response_code == 1) {
    //                     setNoResults(true);
    //                 } else if (result.response_code == 5) {
    //                     setNoResults(true);
    //                 } else {
    //                     setGameStarted(true);
    //                     setQuestionsResponse(result);
    //                 }
    result?.results?.forEach((question) => {
      let answers = [];
      answers.push(...question.incorrect_answers);
      answers.push(question.correct_answer);
      answers = shuffle(answers);
      question.all_answers = answers.map((answer) => {
        return {
          value: answer,
          is_correct: answer === question.correct_answer,
        };
      });
    });
    console.log("api", result)
    // await sleep(5000);
    return result;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return null;
  }
}

export async function fetchCategories() {
  try {
    const response = await fetch("https://opentdb.com/api_category.php");
    const result = await response.json();
    return result.trivia_categories;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
