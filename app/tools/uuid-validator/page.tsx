import type { Metadata } from "next";
import { UuidGeneratorClient } from "../uuid-generator/uuid-generator-client";

export const metadata: Metadata = {
  title: "UUID Validator",
  description: "Validate UUIDs (Universally Unique Identifiers) instantly and check their version.",
  keywords: ["uuid", "validator", "check", "unique identifier", "v4", "v1", "v3", "v5", "nil"],
  openGraph: {
    title: "UUID Validator - Frontend Tools Hub",
    description: "Validate RFC 4122 compliant UUIDs instantly. Check if a string is a valid UUID and determine its version.",
  },
  twitter: {
    card: "summary",
    title: "UUID Validator",
    description: "Validate RFC 4122 compliant UUIDs instantly.",
  },
};

export default function UuidValidatorPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
          UUID Validator
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Validate RFC 4122 compliant UUIDs (Universally Unique Identifiers) instantly and check their version.
        </p>
      </div>
      <UuidGeneratorClient only="validate" />
    </div>
  );
}
