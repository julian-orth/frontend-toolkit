"use client";

import { TOOLS } from "@/lib/i18n/en";
import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import * as Icons from "lucide-react";

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
      <div className="flex h-full flex-col overflow-y-auto p-4 pt-16">
        <div className="mb-4 flex items-center gap-2">
          <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search tools…"
            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search tools"
          />
        </div>
        {Object.keys(grouped).length === 0 && (
          <div className="px-3 py-2 text-gray-400 dark:text-gray-600">
            No tools found.
          </div>
        )}
        <div className="flex-1 space-y-6">
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
                  return (
                    <li key={tool.id}>
                      <Link
                        href={tool.href}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-gray-50 dark:hover:bg-gray-800"
                        aria-label={`Open ${tool.name} tool`}
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
    </nav>
  );
}

export default SidebarNav;
