import Link from "next/link";

type Blog = {
  id: string;
  title: string;
  excerpt: string;
  author: string;
};

export default function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Link href={`/post/${blog.id}`}>
       <div className="border border-gray-800 p-5 rounded-xl hover:scale-[1.02] hover:border-gray-600 transition">
      <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>

      <p className="text-gray-400 mb-3">{blog.excerpt}</p>

      <div className="text-sm text-gray-500">✍ {blog.author}</div>
    </div>
    </Link>
  );
}
