import { cookies } from "next/headers";

import { verifyToken } from "./jwt";

export type AuthPayload = {
  userId: string;
  email: string;
};

export async function getAuthUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return null;
  }

  const decoded = verifyToken(token);

  if (!decoded || typeof decoded !== "object") {
    return null;
  }

  const payload = decoded as AuthPayload;

  if (!payload.userId || !payload.email) {
    return null;
  }

  return payload;
}
