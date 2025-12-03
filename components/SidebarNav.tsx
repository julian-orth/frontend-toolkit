"use client";

import { TOOLS, SITE_NAME } from "@/lib/i18n/en";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, X } from "lucide-react";
import * as Icons from "lucide-react";
import { Logo } from "@/components/logo";

function getToolIcon(iconName: string) {
  // Fallback to Lucide's Zap if not found
  const LucideIcon =
    (Icons as any)[
      iconName
        ?.replace(/-([a-z])/g, (_, c) => c.toUpperCase()) // kebab-case to camelCase
        ?.replace(/^\w/, (c: string) => c.toUpperCase()) // capitalize first
    ] || Icons["Zap"];
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

export function SidebarNav() {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  // Ctrl+K keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl+K (or Cmd+K on Mac)
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filtered = TOOLS.filter(
    (tool) =>
      tool.name.toLowerCase().includes(query.toLowerCase()) ||
      tool.description?.toLowerCase().includes(query.toLowerCase())
  );

  // Group tools by group
  const grouped = filtered.reduce(
    (acc, tool) => {
      acc[tool.group] = acc[tool.group] || [];
      acc[tool.group].push(tool);
      return acc;
    },
    {} as Record<string, typeof TOOLS>
  );

  return (
    <nav
      className="fixed top-0 left-0 z-40 hidden h-full w-72 flex-shrink-0 border-r border-gray-200 bg-white md:block dark:border-gray-800 dark:bg-gray-950"
      aria-label="Main navigation"
    >
      <div className="flex h-full flex-col">
        <Link
          href="/"
          className="group flex items-center gap-3 border-b border-gray-200 px-6 py-5 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-lg ring-1 ring-gray-200/50 dark:bg-gray-800 dark:ring-gray-700/50">
            <Logo
              size={32}
              className="transition-transform group-hover:scale-110"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              DeveloperUtility
            </span>
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              Tools
            </span>
          </div>
        </Link>
        <div className="relative mt-4 mb-4 px-6">
          <label htmlFor="sidebar-search" className="sr-only">
            Search tools
          </label>
          <Search
            className="pointer-events-none absolute top-1/2 left-9 h-4 w-4 -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          />
          <input
            id="sidebar-search"
            ref={inputRef}
            type="search"
            placeholder={`Search ${TOOLS.length} tools…`}
            style={{ paddingRight: "71px" }}
            className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2 pl-10 text-sm text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-400 [&::-webkit-search-cancel-button]:hidden"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute top-1/2 h-5 w-5 -translate-y-1/2 text-white hover:text-gray-300 dark:text-white dark:hover:text-gray-300"
              aria-label="Clear search"
              title="Clear search"
              style={{ right: "53px", cursor: "pointer" }}
            >
              <X className="h-5 w-5" />
            </button>
          )}
          <kbd className="pointer-events-none absolute top-1/2 right-8 flex -translate-y-1/2 items-center gap-0.5 rounded border border-gray-300 bg-white px-1.5 py-0.5 font-mono text-xs font-semibold text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
            <span className="text-base leading-none">⌘</span>
            <span className="leading-none">K</span>
          </kbd>
        </div>
        <div className="flex-1 overflow-y-auto px-6 pb-4">
          {Object.keys(grouped).length === 0 && (
            <div className="px-3 py-2 text-gray-400 dark:text-gray-600">
              No tools found.
            </div>
          )}
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
      </div>
    </nav>
  );
}

export default SidebarNav;
