import { ReactNode } from "react";
import { Sidebar } from "../navigation/Sidebar";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { MobileSidebarDrawer } from "../navigation/MobileSidebarDrawer";

export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex bg-background">
      <MobileSidebarDrawer />
      <Sidebar />
      <main className="flex-1 flex flex-col p-4 sm:p-8 md:p-12 lg:p-16 xl:p-20 gap-6">
        <div className="flex justify-end items-center w-full mb-4">
          <ThemeToggle />
        </div>
        {children}
      </main>
    </div>
  );
}
