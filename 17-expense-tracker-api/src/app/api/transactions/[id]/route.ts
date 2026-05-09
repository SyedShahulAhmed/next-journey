import { connectDb } from "@/lib/db";
import { verifyToken } from "@/lib/jwt";
import Transaction from "@/models/Transaction";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDb();

    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
    }
    const decoded: any = verifyToken(token);

    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    const { id } = await params;

    const body = await req.json();
    const newTransaction = await Transaction.findOneAndUpdate(
      {
        _id: id,
        userId: decoded.userId,
      },
      body,
      {
        new: true,
      },
    );

    if (!newTransaction) {
      return NextResponse.json(
        { error: "transaction not found" },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { message: "Transaction Updated", newTransaction },
      { status: 400 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update transaction" },
      { status: 401 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDb();

    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
    }

    const decoded: any = verifyToken(token);

    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    const { id } = await params;

    const transaction = await Transaction.findByIdAndDelete({
      _id: id,
      userId: decoded.userId,
    });
    if (!transaction) {
      return NextResponse.json(
        { error: "transaction not found" },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { message: "Transaction Deleted" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete transaction" },
      { status: 401 },
    );
  }
}
