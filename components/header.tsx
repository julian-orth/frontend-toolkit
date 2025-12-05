"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";
import { NAV_ITEMS } from "@/lib/i18n/en";
import { MobileNavButton } from "@/components/MobileNav";
import { useTheme } from "@/lib/contexts/theme-context";

export function Header() {
  const pathname = usePathname();
  const isToolPage = pathname.startsWith("/tools/");
  const { theme } = useTheme();

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full border-b border-gray-200/50 bg-white/70 backdrop-blur-xl transition-all dark:border-gray-800/50 dark:bg-gray-950/70 ${isToolPage ? "md:left-72 md:w-[calc(100%-18rem)]" : ""}`}
    >
      <div
        className={`mx-auto flex items-center justify-between px-4 py-4 sm:px-6 ${isToolPage ? "max-w-full" : "max-w-7xl"}`}
      >
        <Link
          href="/"
          onClick={handleLogoClick}
          className="group flex items-center transition-opacity hover:opacity-80"
          aria-label="DeveloperUtilityTools Home"
        >
          <Image
            src={theme === "dark" ? "/logo-darkmode.svg" : "/logo.svg"}
            alt="DeveloperUtilityTools"
            width={320}
            height={48}
            className="h-10 w-auto"
            priority
          />
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
