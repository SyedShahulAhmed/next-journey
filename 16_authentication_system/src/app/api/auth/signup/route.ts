import { connectDb } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDb();
    const { name, email, password } = await req.json();
    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json(
        {
          error: "User already exist",
        },
        { status: 400 },
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return NextResponse.json({ message: "User created successfully" }, user);
  } catch (error) {
    return NextResponse.json({ error: "Signup Failed" }, { status: 500 });
  }
}
