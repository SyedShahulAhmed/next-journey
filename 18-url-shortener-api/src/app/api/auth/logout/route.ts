import { NextResponse } from "next/server";

export function POST() {
  const res = NextResponse.json(
    { message: "Logout sucessfull" },
    { status: 200 },
  );
  res.cookies.set("token", "", {
    expires: new Date(0),
    path: "/",
    maxAge: 0,
  });
  return res;
}
