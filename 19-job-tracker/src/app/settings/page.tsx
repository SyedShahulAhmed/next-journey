import DashboardShell from "@/components/DashboardShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <DashboardShell
      title="Settings"
      subtitle="Tune your job tracking workflow"
      showSearch={false}
    >
      <Card className="mx-auto max-w-3xl">
        <CardHeader>
          <CardTitle>Workspace settings</CardTitle>
          <CardDescription>Configure alerts, reminders, and exports.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-[#94A3B8]">
          <p>Email notifications: Enabled</p>
          <p>Weekly summary: Enabled</p>
          <p>Data export: CSV, PDF</p>
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
