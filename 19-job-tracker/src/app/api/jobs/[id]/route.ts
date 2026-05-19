import { getUser } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Job from "@/models/Job";
import { NextResponse } from "next/server";

interface Params {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: Request, { params }: Params) {
  try {
    await connectDB();

    const user = await getUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await req.json();

    const { id } = await params;

    const job = await Job.findById(id);

    if (!job) {
      return NextResponse.json(
        { success: false, error: "Job Not Found" },
        { status: 401 },
      );
    }

    if (job.userId.toString() !== user.userId) {
      return NextResponse.json(
        { success: false, error: "Forbidden" },
        { status: 401 },
      );
    }

    const updatedJob = await Job.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    return NextResponse.json(
      { success: true, message: "Job Updated", job: updatedJob },
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

export async function DELETE(req: Request, { params }: Params) {
  try {
    await connectDB();

    const user = await getUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const { id } = await params;

    const job = await Job.findById(id);

    if (!job) {
      return NextResponse.json(
        { success: false, error: "Job not found" },
        { status: 401 },
      );
    }

    if (job.userId.toString() !== user.userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const deleteJob = await Job.findByIdAndDelete(id);

    return NextResponse.json(
      { success: true, message: "Job Deleted", job: deleteJob },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 400 },
    );
  }
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    await connectDB();

    const currentUser = await getUser();

    if (!currentUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    const { id } = await params;

    const job = await Job.findById(id);

    if (!job) {
      return NextResponse.json(
        {
          success: false,
          message: "Job not found",
        },
        { status: 404 },
      );
    }

    if (job.userId.toString() !== currentUser.userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Forbidden",
        },
        { status: 403 },
      );
    }

    return NextResponse.json({
      success: true,
      job,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}
