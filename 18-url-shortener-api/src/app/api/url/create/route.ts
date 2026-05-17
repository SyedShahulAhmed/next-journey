import { connectDb } from "@/lib/db";
import { getUser } from "@/lib/getUser";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import Url from "@/models/Url";

export async function POST(req: Request) {
  try {
    await connectDb();

    const user = await getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized Access" },
        { status: 401 },
      );
    }

    const { originalUrl, customSlug } = await req.json();
    const normalizedOriginalUrl = String(originalUrl || "").trim();
    const normalizedCustomSlug = String(customSlug || "").trim();

    if (!normalizedOriginalUrl) {
      return NextResponse.json({ error: "URL required" }, { status: 400 });
    }

    let parsedUrl: URL;
    try {
      parsedUrl = new URL(normalizedOriginalUrl);
    } catch {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    if (
      normalizedCustomSlug &&
      !/^[a-zA-Z0-9_-]+$/.test(normalizedCustomSlug)
    ) {
      return NextResponse.json(
        { error: "Invalid custom slug" },
        { status: 400 },
      );
    }

    if (!/^https?:$/.test(parsedUrl.protocol)) {
      return NextResponse.json(
        { error: "URL must start with http or https" },
        { status: 400 },
      );
    }

    const shortCode = normalizedCustomSlug || nanoid(6).toLowerCase();

    const existingSlug = await Url.findOne({
      shortCode,
    });

    if (existingSlug) {
      return NextResponse.json(
        { error: "Slug already exists" },
        { status: 409 },
      );
    }

    const newUrl = await Url.create({
      userId: user.userId,
      originalUrl: parsedUrl.toString(),
      shortCode,
    });

    return NextResponse.json(
      {
        message: "Short Url Created",
        shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${shortCode}`,
        data: newUrl,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong during URL creation" },
      { status: 500 },
    );
  }
}
