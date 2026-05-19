import { getUser } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const currentUser = await getUser();

    if (!currentUser) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const user = await User.findById(currentUser.userId).select("-passowrd");
    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 401 },
      );
    }
    return NextResponse.json({
      sucess: true,
      user,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 400 },
    );
  }
}
