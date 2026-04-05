import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params; // ✅ FIX

  const client = await clientPromise;
  const db = client.db("test");

  const body = await req.json();

  console.log("Updating:", id, body); // 🔥 DEBUG

  const result = await db.collection("users").updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        name: body.name,
        age: body.age,
        porterId: body.porterId,
        cargo: body.cargo,
      },
    },
  );

  

  return Response.json({ message: "Updated" });
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params; // ✅ FIX

  const client = await clientPromise;
  const db = client.db("test");

  await db.collection("users").deleteOne({
    _id: new ObjectId(id),
  });

  return Response.json({ message: "Deleted" });
}
