import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";

import { getUser } from "@/lib/auth";

import Job from "@/models/Job";

export async function GET() {
  try {
    await connectDB();

    const currentUser =
      await getUser();

    if (!currentUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const userId =
      currentUser.userId;

    const monthlyData =
      await Job.aggregate([
        {
          $match: {
            userId: userId,
          },
        },

        {
          $group: {
            _id: {
              year: {
                $year: "$createdAt",
              },

              month: {
                $month: "$createdAt",
              },
            },

            count: {
              $sum: 1,
            },
          },
        },

        {
          $sort: {
            "_id.year": 1,
            "_id.month": 1,
          },
        },
      ]);

    const formattedData =
      monthlyData.map((item) => {
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];

        return {
          month:
            monthNames[
              item._id.month - 1
            ],

          applications: item.count,
        };
      });

    return NextResponse.json({
      success: true,
      data: formattedData,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Internal server error",
      },
      { status: 500 }
    );
  }
}