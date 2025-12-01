import type { Metadata } from "next";
import Breadcrumb from "@/components/breadcrumb";
import UuidLinks from "@/components/uuid-links";
import { UuidGeneratorClient } from "../uuid-generator/client";

export const metadata: Metadata = {
  title: "UUID Validator",
  description:
    "Validate UUIDs (RFC 4122) instantly, check format, version and basic integrity.",
  keywords: [
    "uuid",
    "validator",
    "check",
    "unique identifier",
    "v4",
    "v1",
    "v3",
    "v5",
    "nil",
  ],
  openGraph: {
    title: "UUID Validator — Frontend Tools Hub",
    description:
      "Validate RFC 4122 compliant UUIDs instantly. Check if a string is a valid UUID and determine its version.",
    url: "/tools/uuid-validator",
    siteName: "Frontend Tools Hub",
  },
  twitter: {
    card: "summary",
    title: "UUID Validator — Frontend Tools Hub",
    description: "Validate RFC 4122 compliant UUIDs instantly.",
  },
  alternates: {
    canonical: "/tools/uuid-validator",
  },
};

export default function UuidValidatorPage() {
  return (
    <div className="px-6 py-8">
      <div className="mb-8">
        <Breadcrumb />
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-black dark:text-white">
          UUID Validator
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Validate RFC 4122 compliant UUIDs (Universally Unique Identifiers)
          instantly and determine their version and basic structure.
        </p>
      </div>

      <UuidGeneratorClient only="validate" />

      <div className="mb-8 space-y-8">
        <section className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-2 text-2xl font-semibold text-gray-900 dark:text-gray-50">
            What is validated
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            This validator checks the UUID string for correct length, hyphen
            placement, hex characters, and the version/variant bits required by
            RFC 4122.
          </p>
          <ul className="mt-4 list-disc pl-5 text-gray-600 dark:text-gray-400">
            <li>Correct hex character set (0-9, a-f)</li>
            <li>Proper hyphen groups (8-4-4-4-12) when present</li>
            <li>Valid version (1,3,4,5,7 or nil)</li>
            <li>Valid variant bits for RFC-compliant UUIDs</li>
          </ul>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-2 text-2xl font-semibold text-gray-900 dark:text-gray-50">
            Examples
          </h2>
          <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            <pre className="overflow-auto rounded bg-gray-100 p-3 text-sm break-words whitespace-pre-wrap dark:bg-gray-800">
              <code>{`Valid: 3f2504e0-4f89-11d3-9a0c-0305e82c3301
Invalid: 3f2504e04f8911d39a0c0305e82c33ZZ (non-hex)
Invalid: 3f2504e0-4f89-11d3-9a0c-0305e82c33 (short)`}</code>
            </pre>
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-2 text-2xl font-semibold text-gray-900 dark:text-gray-50">
            When not to rely on validation
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            This validator ensures string-level RFC conformance but cannot
            guarantee uniqueness or that an ID was generated securely. For
            security-sensitive tokens, use purpose-built cryptographic tokens
            instead.
          </p>
        </section>
      </div>

      <UuidLinks />
    </div>
  );
}
