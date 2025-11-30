import type { Metadata } from "next";
import { UuidGeneratorClient } from "./client";

import Breadcrumb from "@/components/breadcrumb";

export const metadata: Metadata = {
  title: "UUID Generator",
  description:
    "Generate RFC-compliant UUIDs (v1, v3, v4, v5, v7, NIL) with options and examples — shareable links via ?version=",
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
    title: "UUID Generator — Generate v1, v3, v4, v5, v7",
    description:
      "Generate RFC 4122 compliant UUIDs instantly. Choose version, namespace and name for namespaced UUIDs, and copy shareable links (use `?version=v1`).",
    url: "/tools/uuid-generator",
    siteName: "Frontend Tools Hub",
  },
  twitter: {
    card: "summary",
    title: "UUID Generator — Frontend Tools Hub",
    description:
      "Generate v1, v3, v4, v5, v7 UUIDs in-browser. Share links using `?version=` to preselect the generator.",
  },
  alternates: {
    canonical: "/tools/uuid-generator",
  },
};

export default function UuidGeneratorPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Breadcrumb />
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
          UUID Generator
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Generate RFC 4122 compliant UUIDs (Universally Unique Identifiers)
          instantly for use in databases, APIs, and applications
        </p>
      </div>

      <UuidGeneratorClient />
    </div>
  );
}
