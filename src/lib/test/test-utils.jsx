import React from "react";
import { render } from "@testing-library/react";
import { useGameStore } from "@/lib/store/game-store";
import { useQuestionsStore } from "@/lib/store/questions-store";
import { useCategoriesStore } from "@/lib/store/categories-store";

// Helper to reset all Zustand stores before each test
export function resetStores() {
  useGameStore.setState({
    currentQuestionIndex: 0,
    wonGame: false,
    answerClicked: false,
    stopStopwatch: false,
    showTimer: true,
    restartCount: 0,
    showSummary: false,
    startedAt: 0,
    finishedAt: 0,
    recordSaved: false,
    showNextQuestionButton: false,
    showPlayAgainButton: false,
  });

  useQuestionsStore.setState({
    value: null,
    status: "idle",
    noResults: false,
  });

  useCategoriesStore.setState({
    value: null,
    status: "idle",
  });
}

export function renderWithProviders(ui, options = {}) {
  const {
    initialGameState,
    initialQuestionsState,
    initialCategoriesState,
    ...renderOptions
  } = options;

  // Reset stores before setting initial state
  resetStores();

  // Set initial state if provided
  if (initialGameState) {
    useGameStore.setState(initialGameState);
  }
  if (initialQuestionsState) {
    useQuestionsStore.setState(initialQuestionsState);
  }
  if (initialCategoriesState) {
    useCategoriesStore.setState(initialCategoriesState);
  }

  return {
    ...render(ui, renderOptions),
  };
}
