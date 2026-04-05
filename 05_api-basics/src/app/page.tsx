"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Loader2,
  Package,
  Pencil,
  Save,
  Shield,
  Trash2,
  User,
  Wifi,
} from "lucide-react";
import { Orbitron, Share_Tech_Mono } from "next/font/google";

const titleFont = Orbitron({ subsets: ["latin"], weight: ["500", "600"] });
const bodyFont = Share_Tech_Mono({ subsets: ["latin"], weight: ["400"] });

type User = {
  _id: string;
  name: string;
  age: number;
  porterId?: string;
  cargo?: number;
};

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  // form state
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [porterId, setPorterId] = useState("");
  const [cargo, setCargo] = useState<number | "">("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    age: 0,
    porterId: "",
    cargo: 0,
  });

  // 🔥 Fetch users
  const fetchUsers = async () => {
    setLoading(true);
    const res = await fetch("/api/users");
    const data: User[] = await res.json();
    setUsers(data);
    setLoading(false);
  };

  // 🔥 Add user
  const addUser = async () => {
    if (!name || !age) return alert("All fields required");

    await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        age: Number(age),
        porterId,
        cargo: Number(cargo),
      }),
    });

    setName("");
    setAge("");
    setPorterId("");
    setCargo("");

    await fetchUsers();
  };

  // 🔥 Delete
  const deleteUser = async (id: string) => {
    await fetch(`/api/users/${id}`, { method: "DELETE" });
    await fetchUsers();
  };

  // 🔥 Edit
  const startEdit = (user: User) => {
    setEditingId(user._id);

    setEditForm({
      name: user.name || "",
      age: user.age || 0,
      porterId: user.porterId || "",
      cargo: user.cargo || 0,
    });
  };

  const saveEdit = async () => {
    await fetch(`/api/users/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm), // ✅ send ALL fields
    });

    setEditingId(null);
    setEditForm({
      name: "",
      age: 0,
      porterId: "",
      cargo: 0,
    });

    await fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await addUser();
  };

  return (
    <div
      className={`relative min-h-screen overflow-hidden bg-[#0b0f14] text-slate-100 ${bodyFont.className}`}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-linear(circle_at_top,#1b2a3f_0%,transparent_55%)] opacity-70" />
        <div className="absolute inset-0 bg-[radial-linear(circle_at_20%_20%,rgba(60,200,255,0.18),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-linear(circle_at_80%_30%,rgba(255,160,60,0.15),transparent_45%)]" />
        <div className="grid-overlay absolute inset-0" />
        <div className="scanlines absolute inset-0" />
      </div>

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-10 sm:px-8">
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col gap-3 rounded-2xl border border-cyan-400/20 bg-white/5 p-6 shadow-[0_0_30px_rgba(40,160,255,0.12)] backdrop-blur"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-cyan-200/70">
                Bridges Terminal
              </p>
              <h1
                className={`mt-2 text-2xl font-semibold text-slate-100 sm:text-3xl ${titleFont.className}`}
              >
                Porter Portal — UCA Network
              </h1>
              <p className="mt-2 text-sm text-cyan-100/80">
                Connected to Chiral Network
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-full border border-cyan-300/30 bg-cyan-500/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-cyan-200">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-70" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-200" />
              </span>
              Online
              <Wifi className="h-4 w-4" />
            </div>
          </div>
        </motion.header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,420px),1fr]">
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative overflow-hidden rounded-2xl border border-cyan-400/20 bg-white/5 p-6 backdrop-blur"
          >
            <div className="pointer-events-none absolute inset-0 opacity-40">
              <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-400/70 to-transparent" />
              <div className="absolute inset-y-0 right-0 w-px bg-linear-to-b from-transparent via-cyan-400/70 to-transparent" />
            </div>

            <div className="relative flex items-center justify-between">
              <h2 className={`text-lg font-semibold ${titleFont.className}`}>
                Porter Registration
              </h2>
              <Shield className="h-5 w-5 text-cyan-200" />
            </div>

            <form onSubmit={handleSubmit} className="relative mt-5 space-y-4">
              <div>
                <label className="text-xs uppercase tracking-[0.35em] text-slate-400">
                  Porter Name
                </label>
                <input
                  placeholder="Enter courier name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-cyan-300/20 bg-black/40 px-4 py-3 text-sm text-slate-100 shadow-[0_0_18px_rgba(60,200,255,0.12)] outline-none transition focus:border-cyan-300/70 focus:shadow-[0_0_25px_rgba(60,200,255,0.4)]"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs uppercase tracking-[0.35em] text-slate-400">
                    Age
                  </label>
                  <input
                    type="number"
                    placeholder="18"
                    value={age}
                    onChange={(e) =>
                      setAge(
                        e.target.value === "" ? "" : Number(e.target.value),
                      )
                    }
                    className="mt-2 w-full rounded-xl border border-cyan-300/20 bg-black/40 px-4 py-3 text-sm text-slate-100 shadow-[0_0_18px_rgba(60,200,255,0.12)] outline-none transition focus:border-cyan-300/70 focus:shadow-[0_0_25px_rgba(60,200,255,0.4)]"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.35em] text-slate-400">
                    Cargo Weight
                  </label>
                  <input
                    type="number"
                    placeholder="kg"
                    value={cargo}
                    onChange={(e) =>
                      setCargo(
                        e.target.value === "" ? "" : Number(e.target.value),
                      )
                    }
                    className="mt-2 w-full rounded-xl border border-cyan-300/20 bg-black/40 px-4 py-3 text-sm text-slate-100 shadow-[0_0_18px_rgba(60,200,255,0.12)] outline-none transition focus:border-cyan-300/70 focus:shadow-[0_0_25px_rgba(60,200,255,0.4)]"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.35em] text-slate-400">
                  Porter ID
                </label>
                <input
                  placeholder="BRIDGES-###"
                  value={porterId}
                  onChange={(e) => setPorterId(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-cyan-300/20 bg-black/40 px-4 py-3 text-sm text-slate-100 shadow-[0_0_18px_rgba(60,200,255,0.12)] outline-none transition focus:border-cyan-300/70 focus:shadow-[0_0_25px_rgba(60,200,255,0.4)]"
                />
              </div>
              <button
                type="submit"
                disabled={!name || !age}
                className="group relative mt-2 inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl border border-cyan-300/30 bg-linear-to-r from-cyan-500/30 via-sky-400/20 to-orange-400/20 px-5 py-3 text-sm uppercase tracking-[0.4em] text-cyan-100 shadow-[0_0_30px_rgba(80,210,255,0.18)] transition hover:border-cyan-200/90 hover:text-white hover:shadow-[0_0_35px_rgba(80,210,255,0.38)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className="absolute -inset-10 rounded-full bg-cyan-300/30 opacity-0 blur-2xl transition group-hover:opacity-100" />
                <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100">
                  <span className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/60 opacity-70 group-hover:animate-[ripple_2.6s_ease-out_infinite]" />
                </span>
                <User className="h-4 w-4" />
                Register Porter
              </button>
            </form>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center justify-between rounded-2xl border border-cyan-400/20 bg-white/5 p-4 backdrop-blur">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                  Active Couriers
                </p>
                <h3 className={`mt-1 text-lg ${titleFont.className}`}>
                  UCA Registry
                </h3>
              </div>
              <span className="rounded-full border border-cyan-300/30 bg-black/40 px-3 py-1 text-xs text-cyan-200">
                {users.length} units
              </span>
            </div>

            {loading ? (
              <div className="relative flex min-h-65 items-center justify-center overflow-hidden rounded-2xl border border-cyan-400/20 bg-white/5 p-6 text-cyan-100 backdrop-blur">
                <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-cyan-500/10 via-transparent to-orange-500/10" />
                <div className="relative flex flex-col items-center gap-3">
                  <Loader2 className="h-6 w-6 animate-spin" />
                  <p className="text-sm uppercase tracking-[0.4em]">
                    Network Syncing...
                  </p>
                </div>
              </div>
            ) : (
              <AnimatePresence>
                <div className="grid gap-4">
                  {users.map((user, index) => (
                    <motion.div
                      layout
                      key={user._id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.35, delay: index * 0.04 }}
                      className="group floating glow-pulse relative overflow-hidden rounded-2xl border border-cyan-400/15 bg-white/5 p-5 shadow-[0_0_25px_rgba(50,180,255,0.12)] backdrop-blur transition hover:scale-[1.01] hover:border-cyan-300/70"
                    >
                      <span className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100 neon-sweep" />
                      <div className="pointer-events-none absolute inset-0 opacity-40">
                        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-400/70 to-transparent" />
                        <div className="absolute inset-y-0 left-0 w-px bg-linear-to-b from-transparent via-cyan-400/70 to-transparent" />
                      </div>
                      {editingId === user._id ? (
                        <motion.div
                          key={`edit-${user._id}`}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.25 }}
                          className="flex flex-col gap-3"
                        >
                          <input
                            value={editForm.name}
                            onChange={(e) =>
                              setEditForm({ ...editForm, name: e.target.value })
                            }
                            placeholder="Name"
                            className="w-full rounded-xl border border-cyan-300/30 bg-black/45 px-4 py-2.5 text-sm text-slate-100 outline-none transition focus:border-cyan-300/80 focus:shadow-[0_0_20px_rgba(60,200,255,0.35)]"
                          />

                          <input
                            type="number"
                            value={editForm.age}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                age: Number(e.target.value),
                              })
                            }
                            placeholder="Age"
                            className="w-full rounded-xl border border-cyan-300/30 bg-black/45 px-4 py-2.5 text-sm text-slate-100 outline-none transition focus:border-cyan-300/80 focus:shadow-[0_0_20px_rgba(60,200,255,0.35)]"
                          />

                          <input
                            value={editForm.porterId}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                porterId: e.target.value,
                              })
                            }
                            placeholder="Porter ID"
                            className="w-full rounded-xl border border-cyan-300/30 bg-black/45 px-4 py-2.5 text-sm text-slate-100 outline-none transition focus:border-cyan-300/80 focus:shadow-[0_0_20px_rgba(60,200,255,0.35)]"
                          />

                          <input
                            type="number"
                            value={editForm.cargo}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                cargo: Number(e.target.value),
                              })
                            }
                            placeholder="Cargo"
                            className="w-full rounded-xl border border-cyan-300/30 bg-black/45 px-4 py-2.5 text-sm text-slate-100 outline-none transition focus:border-cyan-300/80 focus:shadow-[0_0_20px_rgba(60,200,255,0.35)]"
                          />

                          <div className="flex flex-wrap gap-3">
                            <button
                              onClick={saveEdit}
                              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-cyan-300/40 bg-cyan-500/20 px-4 py-2 text-xs uppercase tracking-[0.3em] text-cyan-100 transition hover:border-cyan-200/90 hover:shadow-[0_0_25px_rgba(60,200,255,0.45)]"
                            >
                              <span className="absolute inset-0 opacity-0 blur-xl transition group-hover:opacity-100" />
                              <Save className="h-4 w-4" />
                              Save
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="rounded-full border border-slate-500/40 bg-black/40 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-300 transition hover:border-slate-300/70 hover:text-slate-100"
                            >
                              Cancel
                            </button>
                          </div>
                        </motion.div>
                      ) : (
                        <div className="relative flex flex-col gap-3">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h4 className={`text-lg ${titleFont.className}`}>
                                {user.name}
                              </h4>
                              <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">
                                {user.porterId || "Unregistered"}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => startEdit(user)}
                                className="rounded-full border border-cyan-300/30 bg-black/40 p-2 text-cyan-200 transition hover:border-cyan-200/80"
                                aria-label="Edit Porter"
                              >
                                <Pencil className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => deleteUser(user._id)}
                                className="rounded-full border border-rose-400/40 bg-rose-500/10 p-2 text-rose-300 transition hover:border-rose-300/80"
                                aria-label="Decommission Porter"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          <div className="grid gap-3 text-sm text-slate-200/80 sm:grid-cols-3">
                            <div className="flex items-center gap-2">
                              <span className="text-cyan-200">Age</span>
                              <span className="text-slate-200">{user.age}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Package className="h-4 w-4 text-orange-300" />
                              <span>{user.cargo || 0} kg</span>
                            </div>
                            <div className="text-xs uppercase tracking-[0.3em] text-slate-500">
                              UCA-Verified
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            )}
          </motion.section>
        </div>
      </main>
    </div>
  );
}
