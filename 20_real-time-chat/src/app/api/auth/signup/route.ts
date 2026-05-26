import { connectDb } from "@/lib/db";
import { signToken } from "@/lib/jwt";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDb();
    const body = await req.json();
    const { username, email, password, avatar } = body;

    if (!username && !email && !password && !avatar) {
      return NextResponse.json(
        { success: false, message: "Fields are missing" },
        { status: 401 },
      );
    }

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { success: false, message: "User already exists" },
        { status: 401 },
      );
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPass,
      avatar,
    });
    const token = signToken({ userId: user.userId, email: user.email });
    const res = NextResponse.json(
      { success: true, message: "user created Succesfully" },
      { status: 200 },
    );
    res.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return res;
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 400 },
    );
  }
}
