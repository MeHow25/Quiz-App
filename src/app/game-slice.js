import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentQuestionIndex: 0,
  winGame: false,
  answerClicked: false,
  correctAnswerClicked: null,
  stopStopwatch: false,
  renderTimer: true,
  restartCount: 0,
  summaryShow: false,
  startedAt: 0,
  finishedAt: 0,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    start: (state) => {
      state.winGame = false;
      state.answerClicked = false;
      state.correctAnswerClicked = null;
      state.currentQuestionIndex = 0;
      state.stopStopwatch = false;
      state.startedAt = new Date().getTime();
    },
    startAgain: (state) => {
      state.renderTimer = false;
      state.restartCount++;
      state.startedAt = new Date().getTime();
    },
    showTimer: (state) => {
      state.renderTimer = true;
    },
    correctAnswer: (state) => {
      state.answerClicked = true;
      state.correctAnswerClicked = true;

      if (state.currentQuestionIndex === 9) {
        state.winGame = true;
        state.summaryShow = true;
        state.stopStopwatch = true;
        state.finishedAt = new Date().getTime();
      }
    },
    incorrectAnswer: (state) => {
      state.answerClicked = true;
      state.correctAnswerClicked = false;
      state.stopStopwatch = true;
    },
    showSummary: (state) => {
      state.summaryShow = true;
    },
    hideSummary: (state) => {
      state.summaryShow = false;
    },
    goNextQuestion: (state) => {
      state.answerClicked = false;
      state.correctAnswer = null;

      if (state.currentQuestionIndex < 9) {
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

export default gameSlice.reducer;
