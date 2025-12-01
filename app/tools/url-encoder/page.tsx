import Breadcrumb from "@/components/breadcrumb";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "URL Encoder/Decoder",
  description: "Encode and decode URLs for safe transmission",
};

export default function UrlEncoderPage() {
  return (
    <div className="px-6 py-8">
      <div className="mb-8">
        <Breadcrumb />
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-black dark:text-white">
          URL Encoder/Decoder
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Encode and decode URLs for safe transmission
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="flex min-h-[300px] items-center justify-center">
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-teal-100 p-4 dark:bg-teal-900/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-8 w-8 text-teal-600 dark:text-teal-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                  />
                </svg>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              URL Encoder/Decoder tool UI will be implemented here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
