"use client";
import React from "react";
import { GeneratorUI } from "./generator-ui";
import { InfoPanel } from "./info-panel";
import { UuidDecodeForm, UuidFormatForm, UuidValidateForm } from "./misc-forms";

export function UuidGeneratorClient({
  only,
}: {
  only?: "generate" | "decode" | "format" | "validate";
}) {
  return (
    <div className="flex flex-col items-center gap-10 py-8">
      {(!only || only === "generate") && (
        <div className="w-full rounded-2xl border border-teal-100 bg-white/80 p-8 shadow-lg backdrop-blur-md dark:border-teal-900/40 dark:bg-gray-950/80">
          <h2 className="mb-3 w-full text-3xl font-bold tracking-tight text-black dark:text-white">
            UUID Generator
          </h2>
          <p className="mb-8 w-full text-base text-gray-700 dark:text-gray-300">
            Generate UUIDs of different versions (v1, v3, v4, v5, NIL). Choose
            options and copy the result.
          </p>
          <GeneratorUI />
        </div>
      )}

      {(!only || only === "generate") && <InfoPanel />}

      {only === "decode" && (
        <div className="w-full rounded-2xl border border-yellow-100 bg-white/80 p-6 dark:border-yellow-900/40 dark:bg-gray-950/80">
          <h2 className="mb-3 text-2xl font-semibold text-gray-900 dark:text-gray-50">
            UUID Decoder & Analyzer
          </h2>
          <UuidDecodeForm />
        </div>
      )}

      {only === "format" && (
        <div className="w-full rounded-2xl border border-purple-100 bg-white/80 p-6 dark:border-purple-900/40 dark:bg-gray-950/80">
          <h2 className="mb-3 text-2xl font-semibold text-gray-900 dark:text-gray-50">
            UUID Format Converter
          </h2>
          <UuidFormatForm />
        </div>
      )}

      {only === "validate" && (
        <div className="w-full rounded-2xl border border-blue-100 bg-white/80 p-6 dark:border-blue-900/40 dark:bg-gray-950/80">
          <h2 className="mb-3 text-2xl font-semibold text-gray-900 dark:text-gray-50">
            UUID Validator
          </h2>
          <UuidValidateForm />
        </div>
      )}

      {/* Related links are rendered by the page to avoid duplicates */}
    </div>
  );
}
