"use client";

import { useParams, useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import HoloAlert from "@/components/HoloAlert";
import { PencilLine, Trash2 } from "lucide-react";

type Blog = {
  _id: string;
  title: string;
  content: string;
  author: string;
};

export default function BlogPost() {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const id = params?.id as string;

  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/${id}`);
        if (!res.ok) {
          throw new Error("Not found");
        }
        const data = await res.json();
        setBlog(data);
        setError(null);
      } catch (fetchError) {
        setError("This transmission is missing from the archive.");
        setBlog(null);
      }
    };

    fetchBlog();
  }, [id]);

  const router = useRouter();

  const handleDelete = async () => {
    if (!id) {
      return;
    }

    await fetch(`/api/blogs/${id}`, {
      method: "DELETE",
    });

    router.push("/");
  };

  if (error || !blog) {
    return (
      <div className="mx-auto max-w-3xl">
        <HoloAlert
          tone="error"
          title="Signal Lost"
          description={error || "This transmission is missing from the archive."}
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="mx-auto max-w-3xl"
    >
      <div className="glass-panel holo-sheen rounded-3xl border border-cyan-500/30 px-6 py-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-cyan-100">
          Archive Detail
        </div>

        <h1 className="mt-4 text-3xl font-semibold text-cyan-50 md:text-4xl">
          {blog.title}
        </h1>
        <div className="holo-divider my-4" />
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/60">
          {blog.author}
        </p>
        <p className="mt-6 leading-7 text-slate-200/80">{blog.content}</p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <motion.button
            onClick={() => router.push(`/dashboard/edit/${blog._id}`)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="holo-button holo-button-primary holo-sheen w-full justify-center"
          >
            <PencilLine className="h-4 w-4" />
            Edit Log
          </motion.button>
          <motion.button
            onClick={handleDelete}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="holo-button holo-button-danger holo-sheen w-full justify-center"
          >
            <Trash2 className="h-4 w-4" />
            Delete Log
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
