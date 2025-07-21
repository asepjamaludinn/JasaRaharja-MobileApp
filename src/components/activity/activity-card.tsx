import Link from "next/link";
import type React from "react";
import { cn } from "@/lib/utils";

interface ActivityCardProps {
  icon: React.ElementType;
  title: string;
  href: string;
}

export function ActivityCard({ icon: Icon, title, href }: ActivityCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-10 bg-dashboardHeaderBg rounded-3xl p-6 shadow-card mx-4",
        "hover:bg-dashboardHeaderBg/80 transition-colors duration-200"
      )}
    >
      <Icon className="w-24 h-24 text-dashboardIconBlue" />
      <span className="text-lg font-semibold text-dashboardTextPrimary">
        {title}
      </span>{" "}
    </Link>
  );
}
