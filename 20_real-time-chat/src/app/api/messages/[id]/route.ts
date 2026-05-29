
import { NextResponse } from "next/server";
import { Types } from "mongoose";

import { getAuthUser } from "@/lib/auth";
import { connectDb } from "@/lib/db";
import Message from "@/models/Message";

type Params = {
	params: {
		id: string;
	};
};

export async function DELETE(req: Request, { params }: Params) {
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
				{ success: false, error: "Invalid message id" },
				{ status: 400 },
			);
		}

		const message = await Message.findById(params.id);

		if (!message) {
			return NextResponse.json(
				{ success: false, error: "Message not found" },
				{ status: 404 },
			);
		}

		if (message.sender.toString() !== authUser.userId) {
			return NextResponse.json(
				{ success: false, error: "Forbidden" },
				{ status: 403 },
			);
		}

		await message.deleteOne();

		return NextResponse.json({ success: true }, { status: 200 });
	} catch {
		return NextResponse.json(
			{ success: false, error: "Something went wrong" },
			{ status: 500 },
		);
	}
}