import Breadcrumb from "@/components/breadcrumb";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regex Tester",
  description: "Test and debug regular expressions",
};

export default function RegexTesterPage() {
  return (
    <div className="px-6 py-8">
      <div className="mb-8">
        <Breadcrumb />
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-black dark:text-white">
          Regex Tester
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Test and debug regular expressions
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="flex min-h-[300px] items-center justify-center">
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-red-100 p-4 dark:bg-red-900/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-8 w-8 text-red-600 dark:text-red-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Regex Tester tool UI will be implemented here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
