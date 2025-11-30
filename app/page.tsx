import Link from "next/link";
import { SITE_NAME, SITE_DESCRIPTION, TOOLS } from "@/lib/i18n/en";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <section className="mb-20 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent dark:from-blue-400 dark:to-purple-400 sm:text-6xl">
            {SITE_NAME}
          </h1>
          <p className="text-xl leading-relaxed text-gray-700 dark:text-gray-300">
            {SITE_DESCRIPTION}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="#tools"
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-all hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Browse Tools
            </a>
            <a
              href="#tools"
              className="rounded-lg border-2 border-gray-300 bg-white px-6 py-3 font-semibold text-gray-900 transition-all hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:border-gray-600 dark:hover:bg-gray-700"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-20">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold">Fast & Efficient</h3>
            <p className="text-gray-600 dark:text-gray-400">
              All tools run directly in your browser. No server uploads, no
              waiting times.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold">Private & Secure</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Your data never leaves your device. No tracking, no data
              collection.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold">Always Free</h3>
            <p className="text-gray-600 dark:text-gray-400">
              No sign-up, no subscriptions. All features available to everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools">
        <h2 className="mb-8 text-3xl font-bold">Available Tools</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((tool) => (
            <Link
              key={tool.id}
              href={tool.href}
              className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-blue-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-700"
            >
              <div className="mb-3">
                <h3 className="text-xl font-bold transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {tool.name}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {tool.description}
              </p>
              <div className="mt-4 flex items-center text-sm font-medium text-blue-600 dark:text-blue-400">
                Try it now
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
