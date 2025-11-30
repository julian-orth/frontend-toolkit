import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { SITE_NAME, NAV_ITEMS, TOOLS } from "@/lib/i18n/en";
import { ThemeProvider } from "@/lib/contexts/theme-context";
import { ThemeToggle } from "@/components/theme-toggle";

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: "Free online tools for developers",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>🛠️</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-50">
        <ThemeProvider>
          <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/80">
            <div className="container mx-auto flex items-center justify-between px-4 py-4">
              <Link
                href="/"
                className="text-xl font-bold transition-colors hover:text-blue-600 dark:hover:text-blue-400"
              >
                {SITE_NAME}
              </Link>
              <div className="flex items-center gap-4">
                <nav>
                  <ul className="flex gap-6">
                    {NAV_ITEMS.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
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

          <main className="flex-1 bg-gray-50 dark:bg-gray-900">{children}</main>

          <footer className="border-t border-gray-200 bg-white py-12 dark:border-gray-800 dark:bg-gray-950">
            <div className="container mx-auto px-4">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div>
                  <h3 className="mb-4 text-lg font-bold">{SITE_NAME}</h3>
                  <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    A collection of free online tools for developers. No
                    registration required. Built with Next.js and Tailwind CSS.
                  </p>
                </div>
                <div>
                  <h3 className="mb-4 text-lg font-bold">Available Tools</h3>
                  <ul className="grid grid-cols-2 gap-2 text-sm">
                    {TOOLS.map((tool) => (
                      <li key={tool.id}>
                        <Link
                          href={tool.href}
                          className="text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                        >
                          {tool.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="md:col-span-2 lg:col-span-1">
                  <h3 className="mb-4 text-lg font-bold">About</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Free developer utilities to help you work faster and more
                    efficiently. All tools run directly in your browser.
                  </p>
                </div>
              </div>
              <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-600 dark:border-gray-800 dark:text-gray-400">
                <p>© 2025 Frontend Tools Hub. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
