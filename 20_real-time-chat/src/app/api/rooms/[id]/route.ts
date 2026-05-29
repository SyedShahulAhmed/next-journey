import { NextResponse } from "next/server";
import { Types } from "mongoose";

import { getAuthUser } from "@/lib/auth";
import { connectDb } from "@/lib/db";
import Message from "@/models/Message";
import Room from "@/models/Room";

type Params = {
	params: {
		id: string;
	};
};

export async function GET(req: Request, { params }: Params) {
	try {
		await connectDb();

		const authUser = await getAuthUser();

		if (!authUser) {
			return NextResponse.json(
				{ success: false, error: "Unauthorized" },
				{ status: 401 },
			);
		}

		if (!Types.ObjectId.isValid(params.id)) {
			return NextResponse.json(
				{ success: false, error: "Invalid room id" },
				{ status: 400 },
			);
		}

		const room = await Room.findById(params.id);

		if (!room) {
			return NextResponse.json(
				{ success: false, error: "Room not found" },
				{ status: 404 },
			);
		}

		const messageCount = await Message.countDocuments({ room: room._id });

		return NextResponse.json(
			{
				success: true,
				room,
				stats: {
					roomId: room._id.toString(),
					messageCount,
					createdAt: room.createdAt,
				},
			},
			{ status: 200 },
		);
	} catch {
		return NextResponse.json(
			{ success: false, error: "Something went wrong" },
			{ status: 500 },
		);
	}
}
