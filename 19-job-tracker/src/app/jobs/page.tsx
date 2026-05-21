"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import {
  Briefcase,
  CheckCircle2,
  Clock3,
  ExternalLink,
  Pencil,
  Plus,
  Sparkles,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

import DashboardShell from "@/components/DashboardShell";
import EmptyState from "@/components/EmptyState";
import FilterBar from "@/components/FilterBar";
import JobCard from "@/components/JobCard";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import StatsCard from "@/components/StatsCard";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Job } from "@/types/job";

export default function JobsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [currPage, setCurrPage] = useState(1);
  const jobsPerPage = 6;

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/jobs");
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        return;
      }
      setJobs(data.jobs);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (id: string) => {
    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }
      toast.success("Job deleted");

      setJobs((prev) => prev.filter((job) => job._id !== id));
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const filteredJobs = jobs
    .filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = statusFilter === "All" || job.status === statusFilter;

      const matchesType = typeFilter === "All" || job.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    })
    .sort((a, b) => {
      if (sortBy === "Newest") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }

      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const startIndex = (currPage - 1) * jobsPerPage;
  const paginationJobs = filteredJobs.slice(startIndex, startIndex + jobsPerPage);

  const summary = useMemo(() => {
    return {
      total: jobs.length,
      applied: jobs.filter((job) => job.status === "Applied").length,
      interviews: jobs.filter((job) => job.status === "Interview").length,
      offers: jobs.filter((job) => job.status === "Offer").length,
    };
  }, [jobs]);

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <DashboardShell
      title="Jobs"
      subtitle="Manage every application in one view"
      actions={
        <Link href="/jobs/create">
          <span className="inline-flex items-center gap-2 rounded-2xl bg-[#3B82F6] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#60A5FA]">
            <Plus className="h-4 w-4" />
            Add job
          </span>
        </Link>
      }
    >
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <StatsCard title="Total" value={summary.total} icon={Briefcase} tone="blue" />
          <StatsCard title="Applied" value={summary.applied} icon={Clock3} tone="slate" />
          <StatsCard title="Interviews" value={summary.interviews} icon={Sparkles} tone="yellow" />
          <StatsCard title="Offers" value={summary.offers} icon={CheckCircle2} tone="green" />
        </div>

        <FilterBar
          search={search}
          status={statusFilter}
          type={typeFilter}
          sort={sortBy}
          onSearchChange={(value) => {
            setSearch(value);
            setCurrPage(1);
          }}
          onStatusChange={(value) => {
            setStatusFilter(value);
            setCurrPage(1);
          }}
          onTypeChange={(value) => {
            setTypeFilter(value);
            setCurrPage(1);
          }}
          onSortChange={(value) => {
            setSortBy(value);
            setCurrPage(1);
          }}
        />

        {loading ? (
          <div className="grid gap-6">
            <LoadingSkeleton rows={6} />
            <LoadingSkeleton rows={4} />
          </div>
        ) : null}

        {!loading && filteredJobs.length === 0 ? (
          <EmptyState
            title="No jobs yet"
            description="Create your first application and start tracking progress."
            icon={Plus}
            action={
              <Link href="/jobs/create">
                <span className="inline-flex items-center gap-2 rounded-2xl bg-[#3B82F6] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#60A5FA]">
                  Add your first job
                </span>
              </Link>
            }
          />
        ) : null}

        {!loading && filteredJobs.length > 0 ? (
          <>
            <div className="grid gap-6 lg:hidden">
              {paginationJobs.map((job) => (
                <JobCard
                  key={job._id}
                  job={job}
                  onEdit={() => router.push(`/jobs/${job._id}/edit`)}
                  onDelete={() => deleteJob(job._id)}
                />
              ))}
            </div>

            <div className="hidden lg:block">
              <Card>
                <CardHeader>
                  <CardTitle>All applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-[2fr_1.2fr_1fr_1fr_auto] gap-4 border-b border-[#273244]/70 pb-3 text-xs uppercase tracking-[0.2em] text-[#64748B]">
                    <span>Role</span>
                    <span>Location</span>
                    <span>Type</span>
                    <span>Status</span>
                    <span className="text-right">Actions</span>
                  </div>
                  <div className="divide-y divide-[#273244]/70">
                    {paginationJobs.map((job) => (
                      <div
                        key={job._id}
                        className="grid grid-cols-[2fr_1.2fr_1fr_1fr_auto] items-center gap-4 py-4"
                      >
                        <div>
                          <p className="text-sm font-medium text-[#F8FAFC]">
                            {job.title}
                          </p>
                          <p className="text-xs text-[#94A3B8]">{job.company}</p>
                        </div>
                        <p className="text-sm text-[#CBD5E1]">{job.location || "Remote"}</p>
                        <p className="text-sm text-[#CBD5E1]">{job.type}</p>
                        <StatusBadge status={job.status} />
                        <div className="flex items-center justify-end gap-2">
                          {job.jobLink ? (
                            <a
                              href={job.jobLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-xl border border-[#273244]/70 p-2 text-[#60A5FA] transition hover:border-[#3B82F6]/60"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          ) : null}
                          <button
                            onClick={() => router.push(`/jobs/${job._id}/edit`)}
                            className="rounded-xl border border-transparent p-2 text-[#EAB308] transition hover:border-[#EAB308]/40 hover:bg-[#1A1708]"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteJob(job._id)}
                            className="rounded-xl border border-transparent p-2 text-[#EF4444] transition hover:border-[#EF4444]/40 hover:bg-[#1A0D0D]"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {totalPages > 1 ? (
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-[#273244]/70 bg-[#111827]/70 px-4 py-3">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currPage === 1}
                  onClick={() => setCurrPage(currPage - 1)}
                >
                  Previous
                </Button>
                <div className="flex flex-wrap items-center gap-2">
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                      key={`page-${index}`}
                      onClick={() => setCurrPage(index + 1)}
                      className={`h-9 w-9 rounded-xl text-sm font-medium transition ${
                        currPage === index + 1
                          ? "bg-[#3B82F6] text-white"
                          : "border border-[#273244]/70 bg-[#111827]/70 text-[#CBD5E1] hover:border-[#3B82F6]/60"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currPage === totalPages}
                  onClick={() => setCurrPage(currPage + 1)}
                >
                  Next
                </Button>
              </div>
            ) : null}
          </>
        ) : null}
      </div>
    </DashboardShell>
  );
}
