import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchQuestions } from "@/app/api.service";

const initialState = {
  value: null,
  status: "idle",
  noResults: false,
};

export const fetchQuestionsAsync = createAsyncThunk(
  "questions/fetchQuestions",
  async ({ categoryId, difficulty, trueFalse }) =>
    (await fetchQuestions(categoryId, difficulty, trueFalse))?.results,
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
        state.noResults =
          action.payload == null || action.payload === "noResults";
      });
  },
});

export const { resetQuestions } = questionsSlice.actions;

export const selectQuestions = (state) => state.questions;

export default questionsSlice.reducer;
