"use client"; // Added use client as it uses useRouter

import type React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname
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
      <Icon
        className={cn(
          "w-9 h-9 sm:w-[50px] sm:h-[50px]",
          isActive && "text-dashboardIconBlue"
        )}
      />{" "}
      <span
        className={cn("text-xs", isActive ? "font-semibold" : "font-medium")}
      >
        {label}
      </span>
    </Link>
  );
}

export function BottomNavigation() {
  const pathname = usePathname(); // Get current pathname

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-bottomNavBg border-t border-gray-200 shadow-lg p-2 flex justify-around items-center z-50">
      {" "}
      {/* Changed bg-white to bg-bottomNavBg */}
      <NavItem
        icon={Home}
        label="Dashboard"
        href="/dashboard"
        isActive={pathname === "/dashboard"}
      />
      <NavItem
        icon={ClipboardList}
        label="Activity Report"
        href="/activity"
        isActive={pathname === "/activity"}
      />
      <NavItem
        icon={BookOpen}
        label="Video Education"
        href="/education"
        isActive={pathname === "/education"}
      />
      <NavItem
        icon={User}
        label="Profile"
        href="/profile"
        isActive={pathname === "/profile"}
      />
    </nav>
  );
}
