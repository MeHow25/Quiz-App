import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "@/lib/redux/categories-slice";
import questionsReducer from "@/lib/redux/questions-slice";
import gameReducer from "@/lib/redux/game-slice";

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
