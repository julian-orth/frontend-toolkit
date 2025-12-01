"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { NAV_ITEMS, SITE_NAME, TOOLS } from "@/lib/i18n/en";
import { Zap, Github, Twitter } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-gray-200/50 bg-white/70 backdrop-blur-xl transition-all md:left-72 md:w-[calc(100%-18rem)] dark:border-gray-800/50 dark:bg-gray-950/70">
      <div className="flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="group flex items-center gap-2 text-xl font-bold transition-colors"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30">
            <Zap className="h-5 w-5" aria-hidden="true" />
          </div>
          <span className="text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
            {SITE_NAME}
          </span>
        </Link>
        <div className="flex items-center gap-3 md:gap-6">
          {/* Mobile menu button */}
          <div className="md:hidden">{require("./MobileNav").default()}</div>
          <nav className="hidden md:block">
            <ul className="flex gap-6">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm font-semibold text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-gray-200/50 bg-gradient-to-b from-white to-gray-50 py-16 md:ml-72 dark:border-gray-800/50 dark:from-gray-950 dark:to-gray-900">
      <div className="px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg">
                <Zap className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold">{SITE_NAME}</h3>
            </div>
            <p className="mb-4 max-w-md text-sm leading-relaxed text-gray-700 dark:text-gray-400">
              A modern collection of powerful, privacy-focused developer tools.
              Built with Next.js 15, React 19, and Tailwind CSS 4.
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
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-bold tracking-wider text-gray-900 uppercase dark:text-white">
              Popular Tools
            </h4>
            <ul className="space-y-2 text-sm">
              {TOOLS.slice(0, 5).map((tool) => (
                <li key={tool.id}>
                  <Link
                    href={tool.href}
                    className="text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-800">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-700 dark:text-gray-400">
              © 2025 Frontend Tools Hub. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a
                href="#"
                className="text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
