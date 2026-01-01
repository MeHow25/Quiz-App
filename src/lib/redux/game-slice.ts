import { createSlice } from "@reduxjs/toolkit";
import leaderboardService from "@/lib/services/leaderboard.service";
import type { RootState, AppDispatch } from "./store";

export interface GameState {
  currentQuestionIndex: number;
  wonGame: boolean;
  answerClicked: boolean;
  stopStopwatch: boolean;
  showTimer: boolean;
  restartCount: number;
  showSummary: boolean;
  startedAt: number;
  finishedAt: number;
  recordSaved: boolean;
  showNextQuestionButton: boolean;
  showPlayAgainButton: boolean;
}

const initialState: GameState = {
  currentQuestionIndex: 0,
  wonGame: false,
  answerClicked: false,
  stopStopwatch: false,
  showTimer: true,
  // todo display it
  restartCount: 0,
  showSummary: false,
  startedAt: 0,
  finishedAt: 0,
  recordSaved: false,
  showNextQuestionButton: false,
  showPlayAgainButton: false,
};

const LAST_QUESTION_INDEX = 9;

const resetGameState = (state: GameState) => {
  state.answerClicked = false;
  state.stopStopwatch = false;
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    start: (state) => {
      state.wonGame = false;
      state.currentQuestionIndex = 0;
      state.startedAt = new Date().getTime();
      resetGameState(state);
    },
    startAgain: (state) => {
      state.showTimer = false;
      state.restartCount++;
      state.startedAt = new Date().getTime();
      state.showPlayAgainButton = false;
      resetGameState(state);
    },
    resetCounter: (state) => {
      state.restartCount = 0;
    },
    showTimer: (state) => {
      state.showTimer = true;
    },
    correctAnswer: (state) => {
      state.answerClicked = true;

      if (state.currentQuestionIndex === LAST_QUESTION_INDEX) {
        state.wonGame = true;
        state.showSummary = true;
        state.stopStopwatch = true;
        state.finishedAt = new Date().getTime();
      }

      state.showNextQuestionButton =
        state.currentQuestionIndex < LAST_QUESTION_INDEX;
    },
    incorrectAnswer: (state) => {
      state.answerClicked = true;
      state.stopStopwatch = true;
      state.showPlayAgainButton = true;
    },
    showSummary: (state) => {
      state.showSummary = true;
      state.recordSaved = true;
    },
    hideSummary: (state) => {
      state.showSummary = false;
    },
    goNextQuestion: (state) => {
      state.answerClicked = false;
      state.showNextQuestionButton = false;

      if (state.currentQuestionIndex < LAST_QUESTION_INDEX) {
        state.currentQuestionIndex++;
      }
    },
  },
});
export const {
  start,
  startAgain,
  resetCounter,
  correctAnswer,
  incorrectAnswer,
  showSummary,
  showTimer,
  goNextQuestion,
  hideSummary,
} = gameSlice.actions;

export const selectGame = (state: RootState) => state.game;
export const selectFinishedAt = (state: RootState) => state.game.finishedAt;
export const selectStartedAt = (state: RootState) => state.game.startedAt;
export const selectStopStopwatch = (state: RootState) =>
  state.game.stopStopwatch;

export function saveRecord(nickname: string) {
  return async function saveRecordThunk(
    dispatch: AppDispatch,
    getState: () => RootState,
  ) {
    const state = getState();
    const time = state.game.finishedAt - state.game.startedAt;
    const initialTodo = { nickname, time };
    await leaderboardService.sendRecordToApi(initialTodo);
    dispatch(showSummary());
  };
}

export default gameSlice.reducer;
