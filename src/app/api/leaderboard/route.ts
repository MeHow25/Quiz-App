import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  // const supabaseUrl = process.env.SUPABASE_URL;
  // const supabaseKey = process.env.SUPABASE_KEY;
  // const supabase = createClient(supabaseUrl, supabaseKey);
  // const { data } = await supabase.from("leaderboard").select("*");

  return Response.json([]);
}

export async function POST(request: NextRequest) {
  // const supabaseUrl = process.env.SUPABASE_URL;
  // const supabaseKey = process.env.SUPABASE_KEY;
  // const supabase = createClient(supabaseUrl, supabaseKey);
  // const { nickname, time } = await request.json();

  // const { data, error } = await supabase
  //   .from("leaderboard")
  //   .insert([{ nickname, time }]);

  // if (error) {
  //   console.log("error", error);
  //   return new Response(JSON.stringify({ error: error.message }), {
  //     status: 500,
  //   });
  // }

  return new Response(JSON.stringify([]), { status: 201 });
}
