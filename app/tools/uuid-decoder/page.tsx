import type { Metadata } from "next";
import Breadcrumb from "@/components/breadcrumb";
import UuidLinks from "@/components/uuid-links";
import { UuidGeneratorClient } from "../uuid-generator/client";

export const metadata: Metadata = {
  title: "UUID Decoder & Analyzer",
  description:
    "Decode and analyze UUIDs: extract version, variant, timestamps and node identifiers (v1).",
  keywords: [
    "uuid",
    "decode",
    "analyze",
    "version",
    "variant",
    "timestamp",
    "v1",
    "mac",
  ],
  openGraph: {
    title: "UUID Decoder & Analyzer — Frontend Tools Hub",
    description:
      "Decode and inspect RFC 4122 UUIDs. Extract version, variant, timestamp (for v1) and other fields.",
    url: "/tools/uuid-decoder",
    siteName: "Frontend Tools Hub",
  },
  twitter: {
    card: "summary",
    title: "UUID Decoder & Analyzer — Frontend Tools Hub",
    description: "Decode and inspect RFC 4122 UUIDs in the browser.",
  },
  alternates: {
    canonical: "/tools/uuid-decoder",
  },
};

export default function UuidDecoderPage() {
  return (
    <div className="px-6 py-8">
      <div className="mb-8">
        <Breadcrumb />
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-black dark:text-white">
          UUID Decoder & Analyzer
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Paste a UUID to decode its fields: version, variant, embedded
          timestamp (v1/v7), and node identifier when available.
        </p>
      </div>

      <UuidGeneratorClient only="decode" />

      <div className="mb-8 space-y-8">
        <section className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-2 text-2xl font-semibold text-gray-900 dark:text-gray-50">
            Use cases
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Decoding is useful when you need to audit identifiers, extract
            approximate creation times from time-based UUIDs, or verify which
            variant/version a system is producing.
          </p>
          <ul className="mt-4 list-disc pl-5 text-gray-600 dark:text-gray-400">
            <li>Investigate event ordering using v1/v7 timestamps</li>
            <li>Verify UUID versions and variants for data validation</li>
            <li>Extract node identifiers for legacy v1 UUIDs (MAC-based)</li>
            <li>
              Decode namespaced UUID inputs for debugging deterministic IDs
            </li>
          </ul>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-2 text-2xl font-semibold text-gray-900 dark:text-gray-50">
            How decoding works
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            UUIDs are 128-bit values laid out into fields. The layout and some
            embedded data depend on the version. For example, v1 encodes a
            timestamp and node identifier; v4 is random and carries no
            interpretable metadata besides version/variant bits.
          </p>
          <div className="mt-4 text-sm text-gray-700 dark:text-gray-300">
            <strong className="font-medium">Example (v1):</strong>
            <pre className="mt-2 rounded bg-gray-100 p-3 text-sm dark:bg-gray-800">
              <code>f47ac10b-58cc-0372-8567-0e02b2c3d479</code>
            </pre>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Version: <strong>1</strong> — contains timestamp and node ID.
            </p>
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-2 text-2xl font-semibold text-gray-900 dark:text-gray-50">
            Limits & privacy
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Be careful when sharing decoded details from UUIDs. v1 UUIDs can
            include node identifiers (historically MAC addresses). Many modern
            systems avoid exposing MAC addresses and use randomized node values
            instead.
          </p>
          <ul className="mt-4 list-disc pl-5 text-gray-600 dark:text-gray-400">
            <li>
              v4 and most server-generated UUIDs do not reveal machine info
            </li>
            <li>
              Treat timestamps from UUIDs as approximate and not authoritative
            </li>
            <li>Use this tool for debugging, not as a forensic source</li>
          </ul>
        </section>
      </div>

      <UuidLinks />
    </div>
  );
}
