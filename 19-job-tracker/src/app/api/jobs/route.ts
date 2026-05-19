import { getUser } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Job from "@/models/Job";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const currUser = await getUser();

    if (!currUser) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await req.json();

    const {
      title,
      company,
      location,
      salary,
      status,
      type,
      jobLink,
      notes,
      interviewDate,
    } = body;

    if (!title && !company) {
      return NextResponse.json(
        { success: false, error: "Title and Company are required" },
        { status: 401 },
      );
    }

    const newJob = await Job.create({
      title,
      company,
      location,
      salary,
      status,
      type,
      jobLink,
      notes,
      interviewDate,
      userId: currUser.userId,
    });

    return NextResponse.json(
      { success: true, message: "Job created Sucessfully", newJob },
      { status: 200 },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { success: false, error: "Something went wrong", err },
      { status: 400 },
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const currUser = await getUser();

    if (!currUser) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const jobs = await Job.find({ userId: currUser.userId }).sort({
      createdAt: -1,
    });

    return NextResponse.json(
      { success: true, count: jobs.length, message: "User jobs fetched", jobs },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Something went wrong", err },
      { status: 400 },
    );
  }
}
