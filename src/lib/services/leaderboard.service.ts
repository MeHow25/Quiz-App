const leaderboardService = {
  async sendRecordToApi(requestBody: any) {
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

module.exports = leaderboardService;
