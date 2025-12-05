import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/i18n/en";
import { SITE_CONFIG } from "@/lib/site-config";
import ContactForm from "./contact-form";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the DeveloperUtilityTools team. We're here to help with questions, feedback, or feature requests.",
  keywords: [
    "contact",
    "support",
    "feedback",
    "help",
    "customer service",
    "developer tools support",
  ],
  openGraph: {
    title: `Contact Us | ${SITE_CONFIG.name}`,
    description:
      "Get in touch with the DeveloperUtilityTools team. We're here to help!",
    type: "website",
    url: `${SITE_CONFIG.domain}/contact`,
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: "summary",
    title: `Contact Us | ${SITE_CONFIG.name}`,
    description:
      "Get in touch with the DeveloperUtilityTools team. We're here to help!",
  },
  alternates: {
    canonical: `${SITE_CONFIG.domain}/contact`,
  },
};

export default function ContactPage() {
  return (
    <main className="container mx-auto px-4 py-4">
      <div className="mb-8">
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
          Get In Touch
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          We&apos;d love to hear from you! Questions, feedback, or just want to
          say hello?
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Contact Form - Takes up 2 columns */}
        <div className="lg:col-span-2">
          <ContactForm />
        </div>

        {/* Support Team Member Card - Takes up 1 column */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-6 text-center">
              <div className="relative mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full ring-4 ring-blue-100 dark:ring-blue-900/30">
                <img
                  src="/customer-support.jpg"
                  alt="Sarah Martinez, Customer Support Lead"
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-gray-50">
                Sarah Martinez
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Customer Support Lead
              </p>
            </div>

            <div className="space-y-4 border-t border-gray-200 pt-6 dark:border-gray-800">
              <div>
                <p className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-50">
                  Our Commitment
                </p>
                <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  We typically respond within 24 hours. Your feedback helps us
                  build better tools for the developer community.
                </p>
              </div>

              <div>
                <p className="mb-2 text-sm font-semibold text-gray-900 dark:text-gray-50">
                  Response Time
                </p>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Usually within 24 hours
                  </p>
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-semibold text-gray-900 dark:text-gray-50">
                  Other Ways to Reach Us
                </p>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="text-blue-600 dark:text-blue-400">→</span>
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      GitHub Issues
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-600 dark:text-blue-400">→</span>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      Twitter / X
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
