"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Home, BarChart2, Settings, X, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Overview", href: "/dashboard/overview", icon: Home },
  { label: "Reports", href: "/dashboard/reporting", icon: BarChart2 },
  { label: "Settings", href: "/dashboard/setting", icon: Settings },
];

export function MobileSidebarDrawer() {
  const [open, setOpen] = useState(false);
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "/";

  return (
    <>
      {/* Hamburger Button */}
      <button
        className="block md:hidden fixed top-4 left-4 z-50 bg-background border border-border rounded-full p-2 shadow"
        aria-label="Open navigation menu"
        onClick={() => setOpen(true)}
      >
        <Menu className="w-6 h-6" />
      </button>
      {/* Drawer Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}
      {/* Drawer */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 w-64 h-full bg-sidebar text-sidebar-foreground border-r border-sidebar-border py-8 px-4 gap-4 flex flex-col transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full",
        )}
        style={{ boxShadow: open ? "2px 0 16px rgba(0,0,0,0.08)" : undefined }}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between mb-8">
          <span className="text-2xl font-bold tracking-tight">ADmyBRAND</span>
          <button
            className="rounded-full p-2 hover:bg-muted focus:outline-none"
            aria-label="Close navigation menu"
            onClick={() => setOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex flex-col gap-2">
          {navItems.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-base font-medium",
                pathname === href &&
                  "bg-sidebar-primary text-sidebar-primary-foreground",
              )}
              onClick={() => setOpen(false)}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}

export default MobileSidebarDrawer;
