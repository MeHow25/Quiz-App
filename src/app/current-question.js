import { Answer } from "@/app/answer";
import {decodeHTML} from "@/app/utils";

export function CurrentQuestion({
  currentQuestion,
  handleIncorrectAnswer,
  handleCorrectAnswer,
  clicked,
}) {
  return (
    <>
        <li className="list-group-item">
          <h2>{decodeHTML(currentQuestion["question"])}</h2>
        </li>
        {currentQuestion.all_answers.map((answer) => (
          <Answer
            key={answer.value}
            answer={answer}
            clicked={clicked}
            handleCorrectAnswer={handleCorrectAnswer}
            handleIncorrectAnswer={handleIncorrectAnswer}
          />
        ))}
    </>
  );
}
