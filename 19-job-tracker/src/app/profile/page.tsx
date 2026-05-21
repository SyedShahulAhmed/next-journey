"use client";

import DashboardShell from "@/components/DashboardShell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ProfilePage() {
  const [userData, setUserData] = useState<any>();

  async function getData() {
    const res = await fetch("/api/auth/me");
    const data = await res.json();
    if (!res.ok) {
      toast.error("Failed to fetch user data");
      return;
    }
    setUserData(data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <DashboardShell
      title="Profile"
      subtitle="Keep your workspace details updated"
      showSearch={false}
    >
      <Card className="mx-auto max-w-3xl">
        <CardHeader>
          <CardTitle>Profile overview</CardTitle>
          <CardDescription>
            Personal settings will live here soon.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-[#94A3B8]">
          <p>Id: {userData?.user._id}</p>
          <p>Name: {userData?.user.name}</p>
          <p>Email: {userData?.user.email}</p>
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
