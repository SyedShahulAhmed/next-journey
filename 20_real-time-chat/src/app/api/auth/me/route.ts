import { getAuthUser } from "@/lib/auth";
import { connectDb } from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDb();

    const currUser = await getAuthUser();

    if (!currUser) {
      return NextResponse.json(
        { success: false, error: "Unauthorized Access" },
        { status: 401 },
      );
    }

    const user = await User.findById(currUser.userId).select("-password");

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User Not found" },
        { status: 401 },
      );
    }
    return NextResponse.json(
      {
        success: true,
        user: {
          id: user._id.toString(),
          username: user.username,
          email: user.email,
          avatar: user.avatar,
          createdAt: user.createdAt,
        },
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 400 },
    );
  }
}
