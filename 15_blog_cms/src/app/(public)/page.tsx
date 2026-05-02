"use client"

import BlogCard from "@/components/BlogCard";
import { useEffect, useState } from "react";

type Blog = {
  id: string
  title: string
  content: string
  author: string
}

export default function Home() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    fetch('/api/blogs')
    .then((res) => res.json())
    .then((data) => setBlogs(data))
  }, []);
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
}
