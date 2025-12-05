import Link from "next/link";
import type { Metadata } from "next";
import { SITE_NAME, TOOLS } from "@/lib/i18n/en";
import { SITE_CONFIG } from "@/lib/site-config";
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
    title: `All Developer Tools | ${SITE_CONFIG.name}`,
    description:
      "Free online developer tools for web development. Format JSON, generate UUIDs, encode Base64, test regex patterns, and more.",
    type: "website",
    url: `${SITE_CONFIG.domain}/tools`,
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `All Developer Tools | ${SITE_CONFIG.name}`,
    description:
      "Free online developer tools for web development. All tools run in your browser.",
  },
  alternates: {
    canonical: `${SITE_CONFIG.domain}/tools`,
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
    <div className="container mx-auto px-4 py-4">
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

      {/* FAQ Section for SEO */}
      <section aria-label="Frequently asked questions" className="mt-16">
        <h2 className="mb-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <article className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-50">
              Are these developer tools completely free to use?
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Yes, all {TOOLS.length} developer tools on {SITE_NAME} are
              completely free to use with no registration, sign-up, or payment
              required. You can access any tool instantly and use it as many
              times as you need.
            </p>
          </article>

          <article className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-50">
              Do these tools store my data or send it to a server?
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              No. All tools run entirely in your browser using client-side
              JavaScript. Your data never leaves your computer and is not sent
              to any server. This ensures complete privacy and security when
              working with sensitive information like JSON data, UUIDs, or
              encoded strings.
            </p>
          </article>

          <article className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-50">
              Can I use these tools offline?
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Once you load a tool page in your browser, it will continue to
              work even if your internet connection is lost. The tools are
              designed to function entirely client-side, so you can use them
              offline after the initial page load.
            </p>
          </article>

          <article className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-50">
              What types of developer tools are available?
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              We offer tools across multiple categories: JSON tools (formatter,
              validator), UUID tools (generator, validator, decoder, format
              converter), encoding tools (Base64, URL encoder/decoder), regex
              testing, color picking, text generation, timestamp conversion,
              text comparison, and JWT decoding. Each tool is designed for
              common web development tasks.
            </p>
          </article>

          <article className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-50">
              Do I need to install anything to use these tools?
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              No installation required. All tools are web-based and work
              directly in your browser. Simply visit the tool page and start
              using it immediately. The tools are compatible with all modern
              browsers including Chrome, Firefox, Safari, and Edge.
            </p>
          </article>

          <article className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-50">
              How do the UUID tools comply with RFC 4122 standards?
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Our UUID generator creates standards-compliant UUIDs according to
              RFC 4122 specifications, supporting versions 1, 3, 4, and 5, plus
              the NIL UUID. The UUID validator, decoder, and format converter
              also follow RFC 4122 standards to ensure compatibility with all
              systems that use UUIDs.
            </p>
          </article>

          <article className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-50">
              Can the JSON formatter handle large JSON files?
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Yes, the JSON formatter can handle large JSON files since it runs
              in your browser and uses your computer's resources. However,
              extremely large files (multiple megabytes) may take longer to
              process depending on your device's performance.
            </p>
          </article>

          <article className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-50">
              Are the tools mobile-friendly?
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Yes, all developer tools are fully responsive and work on mobile
              devices, tablets, and desktops. The interface adapts to your
              screen size for optimal usability on any device.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
