import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data } = await supabase.from("leaderboard").select("*");

  return Response.json(data);
}

export async function POST(request) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { nickname, time } = await request.json();

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
