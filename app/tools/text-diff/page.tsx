import Breadcrumb from "@/components/breadcrumb";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text Diff",
  description: "Compare text differences side by side",
};

export default function TextDiffPage() {
  return (
    <div className="px-6 py-8">
      <div className="mb-8">
        <Breadcrumb />
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-black dark:text-white">
          Text Diff
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Compare text differences side by side
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="flex min-h-[300px] items-center justify-center">
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-indigo-100 p-4 dark:bg-indigo-900/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-8 w-8 text-indigo-600 dark:text-indigo-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                  />
                </svg>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Text Diff tool UI will be implemented here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
