"use client";

import { useEffect, useState } from "react";
import HabitHeatmap from "@/components/HabitHeatmap";

type Habit = {
  id: number;
  text: string;
  completedDates: string[];
};

export default function CodexPageClient() {
  const [habit, setHabit] = useState<string>("");
  const [habits, setHabits] = useState<Habit[]>(() => {
    if (typeof window === "undefined") return [];

    const stored = localStorage.getItem("habits");
    if (!stored) return [];

    try {
      const parsed = JSON.parse(stored) as Habit[];
      return parsed.map((h) => ({
        ...h,
        completedDates: h.completedDates ?? [],
      }));
    } catch {
      return [];
    }
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");

  const getToday = () => new Date().toISOString().split("T")[0];

  const isCompletedToday = (h: Habit) =>
    h.completedDates.includes(getToday());

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const addHabit = () => {
    if (!habit.trim()) return;

    const newHabit: Habit = {
      id: Date.now(),
      text: habit,
      completedDates: [],
    };

    setHabits([newHabit, ...habits]);
    setHabit("");
  };

  const toggleComplete = (id: number) => {
    const today = getToday();

    const updated = habits.map((h) => {
      if (h.id !== id) return h;

      const alreadyDone = h.completedDates.includes(today);

      return {
        ...h,
        completedDates: alreadyDone
          ? h.completedDates.filter((d) => d !== today)
          : [...h.completedDates, today],
      };
    });

    setHabits(updated);
  };

  const startEdit = (id: number, currentText: string) => {
    setEditingId(id);
    setEditText(currentText);
  };

  const saveEdit = (id: number) => {
    if (!editText.trim()) return;

    const updated = habits.map((h) =>
      h.id === id ? { ...h, text: editText } : h
    );

    setHabits(updated);
    setEditingId(null);
    setEditText("");
  };

  const deleteHabit = (id: number) => {
    const updated = habits.filter((h) => h.id !== id);
    setHabits(updated);
  };

  const filteredHabits = habits.filter((h) => {
    if (filter === "completed") return isCompletedToday(h);
    if (filter === "pending") return !isCompletedToday(h);
    return true;
  });

  const total = habits.length;
  const completed = habits.filter((h) => isCompletedToday(h)).length;
  const pending = total - completed;
  const completionRate =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  const calculateStreak = (dates: string[]) => {
    let streak = 0;
    const currentDate = new Date();

    while (true) {
      const dateStr = currentDate.toISOString().split("T")[0];

      if (dates.includes(dateStr)) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  };

  const stats = [
    { label: "Oaths Taken", value: total },
    { label: "Oaths Honored", value: completed },
    { label: "Oaths Unfulfilled", value: pending },
    { label: "Strength of Will", value: `${completionRate}%` },
  ];

  const tabClass = (tab: "all" | "completed" | "pending") =>
    `relative px-4 py-2 text-xs md:text-sm uppercase tracking-[0.18em] border transition-all duration-500 ${
      filter === tab
        ? "border-[#c6a85b]/80 text-[#f1e2b0] shadow-[0_0_22px_rgba(198,168,91,0.22)]"
        : "border-zinc-700 text-zinc-500 hover:border-[#c6a85b]/45 hover:text-zinc-300"
    }`;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0f0f0f] px-4 py-8 text-[#e5e5e5] sm:px-6 md:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(110,193,228,0.08),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(198,168,91,0.1),transparent_32%),linear-gradient(to_bottom,#0f0f0f,#111111)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[120px_120px] opacity-20" />

      <section className="relative mx-auto w-full max-w-6xl">
        <header className="mb-8 text-center">
          <p className="mb-2 text-xs uppercase tracking-[0.32em] text-zinc-500">Norse Chronicle</p>
          <h1 className="text-4xl font-bold uppercase tracking-[0.22em] text-[#f1f1f1] md:text-6xl">Codex of Discipline</h1>
          <p className="mt-3 text-sm uppercase tracking-[0.2em] text-zinc-400 md:text-base">Each Oath binds the soul</p>
          <div className="mx-auto mt-6 h-px w-full max-w-2xl bg-linear-to-r from-transparent via-[#c6a85b] to-transparent" />
        </header>

        <section className="mb-6 rounded-2xl border border-[#c6a85b]/30 bg-[#121212]/90 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_12px_40px_rgba(0,0,0,0.45)]">
          <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-[#c6a85b]/30 bg-black/35 px-4 py-3 text-center transition-transform duration-500 hover:scale-[1.02] hover:border-[#c6a85b]/60"
              >
                <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">{s.label}</p>
                <p className="mt-2 text-2xl font-bold text-[#c6a85b] md:text-3xl">{s.value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-[#c6a85b]/25 bg-zinc-950/70 p-2">
            <div className="mb-2 flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-zinc-500">
              <span>Strength of Will</span>
              <span className="text-[#e5d4a0]">{completionRate}%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-lg border border-zinc-700 bg-zinc-900">
              <div
                className="h-full bg-linear-to-r from-amber-900 via-[#c6a85b] to-[#e8ce87] transition-all duration-500"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>
        </section>

        <section className="mb-6 rounded-2xl border border-[#c6a85b]/30 bg-[#121212]/90 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_10px_30px_rgba(0,0,0,0.45)]">
          <div className="flex flex-col gap-3 md:flex-row">
            <input
              type="text"
              value={habit}
              onChange={(e) => setHabit(e.target.value)}
              placeholder="Speak the oath you shall uphold..."
              className="flex-1 rounded-xl border border-zinc-700 bg-zinc-950/90 px-4 py-3 text-sm tracking-wide text-zinc-100 outline-none transition-all duration-300 placeholder:text-zinc-500 focus:border-[#c6a85b]/80 focus:ring-2 focus:ring-[#c6a85b]/45"
            />

            <button
              onClick={addHabit}
              className="rounded-xl border border-[#c6a85b]/80 bg-transparent px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#e7d4a0] transition-all duration-500 hover:scale-[1.02] hover:border-[#e7cd83] hover:shadow-[0_0_24px_rgba(198,168,91,0.28)] active:scale-[0.99] active:bg-[#2a2418] active:shadow-[inset_0_2px_8px_rgba(0,0,0,0.5)]"
            >
              Forge Oath
            </button>
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <button onClick={() => setFilter("all")} className={tabClass("all")}>
              All Oaths
              {filter === "all" && (
                <span className="absolute -bottom-0.5 left-1/2 h-0.5 w-3/4 -translate-x-1/2 bg-[#c6a85b]" />
              )}
            </button>

            <button onClick={() => setFilter("completed")} className={tabClass("completed")}>
              Honored
              {filter === "completed" && (
                <span className="absolute -bottom-0.5 left-1/2 h-0.5 w-3/4 -translate-x-1/2 bg-[#c6a85b]" />
              )}
            </button>

            <button onClick={() => setFilter("pending")} className={tabClass("pending")}>
              Unfulfilled
              {filter === "pending" && (
                <span className="absolute -bottom-0.5 left-1/2 h-0.5 w-3/4 -translate-x-1/2 bg-[#c6a85b]" />
              )}
            </button>
          </div>
        </section>

        <section className="space-y-4">
          {filteredHabits.map((h) => {
            const done = isCompletedToday(h);
            const streak = calculateStreak(h.completedDates);

            return (
              <article
                key={h.id}
                className={`rounded-2xl border p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_16px_36px_rgba(0,0,0,0.35)] transition-all duration-500 hover:scale-[1.02] ${
                  done
                    ? "border-[#6ec1e4]/40 bg-[#10161a]/85"
                    : "border-[#c6a85b]/35 bg-[#141414]/90 hover:border-[#c6a85b]/65"
                }`}
              >
                <div className="mb-4 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => toggleComplete(h.id)}
                    className={`relative grid h-8 w-8 shrink-0 place-content-center rounded-full border-2 transition-all duration-300 ${
                      done
                        ? "border-[#6ec1e4] bg-[#12212a] shadow-[0_0_14px_rgba(110,193,228,0.4)]"
                        : "border-[#c6a85b]/70 bg-black/40 hover:shadow-[0_0_14px_rgba(198,168,91,0.3)]"
                    }`}
                    aria-label={done ? "Mark oath unfulfilled" : "Mark oath honored"}
                  >
                    <span className={`h-2 w-2 rounded-full transition-all duration-300 ${done ? "bg-[#6ec1e4]" : "bg-[#c6a85b]/60"}`} />
                  </button>

                  {editingId === h.id ? (
                    <input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="flex-1 rounded-xl border border-[#c6a85b]/35 bg-zinc-950/90 px-3 py-2 text-sm text-zinc-100 outline-none transition-all duration-300 focus:border-[#c6a85b]/80 focus:ring-2 focus:ring-[#c6a85b]/30"
                    />
                  ) : (
                    <div className="min-w-0 flex-1">
                      <h2
                        className={`truncate text-lg uppercase tracking-[0.12em] md:text-xl ${
                          done ? "text-zinc-400 line-through" : "text-zinc-100"
                        }`}
                      >
                        {h.text}
                      </h2>
                      <p className="mt-1 text-xs uppercase tracking-[0.2em] text-zinc-500">
                        Flame <span className="ml-1 text-[#c6a85b]">🔥 {streak}</span>
                      </p>
                    </div>
                  )}

                  <div className="ml-auto flex items-center gap-2">
                    {editingId === h.id ? (
                      <button
                        onClick={() => saveEdit(h.id)}
                        className="rounded-lg border border-[#6ec1e4]/70 px-3 py-2 text-[11px] uppercase tracking-[0.15em] text-[#bde9fb] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_18px_rgba(110,193,228,0.32)] active:scale-[0.99]"
                      >
                        Inscribe
                      </button>
                    ) : (
                      <button
                        onClick={() => startEdit(h.id, h.text)}
                        className="rounded-lg border border-[#c6a85b]/70 px-3 py-2 text-[11px] uppercase tracking-[0.15em] text-[#e7d4a0] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_18px_rgba(198,168,91,0.32)] active:scale-[0.99]"
                      >
                        Carve
                      </button>
                    )}

                    <button
                      onClick={() => deleteHabit(h.id)}
                      className="rounded-lg border border-red-900/70 px-3 py-2 text-[11px] uppercase tracking-[0.15em] text-red-300 transition-all duration-300 hover:scale-[1.02] hover:border-red-600/70 hover:shadow-[0_0_18px_rgba(220,38,38,0.2)] active:scale-[0.99]"
                    >
                      Banish
                    </button>
                  </div>
                </div>

                <HabitHeatmap completedDates={h.completedDates} days={30} />
              </article>
            );
          })}

          {filteredHabits.length === 0 && (
            <div className="rounded-2xl border border-zinc-700 bg-black/30 px-6 py-10 text-center">
              <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">No oaths walk this path</p>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
