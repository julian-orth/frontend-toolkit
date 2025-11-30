"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function toTitle(str: string) {
  return str.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  // Build breadcrumb items
  const crumbs = [
    { name: "Home", href: "/" },
    ...segments.map((seg, idx) => ({
      name: toTitle(seg),
      href: "/" + segments.slice(0, idx + 1).join("/"),
    })),
  ];

  return (
    <nav className="mb-6" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
        {crumbs.map((crumb, i) => (
          <li key={crumb.href} className="flex items-center">
            {i > 0 && (
              <span
                className="mx-1 text-gray-400 dark:text-gray-600"
                aria-hidden="true"
              >
                /
              </span>
            )}
            {i === crumbs.length - 1 ? (
              <span
                className="font-medium text-gray-900 dark:text-gray-50"
                aria-current="page"
              >
                {crumb.name}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="rounded hover:underline focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
              >
                {crumb.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
