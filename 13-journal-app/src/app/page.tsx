"use client";

import EntryForm from "@/components/EntryForm";
import EntryList from "@/components/EntryList";
import { formatDate, parseDateKey } from "../lib/date";
import { IM_Fell_English_SC, Source_Code_Pro } from "next/font/google";
import { useEffect, useMemo, useState } from "react";

const titleFont = IM_Fell_English_SC({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-title",
});

const bodyFont = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-body",
});

const FALLBACK_DATE = new Date(2000, 0, 1);

type Entry = {
  id: string;
  title: string;
  content: string;
  date?: string;
  dateKey?: string;
  tags?: string[];
};

const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const rotationClasses = ["-rotate-2", "-rotate-1", "rotate-1", "rotate-2"];

const toDateKey = (value?: string | Date) => {
  if (!value) return "";
  if (value instanceof Date) {
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, "0");
    const day = String(value.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  if (/^\d{4}-\d{2}-\d{2}/.test(value)) return value.slice(0, 10);
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "";
  return toDateKey(parsed);
};

const formatMonthLabel = (date: Date) => {
  return date.toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });
};

export default function Home() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [tags, setTags] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [referenceDate, setReferenceDate] = useState<Date | null>(null);
  const [hasManualDateSelection, setHasManualDateSelection] = useState(false);

  const activeDate = referenceDate ?? FALLBACK_DATE;
  const todayKey = toDateKey(activeDate);
  const [selectedDateKey, setSelectedDateKey] = useState(() => todayKey);
  const currentMonth = activeDate.getMonth();
  const currentYear = activeDate.getFullYear();
  const monthLabel = formatMonthLabel(activeDate);

  const handleAddEntry = () => {
    if (!title || !content) return;
    const parsedTags = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
    if (editId !== null) {
      const updatedEntries = entries.map((e) =>
        e.id === editId ? { ...e, title, content, tags: parsedTags } : e,
      );

      setEntries(updatedEntries);

      setEditId(null);
    } else {
      const now = new Date();
      const dateKey = toDateKey(now);
      const displayDate = formatDate(now);
      const newEntry = {
        id: crypto.randomUUID(),
        title,
        content,
        date: displayDate,
        dateKey,
        tags: parsedTags,
      };
      setEntries([newEntry, ...entries]);
      if (dateKey) {
        setSelectedDateKey(dateKey);
        setHasManualDateSelection(true);
      }
    }

    setTitle("");
    setContent("");
    setTags("");
  };

  const handleEdit = (entry: Entry) => {
    setTitle(entry.title);
    setContent(entry.content);
    setTags(entry.tags?.join(", ") ?? "");
    setEditId(entry.id);
  };

  const handleDelete = (id: string) => {
    const confirmDelete = confirm("Delete this Entry..?");
    if (!confirmDelete) return;
    const updateEntries = entries.filter((e) => e.id !== id);
    setEntries(updateEntries);
  };

  const handleExport = () => {
    if (entries.length === 0) {
      alert("No entries to export");
      return;
    }
    const content = entries.map((e, index) => {
      return `
      Entry ${index + 1}
      Title: ${e.title}
      Date: ${e.date}
      Tags: ${e.tags?.join(", ") || "None"}

      ${e.content}

      -------------------------
      `;
    }).join("\n");


    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "journal-entries.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    setReferenceDate(new Date());
  }, []);

  useEffect(() => {
    const storedEntries = localStorage.getItem("journalEntries");
    if (storedEntries) {
      const parsedEntries = JSON.parse(storedEntries) as Entry[];
      const normalizedEntries = parsedEntries.map((entry) => {
        const dateKey = entry.dateKey || toDateKey(entry.date || "");
        const parsedDate = dateKey ? parseDateKey(dateKey) : null;
        const displayDate = parsedDate
          ? formatDate(parsedDate)
          : entry.date || "";
        return {
          ...entry,
          dateKey,
          date: displayDate,
        };
      });
      setEntries(normalizedEntries);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("journalEntries", JSON.stringify(entries));
  }, [entries]);

  const resolvedDateKeys = useMemo(() => {
    return entries
      .map((entry) => toDateKey(entry.dateKey || entry.date))
      .filter(Boolean);
  }, [entries]);

  const entryDateKeys = useMemo(() => {
    return new Set(resolvedDateKeys);
  }, [resolvedDateKeys]);

  const mostRecentDateKey = useMemo(() => {
    return resolvedDateKeys.reduce(
      (latest, key) => (latest && latest > key ? latest : key),
      "",
    );
  }, [resolvedDateKeys]);

  useEffect(() => {
    if (hasManualDateSelection) return;
    if (mostRecentDateKey) {
      setSelectedDateKey(mostRecentDateKey);
      return;
    }
    setSelectedDateKey(todayKey);
  }, [hasManualDateSelection, mostRecentDateKey, todayKey]);

  const calendarDays = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const padDays = firstDay.getDay();
    const days: Array<Date | null> = [];
    for (let i = 0; i < padDays; i += 1) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day += 1) {
      days.push(new Date(currentYear, currentMonth, day));
    }
    return days;
  }, [currentMonth, currentYear]);

  const filteredEntries = entries.filter((entry) => {
    const searchLower = search.toLowerCase();
    return (
      entry.title.toLowerCase().includes(searchLower) ||
      entry.content.toLowerCase().includes(searchLower) ||
      entry.tags?.some((tag) => tag.toLowerCase().includes(searchLower))
    );
  });

  const dateFilteredEntries = selectedDateKey
    ? filteredEntries.filter(
        (entry) =>
          toDateKey(entry.dateKey || entry.date) === selectedDateKey,
      )
    : filteredEntries;

  const selectedDateLabel = useMemo(() => {
    if (!selectedDateKey) return null;
    const parsed = parseDateKey(selectedDateKey);
    return parsed ? formatDate(parsed) : null;
  }, [selectedDateKey]);

  return (
    <div
      className={`${titleFont.variable} ${bodyFont.variable} relative min-h-screen overflow-hidden bg-[#0b0a08] text-[#e7e2d8] font-(--font-body)`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.05)_0%,transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.04)_0%,transparent_35%,rgba(0,0,0,0.3)_75%)] opacity-70 mix-blend-soft-light" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.7)_70%)]" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-10 lg:px-10">
        <header className="flex flex-col gap-4">
          <div className="relative inline-flex flex-col gap-3">
            <h1 className="relative font-(--font-title) text-4xl uppercase tracking-[0.28em] text-[#f0e9da] md:text-5xl">
              <span className="relative z-10 animate-glitch">Survivor Journal</span>
              <span className="absolute left-0 top-0 -z-10 text-[#6d7f62] opacity-40 blur-[1px] animate-glitch" aria-hidden>
                Survivor Journal
              </span>
            </h1>
            <p className="text-xs uppercase tracking-[0.6em] text-[#b4ab9b] animate-fade-in">
              Record. Remember. Survive.
            </p>
          </div>
          <p className="max-w-2xl text-sm leading-relaxed text-[#9e9486]">
            A survivor documenting life in a broken world. Keep the days that
            still matter.
          </p>
        </header>

        <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="animate-pageflip">
            <EntryForm
              title={title}
              content={content}
              tags={tags}
              setTitle={setTitle}
              setTags={setTags}
              setContent={setContent}
              handleSubmit={handleAddEntry}
              editId={editId}
            />
          </div>

          <section className="relative isolate rounded-[22px] border border-[#383226] bg-[#15140f] p-6 shadow-[0_28px_60px_rgba(0,0,0,0.55)] animate-pageflip">
            <div className="pointer-events-none absolute inset-0 -z-10 rounded-[22px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_60%)] opacity-60" />
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-[#8f8779]">
                  Calendar Log
                </p>
                <h2 className="mt-2 font-(--font-title) text-2xl uppercase tracking-[0.25em] text-[#e6e0d2]">
                  {monthLabel}
                </h2>
              </div>
              <div className="rounded-full border border-[#3a3326] px-4 py-2 text-[10px] uppercase tracking-[0.4em] text-[#a09584]">
                {selectedDateLabel || "Select a day"}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-7 gap-2 text-[10px] uppercase tracking-[0.35em] text-[#8a8274]">
              {weekdayLabels.map((day) => (
                <span key={day} className="text-center">
                  {day}
                </span>
              ))}
            </div>

            <div className="mt-3 grid grid-cols-7 gap-2">
              {calendarDays.map((day, index) => {
                if (!day) {
                  return <div key={`pad-${index}`} />;
                }

                const dayKey = toDateKey(day);
                const dayNumber = day.getDate();
                const isToday = dayKey === todayKey;
                const isSelected = dayKey === selectedDateKey;
                const hasEntries = entryDateKeys.has(dayKey);
                const rotation =
                  rotationClasses[(dayNumber + index) % rotationClasses.length];

                const dayClasses = [
                  "relative flex aspect-square w-full items-center justify-center rounded-[12px] border border-[#2c2821] bg-[#171512] text-sm text-[#d9d2c5] shadow-[inset_0_0_18px_rgba(0,0,0,0.45)] transition duration-500 ease-out hover:scale-105 hover:shadow-[0_0_18px_rgba(90,120,82,0.35)] focus:outline-none focus:ring-2 focus:ring-[#56684a]/80",
                  rotation,
                  hasEntries
                    ? "after:absolute after:inset-[6px] after:rounded-full after:border after:border-[#5e7453]/70 after:rotate-[2deg]"
                    : "",
                  isSelected ? "border-[#6d805f] text-[#edf3e4]" : "",
                  isToday
                    ? "ring-2 ring-[#c2a66a] bg-[#222017] text-[#f2ead7] shadow-[0_0_24px_rgba(194,166,106,0.3)]"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ");

                return (
                  <button
                    key={dayKey}
                    type="button"
                    onClick={() => {
                      setSelectedDateKey(dayKey);
                      setHasManualDateSelection(true);
                    }}
                    aria-label={`View entries for ${formatDate(day)}`}
                    className={dayClasses}
                  >
                    <span className="relative z-10">{dayNumber}</span>
                  </button>
                );
              })}
            </div>

            <p className="mt-4 text-xs uppercase tracking-[0.35em] text-[#827a6c]">
              Tap a day to reveal its entries.
            </p>
          </section>
        </div>

        <section className="flex flex-col gap-6 animate-pageflip">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-[#8f8779]">
                Entry Archive
              </p>
              <h2 className="mt-2 font-(--font-title) text-2xl uppercase tracking-[0.25em] text-[#e6e0d2]">
                Entries for {selectedDateLabel || "the chosen day"}
              </h2>
            </div>
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
              <input
                type="text"
                placeholder="Search entries..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-[#3b3529] bg-[#12110d] px-4 py-3 text-sm text-[#e6e0d2] placeholder:text-[#7f7768] shadow-[inset_0_0_18px_rgba(0,0,0,0.55)] focus:outline-none focus:ring-2 focus:ring-[#56684a]/70 sm:max-w-xs"
                aria-label="Search entries"
              />
              <button
                onClick={handleExport}
                className="inline-flex items-center justify-center rounded-xl border border-[#5f5138] bg-linear-to-br from-[#3a3325] via-[#2b241a] to-[#17130f] px-4 py-3 text-xs uppercase tracking-[0.35em] text-[#efe7d5] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_12px_30px_rgba(0,0,0,0.45)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_22px_40px_rgba(0,0,0,0.6)] active:translate-y-0"
              >
                Export Entries
              </button>
            </div>
          </div>

          <EntryList
            entries={dateFilteredEntries}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            emptyMessage="No entries found... start writing your story."
          />
        </section>
      </div>
    </div>
  );
}
