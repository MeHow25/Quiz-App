import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "@/app/api.service";

const initialState = {
  value: null,
  status: "idle",
};

export const fetchAsync = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    return await fetchCategories();
  },
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
        state.value = action.payload;
      });
  },
});

export const selectCategories = (state) => state.categories.value;

export default categoriesSlice.reducer;
