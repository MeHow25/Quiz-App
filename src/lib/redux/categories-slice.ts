import { createSelector } from 'reselect';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiServiceProvider from "@/lib/services/main";
import type { Category } from "@/lib/services/types";
import type { RootState } from "@/lib/redux/store";

interface CategoriesState {
  value: Category[] | null;
  status: "idle" | "loading";
}

const initialState: CategoriesState = {
  value: null,
  status: "idle",
};

export const fetchAsync = createAsyncThunk(
  "categories/fetchCategories",
  async () => await apiServiceProvider.getApiService().fetchCategories(),
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.value = action.payload ?? null;
      });
  },
});

// Memoized selectors - only re-compute when input changes
const selectCategoriesState = (state: RootState) => state.categories;

export const selectCategoriesValue = createSelector(
  [selectCategoriesState],
  (categories) => categories.value
);

export const selectCategoriesStatus = createSelector(
  [selectCategoriesState],
  (categories) => categories.status
);

export const selectCategoriesLoading = createSelector(
  [selectCategoriesState],
  (categories) => categories.status === "loading"
);

export default categoriesSlice.reducer;
