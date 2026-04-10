import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: cors });
  }

  const { q } = await req.json().catch(() => ({ q: "" }));
  if (!q || String(q).trim().length < 2) {
    return new Response(JSON.stringify({ results: [] }), {
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }

  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(q)}&media=music&entity=song&limit=8`;
  const res = await fetch(url);
  const text = await res.text();

  let results = [];
  try {
    results = JSON.parse(text).results ?? [];
  } catch {
    results = [];
  }

  return new Response(JSON.stringify({ results }), {
    headers: { ...cors, "Content-Type": "application/json" },
  });
});
