import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/i18n/en";
import { SITE_CONFIG } from "@/lib/site-config";
import { Shield, Code, Zap, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about DeveloperUtilityTools - a free, privacy-focused collection of developer utilities that run entirely in your browser.",
  keywords: [
    "about",
    "developer tools",
    "privacy",
    "client-side tools",
    "open source",
  ],
  openGraph: {
    title: `About | ${SITE_CONFIG.name}`,
    description:
      "Learn about our commitment to privacy-first developer tools and client-side processing.",
    url: `${SITE_CONFIG.domain}/about`,
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: "summary",
    title: `About | ${SITE_CONFIG.name}`,
    description:
      "Privacy-first developer tools running entirely in your browser.",
  },
  alternates: {
    canonical: `${SITE_CONFIG.domain}/about`,
  },
};

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-4">
      <div className="mb-8">
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
          Hey there! 👋
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Welcome to your new favorite collection of dev tools
        </p>
      </div>

      <div className="space-y-8">
        {/* Mission Section */}
        <section className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-50">
            What&apos;s This All About?
          </h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            You know those little dev tasks you do every day? Format some JSON,
            decode a JWT, convert a timestamp... We got tired of googling for
            sketchy online tools or opening massive apps for simple jobs. So we
            built this—a collection of handy utilities that just work.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Here&apos;s the best part: everything runs right in your browser.
            Seriously. Your code, your API keys, your JWT tokens—nothing leaves
            your machine. We literally can&apos;t see it even if we wanted to.
            No servers, no tracking, no nonsense.
          </p>
        </section>

        {/* Features Grid */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-50">
            Why You&apos;ll Love It Here
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <div className="mb-4 inline-flex rounded-full bg-blue-100 p-3 dark:bg-blue-900/30">
                <Shield
                  className="h-6 w-6 text-blue-600 dark:text-blue-400"
                  aria-hidden="true"
                />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-gray-50">
                Your Secrets Are Safe
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Everything happens in your browser. We can&apos;t see your data
                because it never touches our servers. Privacy isn&apos;t a
                feature—it&apos;s just how it works.
              </p>
            </article>

            <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <div className="mb-4 inline-flex rounded-full bg-purple-100 p-3 dark:bg-purple-900/30">
                <Zap
                  className="h-6 w-6 text-purple-600 dark:text-purple-400"
                  aria-hidden="true"
                />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-gray-50">
                Stupid Fast
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                No waiting for servers to respond. Everything runs locally, so
                you get instant results. Format a 5MB JSON file? Done before you
                blink.
              </p>
            </article>

            <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <div className="mb-4 inline-flex rounded-full bg-green-100 p-3 dark:bg-green-900/30">
                <Code
                  className="h-6 w-6 text-green-600 dark:text-green-400"
                  aria-hidden="true"
                />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-gray-50">
                Open Source & Honest
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                All the code is on GitHub. Don&apos;t trust us? Read it
                yourself! Found a bug or want to add a feature? Pull requests
                are always welcome.
              </p>
            </article>

            <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <div className="mb-4 inline-flex rounded-full bg-pink-100 p-3 dark:bg-pink-900/30">
                <Heart
                  className="h-6 w-6 text-pink-600 dark:text-pink-400"
                  aria-hidden="true"
                />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-gray-50">
                Actually Free
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                No "free trial" BS, no credit card required, no surprise
                paywalls. Just free tools that work. Forever. Because dev tools
                should be accessible to everyone.
              </p>
            </article>
          </div>
        </section>

        {/* Technology Section */}
        <section className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-50">
            The Nerdy Stuff
          </h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            For those who care about the tech stack (and honestly, we love that
            you do), here&apos;s what powers this site:
          </p>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                <strong>Next.js 15</strong> because we like our pages fast and
                our SEO happy
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                <strong>React 19</strong> for all the smooth, reactive UI
                goodness
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                <strong>TypeScript</strong> because we prefer catching bugs at
                compile time, not at 2am
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                <strong>Tailwind CSS 4</strong> for making things pretty without
                fighting CSS
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                <strong>Lucide Icons</strong> for icons that don&apos;t look
                like they&apos;re from 2010
              </span>
            </li>
          </ul>
        </section>

        {/* Contact Section */}
        <section className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-50">
            Let&apos;s Chat
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Got ideas for new tools? Found a bug? Just want to say hi? Feel free
            to reach out via the contact page.
          </p>
        </section>
      </div>
    </main>
  );
}
