import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "Logout Successfull...." });

  res.cookies.set("token", "", { 
    expires: new Date(0),
    path: "/",    
    maxAge: 0,
 });
  return res;
}
