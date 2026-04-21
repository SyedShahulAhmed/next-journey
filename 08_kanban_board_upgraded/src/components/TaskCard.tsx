import { useDraggable, useDroppable } from "@dnd-kit/core";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { createPortal } from "react-dom";
import type { Task } from "../types/kanban";

type TaskCardProps = {
  task: Task;
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

function TaskCard({
  task,
  editingId,
  editingText,
  droppedTaskId,
  setEditingId,
  setEditingText,
  editTask,
  deleteTask,
  moveTask,
  onTaskDropPulseEnd,
}: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    });
  const { setNodeRef: setDropNodeRef, isOver } = useDroppable({
    id: task.id,
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [openUp, setOpenUp] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const style: CSSProperties = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0) ${
          isDragging ? "rotate(2deg) scale(1.05)" : ""
        }`
      : undefined,
    transition: isDragging
      ? "none"
      : "transform 220ms cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 220ms ease, border-color 220ms ease",
    zIndex: isDragging ? 50 : "auto",
  };

  const isEditing = editingId === task.id;
  const isJustDropped = droppedTaskId === task.id;

  const preventDragStart = (event: ReactPointerEvent) => {
    event.stopPropagation();
  };

  const updateMenuPosition = () => {
    if (!triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const menuWidth = 220;
    const menuHeight = 184;
    const viewportPadding = 8;

    let left = rect.right - menuWidth;
    left = Math.min(
      Math.max(viewportPadding, left),
      window.innerWidth - menuWidth - viewportPadding,
    );

    const shouldOpenUp =
      rect.bottom + menuHeight + viewportPadding > window.innerHeight &&
      rect.top - menuHeight - viewportPadding > 0;

    const top = shouldOpenUp
      ? rect.top - menuHeight - 8
      : rect.bottom + 8;

    setOpenUp(shouldOpenUp);
    setMenuPosition({
      top: Math.max(viewportPadding, top),
      left,
    });
  };

  useEffect(() => {
    if (!menuOpen) return;

    updateMenuPosition();

    const onPointerDownOutside = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        !menuRef.current?.contains(target) &&
        !triggerRef.current?.contains(target)
      ) {
        setMenuOpen(false);
      }
    };

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    const onViewportChange = () => {
      updateMenuPosition();
    };

    document.addEventListener("pointerdown", onPointerDownOutside, true);
    document.addEventListener("keydown", onEscape);
    window.addEventListener("resize", onViewportChange);
    window.addEventListener("scroll", onViewportChange, true);

    return () => {
      document.removeEventListener("pointerdown", onPointerDownOutside, true);
      document.removeEventListener("keydown", onEscape);
      window.removeEventListener("resize", onViewportChange);
      window.removeEventListener("scroll", onViewportChange, true);
    };
  }, [menuOpen]);

  const runMenuAction = (action: () => void) => {
    action();
    setMenuOpen(false);
  };

  const setTaskNodeRef = (node: HTMLDivElement | null) => {
    setNodeRef(node);
    setDropNodeRef(node);
  };

  return (
    <div
      ref={setTaskNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      onAnimationEnd={isJustDropped ? onTaskDropPulseEnd : undefined}
      className={`task-card group relative flex items-center justify-between gap-3 rounded-xl border p-3 shadow-lg transition duration-200 cursor-grab active:cursor-grabbing ${
        isDragging ? "task-card-dragging" : ""
      } ${isJustDropped ? "task-card-drop-pulse" : ""} ${
        isOver && !isDragging ? "task-card-over-target" : ""
      }`}
    >
      <div className="pointer-events-none absolute inset-0 rounded-xl border border-amber-200/0 transition group-hover:border-amber-200/40" />

      {isEditing ? (
        <>
          <input
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
            onPointerDown={preventDragStart}
            className="mission-input relative z-10 flex-1 rounded-md border border-amber-100/20 px-3 py-2 text-base outline-none"
          />

          <button
            onClick={() => editTask(task.id)}
            onPointerDown={preventDragStart}
            className="action-button action-success relative z-10"
            aria-label="Save edited task"
          >
            <Check size={15} />
          </button>
        </>
      ) : (
        <>
          <p className="relative z-10 flex-1 pr-1 text-base font-medium leading-relaxed text-stone-100">
            {task.content}
          </p>

          <div ref={menuRef} className="relative z-20 ml-2 shrink-0 self-center">
            <button
              ref={triggerRef}
              type="button"
              onClick={() => {
                if (!menuOpen) {
                  updateMenuPosition();
                }
                setMenuOpen((prev) => !prev);
              }}
              onPointerDown={preventDragStart}
              className="menu-trigger"
              aria-label="Open task actions"
              aria-expanded={menuOpen}
              aria-haspopup="menu"
            >
              <MoreVertical size={16} />
            </button>
          </div>

          {typeof document !== "undefined" &&
            menuOpen &&
            createPortal(
              <div
                ref={menuRef}
                className={`task-menu task-menu-floating ${openUp ? "task-menu-open-up" : ""}`}
                style={{
                  top: menuPosition.top,
                  left: menuPosition.left,
                }}
                role="menu"
                aria-label="Task actions menu"
              >
                <button
                  type="button"
                  role="menuitem"
                  onClick={() =>
                    runMenuAction(() => {
                      setEditingId(task.id);
                      setEditingText(task.content);
                    })
                  }
                  className="task-menu-item"
                >
                  <Pencil size={15} className="task-menu-icon" />
                  <span>Edit</span>
                </button>

                <button
                  type="button"
                  role="menuitem"
                  onClick={() => runMenuAction(() => moveTask(task.id, "left"))}
                  className="task-menu-item"
                >
                  <ArrowLeft size={15} className="task-menu-icon" />
                  <span>Move Left</span>
                </button>

                <button
                  type="button"
                  role="menuitem"
                  onClick={() => runMenuAction(() => moveTask(task.id, "right"))}
                  className="task-menu-item"
                >
                  <ArrowRight size={15} className="task-menu-icon" />
                  <span>Move Right</span>
                </button>

                <button
                  type="button"
                  role="menuitem"
                  onClick={() => runMenuAction(() => deleteTask(task.id))}
                  className="task-menu-item task-menu-item-danger"
                >
                  <Trash2 size={15} className="task-menu-icon" />
                  <span>Delete</span>
                </button>
              </div>,
              document.body,
            )}
        </>
      )}
    </div>
  );
}

export default TaskCard;