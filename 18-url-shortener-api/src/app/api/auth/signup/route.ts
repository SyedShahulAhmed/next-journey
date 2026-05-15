import { connectDb } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDb();

    const { name, email, password } = await req.json();

    if (!name && !email && !password) {
      return NextResponse.json(
        { error: "Some field are missing" },
        { status: 400 },
      );
    }
    const userExist = await User.findOne({ email });

    if (userExist) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 },
      );
    }

    const hashpass = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashpass,
    });

    return NextResponse.json(
      { message: "User succesfully created", newUser },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong during signup" },
      { status: 401 },
    );
  }
}
