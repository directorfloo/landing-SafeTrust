"use client";

import { ReactNode } from "react";
import { Navbar } from "@/components/navigation/Navbar";
import { SideBar } from "@/components/layouts/SideBar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0a15] text-white">
      <Navbar />
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-4 py-6 lg:flex-row lg:items-start lg:px-6">
        <div className="hidden lg:block lg:w-[320px]">
          <SideBar />
        </div>
        <main className="w-full">{children}</main>
      </div>
    </div>
  );
}
