import { LeaderboardEntry } from "./types";

const leaderboardService = {
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
