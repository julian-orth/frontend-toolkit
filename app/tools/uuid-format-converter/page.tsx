import type { Metadata } from "next";
import Breadcrumb from "@/components/breadcrumb";
import UuidLinks from "@/components/uuid-links";
import { UuidGeneratorClient } from "../uuid-generator/client";

export const metadata: Metadata = {
  title: "UUID Format Converter",
  description:
    "Convert UUIDs between common representations: hyphenated, compact, uppercase, URN and braces.",
  keywords: [
    "uuid",
    "format",
    "converter",
    "uppercase",
    "hyphens",
    "urn",
    "braces",
    "compact",
  ],
  openGraph: {
    title: "UUID Format Converter — Frontend Tools Hub",
    description:
      "Convert UUIDs between common representations: hyphenated, compact, uppercase, URN and braces.",
    url: "/tools/uuid-format-converter",
    siteName: "Frontend Tools Hub",
  },
  twitter: {
    card: "summary",
    title: "UUID Format Converter — Frontend Tools Hub",
    description: "Convert UUID representations for storage or display.",
  },
  alternates: {
    canonical: "/tools/uuid-format-converter",
  },
};

export default function UuidFormatConverterPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Breadcrumb />
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
          UUID Format Converter
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Convert UUIDs between different common formats used by databases,
          APIs, and display layers.
        </p>
      </div>

      <UuidGeneratorClient only="format" />

      <div className="mb-8 space-y-8">
        <section className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-2 text-2xl font-semibold text-gray-900 dark:text-gray-50">
            Common formats
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            UUIDs are the same 128-bit value but often represented in different
            textual forms depending on API or storage requirements.
          </p>
          <ul className="mt-4 list-disc pl-5 text-gray-600 dark:text-gray-400">
            <li>
              <strong>Hyphenated (canonical):</strong> 8-4-4-4-12 lower-case
              (default)
            </li>
            <li>
              <strong>Compact:</strong> No hyphens, useful for compact storage
            </li>
            <li>
              <strong>Uppercase:</strong> Display preference for consistency
            </li>
            <li>
              <strong>Braced / URN:</strong> Surrounding braces or `urn:uuid:`
              prefix
            </li>
          </ul>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-2 text-2xl font-semibold text-gray-900 dark:text-gray-50">
            Why convert?
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Different systems accept different formats. Converting is useful
            when integrating with legacy systems, or when you need a compact
            representation for URLs or keys.
          </p>
          <div className="mt-4 text-sm text-gray-700 dark:text-gray-300">
            <strong className="font-medium">Examples:</strong>
            <pre className="mt-2 rounded bg-gray-100 p-3 text-sm dark:bg-gray-800">
              <code>
                3f2504e0-4f89-11d3-9a0c-0305e82c3301
                3f2504e04f8911d39a0c0305e82c3301
                {`URN:`} urn:uuid:3f2504e0-4f89-11d3-9a0c-0305e82c3301
              </code>
            </pre>
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-2 text-2xl font-semibold text-gray-900 dark:text-gray-50">
            Best practices
          </h2>
          <ul className="mt-4 list-disc pl-5 text-gray-600 dark:text-gray-400">
            <li>Store canonical hyphenated lowercase form when possible</li>
            <li>
              Convert to compact form only when size matters and document it
            </li>
            <li>Keep canonical form in logs and debugging for readability</li>
          </ul>
        </section>
      </div>

      <UuidLinks />
    </div>
  );
}
