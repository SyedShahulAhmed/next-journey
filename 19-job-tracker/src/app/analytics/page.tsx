"use client";

import { useEffect, useMemo, useState } from "react";

import { toast } from "sonner";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import AnalyticsCard from "@/components/AnalyticsCard";
import DashboardShell from "@/components/DashboardShell";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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

export default function AnalyticsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchStats() {
    try {
      const response = await fetch("/api/analytics/stats");

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message);
        return;
      }

      setStats(data.stats);
    } catch (error) {
      toast.error("Failed to fetch stats");
    }
  }

  async function fetchMonthlyData() {
    try {
      const response = await fetch("/api/analytics/monthly");

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message);
        return;
      }

      setMonthlyData(data.data);
    } catch (error) {
      toast.error("Failed to fetch analytics");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStats();
    fetchMonthlyData();
  }, []);

  const pieData = useMemo(
    () => [
      { name: "Applied", value: stats?.appliedJobs || 0, color: "#3B82F6" },
      { name: "Interview", value: stats?.interviewJobs || 0, color: "#EAB308" },
      { name: "Offer", value: stats?.offerJobs || 0, color: "#22C55E" },
      { name: "Rejected", value: stats?.rejectedJobs || 0, color: "#EF4444" },
      { name: "Ghosted", value: stats?.ghostedJobs || 0, color: "#64748B" },
    ],
    [stats],
  );

  const totalJobs = stats?.totalJobs || 0;
  const interviewRate = totalJobs
    ? Math.round((stats?.interviewJobs || 0) / totalJobs * 100)
    : 0;
  const offerRate = totalJobs
    ? Math.round((stats?.offerJobs || 0) / totalJobs * 100)
    : 0;
  const rejectionRate = totalJobs
    ? Math.round((stats?.rejectedJobs || 0) / totalJobs * 100)
    : 0;

  return (
    <DashboardShell
      title="Analytics"
      subtitle="Measure the health of your job search"
    >
      {loading ? (
        <div className="grid gap-6">
          <LoadingSkeleton rows={6} />
          <LoadingSkeleton rows={4} />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <AnalyticsCard label="Total applications" value={totalJobs} detail="All-time tracked" />
            <AnalyticsCard label="Interview rate" value={`${interviewRate}%`} detail="Progress to interviews" tone="yellow" />
            <AnalyticsCard label="Offer rate" value={`${offerRate}%`} detail="Final stage conversion" tone="green" />
            <AnalyticsCard label="Rejection rate" value={`${rejectionRate}%`} detail="Needs follow-up" tone="red" />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Status breakdown</CardTitle>
                <CardDescription>Where every application stands</CardDescription>
              </CardHeader>
              <CardContent className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      dataKey="value"
                      nameKey="name"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#111827",
                        border: "1px solid #273244",
                        borderRadius: "12px",
                        color: "#F8FAFC",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly activity</CardTitle>
                <CardDescription>Applications submitted each month</CardDescription>
              </CardHeader>
              <CardContent className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
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
                    <Bar dataKey="applications" fill="#3B82F6" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}