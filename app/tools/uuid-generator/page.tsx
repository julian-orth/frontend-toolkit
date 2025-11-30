import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UUID Generator",
  description: "Generate unique identifiers (UUIDs) instantly",
};

export default function UuidGeneratorPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-4 text-4xl font-bold">UUID Generator</h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        Generate unique identifiers (UUIDs) instantly
      </p>

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 dark:border-gray-800 dark:bg-gray-900">
        <p className="text-center text-gray-500">
          UUID Generator tool UI will be implemented here
        </p>
      </div>
    </div>
  );
}
