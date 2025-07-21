import { ActivityHeader } from "@/components/layout/activity-header";
import { ActivityCard } from "@/components/activity/activity-card";
import { BottomNavigation } from "@/components/layout/bottom-navigation";
import { FileText, Search } from "lucide-react";

export default function ActivityReportPage() {
  return (
    <div className="min-h-screen bg-screenBackground flex flex-col pb-20">
      <ActivityHeader title="Activity Report" />
      <main className="flex-1 space-y-6 py-6 px-4">
        <ActivityCard
          icon={FileText}
          title="New Report Form"
          href="/activity/new-report"
        />
        <ActivityCard
          icon={Search}
          title="Report History"
          href="/activity/report-history"
        />
      </main>
      <BottomNavigation />
    </div>
  );
}
