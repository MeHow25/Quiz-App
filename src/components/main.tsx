"use client";

import { useEffect, useState } from "react";
import { Button, Col, Form, Spinner, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsync,
  selectCategoriesValue,
} from "@/lib/redux/categories-slice";
import {
  fetchQuestionsAsync,
  resetQuestions,
  selectQuestionsValue,
  selectQuestionsLoading,
  selectNoResults,
  selectQuestionsStatus,
} from "@/lib/redux/questions-slice";
import { resetCounter, start } from "@/lib/redux/game-slice";
import { DifficultyInput } from "./difficulty-input";
import { AnswerTypeInput } from "./answer-type-input";
import { Game } from "./game";
import { ErrorToast } from "./error-toast";
import Leaderboard from "./leaderboard";
import type { AppDispatch } from "@/lib/redux/store";

type Difficulty = "easy" | "medium" | "hard" | null;
type AnswerMode = "enabled" | "disabled";

export default function Main() {
  const categories = useSelector(selectCategoriesValue);
  const questionsValue = useSelector(selectQuestionsValue);
  const questionsLoading = useSelector(selectQuestionsLoading);
  const questionsStatus = useSelector(selectQuestionsStatus);
  const noResults = useSelector(selectNoResults);
  const dispatch = useDispatch<AppDispatch>();

  const [showNoResultsToast, setShowNoResultsToast] = useState<boolean>(false);
  const gameStarted = questionsValue && questionsValue.length > 0;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<Difficulty>(null);
  const [trueFalseMode, setTrueFalseMode] = useState<AnswerMode>("disabled");

  useEffect(() => {
    dispatch(fetchAsync());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setShowNoResultsToast(noResults);
  }, [noResults]);

  function setDifficulty(level: Difficulty) {
    setSelectedDifficulty(level);
  }
  function startGame() {
    dispatch(resetCounter());
    dispatch(
      fetchQuestionsAsync({
        categoryId: selectedCategory,
        difficulty: selectedDifficulty,
        trueFalse: trueFalseMode,
      }),
    ).then(() => {
      dispatch(start());
    });
  }
  function exitGame() {
    dispatch(resetQuestions());
    dispatch(start());
  }

  return (
    <div>
      {!gameStarted && categories != null && (
        <Col md={{ span: 4, offset: 4 }}>
          <h1 style={{ marginTop: "15vh" }}>Quiz Game</h1>
          <Form.Label className="mt-3">Category</Form.Label>
          <Form.Select
            data-testid="category-select"
            onChange={(event) => {
              setSelectedCategory(event.target.value);
            }}
          >
            <option value="">Any category</option>
            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
                data-testid={"category-option-" + category.id}
              >
                {category.name}
              </option>
            ))}
          </Form.Select>
          <Form.Label className="mt-3">Difficulty</Form.Label>
          <Col>
            <DifficultyInput setDifficulty={setDifficulty} />
          </Col>
          <Form.Label className="mt-3">True/False answers mode</Form.Label>
          <Col>
            <AnswerTypeInput setMode={setTrueFalseMode} mode={trueFalseMode} />
          </Col>
          {questionsLoading && (
            <Spinner
              data-testid="spinner"
              className="mt-4"
              animation="border"
              variant="primary"
            />
          )}
          {questionsStatus === "idle" && (
            <Button
              onClick={startGame}
              variant="primary"
              size="lg"
              className="mt-3"
              data-testid="start-button"
            >
              Start Quiz
            </Button>
          )}
          <ErrorToast
            data-testid="error-toast"
            className="d-inline-block m-1"
            onClose={() => setShowNoResultsToast(false)}
            show={showNoResultsToast}
          />
        </Col>
      )}
      {gameStarted && <Game data-testid="game" exitGame={exitGame} />}
      {!gameStarted && (
        <Container className="mt-5">
          <Leaderboard />
        </Container>
      )}
    </div>
  );
}
