import { connectDb } from "@/lib/db";
import { getUser } from "@/lib/getUser";
import Url from "@/models/Url";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDb();

    const user = await getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const urls = await Url.find({
      userId: user.userId,
    }).sort({
      createdAt: -1,
    });
    return NextResponse.json(urls);
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong during fetching user Urls" },
      { status: 500 },
    );
  }
}
