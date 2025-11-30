import type { Metadata } from "next";
import { UuidGeneratorClient } from "../uuid-generator/uuid-generator-client";

export const metadata: Metadata = {
  title: "UUID Format Converter",
  description: "Convert UUIDs between different formats: hyphens, uppercase, braces, URN, and more.",
  keywords: ["uuid", "format", "converter", "uppercase", "hyphens", "urn", "braces"],
  openGraph: {
    title: "UUID Format Converter - Frontend Tools Hub",
    description: "Convert UUIDs between different formats: hyphens, uppercase, braces, URN, and more.",
  },
  twitter: {
    card: "summary",
    title: "UUID Format Converter",
    description: "Convert UUIDs between different formats: hyphens, uppercase, braces, URN, and more.",
  },
};

export default function UuidFormatConverterPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
          UUID Format Converter
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Convert UUIDs between different formats: hyphens, uppercase, braces, URN, and more.
        </p>
      </div>
      <UuidGeneratorClient only="format" />
    </div>
  );
}
