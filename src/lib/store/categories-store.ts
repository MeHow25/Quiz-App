import { create } from "zustand";
import apiServiceProvider from "@/lib/services/main";
import type { Category } from "@/lib/services/types";

interface CategoriesState {
  value: Category[] | null;
  status: "idle" | "loading";
}

interface CategoriesActions {
  fetchCategories: () => Promise<void>;
}

const initialState: CategoriesState = {
  value: null,
  status: "idle",
};

export const useCategoriesStore = create<CategoriesState & CategoriesActions>(
  (set) => ({
    ...initialState,

    fetchCategories: async () => {
      set({ status: "loading" });
      const result = await apiServiceProvider.getApiService().fetchCategories();
      set({ status: "idle", value: result ?? null });
    },
  }),
);

export const selectCategoriesValue = (
  state: CategoriesState & CategoriesActions,
) => state.value;
