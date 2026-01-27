import { createSelector } from 'reselect';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiServiceProvider from "@/lib/services/main";
import type { Question } from "@/lib/services/types";
import type { RootState } from "@/lib/redux/store";

interface QuestionsState {
  value: Question[] | null;
  status: "idle" | "loading";
  noResults: boolean;
}

const initialState: QuestionsState = {
  value: null,
  status: "idle",
  noResults: false,
};

interface FetchQuestionsParams {
  categoryId: string | null;
  difficulty: string | null;
  trueFalse: string;
}

export const fetchQuestionsAsync = createAsyncThunk(
  "questions/fetchQuestions",
  async ({ categoryId, difficulty, trueFalse }: FetchQuestionsParams) => {
    const result = await apiServiceProvider
      .getApiService()
      .fetchQuestions(categoryId ?? "", difficulty ?? "", trueFalse);
    
    if (!result || result === "noResults") {
      return null;
    }
    
    return result.results;
  }
);

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    resetQuestions: (state) => {
      state.value = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestionsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQuestionsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.value = action.payload;
        state.noResults = action.payload == null;
      });
  },
});

export const { resetQuestions } = questionsSlice.actions;

// Memoized selectors
const selectQuestionsState = (state: RootState) => state.questions;

export const selectQuestionsValue = createSelector(
  [selectQuestionsState],
  (questions) => questions.value
);

export const selectQuestionsStatus = createSelector(
  [selectQuestionsState],
  (questions) => questions.status
);

export const selectQuestionsLoading = createSelector(
  [selectQuestionsState],
  (questions) => questions.status === "loading"
);

export const selectNoResults = createSelector(
  [selectQuestionsState],
  (questions) => questions.noResults
);

// Combined selector with multiple outputs (useful when you need multiple fields)
export const selectQuestionsAndStatus = createSelector(
  [selectQuestionsValue, selectQuestionsStatus],
  (value, status) => ({ value, status })
);

export default questionsSlice.reducer;
