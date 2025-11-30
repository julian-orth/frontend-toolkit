"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ToolGroupIcon } from "./tool-group-icons";

const ITEMS = [
  {
    href: "/tools/uuid-generator",
    title: "Generator",
    desc: "Create v1, v3, v4, v5, v7 and NIL UUIDs",
    icon: "arrow-path",
    badge: "bg-blue-200 dark:bg-blue-800/40",
    iconClass: "text-blue-700 dark:text-blue-300",
  },
  {
    href: "/tools/uuid-validator",
    title: "Validator",
    desc: "Check UUID validity and determine version",
    icon: "finger-print",
    badge: "bg-green-200 dark:bg-green-800/40",
    iconClass: "text-green-700 dark:text-green-300",
  },
  {
    href: "/tools/uuid-decoder",
    title: "Decoder",
    desc: "Analyze UUIDs and extract metadata (v1 timestamp)",
    icon: "hashtag",
    badge: "bg-purple-200 dark:bg-purple-800/40",
    iconClass: "text-purple-700 dark:text-purple-300",
  },
  {
    href: "/tools/uuid-format-converter",
    title: "Format Converter",
    desc: "Convert hyphens, case, braces, URN and more",
    icon: "document-text",
    badge: "bg-orange-200 dark:bg-orange-800/40",
    iconClass: "text-orange-700 dark:text-orange-300",
  },
];

export default function UuidLinks() {
  const pathname = usePathname() || "";
  const visible = ITEMS.filter((it) => it.href !== pathname);

  if (visible.length === 0) return null;

  return (
    <section aria-labelledby="related-uuid-tools" className="mt-8">
      <h2
        id="related-uuid-tools"
        className="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100"
      >
        Related UUID tools
      </h2>

      <div className="flex gap-4 overflow-x-auto py-1">
        {visible.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            className="group flex min-w-[260px] flex-shrink-0 items-start gap-4 rounded-lg border border-gray-200 bg-white p-4 text-sm transition-shadow hover:translate-y-[-2px] hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
            aria-label={`Open ${it.title} tool`}
          >
            <div
              className={`${it.badge} flex-shrink-0 rounded-full p-3 shadow-sm group-hover:shadow-md`}
            >
              <ToolGroupIcon
                icon={it.icon}
                className={`h-6 w-6 ${it.iconClass}`}
              />
            </div>

            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50">
                  {it.title}
                </h3>
              </div>
              <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                {it.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
