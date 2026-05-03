import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        content: { type: String, required: true, trim: true },
        author: { type: String, trim: true },
        excerpt: { type: String, trim: true },
    },
    { timestamps: true }
);

const BlogModel = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

export default BlogModel;