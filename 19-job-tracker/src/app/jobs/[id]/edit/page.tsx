"use client";

import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import DashboardShell from "@/components/DashboardShell";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function EditJobPage() {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    status: "Applied",
    type: "Full-time",
    jobLink: "",
    notes: "",
  });

  async function fetchJob() {
    try {
      const response = await fetch(`/api/jobs/${params.id}`);

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message);
        return;
      }

      setFormData({
        title: data.job.title || "",
        company: data.job.company || "",
        location: data.job.location || "",
        salary: data.job.salary || "",
        status: data.job.status || "Applied",
        type: data.job.type || "Full-time",
        jobLink: data.job.jobLink || "",
        notes: data.job.notes || "",
      });
    } catch (error) {
      toast.error("Failed to fetch job");
    } finally {
      setFetching(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(`/api/jobs/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message);
        return;
      }

      toast.success("Job updated successfully");

      router.push("/jobs");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchJob();
  }, []);

  if (fetching) {
    return (
      <DashboardShell title="Edit job" subtitle="Loading details" showSearch={false}>
        <LoadingSkeleton rows={6} />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell title="Edit job" subtitle="Keep every detail up to date" showSearch={false}>
      <Card className="mx-auto max-w-3xl">
        <CardHeader>
          <CardTitle>Edit application</CardTitle>
          <CardDescription>Refine details as the process progresses.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm text-[#94A3B8]">Job title</label>
                <Input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-[#94A3B8]">Company</label>
                <Input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      company: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-[#94A3B8]">Location</label>
                <Input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      location: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-[#94A3B8]">Salary range</label>
                <Input
                  type="text"
                  value={formData.salary}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      salary: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-[#94A3B8]">Status</label>
                <Select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value,
                    })
                  }
                >
                  <option>Applied</option>
                  <option>Interview</option>
                  <option>Offer</option>
                  <option>Rejected</option>
                  <option>Ghosted</option>
                  <option>Saved</option>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-[#94A3B8]">Job type</label>
                <Select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      type: e.target.value,
                    })
                  }
                >
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Internship</option>
                  <option>Contract</option>
                  <option>Remote</option>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-[#94A3B8]">Job link</label>
              <Input
                type="url"
                value={formData.jobLink}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    jobLink: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-[#94A3B8]">Notes</label>
              <Textarea
                rows={5}
                value={formData.notes}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    notes: e.target.value,
                  })
                }
              />
            </div>
            <Button type="submit" size="lg" disabled={loading}>
              {loading ? "Updating..." : "Update job"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
 