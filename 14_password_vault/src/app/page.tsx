"use client";

import { hashPassword, verifyPassword } from "@/lib/auth";
import { decrypt, encrypt } from "@/lib/crypto";
import { Password } from "@/types/password";
import { AnimatePresence, motion } from "framer-motion";
import {
  Copy,
  Eye,
  EyeOff,
  Globe,
  Lock,
  Search,
  Shield,
  Terminal,
  Trash2,
  User,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const STATUS_MESSAGES = [
  "CONNECTED",
  "ENCRYPTION ACTIVE",
  "SECURE LINK ESTABLISHED",
];

const SYSTEM_LOGS = [
  ">> Initiating CTOS handshake...",
  ">> Spooling zero-trace tunnel",
  ">> Loading encrypted vault shards",
  ">> Syncing access tokens",
  ">> Injecting countermeasures",
  ">> Locking perimeter channels",
  ">> Vault integrity at 100%",
  ">> Signal drift normalized",
  ">> Echo trace disabled",
  ">> Awaiting operator input",
];

export default function Home() {
  const [passwords, setPasswords] = useState<Password[]>([]);
  const [showId, setShowId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    site: "",
    username: "",
    password: "",
    tags: "",
  });
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [masterPass, setMasterPass] = useState("");
  const [storedhash, setStoredHash] = useState<string | null>(null);
  const [unlockError, setUnlockError] = useState("");
  const [statusIndex, setStatusIndex] = useState(0);

  const filteredPasswords = useMemo(() => {
    const query = search.toLowerCase();
    return passwords.filter(
      (p) =>
        p.site.toLowerCase().includes(query) ||
        p.username.toLowerCase().includes(query) ||
        p.tags.some((tag) => tag.toLowerCase().includes(query)),
    );
  }, [passwords, search]);

  const selected = useMemo(
    () => passwords.find((p) => p.id === selectedId) ?? null,
    [passwords, selectedId],
  );

  const isRevealed = selected && showId === selected.id;

  const handleAdd = () => {
    if (!form.site || !form.username || !form.password) return;

    const newEntry: Password = {
      id: crypto.randomUUID(),
      site: form.site,
      username: form.username,
      password: encrypt(form.password),
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };
    setPasswords([newEntry, ...passwords]);
    setForm({ site: "", username: "", password: "", tags: "" });
  };

  const handleDelete = (id: string) => {
    setPasswords(passwords.filter((p) => p.id !== id));
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 1500);
  };

  const handleUnlock = async () => {
    if (!masterPass) return;

    if (!storedhash) {
      const hash = await hashPassword(masterPass);
      localStorage.setItem("master", hash);
      setStoredHash(hash);
      setIsUnlocked(true);
      setMasterPass("");
      setUnlockError("");
      return;
    }

    const isValid = await verifyPassword(masterPass, storedhash);
    if (isValid) {
      setIsUnlocked(true);
      setMasterPass("");
      setUnlockError("");
    } else {
      setUnlockError("ACCESS DENIED: MASTER KEY MISMATCH");
    }
  };

  useEffect(() => {
    const savedHash = localStorage.getItem("master");
    if (savedHash) {
      setStoredHash(savedHash);
    }
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("vault");
    if (saved) {
      setPasswords(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("vault", JSON.stringify(passwords));
  }, [passwords]);

  useEffect(() => {
    if (!passwords.length) {
      setSelectedId(null);
      return;
    }
    if (!selectedId) {
      setSelectedId(passwords[0].id);
      return;
    }
    if (!passwords.some((p) => p.id === selectedId)) {
      setSelectedId(passwords[0].id);
    }
  }, [passwords, selectedId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % STATUS_MESSAGES.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  if (!isUnlocked) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-black text-cyan-100">
        <HackerBackdrop />
        <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="panel w-full max-w-md rounded-2xl p-8"
          >
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-cyan-400/70">
              <Terminal className="h-3 w-3 text-cyan-300" />
              <span>CTOS AUTH NODE</span>
            </div>
            <h1 className="typing mt-4 text-2xl font-semibold tracking-[0.35em] text-cyan-200 sm:text-3xl">
              ACCESS TERMINAL
            </h1>
            <p className="mt-3 text-xs text-cyan-300/70">
              Authenticate your master key to enter the secure vault interface.
            </p>

            <div className="mt-6 space-y-3">
              <label className="text-[10px] uppercase tracking-[0.2em] text-cyan-400">
                Master Key
              </label>
              <input
                type="password"
                className="w-full rounded-lg border border-cyan-400/20 bg-black/70 px-4 py-2 text-cyan-100 shadow-[0_0_12px_rgba(45,252,255,0.15)] outline-none transition focus:border-cyan-300/70 focus:shadow-[0_0_18px_rgba(45,252,255,0.45)]"
                value={masterPass}
                onChange={(e) => setMasterPass(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleUnlock();
                }}
              />
              {unlockError ? (
                <p className="text-xs text-green-300 text-flicker">
                  {unlockError}
                </p>
              ) : null}
            </div>

            <button
              onClick={handleUnlock}
              className="btn-neon mt-6 w-full rounded-lg bg-cyan-500/10 px-4 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-100 transition hover:bg-cyan-400/20"
            >
              INITIATE ACCESS
            </button>
            <div className="mt-4 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-cyan-400/60">
              <span>Node: CT-09</span>
              <span className="cursor-blink">_</span>
            </div>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-cyan-100">
      <HackerBackdrop />
      <div className="relative z-10 px-4 py-6 md:px-8 lg:px-12">
        <div className="panel flex flex-col gap-4 rounded-2xl px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-xl border border-cyan-400/30 bg-black/50 p-3 shadow-[0_0_18px_rgba(45,252,255,0.2)]">
              <Terminal className="h-5 w-5 text-cyan-300" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-cyan-400/70">
                ctOS secure vault
              </p>
              <h1 className="text-lg font-semibold uppercase tracking-[0.45em] text-cyan-200 sm:text-xl">
                CTOS SECURE VAULT
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3 text-green-300">
            <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(109,255,109,0.9)]" />
            <AnimatePresence mode="wait">
              <motion.span
                key={STATUS_MESSAGES[statusIndex]}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.4 }}
                className="text-xs uppercase tracking-[0.3em] text-flicker"
              >
                {STATUS_MESSAGES[statusIndex]}
              </motion.span>
            </AnimatePresence>
            <span className="cursor-blink">_</span>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(260px,380px)_1fr]">
          <aside className="panel space-y-5 rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-cyan-200">
                <Shield className="h-4 w-4 text-cyan-300" />
                Vault List
              </div>
              <span className="text-xs text-cyan-400/70">
                {filteredPasswords.length} nodes
              </span>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-400/60" />
              <input
                placeholder="Search nodes"
                className="w-full rounded-lg border border-cyan-400/20 bg-black/60 py-2 pl-10 pr-3 text-sm text-cyan-100 outline-none transition focus:border-cyan-300/70"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="rounded-xl border border-cyan-400/20 bg-black/40 p-4">
              <p className="text-[10px] uppercase tracking-[0.35em] text-cyan-400/70">
                New Credential
              </p>
              <div className="mt-4 space-y-3">
                <input
                  placeholder="Site"
                  className="w-full rounded-lg border border-cyan-400/10 bg-black/70 px-3 py-2 text-sm text-cyan-100 outline-none transition focus:border-cyan-300/70"
                  value={form.site}
                  onChange={(e) => setForm({ ...form, site: e.target.value })}
                />
                <input
                  placeholder="Username"
                  className="w-full rounded-lg border border-cyan-400/10 bg-black/70 px-3 py-2 text-sm text-cyan-100 outline-none transition focus:border-cyan-300/70"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                />
                <input
                  placeholder="Password"
                  type="password"
                  className="w-full rounded-lg border border-cyan-400/10 bg-black/70 px-3 py-2 text-sm text-cyan-100 outline-none transition focus:border-cyan-300/70"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <input
                  placeholder="Tags (comma separated)"
                  className="w-full rounded-lg border border-cyan-400/10 bg-black/70 px-3 py-2 text-sm text-cyan-100 outline-none transition focus:border-cyan-300/70"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                />
                <button
                  onClick={handleAdd}
                  className="btn-neon w-full rounded-lg bg-cyan-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-100 transition hover:bg-cyan-400/20"
                >
                  Add Entry
                </button>
              </div>
            </div>

            <div className="scrollbar-cyber max-h-[48vh] space-y-3 overflow-y-auto pr-1 lg:max-h-[calc(100vh-22rem)]">
              {filteredPasswords.length ? (
                filteredPasswords.map((p) => (
                  <motion.button
                    key={p.id}
                    onClick={() => setSelectedId(p.id)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`glitch-card w-full rounded-xl border border-cyan-400/10 bg-black/60 p-4 text-left transition ${
                      selectedId === p.id
                        ? "pulse-neon border-cyan-300/60"
                        : "hover:border-cyan-300/50"
                    }`}
                  >
                    <div className="flex items-center gap-2 text-sm text-cyan-100">
                      <Globe className="h-4 w-4 text-cyan-300" />
                      <span className="truncate font-semibold">
                        {p.site}
                      </span>
                    </div>
                    <div className="mt-2 space-y-1 text-xs text-cyan-300/80">
                      <div className="flex items-center gap-2">
                        <User className="h-3 w-3 text-cyan-400/80" />
                        <span className="truncate">{p.username}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Lock className="h-3 w-3 text-cyan-400/80" />
                        <span>
                          {showId === p.id ? decrypt(p.password) : "••••••••"}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {(p.tags || []).slice(0, 3).map((tag, i) => (
                        <span
                          key={`${p.id}-tag-${i}`}
                          className="rounded-full border border-cyan-400/20 bg-black/70 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-cyan-300/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.button>
                ))
              ) : (
                <div className="rounded-xl border border-cyan-400/20 bg-black/50 p-4 text-xs text-cyan-400/70">
                  No credentials stored. Add a new node to initialize the vault.
                </div>
              )}
            </div>
          </aside>

          <section className="panel flex flex-col rounded-2xl p-6">
            <AnimatePresence mode="wait">
              {selected ? (
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4 }}
                  className="flex h-full flex-col gap-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.35em] text-cyan-400/70">
                        Target Node
                      </p>
                      <h2 className="mt-2 text-2xl font-semibold text-cyan-200">
                        {selected.site}
                      </h2>
                      <p className="mt-1 text-xs text-cyan-400/60">
                        ID: {selected.id.slice(0, 8)}-{selected.id.slice(-4)}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(selected.id)}
                      className="btn-neon rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-xs uppercase tracking-[0.2em] text-red-200 transition hover:bg-red-500/20"
                    >
                      <span className="flex items-center gap-2">
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </span>
                    </button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-xl border border-cyan-400/15 bg-black/50 p-4">
                      <p className="text-[10px] uppercase tracking-[0.35em] text-cyan-400/70">
                        Username
                      </p>
                      <div className="mt-3 flex items-center gap-2 text-base text-cyan-100">
                        <User className="h-4 w-4 text-cyan-300" />
                        <span>{selected.username}</span>
                      </div>
                    </div>
                    <div className="rounded-xl border border-cyan-400/15 bg-black/50 p-4">
                      <p className="text-[10px] uppercase tracking-[0.35em] text-cyan-400/70">
                        Vault Tags
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {selected.tags?.length ? (
                          selected.tags.map((tag, i) => (
                            <span
                              key={`${selected.id}-detail-tag-${i}`}
                              className="rounded-full border border-cyan-400/30 bg-black/70 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-cyan-300"
                            >
                              {tag}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-cyan-400/60">
                            No tags assigned.
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-cyan-400/20 bg-black/60 p-5">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-cyan-400/70">
                      Encrypted Password
                    </p>
                    <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div className="text-lg font-semibold text-cyan-100">
                        <AnimatePresence mode="wait">
                          {isRevealed ? (
                            <motion.span
                              key="revealed"
                              className="glitch-text"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: [0, 1, 0.6, 1] }}
                              transition={{ duration: 0.6 }}
                            >
                              {decrypt(selected.password)}
                            </motion.span>
                          ) : (
                            <motion.span
                              key="masked"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.4 }}
                            >
                              ••••••••
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() =>
                            setShowId(isRevealed ? null : selected.id)
                          }
                          className="btn-neon rounded-lg bg-cyan-500/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-cyan-100 transition hover:bg-cyan-400/20"
                        >
                          <span className="flex items-center gap-2">
                            {isRevealed ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                            {isRevealed ? "Hide" : "Show"}
                          </span>
                        </button>
                        <button
                          onClick={() =>
                            handleCopy(decrypt(selected.password), selected.id)
                          }
                          className="btn-neon rounded-lg bg-cyan-500/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-cyan-100 transition hover:bg-cyan-400/20"
                        >
                          <span className="flex items-center gap-2">
                            <Copy className="h-4 w-4" />
                            {copiedId === selected.id ? "Copied" : "Copy"}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex h-full flex-col items-center justify-center gap-3 text-center"
                >
                  <Terminal className="h-10 w-10 text-cyan-400/60" />
                  <p className="text-sm text-cyan-300/70">
                    No active target selected. Add a credential to initialize the
                    vault.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>
      </div>
    </main>
  );
}

function HackerBackdrop() {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#050b12] to-[#020408]" />
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute inset-0 noise" />
      <div className="absolute inset-0 scanlines" />
      <SystemLogs />
      <SignalDots />
    </>
  );
}

function SystemLogs() {
  const logs = [...SYSTEM_LOGS, ...SYSTEM_LOGS];
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute bottom-0 left-6 max-w-[60vw] text-[10px] uppercase tracking-[0.2em] text-cyan-400/40">
        <div className="log-scroll space-y-2">
          {logs.map((line, index) => (
            <div key={`${line}-${index}`}>{line}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SignalDots() {
  const dots = [
    { top: "18%", left: "12%" },
    { top: "30%", left: "82%" },
    { top: "52%", left: "20%" },
    { top: "64%", left: "70%" },
    { top: "78%", left: "35%" },
  ];
  return (
    <div className="pointer-events-none absolute inset-0">
      {dots.map((dot, index) => (
        <span
          key={`${dot.top}-${dot.left}`}
          className="signal-dot absolute"
          style={{
            top: dot.top,
            left: dot.left,
            animationDelay: `${index * 0.6}s`,
          }}
        />
      ))}
    </div>
  );
}
