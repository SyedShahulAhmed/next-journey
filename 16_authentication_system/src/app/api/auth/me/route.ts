import { connectDb } from "@/lib/db";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/User";

import { cookies } from "next/headers";

export async function GET(req: Request) {
  try {
    await connectDb();

    // const token = req.headers.get("cookie")?.split("token=")[1];

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized Access" },
        { status: 400 },
      );
    }
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { error: "User fetching failed" },
      { status: 401 },
    );
  }
}
