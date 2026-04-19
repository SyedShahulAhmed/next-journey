import mongoose, { Schema, models, model } from "mongoose";
export interface IsSnippet {
  title: string;
  content: string;
  language: string;
  tags: string[];
  createdAt: Date;
}

const SnippetSchema = new Schema<IsSnippet>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  language: { type: String, required: true },
  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

export const Snippet =
  models.Snippet || model<IsSnippet>("Snippet", SnippetSchema);
