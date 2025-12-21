"use client";

import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  correctAnswer,
  goNextQuestion,
  incorrectAnswer,
  selectGame,
  start,
  startAgain,
  showTimer,
  hideSummary,
  saveRecord,
  showSummary,
} from "@/lib/redux/game-slice";
import { selectQuestionsValue } from "@/lib/redux/questions-slice";
import { Progress } from "./progress";
import { CurrentQuestion } from "./current-question";
import { Summary } from "./summary";
import { Stopwatch } from "./stopwatch";
import type { AppDispatch } from "@/lib/redux/store";

interface GameProps {
  exitGame: () => void;
}

export function Game({ exitGame }: GameProps) {
  const { data: session } = useSession();
  const nickname = session?.user?.name || "Guest";

  const questions = useSelector(selectQuestionsValue);
  const game = useSelector(selectGame);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (game.wonGame && !game.recordSaved) {
      dispatch(saveRecord(nickname));
    }
  }, [game.wonGame, game.recordSaved, dispatch, nickname]);

  if (!questions) {
    return null;
  }

  const currentQuestion = questions[game.currentQuestionIndex];

  function startGameAgain() {
    dispatch(startAgain());
    dispatch(start());
    dispatch(showTimer());
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
      <Row style={{ marginTop: "15vh" }} data-testid="game-container">
        <Col>
          <h1>Quiz Game</h1>
        </Col>
        <Col>
          <Button
            variant="danger"
            onClick={exitGame}
            data-testid="exit-game-button"
          >
            Exit Game
          </Button>
        </Col>
        <Col>
          <Stopwatch />
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
          {game.showNextQuestionButton && (
            <li className="list-group-item">
              <h2>Correct answer!</h2>
              <Button variant="primary" onClick={goToNextQuestion}>
                Next question
              </Button>
            </li>
          )}
          {game.showPlayAgainButton && (
            <li className="list-group-item">
              <h2>Wrong answer!</h2>
              <Button variant="primary" onClick={startGameAgain}>
                Play Again
              </Button>
            </li>
          )}
          {game.wonGame && (
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
        data-testid="summary"
        show={game.showSummary}
        onHide={() => dispatch(hideSummary())}
      />
    </>
  );
}
