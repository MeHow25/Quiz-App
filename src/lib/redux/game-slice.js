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
  recordSaved: false,
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
      state.recordSaved = true;
    },
    hideSummary: (state) => {
      state.summaryShow = false;
    },
    goNextQuestion: (state) => {
      state.answerClicked = false;
      state.correctAnswer = null;
      state.correctAnswerClicked = false;

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
export const selectCurrentIndex = (state) => state.game.currentQuestionIndex;

// Write a synchronous outer function that receives the `text` parameter:
export function saveRecord() {
  // And then creates and returns the async thunk function:
  return async function saveRecordThunk(dispatch, getState) {
    const state = getState();
    const nickname = "test";
    const time = state.game.finishedAt - state.game.startedAt;
    // ✅ Now we can use the text value and send it to the server
    const initialTodo = { nickname, time };
    // const response = await client.post("/api/leaderboard", { nickname, time });
    const response = await fetch("/api/leaderboard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(initialTodo),
    });
    if (!response.ok) {
      console.error("Failed to save record to leaderboard");
      return;
    }
    const data = await response.json();
    dispatch(showSummary());
  };
}

export default gameSlice.reducer;
