const mockedQuestions = [];

for (let i = 1; i < 11; i++) {
  mockedQuestions[i - 1] = {
    question: "Test question number " + i,
    correct_answer: "answer d",
    incorrect_answers: ["answer a", "answer b", "answer c"],
    all_answers: [
      {
        value: "answer a",
        is_correct: false,
      },
      {
        value: "answer b",
        is_correct: false,
      },
      {
        value: "answer c",
        is_correct: false,
      },
      {
        value: "answer d",
        is_correct: true,
      },
    ],
  };
}
export { mockedQuestions };
