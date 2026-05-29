import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import { connectDb } from "@/lib/db";
import { signToken } from "@/lib/jwt";
import { signupSchema } from "@/lib/validation";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectDb();
    const body = await req.json();

    const parsed = signupSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues[0]?.message },
        { status: 400 },
      );
    }

    const { username, email, password } = parsed.data;

    const existing = await User.findOne({ email });

    if (existing) {
      return NextResponse.json(
        { success: false, error: "User already exists" },
        { status: 409 },
      );
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPass,
      avatar: body.avatar ?? "",
    });

    const token = signToken({
      userId: newUser._id.toString(),
      email: newUser.email,
    });

    const res = NextResponse.json(
      {
        success: true,
        user: {
          id: newUser._id.toString(),
          username: newUser.username,
          email: newUser.email,
          avatar: newUser.avatar,
          createdAt: newUser.createdAt,
        },
      },
      { status: 201 },
    );

    res.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return res;
  } catch {
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 },
    );
  }
}
