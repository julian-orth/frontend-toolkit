import Breadcrumb from "@/components/breadcrumb";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lorem Ipsum Generator",
  description: "Generate placeholder text for your designs",
};

export default function LoremIpsumPage() {
  return (
    <div className="px-6 py-8">
      <div className="mb-8">
        <Breadcrumb />
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-black dark:text-white">
          Lorem Ipsum Generator
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Generate placeholder text for your designs
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="flex min-h-[300px] items-center justify-center">
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-pink-100 p-4 dark:bg-pink-900/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-8 w-8 text-pink-600 dark:text-pink-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
                  />
                </svg>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Lorem Ipsum Generator tool UI will be implemented here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
