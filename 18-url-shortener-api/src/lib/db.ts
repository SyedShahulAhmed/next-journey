import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("Please define MONGO_URL");
}

let cached = (
  global as typeof globalThis & {
    mongoose?: {
      conn: typeof mongoose | null;
      promise: Promise<typeof mongoose> | null;
    };
  }
).mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

export async function connectDb() {
  if (cached?.conn) {
    return;
  }
  if (!cached?.promise) {
    cached?.promise = mongoose.connect(MONGO_URI).then((mongoose) => {
      return mongoose;
    });
  }
  cached?.conn = await cached?.promise;
  return cached?.conn;
}
