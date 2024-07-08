"use client";

import { useEffect, useState } from "react";
import { Button, Col, Form, Spinner, Toast } from "react-bootstrap";
import { DifficultyInput } from "@/app/difficulty-input";
import { AnswerTypeInput } from "@/app/answer-type-input";
import { Game } from "@/app/game";
import { ErrorToast } from "@/app/error-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsync, selectCategories } from "@/app/categories-slice";
import {
  fetchQuestionsAsync,
  selectQuestions,
  resetQuestions,
} from "@/app/questions-slice";
import { start } from "@/app/game-slice";

export default function Page() {
  const categories = useSelector(selectCategories);
  const questions = useSelector(selectQuestions);
  const dispatch = useDispatch();

  const [showNoResultsToast, setShowNoResultsToast] = useState(null);
  const gameStarted = questions.value && questions.value.length > 0;
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [trueFalseMode, setTrueFalseMode] = useState("disabled");

  useEffect(() => {
    dispatch(fetchAsync());
  }, []);

  useEffect(() => {
    setShowNoResultsToast(questions.noResults);
  }, [questions]);

  function setDifficulty(level) {
    setSelectedDifficulty(level);
  }
  function startGame() {
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
            data-testid={"category-select"}
            onChange={(event) => {
              setSelectedCategory(event.target.value);
            }}
          >
            <option value="">Any category</option>
            {categories != null &&
              categories.map((category) => {
                return (
                  <option
                    key={category.id}
                    value={category.id}
                    data-testid={"category-option-" + category.id}
                  >
                    {category.name}
                  </option>
                );
              })}
          </Form.Select>
          <Form.Label className="mt-3">Difficulty</Form.Label>
          <Col>
            <DifficultyInput setDifficulty={setDifficulty} />
          </Col>
          <Form.Label className="mt-3">True/False answers mode</Form.Label>
          <Col>
            <AnswerTypeInput setMode={setTrueFalseMode} mode={trueFalseMode} />
          </Col>
          {questions.status === "loading" && (
            <Spinner
              data-testid={"spinner"}
              className="mt-4"
              animation="border"
              variant="primary"
            />
          )}
          {questions.status === "idle" && (
            <Button
              onClick={startGame}
              variant="primary"
              size="lg"
              className="mt-3"
              data-testid={"start-button"}
            >
              Start Quiz
            </Button>
          )}
          <ErrorToast
            data-testid={"error-toast"}
            className="d-inline-block m-1"
            onClose={() => setShowNoResultsToast(false)}
            show={showNoResultsToast}
          ></ErrorToast>
        </Col>
      )}
      {gameStarted && (
        <Game data-testid={"game"} startGame={startGame} exitGame={exitGame} />
      )}
    </div>
  );
}
