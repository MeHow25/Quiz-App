import { createSlice } from "@reduxjs/toolkit";
import leaderboardService from "@/lib/services/leaderboard.service";

const initialState = {
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

const resetGameState = (state) => {
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
      state.correctAnswer = null;
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
  correctAnswer,
  incorrectAnswer,
  showSummary,
  showTimer,
  goNextQuestion,
  hideSummary,
} = gameSlice.actions;

export const selectGame = (state) => state.game;
export const selectFinishedAt = (state) => state.game.finishedAt;
export const selectStartedAt = (state) => state.game.startedAt;
export const selectStopStopwatch = (state) => state.game.stopStopwatch;

export function saveRecord(nickname) {
  return async function saveRecordThunk(dispatch, getState) {
    const state = getState();
    const time = state.game.finishedAt - state.game.startedAt;
    const initialTodo = { nickname, time };
    await leaderboardService.sendRecordToApi(initialTodo);
    dispatch(showSummary());
  };
}

export default gameSlice.reducer;
