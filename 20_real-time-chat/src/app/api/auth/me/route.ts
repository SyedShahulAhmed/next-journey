import { getUser } from "@/lib/auth";
import { connectDb } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDb();

    const currUser = await getUser();

    if (!currUser) {
      return NextResponse.json(
        { success: false, error: "Unauthorized Access" },
        { status: 401 },
      );
    }

    const user = await User.findById(currUser.userId).select("-passowrd");

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User Not found" },
        { status: 401 },
      );
    }
    return NextResponse.json(
      { success: true, message: "User fetched Successfully", user },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 400 },
    );
  }
}
