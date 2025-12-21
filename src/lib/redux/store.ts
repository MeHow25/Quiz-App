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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const setupStore = (preloadedState?: RootState) =>
  configureStore({
    reducer: {
      categories: categoriesReducer,
      questions: questionsReducer,
      game: gameReducer,
    },
    preloadedState,
  });
