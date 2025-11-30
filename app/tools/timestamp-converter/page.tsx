import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Timestamp Converter",
  description: "Convert Unix timestamps to human-readable dates",
};

export default function TimestampConverterPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-4 text-4xl font-bold">Timestamp Converter</h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        Convert Unix timestamps to human-readable dates
      </p>

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 dark:border-gray-800 dark:bg-gray-900">
        <p className="text-center text-gray-500">
          Timestamp Converter tool UI will be implemented here
        </p>
      </div>
    </div>
  );
}
