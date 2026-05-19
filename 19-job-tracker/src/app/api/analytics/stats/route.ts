import { getUser } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Job from "@/models/Job";
import { NextResponse } from "next/server";

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

    const userId = currUser.userId;

    const totalJobs = await Job.countDocuments({ userId });

    const appliedJobs = await Job.countDocuments({ userId, status: "Applied" });
    const interviewedJobs = await Job.countDocuments({
      userId,
      status: "Interview",
    });
    const offeredJobs = await Job.countDocuments({ userId, status: "Offered" });
    const rejectedJobs = await Job.countDocuments({
      userId,
      status: "Rejected",
    });
    const ghostedJobs = await Job.countDocuments({ userId, status: "Ghosted" });

    const savedJobs = await Job.countDocuments({ userId, status: "Saved" });

    return NextResponse.json(
      {
        sucess: true,
        stats: {
          totalJobs,
          appliedJobs,
          interviewedJobs,
          offeredJobs,
          rejectedJobs,
          ghostedJobs,
          savedJobs,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}
