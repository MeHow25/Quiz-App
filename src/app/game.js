import { Button, Col, Row } from "react-bootstrap";
import { Progress } from "@/app/progress";
import { CurrentQuestion } from "@/app/current-question";
import * as PropTypes from "prop-types";
import { useState } from "react";
import { Summary } from "@/app/summary";
import { Stopwatch } from "@/app/stopwatch";
import { selectQuestions } from "@/app/questions-slice";
import {
  correctAnswer,
  goNextQuestion,
  incorrectAnswer,
  selectGame,
  showSummary,
  start,
  startAgain,
  showTimer,
  hideSummary,
} from "@/app/game-slice";
import { useDispatch, useSelector } from "react-redux";

export function Game({ exitGame }) {
  const questions = useSelector(selectQuestions).value;
  const game = useSelector(selectGame);
  const dispatch = useDispatch();

  const [timerMs, setTimerMs] = useState(0);
  const now = new Date().getTime();

  let currentQuestion = questions[game.currentQuestionIndex];

  function startGame() {
    dispatch(start());
  }

  function startGameAgain() {
    dispatch(startAgain());
    setTimeout(() => dispatch(showTimer(), 1));
    startGame();
  }

  function handleCorrectAnswer() {
    dispatch(correctAnswer());
  }

  function handleIncorrectAnswer() {
    dispatch(incorrectAnswer());
  }

  function showSummaryModal() {
    dispatch(showSummary());
  }

  function goToNextQuestion() {
    dispatch(goNextQuestion());
  }

  return (
    <>
      <Row style={{ marginTop: "15vh" }} data-testid={"game-container"}>
        <Col>
          <h1>Quiz Game</h1>
        </Col>
        <Col>
          <Button
            variant="danger"
            onClick={exitGame}
            data-testid={"exit-game-button"}
          >
            Exit Game
          </Button>
        </Col>
        <Col>
          {game.renderTimer && <Stopwatch stopStopwatch={game.stopStopwatch} />}
        </Col>
      </Row>
      <Progress currentQuestionIndex={game.currentQuestionIndex} />
      <div>
        <ul className="list-group">
          <CurrentQuestion
            currentQuestion={currentQuestion}
            handleCorrectAnswer={handleCorrectAnswer}
            handleIncorrectAnswer={handleIncorrectAnswer}
            clicked={game.answerClicked}
          />
          {game.correctAnswerClicked && game.winGame === false && (
            <li className="list-group-item">
              <h2>Correct answer!</h2>
              <Button variant="primary" onClick={goToNextQuestion}>
                Next question
              </Button>
            </li>
          )}
          {game.answerClicked && game.correctAnswerClicked === false && (
            <li className="list-group-item">
              <h2>Wrong answer!</h2>
              <Button variant="primary" onClick={startGameAgain}>
                Play Again
              </Button>
            </li>
          )}
          {game.correctAnswerClicked && game.winGame && (
            <li className="list-group-item">
              <h2>Congratulations!</h2>
              <Button variant="primary" onClick={showSummaryModal}>
                See Summary
              </Button>
              <Button
                className="mx-1"
                variant="primary"
                onClick={startGameAgain}
              >
                Play Again
              </Button>
            </li>
          )}
        </ul>
      </div>
      <Summary
        data-testid={"summary"}
        show={game.summaryShow}
        onHide={() => dispatch(hideSummary())}
      />
    </>
  );
}

Game.propTypes = {
  questionsResponse: PropTypes.any,
  exitGame: PropTypes.func,
};
