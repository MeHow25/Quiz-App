import { create } from "zustand";
import leaderboardService from "@/lib/services/leaderboard.service";

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

interface GameActions {
  start: () => void;
  startAgain: () => void;
  resetCounter: () => void;
  correctAnswer: () => void;
  incorrectAnswer: () => void;
  showSummaryAction: () => void;
  hideSummary: () => void;
  goNextQuestion: () => void;
  showTimerAction: () => void;
  saveRecord: (nickname: string) => Promise<void>;
}

const LAST_QUESTION_INDEX = 9;

const initialState: GameState = {
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
};

export const useGameStore = create<GameState & GameActions>((set, get) => ({
  ...initialState,

  start: () =>
    set({
      wonGame: false,
      currentQuestionIndex: 0,
      startedAt: Date.now(),
      answerClicked: false,
      stopStopwatch: false,
    }),

  startAgain: () =>
    set((state) => ({
      showTimer: false,
      restartCount: state.restartCount + 1,
      startedAt: Date.now(),
      showPlayAgainButton: false,
      answerClicked: false,
      stopStopwatch: false,
    })),

  resetCounter: () => set({ restartCount: 0 }),

  showTimerAction: () => set({ showTimer: true }),

  correctAnswer: () =>
    set((state) => {
      const isLastQuestion = state.currentQuestionIndex === LAST_QUESTION_INDEX;

      if (isLastQuestion) {
        return {
          answerClicked: true,
          wonGame: true,
          showSummary: true,
          stopStopwatch: true,
          finishedAt: Date.now(),
          showNextQuestionButton: false,
        };
      }

      return {
        answerClicked: true,
        showNextQuestionButton: true,
      };
    }),

  incorrectAnswer: () =>
    set({
      answerClicked: true,
      stopStopwatch: true,
      showPlayAgainButton: true,
    }),

  showSummaryAction: () =>
    set({
      showSummary: true,
      recordSaved: true,
    }),

  hideSummary: () => set({ showSummary: false }),

  goNextQuestion: () =>
    set((state) => {
      if (state.currentQuestionIndex < LAST_QUESTION_INDEX) {
        return {
          answerClicked: false,
          showNextQuestionButton: false,
          currentQuestionIndex: state.currentQuestionIndex + 1,
        };
      }
      return {
        answerClicked: false,
        showNextQuestionButton: false,
      };
    }),

  saveRecord: async (nickname: string) => {
    const state = get();
    const time = state.finishedAt - state.startedAt;
    await leaderboardService.sendRecordToApi({ nickname, time });
    set({ showSummary: true, recordSaved: true });
  },
}));

export const selectFinishedAt = (state: GameState & GameActions) =>
  state.finishedAt;
export const selectStartedAt = (state: GameState & GameActions) =>
  state.startedAt;
export const selectStopStopwatch = (state: GameState & GameActions) =>
  state.stopStopwatch;
