import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";
import type { BoardColumn, Task } from "../types/kanban";

type ColumnProps = {
  column: BoardColumn;
  tasks: Task[];
  editingId: string | null;
  editingText: string;
  droppedTaskId: string | null;
  setEditingId: (id: string | null) => void;
  setEditingText: (value: string) => void;
  editTask: (id: string) => void;
  deleteTask: (id: string) => void;
  moveTask: (taskId: string, direction: "left" | "right") => void;
  onTaskDropPulseEnd: () => void;
};

export default function Column({
  column,
  tasks,
  editingId,
  editingText,
  droppedTaskId,
  setEditingId,
  setEditingText,
  editTask,
  deleteTask,
  moveTask,
  onTaskDropPulseEnd,
}: ColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  return (
    <section
      ref={setNodeRef}
      className={`column-shell rounded-2xl border p-4 sm:p-5 overflow-visible transition duration-300 ${
        isOver ? "column-shell-active" : ""
      }`}
    >
      <header className="mb-4 border-b border-amber-50/10 pb-3">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-200/70">
          {column.icon} {column.subtitle}
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-stone-100">
          {column.title}
        </h2>
      </header>

      <div className="scrollbar-hide scroll-container flex max-h-[58vh] min-h-65 flex-col gap-3 overflow-y-auto pr-1">
        {tasks.length === 0 ? (
          <div className="rounded-xl border border-dashed border-amber-100/20 bg-black/15 px-3 py-8 text-center text-sm text-stone-400">
            No missions in this zone.
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              editingId={editingId}
              editingText={editingText}
              droppedTaskId={droppedTaskId}
              setEditingId={setEditingId}
              setEditingText={setEditingText}
              editTask={editTask}
              deleteTask={deleteTask}
              moveTask={moveTask}
              onTaskDropPulseEnd={onTaskDropPulseEnd}
            />
          ))
        )}
      </div>
    </section>
  );
}
