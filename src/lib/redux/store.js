import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./categories-slice";
import questionsReducer from "./questions-slice";
import gameReducer from "./game-slice";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    questions: questionsReducer,
    game: gameReducer,
  },
});
export const setupStore = (preloadedState) =>
  configureStore({
    reducer: {
      categories: categoriesReducer,
      questions: questionsReducer,
      game: gameReducer,
    },
    preloadedState,
  });
