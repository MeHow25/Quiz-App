import { decodeHTML } from "../lib/utils";
import type { Question } from "@/lib/services/types";
import { Answer } from "@/components/answer";

interface CurrentQuestionProps {
  currentQuestion: Question;
  handleIncorrectAnswer: () => void;
  handleCorrectAnswer: () => void;
  clicked: boolean;
}

export function CurrentQuestion({
  currentQuestion,
  handleIncorrectAnswer,
  handleCorrectAnswer,
  clicked,
}: CurrentQuestionProps) {
  return (
    <>
      <li className="list-group-item">
        <h2>{decodeHTML(currentQuestion.question)}</h2>
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
