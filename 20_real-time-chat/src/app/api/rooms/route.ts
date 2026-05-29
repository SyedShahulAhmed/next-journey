import { NextResponse } from "next/server";

import { getAuthUser } from "@/lib/auth";
import { connectDb } from "@/lib/db";
import { roomSchema } from "@/lib/validation";
import Room from "@/models/Room";

export async function GET() {
  try {
    await connectDb();

    const authUser = await getAuthUser();

    if (!authUser) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const rooms = await Room.find().sort({ createdAt: -1 });
    return NextResponse.json(
      {
        success: true,
        rooms,
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong during rooms fetching",
      },
      { status: 400 },
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDb();

    const authUser = await getAuthUser();

    if (!authUser) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }
    const body = await req.json();

    const parsed = roomSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues[0]?.message },
        { status: 400 },
      );
    }

    const { name, description } = parsed.data;

    const existing = await Room.findOne({ name });

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          error: "Room already present",
        },
        { status: 409 },
      );
    }

    const room = await Room.create({
      name,
      description,
      createdBy: authUser.userId,
    });
    return NextResponse.json(
      {
        success: true,
        room,
      },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong room adding",
      },
      { status: 400 },
    );
  }
}
