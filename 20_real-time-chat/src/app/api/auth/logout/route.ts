import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const res = NextResponse.json(
    { success: true, message: "Logout Successfull" },
    { status: 200 },
  );
  res.cookies.set("token", "", {
    maxAge: 0,
  });
  return res;
}
