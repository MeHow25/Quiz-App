import { create } from "zustand";
import apiServiceProvider from "@/lib/services/main";
import type { Question } from "@/lib/services/types";

interface QuestionsState {
  value: Question[] | null;
  status: "idle" | "loading";
  noResults: boolean;
}

interface FetchQuestionsParams {
  categoryId: string | null;
  difficulty: string | null;
  trueFalse: string;
}

interface QuestionsActions {
  resetQuestions: () => void;
  fetchQuestions: (params: FetchQuestionsParams) => Promise<void>;
}

const initialState: QuestionsState = {
  value: null,
  status: "idle",
  noResults: false,
};

export const useQuestionsStore = create<QuestionsState & QuestionsActions>(
  (set) => ({
    ...initialState,

    resetQuestions: () => set({ value: null }),

    fetchQuestions: async ({
      categoryId,
      difficulty,
      trueFalse,
    }: FetchQuestionsParams) => {
      set({ status: "loading" });

      const result = await apiServiceProvider
        .getApiService()
        .fetchQuestions(categoryId ?? "", difficulty ?? "", trueFalse);

      if (!result || result === "noResults") {
        set({ status: "idle", value: null, noResults: true });
        return;
      }

      set({ status: "idle", value: result.results, noResults: false });
    },
  }),
);

// Selectors
export const selectQuestionsValue = (
  state: QuestionsState & QuestionsActions,
) => state.value;
export const selectQuestionsStatus = (
  state: QuestionsState & QuestionsActions,
) => state.status;
export const selectQuestionsLoading = (
  state: QuestionsState & QuestionsActions,
) => state.status === "loading";
export const selectNoResults = (state: QuestionsState & QuestionsActions) =>
  state.noResults;
