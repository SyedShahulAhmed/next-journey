import { connectDb } from "@/lib/db";
import { verifyToken } from "@/lib/jwt";
import Transaction from "@/models/Transaction";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDb();
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
    }
    const decoded: any = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: "Inavlid token" }, { status: 400 });
    }
    const { amount, type, category, description, date } = await req.json();

    if (!amount && !type && !category) {
      return NextResponse.json(
        { error: "Required fields missing" },
        { status: 400 },
      );
    }
    const transaction = await Transaction.create({
      userId: decoded.userId,
      amount,
      type,
      category,
      description,
      date,
    });

    return NextResponse.json(
      { message: "Transaction added", transaction },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create new transaction" },
      { status: 401 },
    );
  }
}

export async function GET() {
  try {
    await connectDb();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
    }
    const decoded: any = verifyToken(token);

    if (!decoded) {
      return NextResponse.json({ error: "Invalid Token" }, { status: 400 });
    }
    const transactions = await Transaction.find({
      userId: decoded.userId,
    }).sort({ createdAt: -1 });

    return NextResponse.json({ transactions });
  } catch (error) {

    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 401 },
    );
  }
}
