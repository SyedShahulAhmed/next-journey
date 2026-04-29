"use client";

import type { FormEvent } from "react";

type EntryFormProps = {
  title: string;
  content: string;
  tags: string;
  setTitle: (value: string) => void;
  setContent: (value: string) => void;
  setTags: (value: string) => void;
  handleSubmit: () => void;
  editId: string | null;
};

export default function EntryForm({
  title,
  content,
  tags,
  setTitle,
  setContent,
  setTags,
  handleSubmit,
  editId,
}: EntryFormProps) {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit();
  };

  return (
    <section className="relative isolate -rotate-1 transform-gpu rounded-[22px_18px_26px_20px] border border-[#3c3528] bg-[#1a1915] p-6 shadow-[0_30px_70px_rgba(0,0,0,0.65)] transition duration-700 hover:-translate-y-1 hover:shadow-[0_40px_80px_rgba(0,0,0,0.7)]">
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-[22px_18px_26px_20px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_60%)] opacity-70" />
      <div className="absolute -right-6 top-6 hidden h-12 w-24 rotate-6 border border-[#3a3326] bg-[#191713] opacity-70 md:block" />
      <div className="relative">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-[#8f8779]">Field Log</p>
            <h2 className="mt-2 font-(--font-title) text-2xl uppercase tracking-[0.25em] text-[#e6e0d2]">
              {editId ? "Edit Entry" : "New Entry"}
            </h2>
          </div>
          <span className="rounded-full border border-[#3a3326] px-3 py-1 text-[10px] uppercase tracking-[0.45em] text-[#a09584]">
            Survivor
          </span>
        </div>

        <form onSubmit={onSubmit} className="mt-6 grid gap-4">
          <label className="grid gap-2 text-xs uppercase tracking-[0.35em] text-[#9d9486]">
            Title
            <input
              type="text"
              placeholder="A quiet morning in the ruins"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-[#3b3529] bg-[#12110d] px-4 py-3 text-sm text-[#e6e0d2] placeholder:text-[#7f7768] shadow-[inset_0_0_18px_rgba(0,0,0,0.55)] focus:outline-none focus:ring-2 focus:ring-[#56684a]/70"
            />
          </label>

          <label className="grid gap-2 text-xs uppercase tracking-[0.35em] text-[#9d9486]">
            Entry
            <textarea
              placeholder="Write the details. Keep the memory alive."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-50 w-full resize-none rounded-2xl border border-[#3b3529] bg-[#12110d] px-4 py-3 text-sm leading-relaxed text-[#e6e0d2] placeholder:text-[#7f7768] shadow-[inset_0_0_18px_rgba(0,0,0,0.55)] focus:outline-none focus:ring-2 focus:ring-[#56684a]/70"
            />
          </label>

          <label className="grid gap-2 text-xs uppercase tracking-[0.35em] text-[#9d9486]">
            Tags
            <input
              type="text"
              placeholder="safehouse, patrol, supply"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full rounded-xl border border-[#3b3529] bg-[#12110d] px-4 py-3 text-sm text-[#e6e0d2] placeholder:text-[#7f7768] shadow-[inset_0_0_18px_rgba(0,0,0,0.55)] focus:outline-none focus:ring-2 focus:ring-[#56684a]/70"
            />
          </label>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="submit"
              className="group relative inline-flex items-center justify-center rounded-xl border border-[#5f5138] bg-linear-to-br from-[#3a3325] via-[#2b241a] to-[#17130f] px-5 py-3 text-xs uppercase tracking-[0.35em] text-[#efe7d5] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_12px_30px_rgba(0,0,0,0.45)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_22px_40px_rgba(0,0,0,0.6)] active:translate-y-0"
            >
              {editId ? "Update Entry" : "Save Entry"}
            </button>
            <span className="text-xs uppercase tracking-[0.35em] text-[#887f72]">
              Marked for survival
            </span>
          </div>
        </form>
      </div>
    </section>
  );
}
