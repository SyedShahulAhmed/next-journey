import { connectDb } from "@/lib/db";
import { verifyToken } from "@/lib/jwt";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDb();
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Invalid Token..." }, { status: 400 });
    }
    const decoded : any = verifyToken(token);
    if(!decoded){
        return NextResponse.json({ error: "Invalid Token..." }, { status: 400 });
    }
    const user = await User.findById(decoded.userId).select("-password");
    if(!user){
        return NextResponse.json({ error: "User not found..." }, { status: 404 });
    }
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong during User fecthinhg" },
      { status: 401 },
    );
  }
}
