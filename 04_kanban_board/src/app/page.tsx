"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type Task = {
  id: string;
  text: string;
};

type ColumnType = "todo" | "inprogress" | "completed";

type Board = {
  todo: Task[];
  inprogress: Task[];
  completed: Task[];
};

export default function Home() {
  const [biome, setBiome] = useState<
    "overworld" | "forest" | "night" | "nether"
  >("overworld");
  const [isMuted, setIsMuted] = useState(false);
  const [dropFlashId, setDropFlashId] = useState<string | null>(null);
  const soundsRef = useRef<Record<string, HTMLAudioElement> | null>(null);
  const lastPlayRef = useRef<Record<string, number>>({});
  const [history, setHistory] = useState<{
    past: Board[];
    present: Board;
    future: Board[];
  }>({
    past: [],
    present: {
      todo: [],
      inprogress: [],
      completed: [],
    },
    future: [],
  });

  const [task, setTask] = useState("");

  const [draggedTask, setDraggedTask] = useState<{
    id: string;
    from: ColumnType;
    index: number;
  } | null>(null);

  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const dropFlashTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const MAX_HISTORY = 50;

  const isSameBoard = (a: Board, b: Board) =>
    JSON.stringify(a) === JSON.stringify(b);

  const playSound = (name: string) => {
    if (isMuted) return;
    const sounds = soundsRef.current;
    if (!sounds) return;

    const now = Date.now();
    const last = lastPlayRef.current[name] ?? 0;
    if (now - last < 90) return;

    lastPlayRef.current[name] = now;

    const audio = sounds[name];
    if (!audio) return;

    try {
      audio.currentTime = 0;
      void audio.play();
    } catch {
      // Ignore play errors for autoplay-restricted browsers.
    }
  };

  const updateBoard = (newBoard: Board) => {
    setHistory((prev) => {
      if (isSameBoard(prev.present, newBoard)) return prev;

      return {
        past: [...prev.past.slice(-MAX_HISTORY), prev.present],
        present: newBoard,
        future: [],
      };
    });
  };

  const addTask = (column: ColumnType, text: string) => {
    if (!text.trim()) return;

    const newTask = {
      id: crypto.randomUUID(),
      text,
    };

    updateBoard({
      ...history.present,
      [column]: [...history.present[column], newTask],
    });
    playSound("place");
  };

  const deleteTask = (column: ColumnType, id: string) => {
    updateBoard({
      ...history.present,
      [column]: history.present[column].filter((t) => t.id !== id),
    });
    playSound("break");
  };

  const moveTask = (from: ColumnType, to: ColumnType, id: string) => {
    if (from === to) return;

    let taskToMove: Task | null = null;

    const newFrom = history.present[from].filter((t) => {
      if (t.id === id) {
        taskToMove = t;
        return false;
      }
      return true;
    });

    if (!taskToMove) return;

    updateBoard({
      ...history.present,
      [from]: newFrom,
      [to]: [...history.present[to], taskToMove],
    });
    playSound("swap");
  };

  const reorderTask = (
    column: ColumnType,
    fromIndex: number,
    toIndex: number,
  ) => {
    if (fromIndex === toIndex || fromIndex === toIndex - 1) return;

    const tasks = [...history.present[column]];
    const [moved] = tasks.splice(fromIndex, 1);
    const adjustedIndex = fromIndex < toIndex ? toIndex - 1 : toIndex;
    tasks.splice(adjustedIndex, 0, moved);

    updateBoard({
      ...history.present,
      [column]: tasks,
    });
    playSound("swap");
  };

  const undo = () => {
    setHistory((prev) => {
      if (!prev.past.length) return prev;

      const previous = prev.past[prev.past.length - 1];

      return {
        past: prev.past.slice(0, -1),
        present: previous,
        future: [prev.present, ...prev.future],
      };
    });
  };

  const redo = () => {
    setHistory((prev) => {
      if (!prev.future.length) return prev;

      const next = prev.future[0];

      return {
        past: [...prev.past, prev.present],
        present: next,
        future: prev.future.slice(1),
      };
    });
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem("kanban-board");
      if (saved) {
        setHistory((prev) => ({
          ...prev,
          present: JSON.parse(saved),
        }));
      }
    } catch {
      localStorage.removeItem("kanban-board");
    }
  }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      localStorage.setItem("kanban-board", JSON.stringify(history.present));
    }, 200);

    return () => clearTimeout(id);
  }, [history.present]);

  useEffect(() => {
    const init = () => {
      if (soundsRef.current) return;
      const sounds: Record<string, HTMLAudioElement> = {
        click: new Audio("/sounds/click.mp3"),
        place: new Audio("/sounds/place.mp3"),
        break: new Audio("/sounds/break.mp3"),
        swap: new Audio("/sounds/tick.mp3"),
        pickup: new Audio("/sounds/pickup.mp3"),
        drop: new Audio("/sounds/drop.mp3"),
      };

      Object.values(sounds).forEach((audio) => {
        audio.preload = "auto";
        audio.volume = 0.25;
      });

      soundsRef.current = sounds;
    };

    init();

    return () => {
      if (dropFlashTimeout.current) {
        clearTimeout(dropFlashTimeout.current);
      }
    };
  }, []);

  return (
    <div
      data-biome={biome}
      data-dragging={draggedTask ? "true" : "false"}
      className="minecraft-root relative min-h-screen text-stone-100 p-6"
    >
      <div className="minecraft-texture" aria-hidden="true" />
      <div className="minecraft-particles" aria-hidden="true" />

      <header className="relative z-10 mx-auto max-w-6xl">
        <div className="minecraft-header panel-frame mb-6 px-6 py-4">
          <p className="text-xs tracking-[0.3em] text-amber-200">
            SURVIVAL TASK LOG
          </p>
          <h1 className="text-3xl md:text-4xl uppercase tracking-[0.18em]">
            Kanban Board
          </h1>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex gap-3">
            <button
              onClick={() => {
                undo();
                playSound("click");
              }}
              disabled={!history.past.length}
              className="minecraft-button px-4 py-2 disabled:opacity-50"
            >
              Undo
            </button>
            <button
              onClick={() => {
                redo();
                playSound("click");
              }}
              disabled={!history.future.length}
              className="minecraft-button px-4 py-2 disabled:opacity-50"
            >
              Redo
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {(["overworld", "forest", "night", "nether"] as const).map(
              (mode) => (
                <button
                  key={mode}
                  onClick={() => {
                    setBiome(mode);
                    playSound("click");
                  }}
                  className={`minecraft-button px-3 py-2 text-xs uppercase tracking-[0.2em] ${
                    biome === mode ? "minecraft-button-active" : ""
                  }`}
                >
                  {mode}
                </button>
              ),
            )}
            <button
              onClick={() => {
                setIsMuted((prev) => !prev);
              }}
              className={`minecraft-button px-3 py-2 text-xs uppercase tracking-[0.2em] ${
                isMuted ? "minecraft-button-active" : ""
              }`}
              aria-pressed={isMuted}
            >
              {isMuted ? "Sound Off" : "Sound On"}
            </button>
          </div>
        </div>

        <div className="mb-8">
          <div className="minecraft-input panel-frame flex flex-col gap-3 p-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <input
                value={task}
                onChange={(e) => setTask(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addTask("todo", task);
                    setTask("");
                    playSound("click");
                  }
                }}
                className="minecraft-input-field w-full px-4 py-3"
                placeholder="Type a new task..."
              />
              <span className="minecraft-cursor" aria-hidden="true" />
            </div>

            <button
              onClick={() => {
                addTask("todo", task);
                setTask("");
                playSound("click");
              }}
              className="minecraft-button px-6 py-3"
            >
              Add Task
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 lg:flex-row">
          {(["todo", "inprogress", "completed"] as ColumnType[]).map((col) => (
            <div
              key={col}
              className="minecraft-column panel-frame flex-1 p-4"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (!draggedTask) return;

                if (draggedTask.from === col) {
                  if (hoverIndex === null) {
                    reorderTask(
                      col,
                      draggedTask.index,
                      history.present[col].length,
                    );
                  } else {
                    reorderTask(col, draggedTask.index, hoverIndex);
                  }
                } else {
                  moveTask(draggedTask.from, col, draggedTask.id);
                }

                setDropFlashId(draggedTask.id);
                if (dropFlashTimeout.current) {
                  clearTimeout(dropFlashTimeout.current);
                }
                dropFlashTimeout.current = setTimeout(() => {
                  setDropFlashId(null);
                }, 180);

                playSound("drop");

                setDraggedTask(null);
                setHoverIndex(null);
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg uppercase tracking-[0.2em]">{col}</h2>
                <span className="minecraft-slot-count">
                  {history.present[col].length}
                </span>
              </div>

              <div className="grid gap-3">
                {history.present[col].map((t, index) => (
                  <div className="minecraft-task-slot" key={t.id}>
                    {hoverIndex === index && draggedTask ? (
                      <div
                        className="minecraft-insert-line"
                        aria-hidden="true"
                      />
                    ) : null}
                    <motion.div
                      layout
                      transition={{
                        type: "spring",
                        stiffness: 360,
                        damping: 32,
                        mass: 0.6,
                      }}
                      draggable
                      onDragStart={() => {
                        setDraggedTask({
                          id: t.id,
                          from: col,
                          index,
                        });
                        playSound("pickup");
                      }}
                      onDragOver={(e) => {
                        e.preventDefault();
                        if (hoverIndex !== index) {
                          setHoverIndex(index);
                        }
                      }}
                      onDragEnd={() => {
                        setDraggedTask(null);
                        setHoverIndex(null);
                      }}
                      className={`minecraft-task flex items-start justify-between gap-3 px-4 py-3 ${
                        draggedTask?.id === t.id
                          ? "minecraft-task-dragging"
                          : ""
                      } ${
                        hoverIndex === index && draggedTask?.id !== t.id
                          ? "minecraft-task-target"
                          : ""
                      } ${dropFlashId === t.id ? "minecraft-task-drop" : ""}`}
                    >
                      <span className="minecraft-task-text">{t.text}</span>
                      <button
                        onClick={() => deleteTask(col, t.id)}
                        className="minecraft-delete"
                        aria-label="Delete task"
                      >
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          className="minecraft-delete-icon"
                          shapeRendering="crispEdges"
                        >
                          <rect x="7" y="9" width="10" height="11" />
                          <rect x="6" y="7" width="12" height="2" />
                          <rect x="9" y="4" width="6" height="2" />
                          <rect x="9" y="11" width="2" height="7" />
                          <rect x="13" y="11" width="2" height="7" />
                        </svg>
                      </button>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
