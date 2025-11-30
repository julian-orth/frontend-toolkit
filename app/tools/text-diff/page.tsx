import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text Diff",
  description: "Compare text differences side by side",
};

export default function TextDiffPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-4 text-4xl font-bold">Text Diff</h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        Compare text differences side by side
      </p>

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 dark:border-gray-800 dark:bg-gray-900">
        <p className="text-center text-gray-500">
          Text Diff tool UI will be implemented here
        </p>
      </div>
    </div>
  );
}
