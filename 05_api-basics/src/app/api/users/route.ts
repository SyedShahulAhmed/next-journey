import clientPromise from "@/lib/mongodb";

// GET users
export async function GET() {
  const client = await clientPromise;
  const db = client.db("test");

  const users = await db.collection("users").find().toArray();

  return Response.json(users);
}

// POST user
export async function POST(req: Request) {
  const client = await clientPromise;
  const db = client.db("test");

  const body = await req.json();

  if (!body.name) {
    return Response.json({ error: "Name required" }, { status: 400 });
  }

  const result = await db.collection("users").insertOne({
    name: body.name,
    age: body.age,
    porterId: body.porterId,
    cargo: body.cargo,
  });

  return Response.json({
    _id: result.insertedId,
    name: body.name,
    age: body.age,
    porterId: body.porterId,
    cargo: body.cargo,
  });
}
