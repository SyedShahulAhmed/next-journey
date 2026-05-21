"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import {
  ArrowUpRight,
  BarChart3,
  Briefcase,
  CheckCircle2,
  Clock3,
  Plus,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import ActivityCard from "@/components/ActivityCard";
import DashboardShell from "@/components/DashboardShell";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import StatsCard from "@/components/StatsCard";
import StatusBadge from "@/components/StatusBadge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Job } from "@/types/job";

interface Stats {
  totalJobs: number;
  appliedJobs: number;
  interviewJobs: number;
  offerJobs: number;
  rejectedJobs: number;
  ghostedJobs: number;
  savedJobs: number;
}

interface MonthlyData {
  month: string;
  applications: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [recentJobs, setRecentJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchDashboard() {
    try {
      setLoading(true);
      const [statsRes, monthlyRes, jobsRes] = await Promise.all([
        fetch("/api/analytics/stats"),
        fetch("/api/analytics/monthly"),
        fetch("/api/jobs"),
      ]);

      const statsData = await statsRes.json();
      const monthlyData = await monthlyRes.json();
      const jobsData = await jobsRes.json();

      if (!statsRes.ok) {
        toast.error(statsData.message || "Failed to fetch stats");
      } else {
        setStats(statsData.stats);
      }

      if (!monthlyRes.ok) {
        toast.error(monthlyData.message || "Failed to fetch monthly data");
      } else {
        setMonthlyData(monthlyData.data || []);
      }

      if (!jobsRes.ok) {
        toast.error(jobsData.message || "Failed to fetch jobs");
      } else {
        setRecentJobs((jobsData.jobs || []).slice(0, 6));
      }
    } catch (error) {
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDashboard();
  }, []);

  const progressItems = useMemo(() => {
    const total = stats?.totalJobs || 0;
    return [
      { label: "Applied", value: stats?.appliedJobs || 0, color: "#3B82F6" },
      { label: "Interview", value: stats?.interviewJobs || 0, color: "#EAB308" },
      { label: "Offer", value: stats?.offerJobs || 0, color: "#22C55E" },
      { label: "Rejected", value: stats?.rejectedJobs || 0, color: "#EF4444" },
    ].map((item) => ({
      ...item,
      percentage: total > 0 ? Math.round((item.value / total) * 100) : 0,
    }));
  }, [stats]);

  const formatDate = (value?: Date | string) => {
    if (!value) return "Recently";
    const date = new Date(value);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <DashboardShell
      title="Dashboard"
      subtitle="Track your job search momentum"
      actions={
        <Link href="/jobs/create">
          <span className="inline-flex items-center gap-2 rounded-2xl bg-[#3B82F6] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#60A5FA]">
            <Plus className="h-4 w-4" />
            New job
          </span>
        </Link>
      }
    >
      {loading ? (
        <div className="grid gap-6">
          <LoadingSkeleton rows={6} />
          <LoadingSkeleton rows={5} />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <StatsCard
              title="Total applications"
              value={stats?.totalJobs || 0}
              icon={Briefcase}
              tone="blue"
              caption="All tracked roles"
            />
            <StatsCard
              title="Applied"
              value={stats?.appliedJobs || 0}
              icon={Clock3}
              tone="slate"
              caption="Pending response"
            />
            <StatsCard
              title="Interviews"
              value={stats?.interviewJobs || 0}
              icon={Sparkles}
              tone="yellow"
              caption="Active conversations"
            />
            <StatsCard
              title="Offers"
              value={stats?.offerJobs || 0}
              icon={CheckCircle2}
              tone="green"
              caption="Decision ready"
            />
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
            <Card>
              <CardHeader>
                <CardTitle>Monthly applications</CardTitle>
                <CardDescription>Applied roles tracked over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyData}>
                    <defs>
                      <linearGradient id="applicationsFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" stroke="#64748B" />
                    <YAxis stroke="#64748B" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#111827",
                        border: "1px solid #273244",
                        borderRadius: "12px",
                        color: "#F8FAFC",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="applications"
                      stroke="#3B82F6"
                      fill="url(#applicationsFill)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick actions</CardTitle>
                <CardDescription>Move fast with your next step</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link
                  href="/jobs/create"
                  className="flex items-center justify-between rounded-2xl border border-[#273244]/70 bg-[#111827]/60 px-4 py-3 text-sm text-[#CBD5E1] transition hover:border-[#3B82F6]/60"
                >
                  Add a new application
                  <ArrowUpRight className="h-4 w-4 text-[#60A5FA]" />
                </Link>
                <Link
                  href="/jobs"
                  className="flex items-center justify-between rounded-2xl border border-[#273244]/70 bg-[#111827]/60 px-4 py-3 text-sm text-[#CBD5E1] transition hover:border-[#3B82F6]/60"
                >
                  Review active pipeline
                  <ArrowUpRight className="h-4 w-4 text-[#60A5FA]" />
                </Link>
                <Link
                  href="/analytics"
                  className="flex items-center justify-between rounded-2xl border border-[#273244]/70 bg-[#111827]/60 px-4 py-3 text-sm text-[#CBD5E1] transition hover:border-[#3B82F6]/60"
                >
                  Open analytics
                  <BarChart3 className="h-4 w-4 text-[#60A5FA]" />
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <Card>
              <CardHeader>
                <CardTitle>Recent applications</CardTitle>
                <CardDescription>Most recent roles in your pipeline</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentJobs.length === 0 ? (
                  <p className="text-sm text-[#94A3B8]">No applications yet.</p>
                ) : (
                  recentJobs.map((job) => (
                    <div
                      key={job._id}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#273244]/70 bg-[#111827]/60 px-4 py-3"
                    >
                      <div>
                        <p className="text-sm font-medium text-[#F8FAFC]">
                          {job.title}
                        </p>
                        <p className="text-xs text-[#94A3B8]">{job.company}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="text-xs uppercase tracking-[0.2em] text-[#64748B]">
                          {formatDate(job.createdAt)}
                        </p>
                        <StatusBadge status={job.status} />
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Activity timeline</CardTitle>
                <CardDescription>Latest status movements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentJobs.length === 0 ? (
                  <p className="text-sm text-[#94A3B8]">No activity yet.</p>
                ) : (
                  recentJobs.slice(0, 4).map((job) => (
                    <ActivityCard
                      key={`activity-${job._id}`}
                      title={`${job.company} · ${job.title}`}
                      description={`Status updated to ${job.status}`}
                      time={formatDate(job.updatedAt || job.createdAt)}
                      status={job.status}
                    />
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Application progress</CardTitle>
                <CardDescription>Where your pipeline stands</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {progressItems.map((item) => (
                  <div key={item.label} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#CBD5E1]">{item.label}</span>
                      <span className="text-[#94A3B8]">{item.percentage}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-[#1C2430]">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${item.percentage}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>At-risk applications</CardTitle>
                <CardDescription>Follow up before the trail gets cold</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between rounded-2xl border border-[#273244]/70 bg-[#111827]/60 px-4 py-3">
                  <div>
                    <p className="text-sm text-[#F8FAFC]">Awaiting recruiter reply</p>
                    <p className="text-xs text-[#94A3B8]">Send a gentle follow-up</p>
                  </div>
                  <StatusBadge status="Ghosted" />
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-[#273244]/70 bg-[#111827]/60 px-4 py-3">
                  <div>
                    <p className="text-sm text-[#F8FAFC]">Offer stage review</p>
                    <p className="text-xs text-[#94A3B8]">Time to prepare counter</p>
                  </div>
                  <StatusBadge status="Offer" />
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-[#273244]/70 bg-[#111827]/60 px-4 py-3">
                  <div>
                    <p className="text-sm text-[#F8FAFC]">Interview pipeline</p>
                    <p className="text-xs text-[#94A3B8]">Block calendar for prep</p>
                  </div>
                  <StatusBadge status="Interview" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
