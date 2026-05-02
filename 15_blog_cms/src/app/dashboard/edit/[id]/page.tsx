"use client"

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function EditBlog() {
  const params = useParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("blogs") || "[]");
    const blog = stored.find((b: any) => b.id === params.id);
    if (blog) {
      setTitle(blog.title);
      setContent(blog.content);
    }
  }, [params.id]);
  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    const stored = JSON.parse(localStorage.getItem("blogs") || "[]");
    const updated = stored.map((b: any) =>
      b.id === params.id ? { ...b, title, content } : b,
    );

    localStorage.setItem("blogs", JSON.stringify(updated));

    router.push(`/post/${params.id}`);
  };
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">✏️ Edit Blog</h1>

      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 bg-black border border-gray-700 rounded"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 bg-black border border-gray-700 rounded h-40"
        />

        <button type="submit" className="bg-white text-black px-5 py-2 rounded">
          Update
        </button>
      </form>
    </div>
  );
}
