"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, SITE_NAME, TOOLS } from "@/lib/i18n/en";
import { Github, Twitter } from "lucide-react";
import { Logo } from "@/components/logo";

export function Footer() {
  const pathname = usePathname();
  const isToolPage = pathname.startsWith("/tools/");

  return (
    <footer
      className={`relative border-t border-gray-200/50 bg-gradient-to-b from-white to-gray-50 py-16 dark:border-gray-800/50 dark:from-gray-950 dark:to-gray-900 ${isToolPage ? "md:ml-72" : ""}`}
    >
      <div className="px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white shadow-lg ring-1 ring-gray-200/50 dark:bg-gray-800 dark:ring-gray-700/50">
                <Logo size={36} />
              </div>
              <h3 className="text-2xl font-bold">{SITE_NAME}</h3>
            </div>
            <p className="mb-4 max-w-md text-sm leading-relaxed text-gray-700 dark:text-gray-400">
              Your go-to collection of powerful, privacy-focused developer
              utilities. All tools run client-side in your browser—no data ever
              leaves your device.
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-100 dark:border-gray-800 dark:text-gray-300 dark:hover:border-gray-700 dark:hover:bg-gray-800"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-100 dark:border-gray-800 dark:text-gray-300 dark:hover:border-gray-700 dark:hover:bg-gray-800"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-bold tracking-wider text-gray-900 uppercase dark:text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              {NAV_ITEMS.map((item) => {
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(item.href + "/");
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`transition-colors ${
                        isActive
                          ? "font-semibold text-blue-600 dark:text-blue-400"
                          : "text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-bold tracking-wider text-gray-900 uppercase dark:text-white">
              Popular Tools
            </h4>
            <ul className="space-y-2 text-sm">
              {TOOLS.slice(0, 5).map((tool) => {
                const isActive = pathname === tool.href;
                return (
                  <li key={tool.id}>
                    <Link
                      href={tool.href}
                      className={`transition-colors ${
                        isActive
                          ? "font-semibold text-blue-600 dark:text-blue-400"
                          : "text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {tool.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-800">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-700 dark:text-gray-400">
              © 2025 DeveloperUtilityTools.com. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                href="/privacy"
                className={`transition-colors ${
                  pathname === "/privacy"
                    ? "font-semibold text-blue-600 dark:text-blue-400"
                    : "text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                }`}
                aria-current={pathname === "/privacy" ? "page" : undefined}
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className={`transition-colors ${
                  pathname === "/terms"
                    ? "font-semibold text-blue-600 dark:text-blue-400"
                    : "text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                }`}
                aria-current={pathname === "/terms" ? "page" : undefined}
              >
                Terms &amp; Conditions
              </Link>
              <Link
                href="/contact"
                className={`transition-colors ${
                  pathname === "/contact"
                    ? "font-semibold text-blue-600 dark:text-blue-400"
                    : "text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                }`}
                aria-current={pathname === "/contact" ? "page" : undefined}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
