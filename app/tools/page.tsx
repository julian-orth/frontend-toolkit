import Link from "next/link";
import type { Metadata } from "next";
import { SITE_NAME, TOOLS } from "@/lib/i18n/en";
import { ToolGroupIcon } from "@/components/tool-group-icons";

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
  // Group tools by group property
  const grouped = TOOLS.reduce(
    (acc, tool) => {
      if (!acc[tool.group]) acc[tool.group] = [];
      acc[tool.group].push(tool);
      return acc;
    },
    {} as Record<string, typeof TOOLS>
  );

  // Get group meta (color/icon) from first tool in group
  const groupMeta = (tools: typeof TOOLS) => {
    const { groupColor, groupIcon } = tools[0];
    return { groupColor, groupIcon };
  };

  // Tailwind color mapping for group backgrounds
  const colorMap: Record<string, string> = {
    blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    purple:
      "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
    green:
      "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
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

  return (
    <div className="px-6 py-8">
      <header className="mb-8">
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-black dark:text-white">
          All Developer Tools
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Browse our complete collection of {TOOLS.length} free online developer
          tools. All tools run directly in your browser for complete privacy and
          security.
        </p>
      </header>

      <section aria-label="Developer tools list">
        <div className="flex flex-col gap-12">
          {Object.entries(grouped).map(([group, tools]) => {
            const { groupColor, groupIcon } = groupMeta(tools);
            return (
              <div key={group}>
                <div className="mb-6 flex items-center gap-3">
                  <span
                    className={`rounded-full p-3 text-xl font-bold shadow-sm ${colorMap[groupColor] || "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"}`}
                    aria-hidden="true"
                  >
                    <ToolGroupIcon icon={groupIcon} className="h-7 w-7" />
                  </span>
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
                    {group} Tools
                  </h2>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {tools.map((tool) => (
                    <article key={tool.id}>
                      <Link
                        href={tool.href}
                        className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-blue-300 hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-700 dark:focus:ring-blue-400 dark:focus:ring-offset-gray-950"
                        aria-label={`Open ${tool.name}: ${tool.description}`}
                      >
                        <div className="mb-3">
                          <h3 className="text-xl font-bold transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                            {tool.name}
                          </h3>
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
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
