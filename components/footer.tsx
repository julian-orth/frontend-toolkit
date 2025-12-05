"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { NAV_ITEMS, SITE_NAME, TOOLS } from "@/lib/i18n/en";
import { useTheme } from "@/lib/contexts/theme-context";

export function Footer() {
  const pathname = usePathname();
  const isToolPage = pathname.startsWith("/tools/");
  const { theme } = useTheme();

  return (
    <footer
      className={`relative border-t border-gray-200/50 bg-gradient-to-b from-white to-gray-50 py-16 dark:border-gray-800/50 dark:from-gray-950 dark:to-gray-900 ${isToolPage ? "md:ml-72" : ""}`}
    >
      <div className="px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="mb-4">
              <Image
                src={theme === "dark" ? "/logo-darkmode.svg" : "/logo.svg"}
                alt="DeveloperUtilityTools"
                width={250}
                height={38}
                className="h-10 w-auto"
              />
            </div>
            <p className="mb-4 max-w-md text-sm leading-relaxed text-gray-700 dark:text-gray-400">
              Your go-to collection of powerful, privacy-focused developer
              utilities. All tools run client-side in your browser—no data ever
              leaves your device.
            </p>
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
