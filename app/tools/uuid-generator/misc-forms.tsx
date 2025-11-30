"use client";
import React, { useState } from "react";
import {
  isValidUuid,
  getUuidVersion,
  getUuidVariant,
  getV1Timestamp,
  formatUuid,
} from "./uuid-utils";

export function UuidDecodeForm() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<null | {
    valid: boolean;
    version: number | null;
    variant: string | null;
    timestamp?: string | null;
  }>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    const valid = isValidUuid(trimmed);
    const version = valid ? getUuidVersion(trimmed) : null;
    const variant = valid ? getUuidVariant(trimmed) : null;
    let timestamp: string | null | undefined = undefined;
    if (valid && version === 1) {
      timestamp = getV1Timestamp(trimmed);
    }
    setResult({ valid, version, variant, timestamp });
  }

  return (
    <form className="flex max-w-xl flex-col gap-4" onSubmit={handleSubmit}>
      <label htmlFor="uuid-decode-input" className="text-sm font-medium">
        UUID to decode/analyze
      </label>
      <input
        id="uuid-decode-input"
        type="text"
        className="rounded-lg border border-gray-300 bg-white px-3 py-2 font-mono text-sm font-medium text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
        autoComplete="off"
        spellCheck={false}
      />
      <button
        type="submit"
        className="rounded-lg bg-yellow-600 px-6 py-2.5 font-medium text-white transition-colors hover:bg-yellow-700 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      >
        Decode
      </button>
      {result && (
        <div
          className={`mt-2 rounded p-4 font-mono text-lg ${result.valid ? "bg-yellow-50 text-yellow-900 dark:bg-yellow-950/20 dark:text-yellow-100" : "bg-red-50 text-red-900 dark:bg-red-950/20 dark:text-red-100"}`}
        >
          {result.valid ? (
            <>
              <div>
                <span className="font-bold">Version:</span>{" "}
                {result.version === 0 ? "NIL" : result.version}
              </div>
              <div>
                <span className="font-bold">Variant:</span> {result.variant}
              </div>
              {result.timestamp && (
                <div>
                  <span className="font-bold">Timestamp (v1):</span>{" "}
                  {result.timestamp}
                </div>
              )}
            </>
          ) : (
            <span className="font-bold">Invalid UUID</span>
          )}
        </div>
      )}
    </form>
  );
}

export function UuidFormatForm() {
  const [input, setInput] = useState("");
  const [hyphens, setHyphens] = useState(true);
  const [uppercase, setUppercase] = useState(false);
  const [braces, setBraces] = useState(false);
  const [urn, setUrn] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResult(formatUuid(input.trim(), { hyphens, uppercase, braces, urn }));
  }

  return (
    <form className="flex max-w-xl flex-col gap-4" onSubmit={handleSubmit}>
      <label htmlFor="uuid-format-input" className="text-sm font-medium">
        UUID to format
      </label>
      <input
        id="uuid-format-input"
        type="text"
        className="rounded-lg border border-gray-300 bg-white px-3 py-2 font-mono text-sm font-medium text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
        autoComplete="off"
        spellCheck={false}
      />
      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={hyphens}
            onChange={(e) => setHyphens(e.target.checked)}
          />
          Hyphens
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={uppercase}
            onChange={(e) => setUppercase(e.target.checked)}
          />
          Uppercase
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={braces}
            onChange={(e) => setBraces(e.target.checked)}
          />
          Braces <span className="text-xs">{"{uuid}"}</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={urn}
            onChange={(e) => setUrn(e.target.checked)}
          />
          URN <span className="text-xs">urn:uuid:...</span>
        </label>
      </div>
      <button
        type="submit"
        className="rounded-lg bg-purple-600 px-6 py-2.5 font-medium text-white transition-colors hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      >
        Convert
      </button>
      {result && (
        <div className="mt-2 rounded bg-purple-50 p-4 font-mono text-lg break-all text-purple-900 select-all dark:bg-purple-950/20 dark:text-purple-100">
          {result}
        </div>
      )}
    </form>
  );
}

export function UuidValidateForm() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<null | {
    valid: boolean;
    version: number | null;
  }>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (trimmed === "00000000-0000-0000-0000-000000000000") {
      setResult({ valid: true, version: 0 });
      return;
    }
    const valid = isValidUuid(trimmed);
    const version = valid ? getUuidVersion(trimmed) : null;
    setResult({ valid, version });
  }

  return (
    <form className="flex max-w-xl flex-col gap-4" onSubmit={handleSubmit}>
      <label htmlFor="uuid-validate-input" className="text-sm font-medium">
        UUID to validate
      </label>
      <input
        id="uuid-validate-input"
        type="text"
        className="rounded-lg border border-gray-300 bg-white px-3 py-2 font-mono text-sm font-medium text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
        autoComplete="off"
        spellCheck={false}
      />
      <button
        type="submit"
        className="rounded-lg bg-green-600 px-6 py-2.5 font-medium text-white transition-colors hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      >
        Validate
      </button>
      {result && (
        <div
          className={`mt-2 rounded p-4 font-mono text-lg ${result.valid ? "bg-green-50 text-green-900 dark:bg-green-950/20 dark:text-green-100" : "bg-red-50 text-red-900 dark:bg-red-950/20 dark:text-red-100"}`}
        >
          {result.valid ? (
            <>
              <span className="font-bold">Valid UUID</span>
              {typeof result.version === "number" && (
                <span className="ml-2">
                  (version {result.version === 0 ? "NIL" : result.version})
                </span>
              )}
            </>
          ) : (
            <span className="font-bold">Invalid UUID</span>
          )}
        </div>
      )}
    </form>
  );
}
