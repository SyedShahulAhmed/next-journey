"use client";

import { useEffect, useState } from "react";

type Snippet = {
  _id: string;
  title: string;
  content: string;
  language: string;
  tags: string[];
};

const seededSnippets: Snippet[] = [
  {
    _id: "seed-1",
    title: "AUTH BYPASS DETECTOR",
    content:
      "const isAuthorized = (token: string) => token.startsWith('SV-') && token.length > 20;",
    language: "TypeScript",
    tags: ["auth", "security", "middleware"],
  },
  {
    _id: "seed-2",
    title: "LOG STREAM PARSER",
    content:
      "const parseLine = (line: string) => line.split('::').map((chunk) => chunk.trim());",
    language: "JavaScript",
    tags: ["logs", "parser", "ops"],
  },
  {
    _id: "seed-3",
    title: "MONGO INDEX QUICKCHECK",
    content:
      "db.snippets.getIndexes().forEach((idx) => printjson({ name: idx.name, keys: idx.key }));",
    language: "MongoShell",
    tags: ["mongodb", "index", "performance"],
  },
];

export default function Home() {
  const [snippets, setSnippets] = useState<Snippet[]>(seededSnippets);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    title: "",
    content: "",
    language: "",
    tags: "",
  });

  const fetchSnippets = async (query = "") => {
    try {
      const res = await fetch(`/api/snippets?search=${encodeURIComponent(query)}`);

      if (!res.ok) {
        throw new Error("Unable to load snippets");
      }

      const data = (await res.json()) as Snippet[];
      setSnippets(data);
    } catch {
      const normalizedQuery = query.trim().toLowerCase();

      if (!normalizedQuery) {
        setSnippets(seededSnippets);
        return;
      }

      setSnippets(
        seededSnippets.filter((snippet) => {
          const haystack = `${snippet.title} ${snippet.content} ${snippet.language} ${snippet.tags.join(" ")}`.toLowerCase();
          return haystack.includes(normalizedQuery);
        })
      );
    }
  };

  useEffect(() => {
    fetchSnippets();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...form,
      tags: form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    try {
      await fetch("/api/snippets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    } catch {
      const localSnippet: Snippet = {
        _id: `local-${Date.now()}`,
        title: payload.title,
        content: payload.content,
        language: payload.language,
        tags: payload.tags,
      };
      setSnippets((prev) => [localSnippet, ...prev]);
    }

    setForm({ title: "", content: "", language: "", tags: "" });
    fetchSnippets(search);
  };

  const panelInputClass =
    "w-full border border-cyan-800/80 bg-black/40 px-3 py-2 text-sm uppercase tracking-wide text-cyan-100 outline-none transition duration-200 placeholder:text-cyan-700/80 focus:border-cyan-300 focus:shadow-[0_0_14px_rgba(34,211,238,0.55)]";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#02050a] px-4 py-6 font-mono text-cyan-100 sm:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(14,116,144,0.25),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(6,182,212,0.12),transparent_35%),radial-gradient(circle_at_50%_100%,rgba(16,185,129,0.08),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.12)_1px,transparent_1px)] bg-size-[32px_32px] opacity-20" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-size-[100%_4px] opacity-20 animate-pulse" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header className="border border-cyan-900/70 bg-black/45 p-5 backdrop-blur-sm shadow-[0_0_30px_rgba(6,182,212,0.12)]">
          <p className="text-[11px] tracking-[0.35em] text-emerald-400/80">SYSTEM ONLINE :: NODE SV-06</p>
          <h1 className="mt-2 text-3xl font-bold uppercase tracking-[0.28em] text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.7)] sm:text-4xl animate-pulse">
            Snippet Vault
          </h1>
          <p className="mt-2 text-xs uppercase tracking-[0.3em] text-cyan-400/90">
            Accessing Knowledge Database...
          </p>
        </header>

        <section className="border border-cyan-900/70 bg-black/45 p-5 backdrop-blur-sm shadow-[0_0_24px_rgba(8,145,178,0.14)]">
          <label htmlFor="search" className="mb-2 block text-xs uppercase tracking-[0.28em] text-cyan-500">
            Query Console
          </label>
          <input
            id="search"
            placeholder="SEARCH DATABASE..."
            value={search}
            onChange={(e) => {
              const value = e.target.value;
              setSearch(value);
              fetchSnippets(value);
            }}
            className="w-full border border-cyan-700/80 bg-black/40 px-4 py-3 text-sm uppercase tracking-[0.18em] text-cyan-100 outline-none transition duration-300 placeholder:text-cyan-700/80 focus:border-cyan-300 focus:shadow-[0_0_16px_rgba(34,211,238,0.55)]"
          />
        </section>

        <section className="border border-cyan-900/70 bg-black/45 p-5 backdrop-blur-sm shadow-[0_0_24px_rgba(8,145,178,0.14)]">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-cyan-500">Data Injection Panel</p>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <input
              placeholder="TITLE"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className={panelInputClass}
              required
            />

            <textarea
              placeholder="CONTENT"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className={`${panelInputClass} min-h-32 resize-y`}
              required
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <input
                placeholder="LANGUAGE"
                value={form.language}
                onChange={(e) => setForm({ ...form, language: e.target.value })}
                className={panelInputClass}
                required
              />

              <input
                placeholder="TAGS (COMMA SEPARATED)"
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                className={panelInputClass}
              />
            </div>

            <button
              type="submit"
              className="mt-1 inline-flex w-fit items-center border border-cyan-400/80 bg-cyan-950/40 px-6 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200 transition duration-300 hover:scale-105 hover:border-cyan-200 hover:text-cyan-100 hover:shadow-[0_0_20px_rgba(34,211,238,0.65)]"
            >
              Inject Data
            </button>
          </form>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-cyan-900/80 pb-2">
            <h2 className="text-sm uppercase tracking-[0.32em] text-cyan-400">Data Blocks</h2>
            <span className="text-[11px] uppercase tracking-[0.24em] text-emerald-400/80">
              {snippets.length} Record{snippets.length === 1 ? "" : "s"} Loaded
            </span>
          </div>

          {snippets.length === 0 ? (
            <div className="border border-cyan-900/70 bg-black/45 p-6 text-center text-sm uppercase tracking-[0.2em] text-cyan-500">
              No Snippets Found
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {snippets.map((snippet) => (
                <article
                  key={snippet._id}
                  className="group relative overflow-hidden border border-cyan-900/80 bg-black/55 p-4 transition duration-300 hover:-translate-y-1 hover:border-cyan-500/90 hover:shadow-[0_0_20px_rgba(34,211,238,0.35)]"
                >
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(6,182,212,0.09)_1px,transparent_1px)] bg-size-[100%_3px] opacity-10 transition duration-300 group-hover:opacity-30" />
                  <div className="relative">
                    <div className="mb-3 flex items-start justify-between gap-3 border-b border-cyan-900/70 pb-2">
                      <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
                        {snippet.title}
                      </h3>
                      <span className="shrink-0 border border-cyan-700/80 bg-cyan-950/40 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-cyan-200">
                        {snippet.language}
                      </span>
                    </div>

                    <p className="min-h-24 whitespace-pre-wrap text-xs leading-relaxed text-cyan-100/85">
                      {snippet.content}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2 border-t border-cyan-900/70 pt-3">
                      {snippet.tags.length === 0 ? (
                        <span className="border border-cyan-900/80 bg-black/40 px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-cyan-600">
                          Untagged
                        </span>
                      ) : (
                        snippet.tags.map((tag) => (
                          <span
                            key={`${snippet._id}-${tag}`}
                            className="border border-cyan-800/90 bg-cyan-950/25 px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-cyan-300"
                          >
                            #{tag}
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}