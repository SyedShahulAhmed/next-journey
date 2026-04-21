"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import type { BoardColumn, Task } from "../types/kanban";

const Board = dynamic(() => import("../components/Board"), {
  ssr: false,
});

const columns: BoardColumn[] = [
  { id: "todo", title: "Camp", subtitle: "Prep & Supplies", icon: "🗺️" },
  {
    id: "in-progress",
    title: "Exploration",
    subtitle: "Active Mission",
    icon: "⚔️",
  },
  {
    id: "done",
    title: "Completed",
    subtitle: "Recovered Relics",
    icon: "🏆",
  },
  { id: "drop", title: "Abyss", subtitle: "Abandoned", icon: "🕳️" },
];

const defaultTasks: Task[] = [
  { id: "1", content: "Build UI layout", columnId: "todo" },
  { id: "2", content: "Setup project structure", columnId: "todo" },
  { id: "3", content: "Implement drag & drop", columnId: "in-progress" },
  { id: "4", content: "Deploy app", columnId: "done" },
  { id: "5", content: "Play games", columnId: "drop" },
];

const columnOrder = ["todo", "in-progress", "done", "drop"];

const reorderWithinColumn = (
  taskList: Task[],
  columnId: string,
  activeTaskId: string,
  targetTaskId: string,
) => {
  const columnTasks = taskList.filter((task) => task.columnId === columnId);
  const fromIndex = columnTasks.findIndex((task) => task.id === activeTaskId);
  const toIndex = columnTasks.findIndex((task) => task.id === targetTaskId);

  if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) {
    return taskList;
  }

  const reordered = [...columnTasks];
  const [movedTask] = reordered.splice(fromIndex, 1);
  reordered.splice(toIndex, 0, movedTask);

  let cursor = 0;
  return taskList.map((task) =>
    task.columnId === columnId ? reordered[cursor++] : task,
  );
};

const moveTaskBeforeTarget = (
  taskList: Task[],
  activeTaskId: string,
  targetTaskId: string,
  targetColumnId: string,
) => {
  const activeTask = taskList.find((task) => task.id === activeTaskId);
  const targetIndex = taskList.findIndex((task) => task.id === targetTaskId);

  if (!activeTask || targetIndex === -1) {
    return taskList;
  }

  const withoutActive = taskList.filter((task) => task.id !== activeTaskId);
  const updatedTask = { ...activeTask, columnId: targetColumnId };
  const insertIndex = withoutActive.findIndex((task) => task.id === targetTaskId);

  if (insertIndex === -1) {
    return [...withoutActive, updatedTask];
  }

  return [
    ...withoutActive.slice(0, insertIndex),
    updatedTask,
    ...withoutActive.slice(insertIndex),
  ];
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);

  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const [droppedTaskId, setDroppedTaskId] = useState<string | null>(null);

  const addTask = () => {
    if (!newTask.trim()) return;
    const newItem = {
      id: crypto.randomUUID(),
      content: newTask,
      columnId: "todo",
    };
    setTasks((p) => [...p, newItem]);
    setNewTask("");
  };

  const deleteTask = (id: string) => {
    setTasks((p) => p.filter((t) => t.id !== id));
  };

  const editTask = (id: string) => {
    setTasks((p) =>
      p.map((t) => (t.id === id ? { ...t, content: editingText } : t)),
    );
    setEditingId(null);
    setEditingText("");
  };

  const moveTask = (taskId: string, direction: "left" | "right") => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) return task;

        const currentIndex = columnOrder.indexOf(task.columnId);

        const newIndex =
          direction === "left" ? currentIndex - 1 : currentIndex + 1;

        if (newIndex < 0 || newIndex >= columnOrder.length) return task;

        return { ...task, columnId: columnOrder[newIndex] };
      }),
    );
  };

  const handleDragEnd = (taskId: string, dropTargetId: string) => {
    setDroppedTaskId(taskId);
    setTimeout(() => setDroppedTaskId(null), 280);

    setTasks((prev) => {
      const activeTask = prev.find((task) => task.id === taskId);
      if (!activeTask) {
        return prev;
      }

      const overTask = prev.find((task) => task.id === dropTargetId);

      if (overTask) {
        if (activeTask.columnId === overTask.columnId) {
          return reorderWithinColumn(
            prev,
            activeTask.columnId,
            activeTask.id,
            overTask.id,
          );
        }

        return moveTaskBeforeTarget(
          prev,
          activeTask.id,
          overTask.id,
          overTask.columnId,
        );
      }

      if (activeTask.columnId === dropTargetId) {
        return prev;
      }

      return prev.map((task) =>
        task.id === taskId ? { ...task, columnId: dropTargetId } : task,
      );
    });
  };

  const onTaskDropPulseEnd = () => {
    setDroppedTaskId(null);
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem("kanban-tasks");
      if (saved) {
        queueMicrotask(() => {
          setTasks(JSON.parse(saved) as Task[]);
        });
      }
    } catch {
      queueMicrotask(() => {
        setTasks(defaultTasks);
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("kanban-tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-6 text-stone-100 sm:px-7 lg:px-10">
      <div className="pointer-events-none absolute inset-0 cave-grain" />
      <div className="pointer-events-none absolute inset-0 cave-fog" />
      <div className="pointer-events-none absolute inset-0 cave-light-flicker" />
      <div className="pointer-events-none absolute inset-0 dust-layer dust-layer-one" />
      <div className="pointer-events-none absolute inset-0 dust-layer dust-layer-two" />
      <div className="pointer-events-none absolute inset-0 cave-vignette" />

      <section className="relative z-10 mx-auto flex w-full max-w-400 flex-col gap-6">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-136 max-w-336 board-halo" />
        <header className="stone-panel rounded-2xl border px-5 py-5 sm:px-7">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <p className="tracking-[0.35em] text-xs uppercase text-amber-300/75">
                Expedition Control
              </p>
              <h1 className="mission-title text-4xl font-semibold uppercase tracking-wide sm:text-5xl lg:text-6xl">
                Expedition Log
              </h1>
              <p className="text-sm tracking-[0.14em] text-amber-100/65 sm:text-base">
                Field Operations - Active Missions
              </p>
              <p className="pt-1 max-w-2xl text-sm text-stone-300/85 sm:text-base">
                Coordinate objectives like a field archaeologist. Drag missions
                across expedition zones and keep the relic run alive.
              </p>
            </div>

            <div className="artifact-badge self-start rounded-full border border-amber-300/45 px-4 py-2 text-xs uppercase tracking-[0.2em] text-amber-200 lg:self-auto">
              Active Relics: {tasks.length}
            </div>
          </div>
        </header>

        <div className="stone-panel rounded-2xl border p-3 sm:p-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Log a new mission..."
              className="mission-input w-full rounded-xl border border-amber-100/20 px-4 py-3 text-stone-100 outline-none"
            />

            <button
              onClick={addTask}
              className="relic-button rounded-xl border border-amber-300/45 px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-amber-100 transition"
            >
              Add Mission
            </button>
          </div>
        </div>

        <Board
          columns={columns}
          tasks={tasks}
          editingId={editingId}
          editingText={editingText}
          droppedTaskId={droppedTaskId}
          setEditingId={setEditingId}
          setEditingText={setEditingText}
          editTask={editTask}
          deleteTask={deleteTask}
          moveTask={moveTask}
          onDragEnd={handleDragEnd}
          onTaskDropPulseEnd={onTaskDropPulseEnd}
        />
      </section>
    </main>
  );
}
