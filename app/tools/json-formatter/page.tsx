import Breadcrumb from "@/components/breadcrumb";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Formatter",
  description: "Format and validate JSON data with ease",
};

export default function JsonFormatterPage() {
  return (
    <div className="px-6 py-8">
      <div className="mb-8">
        <Breadcrumb />
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-black dark:text-white">
          JSON Formatter
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Format and validate JSON data with ease
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="flex min-h-[300px] items-center justify-center">
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-green-100 p-4 dark:bg-green-900/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-8 w-8 text-green-600 dark:text-green-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
                  />
                </svg>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              JSON Formatter tool UI will be implemented here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
