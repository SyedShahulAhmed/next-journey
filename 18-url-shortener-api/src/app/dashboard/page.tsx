"use client";

import { UrlType } from "@/types/url";
import {
  BarChart3,
  Copy,
  LayoutDashboard,
  Link2,
  LogOut,
  PencilLine,
  QrCode,
  Search,
  Sparkles,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import QRCode from "react-qr-code";

export default function Dashboard() {
  const router = useRouter();

  const [urls, setUrls] = useState<UrlType[]>([]);
  const [loading, setLoading] = useState(true);

  const [originalUrl, setOriginalUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [origin, setOrigin] = useState("");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState("");
  const [editingSlug, setEditingSlug] = useState("");
  const [selectedQr, setSelectedQr] = useState("");

  const totalClicks = urls.reduce((acc, item) => acc + item.clicks, 0);
  const mostPopular = urls.length
    ? [...urls].sort((a, b) => b.clicks - a.clicks)[0]
    : null;
  const filteredUrls = urls.filter((url) => {
    const query = search.toLowerCase();
    return (
      url.shortCode.toLowerCase().includes(query) ||
      url.originalUrl.toLowerCase().includes(query)
    );
  });
  async function fetchUrls() {
    try {
      setLoading(true);
      const res = await fetch("/api/url/all");
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Failed to fetch URLs");
      }
      setUrls(data);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to fetch URLs";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchUrls();
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  async function createUrl() {
    if (!originalUrl.trim()) {
      toast.error("URL is required");
      return;
    }
    try {
      const res = await fetch("/api/url/create", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          originalUrl: originalUrl.trim(),
          customSlug: customSlug.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        return toast.error(data?.error || "Failed to create URL");
      }
      toast.success("Short URL created");
      setOriginalUrl("");
      setCustomSlug("");
      if (data?.data) {
        setUrls((prev) => [data.data, ...prev]);
      } else {
        fetchUrls();
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  async function deleteUrl(id: string) {
    try {
      const res = await fetch(`/api/url/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        toast.error(data?.error || "Delete failed");
        return;
      }
      setUrls((prev) => prev.filter((item) => item._id !== id));
      toast.success("URL deleted");
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  function copyUrl(shortCode: string) {
    const baseUrl = origin || window.location.origin;
    navigator.clipboard.writeText(`${baseUrl}/${shortCode}`);
    toast.success("Copied to clipboard");
  }

  async function logout() {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });

      toast.success("Logged out");

      router.push("/login");
      router.refresh();
    } catch {
      toast.error("Logout failed");
    }
  }

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="glass-panel rounded-3xl p-6 lg:sticky lg:top-8 lg:h-fit">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#948979]/40 bg-[#222831] shadow-[0_0_28px_rgba(148,137,121,0.2)]">
                <LayoutDashboard size={18} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#948979]">
                  Shortly
                </p>
                <p className="font-heading text-2xl">Workspace</p>
              </div>
            </div>

            <div className="mt-8 space-y-3 text-sm text-[#948979]">
              {["Dashboard", "Links", "Analytics", "Settings"].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-transparent px-3 py-2 transition hover:border-[#948979]/30 hover:bg-white/5"
                >
                  <span className="h-2 w-2 rounded-full bg-[#948979]" />
                  <span className="text-[#DFD0B8]">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-[#948979]/20 bg-[#15181d]/80 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-[#948979]">
                Usage
              </p>
              <p className="mt-2 font-heading text-3xl">{totalClicks}</p>
              <p className="text-sm text-[#948979]">Clicks this month</p>
              <div className="mt-4 h-2 w-full rounded-full bg-[#222831]">
                <div
                  className="h-2 rounded-full bg-linear-to-r from-[#948979] to-[#DFD0B8]"
                  style={{ width: totalClicks ? "62%" : "12%" }}
                />
              </div>
            </div>

            <button
              onClick={logout}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-[#948979]/40 px-4 py-2 text-sm text-[#DFD0B8] transition hover:border-[#DFD0B8]/60"
            >
              <LogOut size={16} />
              Logout
            </button>
          </aside>

          <section className="space-y-8">
            <header className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#948979]/40 bg-[#222831]/70 px-4 py-2 text-xs uppercase tracking-[0.35em] text-[#948979]">
                  <Sparkles size={14} />
                  Analytics overview
                </div>
                <h1 className="font-heading text-4xl md:text-5xl">
                  Shortly Dashboard
                </h1>
                <p className="mt-2 text-[#948979]">
                  Manage every link, track performance, and export with style.
                </p>
              </div>
            </header>

            <div className="glass-panel rounded-3xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-[#948979]">
                    Create a short URL
                  </p>
                  <h2 className="font-heading text-2xl">Create a new link</h2>
                </div>
                <div className="relative w-full max-w-sm">
                  <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#948979]"
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="Search URLs, slugs, or domains"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="app-input w-full rounded-2xl py-3 pl-11 pr-4 text-sm"
                  />
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-[1.4fr_1fr_0.6fr]">
                <input
                  type="text"
                  placeholder="Paste destination URL"
                  value={originalUrl}
                  onChange={(e) => setOriginalUrl(e.target.value)}
                  className="app-input rounded-2xl px-4 py-3"
                />

                <input
                  type="text"
                  placeholder="Custom slug (optional)"
                  value={customSlug}
                  onChange={(e) => setCustomSlug(e.target.value)}
                  className="app-input rounded-2xl px-4 py-3"
                />

                <button
                  onClick={createUrl}
                  className="rounded-2xl bg-[#DFD0B8] px-6 py-3 text-sm font-semibold text-[#222831] shadow-[0_0_24px_rgba(223,208,184,0.3)] transition hover:-translate-y-px"
                >
                  Create
                </button>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              <div className="glass-panel rounded-3xl p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-[#948979]">
                  Total URLs
                </p>
                <h2 className="font-heading text-4xl mt-3">{urls.length}</h2>
              </div>

              <div className="glass-panel rounded-3xl p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-[#948979]">
                  Total Clicks
                </p>
                <h2 className="font-heading text-4xl mt-3">{totalClicks}</h2>
              </div>

              <div className="glass-panel rounded-3xl p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-[#948979]">
                  Most Popular
                </p>
                <h2 className="mt-3 truncate text-lg font-semibold text-[#DFD0B8]">
                  {mostPopular?.shortCode || "N/A"}
                </h2>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
              <div className="glass-panel rounded-3xl p-6">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#948979]">
                    Traffic trend
                  </p>
                  <BarChart3 size={18} className="text-[#DFD0B8]" />
                </div>
                <div className="mt-4 flex h-24 items-end gap-2">
                  {[22, 36, 28, 40, 52, 38, 48, 60].map((value, index) => (
                    <span
                      key={`pulse-${index}`}
                      className="flex-1 rounded-xl bg-linear-to-t from-[#393E46] to-[#DFD0B8]"
                      style={{ height: `${value}px` }}
                    />
                  ))}
                </div>
                <p className="mt-4 text-sm text-[#948979]">
                  Peak activity at 12:48 AM. Traffic is up 18%.
                </p>
              </div>

              <div className="glass-panel rounded-3xl p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-[#948979]">
                  Top campaigns
                </p>
                <div className="mt-4 space-y-3">
                  {[
                    "Product launch",
                    "Weekly newsletter",
                    "Partner campaign",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between rounded-2xl border border-[#948979]/20 bg-[#15181d]/80 px-4 py-3 text-sm"
                    >
                      <span className="text-[#DFD0B8]">{item}</span>
                      <span className="text-[#948979]">+12%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#948979]">
                  URL Library
                </p>
                <h2 className="font-heading text-2xl">Your Links</h2>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#948979]">
                <span className="flex items-center gap-1">
                  <Link2 size={14} /> {filteredUrls.length} links
                </span>
              </div>
            </div>

            {loading ? (
              <div className="grid gap-5">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="glass-panel rounded-2xl p-6 animate-pulse h-32"
                  />
                ))}
              </div>
            ) : filteredUrls.length === 0 ? (
              <div className="glass-panel rounded-3xl p-10 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#948979]/40 bg-[#222831]">
                  <Link2 size={22} />
                </div>
                <h2 className="mt-6 font-heading text-3xl">No URLs Yet</h2>
                <p className="mt-2 text-[#948979]">
                  Create your first short URL and start tracking it here.
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredUrls.map((url, index) => (
                  <motion.div
                    key={url._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="glass-panel rounded-2xl p-5"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="text-lg font-medium text-[#DFD0B8]">
                          {origin
                            ? `${origin}/${url.shortCode}`
                            : `/${url.shortCode}`}
                        </p>
                        <p className="mt-2 text-sm text-[#948979] truncate max-w-xl">
                          {url.originalUrl}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-4 text-xs text-[#948979]">
                          <span>Clicks: {url.clicks}</span>
                          <span>
                            Created:{" "}
                            {new Date(url.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          onClick={() => {
                            const baseUrl = origin || window.location.origin;
                            setSelectedQr(`${baseUrl}/${url.shortCode}`);
                          }}
                          className="flex items-center gap-2 rounded-2xl border border-[#948979]/30 px-3 py-2 text-xs text-[#DFD0B8] transition hover:border-[#DFD0B8]/60"
                        >
                          <QrCode size={14} />
                          QR
                        </button>
                        <button
                          onClick={() => copyUrl(url.shortCode)}
                          className="flex items-center gap-2 rounded-2xl border border-[#948979]/30 px-3 py-2 text-xs text-[#DFD0B8] transition hover:border-[#DFD0B8]/60"
                        >
                          <Copy size={14} />
                          Copy
                        </button>
                        <button
                          onClick={() => {
                            setEditingId(url._id);
                            setEditingSlug(url.shortCode);
                          }}
                          className="flex items-center gap-2 rounded-2xl border border-[#948979]/30 px-3 py-2 text-xs text-[#DFD0B8] transition hover:border-[#DFD0B8]/60"
                        >
                          <PencilLine size={14} />
                          Edit
                        </button>
                        <button
                          onClick={() => deleteUrl(url._id)}
                          className="flex items-center gap-2 rounded-2xl border border-red-400/40 px-3 py-2 text-xs text-red-200 transition hover:border-red-300/70"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      {selectedQr && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6">
          <div className="glass-panel glow-border w-full max-w-md rounded-3xl p-8 text-center">
            <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-2xl bg-[#DFD0B8] p-3">
              <QRCode value={selectedQr} />
            </div>

            <p className="mt-5 text-sm text-[#948979] break-all">
              {selectedQr}
            </p>

            <button
              onClick={() => setSelectedQr("")}
              className="mt-6 rounded-2xl bg-[#DFD0B8] px-6 py-3 text-sm font-semibold text-[#222831]"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {editingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6">
          <div className="glass-panel w-full max-w-md rounded-3xl p-8">
            <h2 className="font-heading text-2xl">Edit Slug</h2>

            <input
              value={editingSlug}
              onChange={(e) => setEditingSlug(e.target.value)}
              className="app-input mt-5 w-full rounded-2xl px-4 py-3"
            />

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={async () => {
                  const res = await fetch(`/api/url/${editingId}`, {
                    method: "PATCH",

                    headers: {
                      "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                      shortCode: editingSlug,
                    }),
                  });

                  if (!res.ok) {
                    return toast.error("Update failed");
                  }

                  toast.success("Slug updated");

                  setEditingId("");

                  fetchUrls();
                }}
                className="rounded-2xl bg-[#DFD0B8] px-5 py-3 text-sm font-semibold text-[#222831]"
              >
                Save
              </button>

              <button
                onClick={() => setEditingId("")}
                className="rounded-2xl border border-[#948979]/40 px-5 py-3 text-sm text-[#DFD0B8]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
