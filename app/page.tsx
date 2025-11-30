import Link from "next/link";
import { SITE_NAME, SITE_DESCRIPTION, TOOLS } from "@/lib/i18n/en";

export default function Home() {
  return (
    <div className="relative">
      {/* Gradient Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20 blur-3xl dark:from-blue-600/20 dark:via-purple-600/20 dark:to-pink-600/20" />
        <div className="absolute -bottom-40 right-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-cyan-400/20 via-blue-400/20 to-indigo-400/20 blur-3xl dark:from-cyan-600/20 dark:via-blue-600/20 dark:to-indigo-600/20" />
      </div>

      <div className="container mx-auto px-4 py-20">
        {/* Hero Section */}
        <section className="mb-24 text-center">
          <div className="mx-auto max-w-4xl">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-300">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              Powerful Developer Tools
            </div>
            
            <h1 className="mb-6 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-6xl font-black tracking-tight text-transparent dark:from-white dark:via-blue-200 dark:to-purple-200 sm:text-7xl lg:text-8xl">
              {SITE_NAME}
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-gray-600 dark:text-gray-300">
              {SITE_DESCRIPTION} Privacy-first, lightning-fast, and completely free.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#tools"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40 dark:from-blue-500 dark:to-purple-500"
              >
                <span>Browse Tools</span>
                <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="#features"
                className="group inline-flex items-center gap-2 rounded-xl border-2 border-gray-300 bg-white/80 px-8 py-4 font-semibold text-gray-900 backdrop-blur-sm transition-all hover:border-gray-400 hover:bg-white dark:border-gray-700 dark:bg-gray-900/80 dark:text-gray-100 dark:hover:border-gray-600 dark:hover:bg-gray-900"
              >
                <span>Learn More</span>
                <svg className="h-5 w-5 transition-transform group-hover:translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>
            
            {/* Stats */}
            <div className="mt-16 flex flex-wrap justify-center gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-gray-900 dark:text-white">{TOOLS.length}+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Developer Tools</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-gray-900 dark:text-white">100%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Free Forever</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-gray-900 dark:text-white">0</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Data Collected</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="mb-24">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">Why Choose Our Tools?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">Built for developers, by developers</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:scale-105 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900/50">
              <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-blue-500/10 blur-2xl" />
              <div className="relative">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-7 w-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">Lightning Fast</h3>
                <p className="leading-relaxed text-gray-600 dark:text-gray-400">
                  All tools run directly in your browser with zero latency. No server uploads, no waiting times.
                </p>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:scale-105 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900/50">
              <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-green-500/10 blur-2xl" />
              <div className="relative">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-7 w-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">100% Private</h3>
                <p className="leading-relaxed text-gray-600 dark:text-gray-400">
                  Your data never leaves your device. No tracking, no analytics, no data collection whatsoever.
                </p>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:scale-105 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900/50">
              <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-purple-500/10 blur-2xl" />
              <div className="relative">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/30">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-7 w-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                  </svg>
                </div>
                <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">Forever Free</h3>
                <p className="leading-relaxed text-gray-600 dark:text-gray-400">
                  No sign-up required. No premium plans. All features available to everyone, always.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section id="tools">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">Explore Our Tools</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">Handpicked utilities to boost your productivity</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TOOLS.map((tool, index) => {
              const colors = [
                { from: "from-blue-500", to: "to-cyan-500", bg: "bg-blue-50", darkBg: "dark:bg-blue-950/30", border: "hover:border-blue-300 dark:hover:border-blue-700", gradient: "bg-gradient-to-br from-blue-500 to-cyan-500" },
                { from: "from-purple-500", to: "to-pink-500", bg: "bg-purple-50", darkBg: "dark:bg-purple-950/30", border: "hover:border-purple-300 dark:hover:border-purple-700", gradient: "bg-gradient-to-br from-purple-500 to-pink-500" },
                { from: "from-green-500", to: "to-emerald-500", bg: "bg-green-50", darkBg: "dark:bg-green-950/30", border: "hover:border-green-300 dark:hover:border-green-700", gradient: "bg-gradient-to-br from-green-500 to-emerald-500" },
                { from: "from-orange-500", to: "to-red-500", bg: "bg-orange-50", darkBg: "dark:bg-orange-950/30", border: "hover:border-orange-300 dark:hover:border-orange-700", gradient: "bg-gradient-to-br from-orange-500 to-red-500" },
                { from: "from-pink-500", to: "to-rose-500", bg: "bg-pink-50", darkBg: "dark:bg-pink-950/30", border: "hover:border-pink-300 dark:hover:border-pink-700", gradient: "bg-gradient-to-br from-pink-500 to-rose-500" },
                { from: "from-indigo-500", to: "to-blue-500", bg: "bg-indigo-50", darkBg: "dark:bg-indigo-950/30", border: "hover:border-indigo-300 dark:hover:border-indigo-700", gradient: "bg-gradient-to-br from-indigo-500 to-blue-500" },
                { from: "from-cyan-500", to: "to-teal-500", bg: "bg-cyan-50", darkBg: "dark:bg-cyan-950/30", border: "hover:border-cyan-300 dark:hover:border-cyan-700", gradient: "bg-gradient-to-br from-cyan-500 to-teal-500" },
                { from: "from-teal-500", to: "to-green-500", bg: "bg-teal-50", darkBg: "dark:bg-teal-950/30", border: "hover:border-teal-300 dark:hover:border-teal-700", gradient: "bg-gradient-to-br from-teal-500 to-green-500" },
                { from: "from-violet-500", to: "to-purple-500", bg: "bg-violet-50", darkBg: "dark:bg-violet-950/30", border: "hover:border-violet-300 dark:hover:border-violet-700", gradient: "bg-gradient-to-br from-violet-500 to-purple-500" },
                { from: "from-fuchsia-500", to: "to-pink-500", bg: "bg-fuchsia-50", darkBg: "dark:bg-fuchsia-950/30", border: "hover:border-fuchsia-300 dark:hover:border-fuchsia-700", gradient: "bg-gradient-to-br from-fuchsia-500 to-pink-500" },
              ];
              const colorScheme = colors[index % colors.length];
              
              return (
                <Link
                  key={tool.id}
                  href={tool.href}
                  className={`group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:scale-105 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900/50 ${colorScheme.border}`}
                >
                  <div className="relative">
                    <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${colorScheme.gradient} shadow-lg`}>
                      <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-gray-900 transition-colors dark:text-white">
                      {tool.name}
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                      {tool.description}
                    </p>
                    <div className={`inline-flex items-center gap-1 text-sm font-semibold bg-gradient-to-r ${colorScheme.from} ${colorScheme.to} bg-clip-text text-transparent`}>
                      Try it now
                      <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
