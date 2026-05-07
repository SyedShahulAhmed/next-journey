import { connectDb } from "@/lib/db";
import { signToken } from "@/lib/jwt";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDb();
    const { email, password } = await req.json();
    if (!email && !password) {
      return NextResponse.json(
        { error: "Email or Password required...." },
        { status: 400 },
      );
    }
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return NextResponse.json(
        { message: "User does not exist..." },
        { status: 400 },
      );
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Password is InCorrect" },
        { status: 400 },
      );
    }
    const token = signToken({ userId: user._id, email: user.email });
    const res = NextResponse.json(
      {
        message: "Login Succesfull...",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          token,
        },
      },
      { status: 200 },
    );
    res.cookies.set("token", token, {
      httpOnly: true,
      sameSite : "strict",
      maxAge: 60 * 60 * 24 * 7, 
      path: "/",
    });
    return res;
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong during user login in" },
      { status: 401 },
    );
  }
}
