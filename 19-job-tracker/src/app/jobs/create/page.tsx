"use client";

import { useState } from "react";

import { toast } from "sonner";

import DashboardShell from "@/components/DashboardShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function JobsCreatePage() {
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error);
        return;
      }
      toast.success("Job added successfully");

      setFormData({
        title: "",
        company: "",
        location: "",
        salary: "",
        status: "Applied",
        type: "Full-time",
        jobLink: "",
        notes: "",
      });
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardShell title="Add job" subtitle="Capture every opportunity" showSearch={false}>
      <Card className="mx-auto max-w-3xl">
        <CardHeader>
          <CardTitle>Add new job</CardTitle>
          <CardDescription>Track the role with clean, structured details.</CardDescription>
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
                  placeholder="Frontend Engineer"
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
                  placeholder="Linear"
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
                  placeholder="Remote"
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
                  placeholder="$120k - $150k"
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
                placeholder="https://company.com/careers"
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
                placeholder="Add interview prep notes or follow-up reminders."
              />
            </div>
            <Button type="submit" size="lg" disabled={loading}>
              {loading ? "Adding job..." : "Add job"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
