type HabitHeatmapProps = {
  completedDates: string[];
  days?: number;
};

type Cell = {
  key: string;
  isoDate: string;
  isToday: boolean;
  completed: boolean;
  day: number;
  weekday: number;
};

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MOONS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatDateToIso(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function atStartOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function getCellToneClass(cell: Cell): string {
  if (!cell.completed) {
    return "bg-zinc-800/90 border-zinc-700/70 hover:border-zinc-500/80";
  }

  return "border-[#e3c87d] bg-[#c6a85b] shadow-[inset_0_0_12px_rgba(255,247,210,0.35),0_0_16px_rgba(198,168,91,0.5)]";
}

export default function HabitHeatmap({ completedDates }: HabitHeatmapProps) {
  const today = atStartOfDay(new Date());
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const monthStartWeekday = new Date(currentYear, currentMonth, 1).getDay();
  const monthLabel = `${MOONS[currentMonth]} ${currentYear}`;

  const completedSet = new Set(completedDates);
  const cells: Cell[] = [];

  for (let day = 1; day <= daysInMonth; day += 1) {
    const current = atStartOfDay(new Date(currentYear, currentMonth, day));
    const iso = formatDateToIso(current);
    const completed = completedSet.has(iso);

    cells.push({
      key: iso,
      isoDate: iso,
      isToday: iso === formatDateToIso(today),
      completed,
      day,
      weekday: current.getDay(),
    });
  }

  return (
    <div className="my-6 w-full rounded-2xl border border-[#c6a85b]/35 bg-zinc-950/75 p-6 shadow-[inset_0_2px_12px_rgba(0,0,0,0.6),0_18px_30px_rgba(0,0,0,0.35)]">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.24em] text-zinc-400">Rune Grid of Time</p>
        <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">{monthLabel}</p>
      </div>

      <div className="rounded-xl border border-zinc-800/80 bg-black/35 p-4 shadow-[inset_0_1px_8px_rgba(0,0,0,0.55)]">
        <div className="flex min-w-max gap-3 overflow-x-auto scroll-smooth pb-3 [scrollbar-width:thin] [scrollbar-color:#3f3f46_transparent]">
          <div className="grid grid-rows-7 gap-3 pt-8 pr-1 text-[10px] uppercase tracking-[0.15em] text-zinc-600">
            {WEEK_DAYS.map((day) => (
              <span key={day} className="h-6 leading-6">
                {day.slice(0, 1)}
              </span>
            ))}
          </div>

          <div>
            <div className="mb-3 text-[10px] uppercase tracking-[0.16em] text-zinc-600/70">
              {monthLabel}
            </div>

            <div className="grid w-max grid-flow-col grid-rows-7 gap-3">
              {cells.map((cell) => {
                const tooltip = `${cell.isoDate} - ${cell.completed ? "On this day, the oath was honored" : "On this day, the oath was broken"}`;

                return (
                  <div
                    key={cell.key}
                    className="group relative h-6 w-6 md:h-7 md:w-7"
                    style={cell.day === 1 ? { gridRowStart: monthStartWeekday + 1 } : undefined}
                  >
                    <div
                      title={tooltip}
                      className={`h-6 w-6 rounded-md border transition-all duration-300 hover:scale-[1.05] md:h-7 md:w-7 ${getCellToneClass(cell)} ${
                        cell.isToday
                          ? "ring-2 ring-[#6ec1e4] ring-offset-2 ring-offset-black shadow-[0_0_18px_rgba(110,193,228,0.55)]"
                          : ""
                      }`}
                    />

                    <div className="pointer-events-none absolute -top-11 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded border border-[#c6a85b]/45 bg-black/95 px-2 py-1 text-[10px] text-zinc-200 opacity-0 shadow-[0_0_22px_rgba(198,168,91,0.2)] transition-opacity duration-200 group-hover:opacity-100">
                      {tooltip}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-4 text-[10px] uppercase tracking-[0.18em] text-zinc-600/80">
          {WEEK_DAYS.map((day) => (
            <span key={day} className="mr-3 last:mr-0">
              {day}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
