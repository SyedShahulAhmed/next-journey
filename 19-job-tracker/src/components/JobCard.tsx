"use client";

import {
  Building2,
  ExternalLink,
  MapPin,
  Pencil,
  Trash2,
} from "lucide-react";
import { motion } from "framer-motion";

import StatusBadge from "@/components/StatusBadge";
import { Job } from "@/types/job";

interface JobCardProps {
  job: Job;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function JobCard({ job, onEdit, onDelete }: JobCardProps) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.25 }}>
      <div className="rounded-3xl border border-[#273244]/70 bg-[#111827]/70 p-6 backdrop-blur-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-lg font-semibold text-[#F8FAFC]">{job.title}</p>
            <div className="mt-2 flex items-center gap-2 text-sm text-[#94A3B8]">
              <Building2 className="h-4 w-4" />
              <span>{job.company}</span>
            </div>
          </div>
          <StatusBadge status={job.status} />
        </div>

        <div className="mt-4 space-y-2 text-sm text-[#CBD5E1]">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-[#64748B]" />
            <span>{job.location || "Remote"}</span>
          </div>
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#64748B]">
              Type
            </span>
            <p className="text-sm text-[#CBD5E1]">{job.type}</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#64748B]">
              Salary
            </span>
            <p className="text-sm text-[#CBD5E1]">{job.salary || "Not specified"}</p>
          </div>
          {job.notes ? (
            <p className="line-clamp-2 text-sm text-[#94A3B8]">{job.notes}</p>
          ) : null}
        </div>

        <div className="mt-5 flex items-center justify-between">
          {job.jobLink ? (
            <a
              href={job.jobLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[#60A5FA] transition hover:text-[#93C5FD]"
            >
              <ExternalLink className="h-4 w-4" />
              View job
            </a>
          ) : (
            <span className="text-xs text-[#64748B]">No external link</span>
          )}
          <div className="flex items-center gap-2">
            <button
              onClick={onEdit}
              className="rounded-xl border border-transparent p-2 text-[#EAB308] transition hover:border-[#EAB308]/40 hover:bg-[#1A1708]"
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button
              onClick={onDelete}
              className="rounded-xl border border-transparent p-2 text-[#EF4444] transition hover:border-[#EF4444]/40 hover:bg-[#1A0D0D]"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
