// Deprecated: replaced by `client.tsx` wrapper. Kept as a placeholder.
export {};
"use client";
import React from "react";
import { GeneratorUI } from "./generator-ui";
import { InfoPanel } from "./info-panel";
import { UuidDecodeForm, UuidFormatForm, UuidValidateForm } from "./misc-forms";

export function UuidGeneratorClient() {
  return (
    <div className="flex flex-col items-center gap-10 py-8">
      <div className="w-full rounded-2xl border border-teal-100 bg-white/80 p-8 shadow-lg backdrop-blur-md dark:border-teal-900/40 dark:bg-gray-950/80">
        <h2 className="mb-3 w-full text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">UUID Generator</h2>
        <p className="mb-8 w-full text-base text-gray-600 dark:text-gray-400">Generate UUIDs of different versions (v1, v3, v4, v5, NIL). Choose options and copy the result.</p>
        <GeneratorUI />
      </div>

      <InfoPanel />

      <div className="w-full grid gap-8 lg:grid-cols-3">
        );
      }

      <div className="w-full grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <UuidDecodeForm />
        </div>
        <div className="lg:col-span-1">
          <UuidFormatForm />
        </div>
        <div className="lg:col-span-1">
          <UuidValidateForm />
        </div>
      </div>
    </div>
  );
}
