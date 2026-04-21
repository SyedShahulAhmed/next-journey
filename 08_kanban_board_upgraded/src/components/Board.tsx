import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import { useMemo } from "react";
import Column from "./Column";
import type { BoardColumn, Task } from "../types/kanban";

type BoardProps = {
  columns: BoardColumn[];
  tasks: Task[];
  editingId: string | null;
  editingText: string;
  droppedTaskId: string | null;
  setEditingId: (id: string | null) => void;
  setEditingText: (value: string) => void;
  editTask: (id: string) => void;
  deleteTask: (id: string) => void;
  moveTask: (taskId: string, direction: "left" | "right") => void;
  onDragEnd: (taskId: string, dropTargetId: string) => void;
  onTaskDropPulseEnd: () => void;
};

export default function Board({
  columns,
  tasks,
  editingId,
  editingText,
  droppedTaskId,
  setEditingId,
  setEditingText,
  editTask,
  deleteTask,
  moveTask,
  onDragEnd,
  onTaskDropPulseEnd,
}: BoardProps) {
  const tasksByColumn = useMemo(() => {
    const grouped = columns.reduce<Record<string, Task[]>>((acc, column) => {
      acc[column.id] = [];
      return acc;
    }, {});

    for (const task of tasks) {
      if (grouped[task.columnId]) {
        grouped[task.columnId].push(task);
      }
    }

    return grouped;
  }, [columns, tasks]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = String(active.id);
    const dropTargetId = String(over.id);
    onDragEnd(taskId, dropTargetId);
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="grid min-h-[68vh] grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            tasks={tasksByColumn[column.id] ?? []}
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
        ))}
      </div>
    </DndContext>
  );
}
