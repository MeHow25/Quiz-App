"use client";

import { Button, Col, Row } from "react-bootstrap";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useGameStore } from "@/lib/store/game-store";
import {
  useQuestionsStore,
  selectQuestionsValue,
} from "@/lib/store/questions-store";
import { Progress } from "@/components/progress";
import { CurrentQuestion } from "@/components/current-question";
import { Summary } from "@/components/summary";
import { Stopwatch } from "@/components/stopwatch";

interface GameProps {
  exitGame: () => void;
}

export function Game({ exitGame }: GameProps) {
  const { data: session } = useSession();
  const nickname = session?.user?.name || "Guest";

  const questions = useQuestionsStore(selectQuestionsValue);

  const game = useGameStore((state) => state);
  const restartCount = useGameStore((state) => state.restartCount);
  const wonGame = useGameStore((state) => state.wonGame);
  const recordSaved = useGameStore((state) => state.recordSaved);

  const startAction = useGameStore((state) => state.start);
  const startAgainAction = useGameStore((state) => state.startAgain);
  const showTimerAction = useGameStore((state) => state.showTimerAction);
  const correctAnswerAction = useGameStore((state) => state.correctAnswer);
  const incorrectAnswerAction = useGameStore((state) => state.incorrectAnswer);
  const showSummaryAction = useGameStore((state) => state.showSummaryAction);
  const goNextQuestionAction = useGameStore((state) => state.goNextQuestion);
  const hideSummaryAction = useGameStore((state) => state.hideSummary);
  const saveRecordAction = useGameStore((state) => state.saveRecord);

  useEffect(() => {
    if (wonGame && !recordSaved) {
      saveRecordAction(nickname);
    }
  }, [wonGame, recordSaved, saveRecordAction, nickname]);

  if (!questions) {
    return null;
  }

  const currentQuestion = questions[game.currentQuestionIndex];

  function startGameAgain() {
    startAgainAction();
    startAction();
    showTimerAction();
  }

  function handleCorrectAnswer() {
    correctAnswerAction();
  }

  function handleIncorrectAnswer() {
    incorrectAnswerAction();
  }

  function showSummaryModal() {
    showSummaryAction();
  }

  function goToNextQuestion() {
    goNextQuestionAction();
  }

  return (
    <>
      <Row className="game-header" data-testid="game-header">
        <Col>
          <h1>Restarts: {restartCount}</h1>
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
        onHide={() => hideSummaryAction()}
      />
    </>
  );
}
