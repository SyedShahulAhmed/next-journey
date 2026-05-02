"use client";

import { useParams, useRouter } from "next/navigation";

import { useEffect, useState } from "react";

type Blog = {
  id: string;
  title: string;
  content: string;
  author: string;
};

export default function BlogPost() {
  const params = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("blogs") || "[]");
    const found = stored.find((b: Blog) => b.id === params.id);
    setBlog(found);
  }, [params.id]);

  if (!blog) {
    return <div className="text-red-500">Post not found</div>;
  }

  const router = useRouter();

  const handleDelete = () => {
    const stored = JSON.parse(localStorage.getItem("blogs") || "[]");

    const updated = stored.filter((b: Blog) => b.id !== blog.id);
    localStorage.setItem("blogs", JSON.stringify(updated));
    router.push("/");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-400 mb-6">✍ {blog.author}</p>
      <p className="leading-7 text-gray-300">{blog.content}</p>
      <button
        onClick={handleDelete}
        className="mt-6 bg-red-600 px-4 py-2 rounded hover:bg-red-500"
      >
        Delete
      </button>
      <button
        onClick={() => router.push(`/dashboard/edit/${blog.id}`)}
        className="mt-4 ml-4 bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-400"
      >
        Edit
      </button>
    </div>
  );
}
