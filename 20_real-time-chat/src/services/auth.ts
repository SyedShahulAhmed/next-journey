import { fetchJson } from "@/lib/api";
import type { User } from "@/types";

export async function login(email: string, password: string) {
  const data = await fetchJson<{ user: User }>("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return data.user;
}

export async function signup(username: string, email: string, password: string) {
  const data = await fetchJson<{ user: User }>("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });
  return data.user;
}

export async function logout() {
  await fetchJson("/api/auth/logout", {
    method: "POST",
    parseJson: false,
  });
}

export async function me() {
  const data = await fetchJson<{ user: User }>("/api/auth/me");
  return data.user;
}
