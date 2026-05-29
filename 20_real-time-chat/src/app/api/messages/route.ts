import { NextResponse } from "next/server";
import { Types } from "mongoose";

import { getAuthUser } from "@/lib/auth";
import { connectDb } from "@/lib/db";
import { messageSchema } from "@/lib/validation";
import Message from "@/models/Message";
import Room from "@/models/Room";
import User from "@/models/User";

export async function GET(req: Request) {
	try {
		await connectDb();

		const authUser = await getAuthUser();

		if (!authUser) {
			return NextResponse.json(
				{ success: false, error: "Unauthorized" },
				{ status: 401 },
			);
		}

		const { searchParams } = new URL(req.url);
		const roomId = searchParams.get("roomId");

		if (!roomId || !Types.ObjectId.isValid(roomId)) {
			return NextResponse.json(
				{ success: false, error: "Invalid room" },
				{ status: 400 },
			);
		}

		const messages = await Message.find({ room: roomId })
			.sort({ createdAt: 1 })
			.limit(200)
			.populate({
				path: "sender",
				select: "username email avatar",
			});

		return NextResponse.json(
			{
				success: true,
				messages,
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

export async function POST(req: Request) {
	try {
		await connectDb();

		const authUser = await getAuthUser();

		if (!authUser) {
			return NextResponse.json(
				{ success: false, error: "Unauthorized" },
				{ status: 401 },
			);
		}

		const body = await req.json();
		const parsed = messageSchema.safeParse(body);

		if (!parsed.success) {
			return NextResponse.json(
				{ success: false, error: parsed.error.issues[0]?.message },
				{ status: 400 },
			);
		}

		const { roomId, content } = parsed.data;

		if (!Types.ObjectId.isValid(roomId)) {
			return NextResponse.json(
				{ success: false, error: "Invalid room" },
				{ status: 400 },
			);
		}

		const room = await Room.findById(roomId);

		if (!room) {
			return NextResponse.json(
				{ success: false, error: "Room not found" },
				{ status: 404 },
			);
		}

		const sender = await User.findById(authUser.userId);

		if (!sender) {
			return NextResponse.json(
				{ success: false, error: "User not found" },
				{ status: 404 },
			);
		}

		const message = await Message.create({
			sender: sender._id,
			room: room._id,
			content: content.trim(),
			clientId: body.clientId,
		});

		await message.populate({
			path: "sender",
			select: "username email avatar",
		});

		return NextResponse.json(
			{ success: true, message },
			{ status: 201 },
		);
	} catch {
		return NextResponse.json(
			{ success: false, error: "Something went wrong" },
			{ status: 500 },
		);
	}
}
