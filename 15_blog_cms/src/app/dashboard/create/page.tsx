"use client";

import { useEffect, useState } from "react";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      alert("ALL FIELDS REQUIRED!!!");
      return;
    }
    const res = await fetch('/api/blogs',{
      method : "POST",
      headers : {
        "Content-Type" : "application/json",
      },
      body : JSON.stringify({
        title,
        content,
        author : "lucy"
      })
    })
    const data = await res.json();
    console.log(data);
    setTitle("")
    setContent("")
  };


  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">✍ Create Blog</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 bg-black border border-gray-700 rounded"
        />

        <textarea
          placeholder="Write your content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 bg-black border border-gray-700 rounded h-40"
        />

        <button
          type="submit"
          className="bg-white text-black px-5 py-2 rounded hover:bg-gray-300"
        >
          Publish
        </button>
      </form>
    </div>
  );
}
