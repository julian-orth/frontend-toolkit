import Link from "next/link";
import type { Metadata } from "next";
import { SITE_NAME, TOOLS } from "@/lib/i18n/en";

export const metadata: Metadata = {
  title: "All Developer Tools",
  description:
    "Browse our complete collection of free online developer tools including JSON formatter, UUID generator, Base64 encoder, URL encoder, regex tester, color picker, and more. All tools run in your browser with complete privacy.",
  keywords: [
    "developer tools",
    "online tools",
    "web development",
    "JSON formatter",
    "UUID generator",
    "Base64 encoder",
    "URL encoder",
    "regex tester",
    "color picker",
    "free tools",
  ],
  openGraph: {
    title: "All Developer Tools | Frontend Tools Hub",
    description:
      "Free online developer tools for web development. Format JSON, generate UUIDs, encode Base64, test regex patterns, and more.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "All Developer Tools | Frontend Tools Hub",
    description:
      "Free online developer tools for web development. All tools run in your browser.",
  },
};

export default function ToolsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
          All Developer Tools
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Browse our complete collection of {TOOLS.length} free online developer
          tools. All tools run directly in your browser for complete privacy and
          security.
        </p>
      </header>

      <section aria-label="Developer tools list">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((tool) => (
            <article key={tool.id}>
              <Link
                href={tool.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-blue-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-700 dark:focus:ring-blue-400 dark:focus:ring-offset-gray-950"
                aria-label={`Open ${tool.name}: ${tool.description}`}
              >
                <div className="mb-3">
                  <h2 className="text-xl font-bold transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {tool.name}
                  </h2>
                </div>
                <p className="flex-grow text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {tool.description}
                </p>
                <div className="mt-4 flex items-center text-sm font-medium text-blue-600 dark:text-blue-400">
                  <span>Try it now</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
