"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, TrendingUp, Users2 } from "lucide-react";
import { cn } from "@/lib/utils";

type SideBarProps = {
  onClose?: () => void;
};

const navItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    Icon: LayoutDashboard,
  },
  {
    href: "/dashboard/analytics",
    label: "Analytics",
    Icon: TrendingUp,
  },
  {
    href: "/dashboard/apartments",
    label: "Interested People",
    Icon: Users2,
  },
];

export function SideBar({ onClose }: SideBarProps) {
  const pathname = usePathname();

  return (
    <aside className="sticky top-6 hidden h-[calc(100vh-3rem)] max-h-[calc(100vh-3rem)] flex-col gap-4 overflow-y-auto rounded-3xl border border-slate-800 bg-slate-950/95 p-5 shadow-xl shadow-black/20 lg:flex">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">
          Dashboard navigation
        </p>
      </div>

      <nav className="space-y-2">
        {navItems.map(({ href, label, Icon }) => {
          const isActive =
            href === "/dashboard"
              ? pathname === href
              : pathname?.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors duration-200",
                isActive
                  ? "bg-slate-900 text-white shadow-sm shadow-slate-900/30"
                  : "text-slate-300 hover:bg-slate-900/80 hover:text-white",
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
