import { connectDb } from "@/lib/db";
import { getUser } from "@/lib/getUser";
import Url from "@/models/Url";
import { NextResponse } from "next/server";

interface Props {
  params: {
    id: string;
  };
}

export async function DELETE(req: Request, { params }: Props) {
  try {
    await connectDb();

    const user = await getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const deletedUrl = await Url.findOneAndDelete({
      _id: id,
      userId: user.userId,
    });

    if (!deletedUrl) {
      return NextResponse.json(
        { error: "URL not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: "URL deleted successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "URL deletion failed",
      },
      { status: 500 },
    );
  }
}

export async function PATCH(req: Request, { params }: Props) {
  try {
    await connectDb();

    const user = await getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { shortCode } = await req.json();
    const normalizedShortCode = String(shortCode || "").trim();

    if (!normalizedShortCode) {
      return NextResponse.json(
        {
          error: "Missing field value",
        },
        { status: 400 },
      );
    }

    const { id } = await params;

    const existingSlug = await Url.findOne({
      shortCode: normalizedShortCode,
    });

    if (existingSlug && existingSlug._id.toString() !== id) {
      return NextResponse.json(
        { error: "Slug already taken" },
        { status: 409 },
      );
    }
    const updateUrl = await Url.findOneAndUpdate(
      {
        _id: id,
        userId: user.userId,
      },
      {
        shortCode: normalizedShortCode,
      },
      {
        new: true,
      },
    );

    if (!updateUrl) {
      return NextResponse.json({ error: "URL not found" }, { status: 404 });
    }

    return NextResponse.json(updateUrl);
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
