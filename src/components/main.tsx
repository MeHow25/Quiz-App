"use client";

import { useEffect, useState } from "react";
import { Button, Col, Form, Spinner, Container } from "react-bootstrap";
import {
  useCategoriesStore,
  selectCategoriesValue,
} from "@/lib/store/categories-store";
import {
  useQuestionsStore,
  selectQuestionsValue,
  selectQuestionsLoading,
  selectNoResults,
  selectQuestionsStatus,
} from "@/lib/store/questions-store";
import { useGameStore } from "@/lib/store/game-store";
import { DifficultyInput } from "@/components/difficulty-input";
import { AnswerTypeInput } from "@/components/answer-type-input";
import { Game } from "@/components/game";
import { ErrorToast } from "@/components/error-toast";
import Leaderboard from "@/components/leaderboard";

type Difficulty = "easy" | "medium" | "hard" | null;
type AnswerMode = "enabled" | "disabled";

export default function Main() {
  const categories = useCategoriesStore(selectCategoriesValue);
  const fetchCategories = useCategoriesStore((state) => state.fetchCategories);

  const questionsValue = useQuestionsStore(selectQuestionsValue);
  const questionsLoading = useQuestionsStore(selectQuestionsLoading);
  const questionsStatus = useQuestionsStore(selectQuestionsStatus);
  const noResults = useQuestionsStore(selectNoResults);
  const fetchQuestions = useQuestionsStore((state) => state.fetchQuestions);
  const resetQuestions = useQuestionsStore((state) => state.resetQuestions);

  const start = useGameStore((state) => state.start);
  const resetCounter = useGameStore((state) => state.resetCounter);

  const [showNoResultsToast, setShowNoResultsToast] = useState<boolean>(false);
  const gameStarted = questionsValue && questionsValue.length > 0;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<Difficulty>(null);
  const [trueFalseMode, setTrueFalseMode] = useState<AnswerMode>("disabled");

  useEffect(() => {
    void fetchCategories();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setShowNoResultsToast(noResults);
  }, [noResults]);

  function setDifficulty(level: Difficulty) {
    setSelectedDifficulty(level);
  }

  async function startGame() {
    resetCounter();
    await fetchQuestions({
      categoryId: selectedCategory,
      difficulty: selectedDifficulty,
      trueFalse: trueFalseMode,
    });
    start();
  }

  function exitGame() {
    resetQuestions();
    start();
  }

  return (
    <div>
      {!gameStarted && categories != null && (
        <Col md={{ span: 4, offset: 4 }}>
          <h1 className="game-header">Quiz Game</h1>
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
