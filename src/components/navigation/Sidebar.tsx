"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Home, BarChart2, Settings } from "lucide-react";

const navItems = [
  { label: "Overview", href: "/dashboard/overview", icon: Home },
  { label: "Reports", href: "/dashboard/reporting", icon: BarChart2 },
  { label: "Settings", href: "/dashboard/setting", icon: Settings },
];

export function Sidebar() {
  const pathname = typeof window !== "undefined" ? window.location.pathname : "/";
  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border py-8 px-4 gap-4 min-h-screen">
      <div className="text-2xl font-bold mb-8 tracking-tight">ADmyBRAND Insights</div>
      <nav className="flex flex-col gap-2">
        {navItems.map(({ label, href, icon: Icon }) => (
          <Link key={href} href={href} className={cn(
            "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-base font-medium",
            pathname === href && "bg-sidebar-primary text-sidebar-primary-foreground"
          )}>
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </Link>
        ))}

      </nav>
    </aside>
  );
}
