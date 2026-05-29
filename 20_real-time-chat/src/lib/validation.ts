import { z } from "zod";

export const signupSchema = z.object({
  username: z.string().min(2, "Username is too short").max(24, "Username is too long"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const roomSchema = z.object({
  name: z.string().min(2, "Room name is too short").max(48, "Room name is too long"),
  description: z.string().max(240, "Description is too long").optional().or(z.literal("")),
});

export const messageSchema = z.object({
  roomId: z.string().min(1, "Room is required"),
  content: z.string().min(1, "Message cannot be empty").max(2000, "Message is too long"),
});
