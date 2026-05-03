import { connectDb } from "@/lib/mongoDb";
import BlogModel from "@/models/Blog";
import { NextResponse } from "next/server";

// ✅ GET blogs
export async function GET() {
  try {
    await connectDb();

    const blogs = await BlogModel.find().sort({ createdAt: -1 });

    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch blogs." },
      { status: 500 },
    );
  }
}

// ✅ POST blog
export async function POST(req: Request) {
  try {
    await connectDb();

    const body = await req.json();
    const title = typeof body?.title === "string" ? body.title.trim() : "";
    const content =
      typeof body?.content === "string" ? body.content.trim() : "";

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required." },
        { status: 400 },
      );
    }

    const newBlog = await BlogModel.create({
      title,
      content,
      author: body?.author,
      excerpt: body?.excerpt,
    });

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create blog." },
      { status: 500 },
    );
  }
}