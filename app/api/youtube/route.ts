import { NextRequest, NextResponse } from "next/server";
import { extractVideoId } from "@/lib/youtube";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) {
    return NextResponse.json({ error: "Missing url" }, { status: 400 });
  }
  const videoId = extractVideoId(url);
  if (!videoId) {
    return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 });
  }
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }
  let res: Response;
  try {
    res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${apiKey}`,
    );
  } catch (error) {
    console.error("Failed to call YouTube API", error);
    return NextResponse.json(
      { error: "Failed to fetch video info" },
      { status: 500 },
    );
  }
  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch video info" }, { status: 500 });
  }
  const json = await res.json();
  if (!json.items || json.items.length === 0) {
    return NextResponse.json({ error: "Video not found" }, { status: 404 });
  }
  const item = json.items[0];
  const snippet = item.snippet;
  const viewCount = item.statistics?.viewCount || "0";
  const thumbnail =
    snippet.thumbnails?.high?.url ||
    snippet.thumbnails?.standard?.url ||
    snippet.thumbnails?.default?.url ||
    "";
  return NextResponse.json({
    title: snippet.title,
    imageUrl: thumbnail,
    viewCount,
  });
}
