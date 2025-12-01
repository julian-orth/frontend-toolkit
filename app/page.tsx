import Link from "next/link";
import { SITE_NAME, SITE_DESCRIPTION, TOOLS } from "@/lib/i18n/en";
import {
  Zap,
  ArrowRight,
  ChevronDown,
  Rocket,
  ShieldCheck,
  Infinity,
  BookOpen,
  ArrowUpRight,
} from "lucide-react";

export default function Home() {
  return (
    <div className="relative">
      {/* Gradient Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20 blur-3xl dark:from-blue-600/20 dark:via-purple-600/20 dark:to-pink-600/20" />
        <div className="absolute right-1/4 -bottom-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-cyan-400/20 via-blue-400/20 to-indigo-400/20 blur-3xl dark:from-cyan-600/20 dark:via-blue-600/20 dark:to-indigo-600/20" />
      </div>

      <div className="px-6 py-20">
        {/* Hero Section */}
        <section className="mb-24 text-center">
          <div className="mx-auto max-w-4xl">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-300">
              <Zap className="h-4 w-4" aria-hidden="true" />
              Powerful Developer Tools
            </div>

            <h1 className="mb-6 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-6xl font-black tracking-tight text-transparent sm:text-7xl lg:text-8xl dark:from-white dark:via-blue-200 dark:to-purple-200">
              {SITE_NAME}
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-gray-600 dark:text-gray-300">
              {SITE_DESCRIPTION} Privacy-first, lightning-fast, and completely
              free.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#tools"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40 dark:from-blue-500 dark:to-purple-500"
              >
                <span>Browse Tools</span>
                <ArrowRight
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
              <a
                href="#features"
                className="group inline-flex items-center gap-2 rounded-xl border-2 border-gray-300 bg-white/80 px-8 py-4 font-semibold text-gray-900 backdrop-blur-sm transition-all hover:border-gray-400 hover:bg-white dark:border-gray-700 dark:bg-gray-900/80 dark:text-gray-100 dark:hover:border-gray-600 dark:hover:bg-gray-900"
              >
                <span>Learn More</span>
                <ChevronDown
                  className="h-5 w-5 transition-transform group-hover:translate-y-1"
                  aria-hidden="true"
                />
              </a>
            </div>

            {/* Stats */}
            <div className="mt-16 flex flex-wrap justify-center gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-gray-900 dark:text-white">
                  {TOOLS.length}+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Developer Tools
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-gray-900 dark:text-white">
                  100%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Free Forever
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-gray-900 dark:text-white">
                  0
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Data Collected
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="mb-24">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
              Why Choose Our Tools?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Built for developers, by developers
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:scale-105 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900/50">
              <div className="absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-blue-500/10 blur-2xl" />
              <div className="relative">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30">
                  <Rocket className="h-7 w-7" aria-hidden="true" />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                  Lightning Fast
                </h3>
                <p className="leading-relaxed text-gray-600 dark:text-gray-400">
                  All tools run directly in your browser with zero latency. No
                  server uploads, no waiting times.
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:scale-105 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900/50">
              <div className="absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-green-500/10 blur-2xl" />
              <div className="relative">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30">
                  <ShieldCheck className="h-7 w-7" aria-hidden="true" />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                  100% Private
                </h3>
                <p className="leading-relaxed text-gray-600 dark:text-gray-400">
                  Your data never leaves your device. No tracking, no analytics,
                  no data collection whatsoever.
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:scale-105 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900/50">
              <div className="absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-purple-500/10 blur-2xl" />
              <div className="relative">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/30">
                  <Infinity className="h-7 w-7" aria-hidden="true" />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                  Forever Free
                </h3>
                <p className="leading-relaxed text-gray-600 dark:text-gray-400">
                  No sign-up required. No premium plans. All features available
                  to everyone, always.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section id="tools">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
              Explore Our Tools
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Handpicked utilities to boost your productivity
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TOOLS.map((tool, index) => {
              const colors = [
                {
                  from: "from-blue-500",
                  to: "to-cyan-500",
                  bg: "bg-blue-50",
                  darkBg: "dark:bg-blue-950/30",
                  border: "hover:border-blue-300 dark:hover:border-blue-700",
                  gradient: "bg-gradient-to-br from-blue-500 to-cyan-500",
                },
                {
                  from: "from-purple-500",
                  to: "to-pink-500",
                  bg: "bg-purple-50",
                  darkBg: "dark:bg-purple-950/30",
                  border:
                    "hover:border-purple-300 dark:hover:border-purple-700",
                  gradient: "bg-gradient-to-br from-purple-500 to-pink-500",
                },
                {
                  from: "from-green-500",
                  to: "to-emerald-500",
                  bg: "bg-green-50",
                  darkBg: "dark:bg-green-950/30",
                  border: "hover:border-green-300 dark:hover:border-green-700",
                  gradient: "bg-gradient-to-br from-green-500 to-emerald-500",
                },
                {
                  from: "from-orange-500",
                  to: "to-red-500",
                  bg: "bg-orange-50",
                  darkBg: "dark:bg-orange-950/30",
                  border:
                    "hover:border-orange-300 dark:hover:border-orange-700",
                  gradient: "bg-gradient-to-br from-orange-500 to-red-500",
                },
                {
                  from: "from-pink-500",
                  to: "to-rose-500",
                  bg: "bg-pink-50",
                  darkBg: "dark:bg-pink-950/30",
                  border: "hover:border-pink-300 dark:hover:border-pink-700",
                  gradient: "bg-gradient-to-br from-pink-500 to-rose-500",
                },
                {
                  from: "from-indigo-500",
                  to: "to-blue-500",
                  bg: "bg-indigo-50",
                  darkBg: "dark:bg-indigo-950/30",
                  border:
                    "hover:border-indigo-300 dark:hover:border-indigo-700",
                  gradient: "bg-gradient-to-br from-indigo-500 to-blue-500",
                },
                {
                  from: "from-cyan-500",
                  to: "to-teal-500",
                  bg: "bg-cyan-50",
                  darkBg: "dark:bg-cyan-950/30",
                  border: "hover:border-cyan-300 dark:hover:border-cyan-700",
                  gradient: "bg-gradient-to-br from-cyan-500 to-teal-500",
                },
                {
                  from: "from-teal-500",
                  to: "to-green-500",
                  bg: "bg-teal-50",
                  darkBg: "dark:bg-teal-950/30",
                  border: "hover:border-teal-300 dark:hover:border-teal-700",
                  gradient: "bg-gradient-to-br from-teal-500 to-green-500",
                },
                {
                  from: "from-violet-500",
                  to: "to-purple-500",
                  bg: "bg-violet-50",
                  darkBg: "dark:bg-violet-950/30",
                  border:
                    "hover:border-violet-300 dark:hover:border-violet-700",
                  gradient: "bg-gradient-to-br from-violet-500 to-purple-500",
                },
                {
                  from: "from-fuchsia-500",
                  to: "to-pink-500",
                  bg: "bg-fuchsia-50",
                  darkBg: "dark:bg-fuchsia-950/30",
                  border:
                    "hover:border-fuchsia-300 dark:hover:border-fuchsia-700",
                  gradient: "bg-gradient-to-br from-fuchsia-500 to-pink-500",
                },
              ];
              const colorScheme = colors[index % colors.length];

              return (
                <Link
                  key={tool.id}
                  href={tool.href}
                  className={`group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:scale-105 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900/50 ${colorScheme.border}`}
                >
                  <div className="relative">
                    <div
                      className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${colorScheme.gradient} shadow-lg`}
                    >
                      <BookOpen
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-gray-900 transition-colors dark:text-white">
                      {tool.name}
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                      {tool.description}
                    </p>
                    <div
                      className={`inline-flex items-center gap-1 bg-gradient-to-r text-sm font-semibold ${colorScheme.from} ${colorScheme.to} bg-clip-text text-transparent`}
                    >
                      Try it now
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
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
