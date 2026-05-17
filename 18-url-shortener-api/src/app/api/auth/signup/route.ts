import { connectDb } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDb();

    const { name, email, password } = await req.json();
    const normalizedName = String(name || "").trim();
    const normalizedEmail = String(email || "").trim().toLowerCase();
    const normalizedPassword = String(password || "");

    if (!normalizedName || !normalizedEmail || !normalizedPassword) {
      return NextResponse.json(
        { error: "Some fields are missing" },
        { status: 400 },
      );
    }
    const userExist = await User.findOne({ email: normalizedEmail });

    if (userExist) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 },
      );
    }

    const hashpass = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name: normalizedName,
      email: normalizedEmail,
      password: hashpass,
    });

    return NextResponse.json(
      {
        message: "User successfully created",
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong during signup" },
      { status: 500 },
    );
  }
}
