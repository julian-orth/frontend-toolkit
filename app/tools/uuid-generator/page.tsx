import type { Metadata } from "next";
import { UuidGeneratorClient } from "./uuid-generator-client";

export const metadata: Metadata = {
  title: "UUID Generator",
  description: "Generate unique identifiers (UUIDs) instantly",
  keywords: ["uuid", "guid", "unique identifier", "generator", "v4", "random"],
  openGraph: {
    title: "UUID Generator - Frontend Tools Hub",
    description: "Generate RFC 4122 compliant UUIDs instantly. Create unique identifiers for your applications with one click.",
  },
  twitter: {
    card: "summary",
    title: "UUID Generator",
    description: "Generate RFC 4122 compliant UUIDs instantly",
  },
};

export default function UuidGeneratorPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
          UUID Generator
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Generate RFC 4122 compliant UUIDs (Universally Unique Identifiers) instantly for use in databases, APIs, and applications
        </p>
      </div>

      <UuidGeneratorClient />
    </div>
  );
}
