"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { NAV_ITEMS, SITE_NAME } from "@/lib/i18n/en";
import { Logo } from "@/components/logo";
import { MobileNavButton } from "@/components/MobileNav";

export function Header() {
  const pathname = usePathname();
  const isToolPage = pathname.startsWith("/tools/");

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full border-b border-gray-200/50 bg-white/70 backdrop-blur-xl transition-all dark:border-gray-800/50 dark:bg-gray-950/70 ${isToolPage ? "md:left-72 md:w-[calc(100%-18rem)]" : ""}`}
    >
      <div className="flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="group flex items-center gap-3 text-xl font-bold transition-colors"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-lg ring-1 ring-gray-200/50 dark:bg-gray-800 dark:ring-gray-700/50">
            <Logo
              size={32}
              className="transition-transform group-hover:scale-110"
            />
          </div>
          <span className="hidden text-gray-900 transition-colors group-hover:text-blue-600 lg:inline dark:text-white dark:group-hover:text-blue-400">
            {SITE_NAME}
          </span>
        </Link>
        <div className="flex items-center gap-3 md:gap-6">
          <MobileNavButton />
          <nav className="hidden md:block">
            <ul className="flex gap-6">
              {NAV_ITEMS.map((item) => {
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(item.href + "/");
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`text-sm font-semibold transition-colors ${
                        isActive
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
