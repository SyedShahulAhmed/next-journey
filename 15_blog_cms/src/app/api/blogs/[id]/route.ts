import { connectDb } from "@/lib/mongoDb";
import BlogModel from "@/models/Blog";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

function resolveId(req: Request, params?: { id?: string }) {
  const idFromParams = params?.id;
  if (idFromParams) {
    return idFromParams;
  }

  try {
    const url = new URL(req.url);
    const parts = url.pathname.split("/").filter(Boolean);
    return parts[parts.length - 1];
  } catch {
    return undefined;
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = resolveId(req, params);
    console.log("ID:", id);
    if (!id || id === "blogs") {
      return NextResponse.json({ error: "Missing id." }, { status: 400 });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid id." }, { status: 400 });
    }
    await connectDb();

    const blog = await BlogModel.findById(id);

    if (!blog) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch blog." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = resolveId(req, params);
    console.log("ID:", id);
    if (!id || id === "blogs") {
      return NextResponse.json({ error: "Missing id." }, { status: 400 });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid id." }, { status: 400 });
    }
    await connectDb();

    const deletedBlog = await BlogModel.findByIdAndDelete(id);

    if (!deletedBlog) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete blog." },
      { status: 500 },
    );
  }
}

async function updateBlog(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = resolveId(req, params);
    console.log("ID:", id);
    if (!id || id === "blogs") {
      return NextResponse.json({ error: "Missing id." }, { status: 400 });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid id." }, { status: 400 });
    }
    await connectDb();

    const body = await req.json();
    const title =
      typeof body?.title === "string" ? body.title.trim() : undefined;
    const content =
      typeof body?.content === "string" ? body.content.trim() : undefined;

    if ((title !== undefined && !title) || (content !== undefined && !content)) {
      return NextResponse.json(
        { error: "Title and content cannot be empty." },
        { status: 400 },
      );
    }

    const updates: { title?: string; content?: string } = {};

    if (title !== undefined) {
      updates.title = title;
    }

    if (content !== undefined) {
      updates.content = content;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: "Nothing to update." },
        { status: 400 },
      );
    }

    const updatedBlog = await BlogModel.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(updatedBlog, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update blog." },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: Request,
  context: { params: { id: string } }
) {
  return updateBlog(req, context);
}

export async function PATCH(
  req: Request,
  context: { params: { id: string } }
) {
  return updateBlog(req, context);
}