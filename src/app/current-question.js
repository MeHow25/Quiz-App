import { Button } from "react-bootstrap";
import { Answer } from "@/app/answer";
import { Progress } from "@/app/progress";

export function CurrentQuestion({
  currentQuestion,
  goToNextQuestion,
  currentQuestionIndex,
  handleIncorrectAnswer,
  handleCorrectAnswer,
  correct,
  clicked,
  startGame,
  winGame,
  showSummaryModal,
}) {
  return (
    <div>
      <ul className="list-group">
        <li className="list-group-item">
          <h2>{decodeURI(currentQuestion["question"])}</h2>
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
        {correct && !winGame && (
          <li className="list-group-item">
            <h2>Correct answer!</h2>
            <Button variant="primary" onClick={goToNextQuestion}>
              Next question
            </Button>
          </li>
        )}
        {clicked && !correct && (
          <li className="list-group-item">
            <h2>Wrong answer!</h2>
            <Button variant="primary" onClick={startGame}>
              Play Again
            </Button>
          </li>
        )}
        {correct && winGame && (
          <li className="list-group-item">
            <h2>Congratulations!</h2>
            <Button variant="primary" onClick={showSummaryModal}>
              See Summary
            </Button>
            <Button className="mx-1" variant="primary" onClick={startGame}>
              Play Again
            </Button>
          </li>
        )}
      </ul>
    </div>
  );
}
