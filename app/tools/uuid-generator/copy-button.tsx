"use client";
import React, { useState } from "react";

export function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      aria-label="Copy UUID"
      className={`h-12 cursor-pointer rounded-xl border border-teal-600 bg-white px-5 text-base font-semibold text-teal-700 shadow-md transition hover:bg-teal-50 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:outline-none dark:border-teal-400 dark:bg-gray-950 dark:text-teal-300 dark:hover:bg-gray-900 ${copied ? "ring-2 ring-teal-400" : ""}`}
      onClick={() => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      }}
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
