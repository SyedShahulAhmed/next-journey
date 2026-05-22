"use client";

import { SlidersHorizontal } from "lucide-react";

import SearchBar from "@/components/SearchBar";
import { Select } from "@/components/ui/select";

interface FilterBarProps {
  search: string;
  status: string;
  type: string;
  sort: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

export default function FilterBar({
  search,
  status,
  type,
  sort,
  onSearchChange,
  onStatusChange,
  onTypeChange,
  onSortChange,
}: FilterBarProps) {
  return (
    <div className="grid gap-4 rounded-3xl border border-[#273244]/70 bg-[#111827]/70 p-5 backdrop-blur-xl md:grid-cols-[1.4fr_1fr_1fr_1fr]">
      <SearchBar
        value={search}
        onChange={onSearchChange}
        placeholder="Search by role or company"
      />
      <div className="relative">
        <SlidersHorizontal className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748B]" />
        <Select value={status} onChange={(event) => onStatusChange(event.target.value)}>
          <option value="All">All Status</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
          <option value="Ghosted">Ghosted</option>
          <option value="Saved">Saved</option>
        </Select>
      </div>
      <Select value={type} onChange={(event) => onTypeChange(event.target.value)}>
        <option value="All">All Types</option>
        <option value="Full-time">Full-time</option>
        <option value="Part-time">Part-time</option>
        <option value="Internship">Internship</option>
        <option value="Contract">Contract</option>
        <option value="Remote">Remote</option>
      </Select>
      <Select value={sort} onChange={(event) => onSortChange(event.target.value)}>
        <option value="Newest">Newest</option>
        <option value="Oldest">Oldest</option>
      </Select>
    </div>
  );
}
