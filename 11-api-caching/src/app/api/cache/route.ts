import { NextResponse } from "next/server";
import { deleteCache, getAllCache } from "@/lib/cache";

export async function GET() {
  const keys = getAllCache().sort((a, b) => b.cachedAt - a.cachedAt);

  return NextResponse.json({
    keys,
    total: keys.length,
  });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  if (!key) {
    return NextResponse.json({ error: "Key required" }, { status: 400 });
  }

  const success = deleteCache(key);

  return NextResponse.json({
    success,
    message: success ? "Cache deleted" : "Key not found",
  });
}