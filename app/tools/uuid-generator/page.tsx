import type { Metadata } from "next";
import { UuidGeneratorClient } from "./client";
import UuidLinks from "@/components/uuid-links";

import Breadcrumb from "@/components/breadcrumb";

export const metadata: Metadata = {
  title: "UUID (GUID) Generator",
  description:
    "Generate RFC-compliant UUIDs (GUIDs) (v1, v3, v4, v5, v7, NIL) with options and examples — shareable links via ?version=",
  keywords: [
    "uuid",
    "guid",
    "unique identifier",
    "generator",
    "v1",
    "v3",
    "v4",
    "v5",
    "v7",
  ],
  openGraph: {
    title: "UUID (GUID) Generator — Generate v1, v3, v4, v5, v7",
    description:
      "Generate RFC 4122 compliant UUIDs (GUIDs) instantly. Choose version, namespace and name for namespaced UUIDs, and copy shareable links (use `?version=v1`).",
    url: "/tools/uuid-generator",
    siteName: "Frontend Tools Hub",
  },
  twitter: {
    card: "summary",
    title: "UUID (GUID) Generator — Frontend Tools Hub",
    description:
      "Generate v1, v3, v4, v5, v7 UUIDs (GUIDs) in-browser. Share links using `?version=` to preselect the generator.",
  },
  alternates: {
    canonical: "/tools/uuid-generator",
  },
};

export default function UuidGeneratorPage() {
  return (
    <div className="px-6 py-8">
      <div className="mb-8">
        <Breadcrumb />
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-black dark:text-white">
          UUID / GUID Generator
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Generate RFC 4122 compliant UUIDs (GUIDs — Microsoft term) instantly
          for use in databases, APIs, and applications
        </p>
      </div>

      <UuidGeneratorClient />

      <div className="mb-8 space-y-8">
        <section className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-2 text-2xl font-semibold text-gray-900 dark:text-gray-50">
            Use cases
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            UUIDs (also called GUIDs) are compact, URL-safe identifiers used
            widely across distributed systems. They are ideal when you need
            globally unique values without a central coordination service.
          </p>
          <ul className="mt-4 list-disc pl-5 text-gray-600 dark:text-gray-400">
            <li>
              Primary keys for databases where sharding or offline inserts occur
            </li>
            <li>Resource identifiers in REST APIs and microservices</li>
            <li>
              Deterministic identifiers for caching, idempotency keys, or
              content-addressable data
            </li>
            <li>Client-generated IDs for offline-first applications</li>
          </ul>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-2 text-2xl font-semibold text-gray-900 dark:text-gray-50">
            How UUIDs are generated
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            UUIDs follow the RFC 4122 family of formats. Different UUID versions
            use different sources of entropy or input data: timestamps, node
            identifiers (MAC), cryptographic randomness, or namespaced hashes.
            Each version embeds a small amount of version-specific metadata so
            software can interpret the ID correctly.
          </p>
          <div className="mt-4 text-sm text-gray-700 dark:text-gray-300">
            <strong className="font-medium">Example (v4 random UUID):</strong>
            <pre className="mt-2 rounded bg-gray-100 p-3 text-sm dark:bg-gray-800">
              <code>3f2504e0-4f89-11d3-9a0c-0305e82c3301</code>
            </pre>
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-2 text-2xl font-semibold text-gray-900 dark:text-gray-50">
            UUID versions — quick guide
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Choosing the right UUID version depends on whether you need
            determinism, time ordering, or purely random values. Common
            versions:
          </p>
          <ul className="mt-4 list-disc pl-5 text-gray-600 dark:text-gray-400">
            <li>
              <strong>v1 (time-based):</strong> Timestamp + node identifier —
              sortable and useful when you want roughly increasing values.
            </li>
            <li>
              <strong>v3 / v5 (name-based):</strong> Deterministic IDs derived
              from a namespace and name using MD5 (v3) or SHA-1 (v5).
            </li>
            <li>
              <strong>v4 (random):</strong> Cryptographically-random bytes —
              simple, collision-resistant for almost all applications.
            </li>
            <li>
              <strong>v7 (time-ordered):</strong> Newer timestamp-first format
              designed for high-performance ordered IDs (uses unix epoch +
              randomness).
            </li>
            <li>
              <strong>Nil UUID:</strong> A reserved UUID of all zeros to
              represent a missing value.
            </li>
          </ul>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-2 text-2xl font-semibold text-gray-900 dark:text-gray-50">
            Security, collisions & best practices
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Properly-generated v4 UUIDs have 122 bits of randomness and the
            collision probability is negligible in practice. Name-based UUIDs
            (v3/v5) are deterministic and should be used when you need the same
            input to produce the same ID.
          </p>
          <ul className="mt-4 list-disc pl-5 text-gray-600 dark:text-gray-400">
            <li>
              Prefer v4 for simplicity unless you need sorting or determinism.
            </li>
            <li>For ordering with low collision risk, consider v1 or v7.</li>
            <li>
              Never rely on predictable values for secret tokens — use dedicated
              cryptographic tokens for auth.
            </li>
            <li>
              When exposing IDs in URLs, UUIDs are safe to use without
              additional encoding.
            </li>
          </ul>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-2 text-2xl font-semibold text-gray-900 dark:text-gray-50">
            Examples & shareable links
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            This generator supports pre-selecting a version using a query
            parameter. For example, open the page with{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 text-sm dark:bg-gray-800">
              ?version=v1
            </code>{" "}
            to preselect the v1 generator.
          </p>
          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Client snippet (v4):
          </p>
          <pre className="mt-2 rounded bg-gray-100 p-3 text-sm dark:bg-gray-800">
            <code>{`import { randomUUID } from 'crypto';
// Node/modern runtimes
const id = randomUUID();
console.log(id);`}</code>
          </pre>
        </section>
      </div>

      <UuidLinks />
    </div>
  );
}
