import type React from "react";
import Link from "next/link";
import { Home, ClipboardList, BookOpen, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive?: boolean;
}

function NavItem({ icon: Icon, label, href, isActive }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors",
        isActive
          ? "text-dashboardIconBlue"
          : "text-gray-500 hover:text-gray-700"
      )}
    >
      <Icon className={cn("w-6 h-6", isActive && "text-dashboardIconBlue")} />
      <span
        className={cn("text-xs", isActive ? "font-semibold" : "font-medium")}
      >
        {label}
      </span>
    </Link>
  );
}

export function BottomNavigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-2 flex justify-around items-center z-50">
      <NavItem icon={Home} label="Dashboard" href="/dashboard" isActive />
      <NavItem icon={ClipboardList} label="Activity Report" href="/activity" />
      <NavItem icon={BookOpen} label="Video Education" href="/education" />
      <NavItem icon={User} label="Profile" href="/profile" />
    </nav>
  );
}
