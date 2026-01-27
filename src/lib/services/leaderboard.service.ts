import { LeaderboardEntry } from "@/lib/services/types";

const leaderboardService = {
  async fetchLeaderboard(): Promise<LeaderboardEntry[]> {
    const response = await fetch("/api/leaderboard");
    if (!response.ok) {
      throw new Error("Failed to fetch leaderboard");
    }
    const data = await response.json();

    return data.sort(
      (a: LeaderboardEntry, b: LeaderboardEntry) => a.time - b.time,
    );
  },

  async sendRecordToApi(
    requestBody: Omit<LeaderboardEntry, "id" | "created_at">,
  ) {
    if (process.env.NEXT_PUBLIC_USE_FAKE_API === "true") {
      return [];
    }

    const response = await fetch("/api/leaderboard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    if (!response.ok) {
      console.error("Failed to save record to leaderboard");
      return;
    }
    return await response.json();
  },
};

export default leaderboardService;
