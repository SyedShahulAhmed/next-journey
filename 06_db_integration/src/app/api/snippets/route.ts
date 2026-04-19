import { connectDB } from "@/src/lib/db";
import { Snippet } from "@/src/models/Snippet";
import { title } from "process";

export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);

  const search = searchParams.get("search");
  const tag = searchParams.get("tag");
  const language = searchParams.get("language");

  const query: any = {};
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
    ];
  }

  if (tag) {
    query.tags = tag;
  }

  if (language) {
    query.language = language;
  }

  const snippets = await Snippet.find(query).sort({ createdAt: -1 });

  return Response.json(snippets);
}
export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const snippet = await Snippet.create(body);
  return Response.json(snippet);
}
