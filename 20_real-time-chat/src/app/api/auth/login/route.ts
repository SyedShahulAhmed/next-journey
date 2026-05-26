import { connectDb } from "@/lib/db";
import { signToken } from "@/lib/jwt";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDb();
    const body = await req.json();
    const { email, password } = body;

    if (!email && !password) {
      return NextResponse.json(
        { success: false, message: "Some fields are missing" },
        { status: 401 },
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 401 },
      );
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 },
      );
    }

    const token = signToken({ userId: user.userId, email: user.email });

    const res = NextResponse.json(
      { success: true, message: "Login Successfull", user, token },
      { status: 200 },
    );
    res.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 400 },
    );
  }
}
