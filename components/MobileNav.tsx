"use client";

import { useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useMobileNav } from "@/lib/contexts/mobile-nav-context";
import { TOOLS } from "@/lib/i18n/en";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import * as Icons from "lucide-react";
import { useTheme } from "@/lib/contexts/theme-context";

function getToolIcon(iconName: string) {
  const LucideIcon =
    (Icons as any)[
      iconName
        ?.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
        ?.replace(/^\w/, (c: string) => c.toUpperCase())
    ] || Icons.Zap;
  return LucideIcon;
}

const GROUP_COLORS: Record<string, string> = {
  blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
  purple:
    "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
  green: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
  orange:
    "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
  pink: "bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400",
  red: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
  indigo:
    "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400",
  cyan: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400",
  teal: "bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400",
  yellow:
    "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400",
};

export function MobileNavButton() {
  const { open } = useMobileNav();

  return (
    <button
      className="rounded-lg border border-gray-300 bg-white p-2 text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none md:hidden dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 dark:focus:ring-offset-gray-950"
      aria-label="Open navigation menu"
      onClick={open}
    >
      <Menu className="h-6 w-6" aria-hidden="true" />
    </button>
  );
}

export default function MobileNav() {
  const { isOpen, close } = useMobileNav();
  const dialogRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { theme } = useTheme();

  // Trap focus when open
  useEffect(() => {
    if (!isOpen) return;
    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusable?.[0]?.focus();
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, close]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Group tools by group
  const grouped = TOOLS.reduce(
    (acc, tool) => {
      acc[tool.group] = acc[tool.group] || [];
      acc[tool.group].push(tool);
      return acc;
    },
    {} as Record<string, typeof TOOLS>
  );

  if (!isOpen) return null;

  return (
    <>
      <div
        ref={dialogRef}
        className="fixed inset-0 z-[100] flex md:hidden"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 bg-black/40 transition-opacity dark:bg-black/60"
          aria-hidden="true"
          onClick={close}
        />
        <aside className="animate-slide-in-left relative flex h-full w-72 max-w-full flex-col border-r border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-950">
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-800">
            <Link
              href="/"
              className="group flex items-center transition-opacity hover:opacity-80"
              onClick={close}
              aria-label="DeveloperUtilityTools Home"
            >
              <Image
                src={theme === "dark" ? "/logo-darkmode.svg" : "/logo.svg"}
                alt="DeveloperUtilityTools"
                width={200}
                height={30}
                className="h-8 w-auto"
                priority
              />
            </Link>
            <button
              className="rounded-lg border border-gray-300 bg-white p-2 text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 dark:focus:ring-offset-gray-950"
              aria-label="Close navigation menu"
              onClick={close}
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            <div className="space-y-6">
              {Object.entries(grouped).map(([group, tools]) => (
                <div key={group}>
                  <h2 className="mb-2 px-3 text-xs font-bold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                    {group}
                  </h2>
                  <ul className="space-y-1">
                    {tools.map((tool) => {
                      const Icon = getToolIcon(tool.groupIcon || "Zap");
                      const badgeColor =
                        GROUP_COLORS[tool.groupColor] || GROUP_COLORS.blue;
                      const isActive = pathname === tool.href;
                      return (
                        <li key={tool.id}>
                          <Link
                            href={tool.href}
                            onClick={close}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:focus:ring-offset-gray-950 ${
                              isActive
                                ? "bg-blue-50 font-medium text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                                : "text-gray-900 hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-800"
                            }`}
                            aria-label={`Open ${tool.name} tool`}
                            aria-current={isActive ? "page" : undefined}
                          >
                            <span className={`rounded-full p-2 ${badgeColor}`}>
                              <Icon className="h-6 w-6" aria-hidden="true" />
                            </span>
                            <span>{tool.name}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
      <style jsx global>{`
        @keyframes slide-in-left {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </>
  );
}
