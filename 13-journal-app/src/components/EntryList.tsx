import { formatDate, parseDateKey } from "../lib/date";

type Entry = {
  id: string;
  title: string;
  content: string;
  date?: string;
  dateKey?: string;
  tags?: string[];
};

type EntryListProps = {
  entries: Entry[];
  handleDelete: (id: string) => void;
  handleEdit: (entry: Entry) => void;
  emptyMessage?: string;
};

export default function EntryList({
  entries,
  handleDelete,
  handleEdit,
  emptyMessage = "No entries found... start writing your story.",
}: EntryListProps) {
  if (entries.length === 0) {
    return (
      <div className="rounded-[18px] border border-dashed border-[#3a3326] bg-[#14130f] p-6 text-sm text-[#9a9080] shadow-[inset_0_0_22px_rgba(0,0,0,0.45)]">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {entries.map((entry, index) => {
        const preview =
          entry.content.length > 180
            ? `${entry.content.slice(0, 180)}...`
            : entry.content;

        const parsedDate = entry.dateKey
          ? parseDateKey(entry.dateKey)
          : entry.date
            ? new Date(entry.date)
            : null;
        const dateLabel = parsedDate ? formatDate(parsedDate) : "";

        return (
          <article
            key={entry.id}
            className="group relative overflow-hidden rounded-[18px] border border-[#3a352a] bg-[#171612] p-5 shadow-[0_22px_40px_rgba(0,0,0,0.45)] transition duration-700 hover:-translate-y-1 hover:shadow-[0_30px_60px_rgba(0,0,0,0.6)] animate-fade-in hover:animate-flicker"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.07),transparent_60%)] opacity-60" />
            <div className="relative flex flex-col gap-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-(--font-title) text-lg uppercase tracking-[0.2em] text-[#e4ddcf]">
                  {entry.title}
                </h3>
                <span className="text-xs uppercase tracking-[0.35em] text-[#8d8475]">
                  {dateLabel}
                </span>
              </div>

              <p className="text-sm leading-relaxed text-[#c7bfb1]">
                {preview}
              </p>

              {entry.tags && entry.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {entry.tags.map((tag, i) => (
                    <span
                      key={`${entry.id}-${tag}-${i}`}
                      className="rounded-full border border-[#364135] bg-[#1a2018] px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-[#8fa182]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => handleEdit(entry)}
                  className="rounded-[10px] border border-[#3b3529] bg-[#141311] px-3 py-2 text-[10px] uppercase tracking-[0.35em] text-[#c9c2b4] transition duration-500 hover:bg-[#1e1c17]"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(entry.id)}
                  className="rounded-[10px] border border-[#4a2f25] bg-[#17110f] px-3 py-2 text-[10px] uppercase tracking-[0.35em] text-[#d29b84] transition duration-500 hover:bg-[#241814]"
                >
                  Delete
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
