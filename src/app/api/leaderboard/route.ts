import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { LeaderboardEntry } from "@/lib/services/types";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  if (process.env.NEXT_PUBLIC_USE_FAKE_API === "true") {
    return Response.json([]);
  }

  const { data } = await supabase.from("leaderboard").select("*");

  return Response.json(data);
}

export async function POST(request: NextRequest) {
  if (process.env.NEXT_PUBLIC_USE_FAKE_API === "true") {
    return new Response(JSON.stringify([]), { status: 201 });
  }

  const { nickname, time }: Omit<LeaderboardEntry, "id" | "created_at"> =
    await request.json();
  const { data, error } = await supabase
    .from("leaderboard")
    .insert([{ nickname, time }]);
  if (error) {
    console.log("error", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify(data), { status: 201 });
}
