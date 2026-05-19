import { connectDB } from "@/lib/db";
import { signToken } from "@/lib/jwt";
import { hashPassword } from "@/lib/password";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const { name, email, password } = body;

    if (!name && !email && !password) {
      return NextResponse.json(
        { error: "Some fields are missing" },
        { status: 401 },
      );
    }

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 401 },
      );
    }

    const hashPass = await hashPassword(password);

    const newUser = await User.create({
      name,
      email,
      password: hashPass,
    });

    const token = signToken({
      userId: newUser._id.toString(),
      email: newUser.email,
    });

    const res = NextResponse.json(
      {
        success: true,
        message: "User created sucessfully",
        newUser,
        token,
      },
      { status: 200 },
    );

    res.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return res;
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong",
        err,
      },
      { status: 401 },
    );
  }
}
