"use client";

import { BriefcaseBusiness, FolderKanban, GraduationCap, Plus, Trash2 } from "lucide-react";

type FormSectionProps<T> = {
  title: string;
  items: T[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  renderFields: (item: T, index: number) => React.ReactNode;
};

export default function FormSection<T extends { id: string }>({
  title,
  items,
  onAdd,
  onRemove,
  renderFields,
}: FormSectionProps<T>) {
  const iconByTitle: Record<string, React.ReactNode> = {
    Education: <GraduationCap size={18} />,
    Experience: <BriefcaseBusiness size={18} />,
    Projects: <FolderKanban size={18} />,
  };

  return (
    <div className="mb-10 section-entrance">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="inline-flex items-center gap-2 text-2xl font-semibold tracking-wide text-[#d4af37]">
          {iconByTitle[title]}
          {title}
        </h2>

        <button
          onClick={onAdd}
          className="magic-button ml-4 inline-flex items-center gap-2 rounded-lg border border-[#8a6c2f4d] px-4 py-2 text-sm transition transform hover:scale-105 active:scale-95"
        >
          <Plus size={16} />
          Add
        </button>
      </div>

      {items.map((item, index) => (
        <div
          key={item.id}
          className="mb-10 space-y-6 rounded-xl border border-[#8a6c2f33] bg-[#1a1a1a] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.7)]"
        >
          {renderFields(item, index)}

          <button
            onClick={() => onRemove(item.id)}
            className="danger-button mt-2 inline-flex items-center gap-2 px-3 py-1 text-sm transition transform hover:scale-105 active:scale-95"
          >
            <Trash2 size={15} />
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
