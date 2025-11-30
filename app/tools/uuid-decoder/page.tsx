import type { Metadata } from "next";
import { UuidGeneratorClient } from "../uuid-generator/uuid-generator-client";

export const metadata: Metadata = {
  title: "UUID Decoder & Analyzer",
  description: "Decode and analyze UUIDs: extract version, variant, and timestamp (for v1).",
  keywords: ["uuid", "decode", "analyze", "version", "variant", "timestamp", "v1"],
  openGraph: {
    title: "UUID Decoder & Analyzer - Frontend Tools Hub",
    description: "Decode and analyze RFC 4122 UUIDs. Extract version, variant, and timestamp (for v1 UUIDs).",
  },
  twitter: {
    card: "summary",
    title: "UUID Decoder & Analyzer",
    description: "Decode and analyze RFC 4122 UUIDs.",
  },
};

export default function UuidDecoderPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
          UUID Decoder & Analyzer
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Decode and analyze UUIDs: extract version, variant, and timestamp (for v1 UUIDs).
        </p>
      </div>
      <UuidGeneratorClient only="decode" />
    </div>
  );
}
