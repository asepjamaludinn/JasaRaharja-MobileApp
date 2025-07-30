import type { LeaderboardEntry } from "@/data/leaderboard-data";
import { apiClient } from "@/lib/api";

export async function getLeaderboardData(): Promise<LeaderboardEntry[]> {
  const response = await apiClient<LeaderboardEntry[]>("/user/leaderboard");
  return response;
}
