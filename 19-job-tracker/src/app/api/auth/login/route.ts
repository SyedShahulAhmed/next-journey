import { connectDB } from "@/lib/db";
import { signToken } from "@/lib/jwt";
import { comparePassword } from "@/lib/password";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const { email, password } = body;

    if (!email && !password) {
      return NextResponse.json(
        { success: false, error: "Some fields are missing" },
        { status: 401 },
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { sucess: false, error: "User doesn't exist" },
        { status: 401 },
      );
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { message: "Invald credentials" },
        { status: 401 },
      );
    }

    const token = signToken({
      userId: user._id.toString(),
      email: user.email,
    });

    const res = NextResponse.json(
      { success: true, message: "Successfully logged in", user, token },
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
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Something went wrong", err },
      { status: 400 },
    );
  }
}
