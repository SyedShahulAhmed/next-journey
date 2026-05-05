import { connectDb } from "@/lib/db";
import { generateToken } from "@/lib/jwt";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDb();
    const { email, password } = await req.json();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid Credentails" },
        { status: 400 },
      );
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid Credentails" },
        { status: 400 },
      );
    }
    const token = generateToken(user._id.toString());
    const res = NextResponse.json({ message: "Login sucessfull" });
    res.cookies.set("token", token, {
      httpOnly: true,
    });
    return res;
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Login failed" }, { status: 400 });
  }
}
