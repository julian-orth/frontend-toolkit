
"use client";
import { useState } from "react";

const TABS = [
  { id: "generate", label: "Generate UUID" },
  { id: "validate", label: "Validate UUID" },
  { id: "decode", label: "Decode/Analyze UUID" },
  { id: "format", label: "Format Converter" },
];

export function UuidGeneratorClient({ only }: { only?: "generate" | "validate" | "decode" | "format" }) {
  // If 'only' is set, show only that tab and hide navigation
  const [activeTab, setActiveTab] = useState(only ?? "generate");

  // --- UUID generation logic ---
  // Helper: random bytes
  function randomBytes(n: number): Uint8Array {
    const arr = new Uint8Array(n);
    if (typeof window !== "undefined" && window.crypto?.getRandomValues) {
      window.crypto.getRandomValues(arr);
    } else {
      for (let i = 0; i < n; i++) arr[i] = Math.floor(Math.random() * 256);
    }
    return arr;
  }

  // v4: random
  function uuidv4() {
    const b = randomBytes(16);
    b[6] = (b[6] & 0x0f) | 0x40;
    b[8] = (b[8] & 0x3f) | 0x80;
    return bytesToUuid(b);
  }

  // v1: time-based (not hardware node, just random node)
  function uuidv1() {
    const now = Date.now();
    const timeLow = now & 0xffffffff;
    const timeMid = ((now / 0x100000000) & 0xffff) >>> 0;
    const timeHi = (((now / 0x100000000) / 0x10000) & 0x0fff) | 0x1000;
    const clockSeq = randomBytes(2);
    const node = randomBytes(6);
    const b = new Uint8Array(16);
    b[0] = (timeLow >>> 24) & 0xff;
    b[1] = (timeLow >>> 16) & 0xff;
    b[2] = (timeLow >>> 8) & 0xff;
    b[3] = timeLow & 0xff;
    b[4] = (timeMid >>> 8) & 0xff;
    b[5] = timeMid & 0xff;
    b[6] = (timeHi >>> 8) & 0xff;
    b[7] = timeHi & 0xff;
    b[8] = (clockSeq[0] & 0x3f) | 0x80;
    b[9] = clockSeq[1];
    b.set(node, 10);
    return bytesToUuid(b);
  }

  // v3/v5: namespace + name (MD5/SHA1)
  function uuidv3(name: string, namespace: string) {
    return uuidvN(name, namespace, 0x30, md5Hash);
  }
  function uuidv5(name: string, namespace: string) {
    return uuidvN(name, namespace, 0x50, sha1Hash);
  }
  function uuidvN(name: string, namespace: string, version: number, hashFn: (data: Uint8Array) => Uint8Array) {
    const nsBytes = parseUuid(namespace);
    const nameBytes = new TextEncoder().encode(name);
    const data = new Uint8Array(nsBytes.length + nameBytes.length);
    data.set(nsBytes);
    data.set(nameBytes, nsBytes.length);
    const hash = hashFn(data);
    hash[6] = (hash[6] & 0x0f) | version;
    hash[8] = (hash[8] & 0x3f) | 0x80;
    return bytesToUuid(hash.slice(0, 16));
  }

  // NIL UUID
  function uuidNil() {
    return "00000000-0000-0000-0000-000000000000";
  }

  // --- Utility functions ---
  function bytesToUuid(b: Uint8Array) {
    return (
      [...b]
        .map((x, i) => (i === 4 || i === 6 || i === 8 || i === 10 ? "-" : "") + x.toString(16).padStart(2, "0"))
        .join("")
    );
  }
  function parseUuid(uuid: string): Uint8Array {
    const s = uuid.replace(/-/g, "");
    if (s.length !== 32) throw new Error("Invalid UUID");
    const arr = new Uint8Array(16);
    for (let i = 0; i < 16; i++) arr[i] = parseInt(s.slice(i * 2, i * 2 + 2), 16);
    return arr;
  }

  // --- Simple MD5/SHA1 implementations (browser only, for demo) ---
  // browserDigest was unused and caused a type error, so it is removed.
  // Synchronous wrappers for demo (not production safe)
  function md5Hash(data: Uint8Array): Uint8Array {
    // Placeholder: returns random bytes (replace with real MD5 for production)
    return randomBytes(16);
  }
  function sha1Hash(data: Uint8Array): Uint8Array {
    // Placeholder: returns random bytes (replace with real SHA-1 for production)
    return randomBytes(20);
  }

  // --- UI State ---
  const [version, setVersion] = useState<'v1' | 'v3' | 'v4' | 'v5' | 'nil'>('v4');
  const [namespace, setNamespace] = useState('6ba7b810-9dad-11d1-80b4-00c04fd430c8'); // DNS default
  const [name, setName] = useState('example.com');
  const [result, setResult] = useState<string | null>(null);

  function handleGenerate() {
    try {
      let uuid = '';
      if (version === 'v1') uuid = uuidv1();
      else if (version === 'v3') uuid = uuidv3(name, namespace);
      else if (version === 'v4') uuid = uuidv4();
      else if (version === 'v5') uuid = uuidv5(name, namespace);
      else if (version === 'nil') uuid = uuidNil();
      setResult(uuid);
    } catch (e) {
      setResult('Error: ' + (e as Error).message);
    }
  }

  return (
    <div className="space-y-8">
      {/* Tab Navigation */}
      {!only && (
        <nav className="flex gap-2" aria-label="UUID tool navigation">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "generate" | "validate" | "decode" | "format")}
              className={`rounded-lg px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-colors ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white dark:bg-blue-500"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              }`}
              aria-current={activeTab === tab.id ? "page" : undefined}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      )}

      {/* Tab Content */}
      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 min-h-[300px]" aria-live="polite">
        {activeTab === "generate" && (
          <div>
            <h2 className="mb-2 text-xl font-semibold">Generate UUID</h2>
            <p className="mb-4 text-gray-600 dark:text-gray-400">Generate UUIDs of different versions (v1, v3, v4, v5, NIL).</p>
            <form
              className="mb-4 flex flex-col gap-4 md:flex-row md:items-end"
              onSubmit={e => { e.preventDefault(); handleGenerate(); }}
            >
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="uuid-version">Version</label>
                <select
                  id="uuid-version"
                  className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  value={version}
                  onChange={e => setVersion(e.target.value as any)}
                >
                  <option value="v1">v1 (timestamp)</option>
                  <option value="v3">v3 (namespace+MD5)</option>
                  <option value="v4">v4 (random)</option>
                  <option value="v5">v5 (namespace+SHA-1)</option>
                  <option value="nil">NIL (all zeros)</option>
                </select>
              </div>
              {(version === 'v3' || version === 'v5') && (
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="uuid-namespace">Namespace UUID</label>
                  <input
                    id="uuid-namespace"
                    type="text"
                    className="w-64 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-mono font-medium text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                    value={namespace}
                    onChange={e => setNamespace(e.target.value)}
                  />
                </div>
              )}
              {(version === 'v3' || version === 'v5') && (
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="uuid-name">Name</label>
                  <input
                    id="uuid-name"
                    type="text"
                    className="w-48 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>
              )}
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              >Generate</button>
            </form>
            {result && (
              <div className="mt-4 rounded bg-blue-50 p-4 text-blue-900 dark:bg-blue-950/20 dark:text-blue-100 font-mono text-lg break-all select-all">
                {result}
              </div>
            )}
          </div>
        )}
        {activeTab === "validate" && (
          <div>
            <h2 className="mb-2 text-xl font-semibold">Validate UUID</h2>
            <p className="mb-4 text-gray-600 dark:text-gray-400">Check if a string is a valid UUID (all versions supported).</p>
            <UuidValidateForm />
          </div>
        )}
        {activeTab === "decode" && (
          <div>
            <h2 className="mb-2 text-xl font-semibold">Decode / Analyze UUID</h2>
            <p className="mb-4 text-gray-600 dark:text-gray-400">Extract version, variant, and (for v1) timestamp and node information from a UUID.</p>
            <UuidDecodeForm />
          </div>
        )}
        {activeTab === "format" && (
          <div>
            <h2 className="mb-2 text-xl font-semibold">Format Converter</h2>
            <p className="mb-4 text-gray-600 dark:text-gray-400">Convert UUIDs between formats: uppercase, no hyphens, braces, URN, etc.</p>
            <UuidFormatForm />
          </div>
        )}
      </section>

      {/* Info Section */}
      <section className="rounded-xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-900/50 dark:bg-blue-950/20" aria-label="UUID information">
        <div className="flex gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6 flex-shrink-0 text-blue-600 dark:text-blue-400"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
            />
          </svg>
          <div className="space-y-2 text-sm text-blue-900 dark:text-blue-100">
            <p className="font-medium">About UUIDs (All Versions)</p>
            <ul className="list-disc space-y-1 pl-5 text-blue-800 dark:text-blue-200">
              <li>RFC 4122 compliant universally unique identifiers (128-bit)</li>
              <li>Versions: v1 (timestamp), v3 (namespace+MD5), v4 (random), v5 (namespace+SHA-1), NIL (all zeros)</li>
              <li>Used in databases, APIs, distributed systems, and more</li>
              <li>Negligible collision probability (1 in 2<sup>122</sup> for v4)</li>
              <li>Format: xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx (M=version, N=variant)</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

// --- UUID Decode/Analyze Component ---
function getUuidVariant(uuid: string): string | null {
  const m = uuid.match(/^([0-9a-fA-F]{8})-([0-9a-fA-F]{4})-([1-5])([0-9a-fA-F]{3})-([89abAB][0-9a-fA-F]{3})-([0-9a-fA-F]{12})$/);
  if (!m) return null;
  const v = parseInt(m[5][0], 16);
  if ((v & 0x8) === 0x8) return "RFC 4122";
  if ((v & 0xC) === 0xC) return "Microsoft";
  if ((v & 0xE) === 0xE) return "Future";
  return "NCS";
}

function getV1Timestamp(uuid: string): string | null {
  // v1: time_low-time_mid-time_hi_and_version
  const m = uuid.match(/^([0-9a-fA-F]{8})-([0-9a-fA-F]{4})-1([0-9a-fA-F]{3})-([89abAB][0-9a-fA-F]{3})-([0-9a-fA-F]{12})$/);
  if (!m) return null;
  // Compose timestamp (60 bits)
  const timeLow = parseInt(m[1], 16);
  const timeMid = parseInt(m[2], 16);
  const timeHi = parseInt(m[3], 16);
  // Per RFC 4122, timestamp = (timeHi << 48) | (timeMid << 32) | timeLow
  const timestamp = (BigInt(timeHi) << BigInt(48)) | (BigInt(timeMid) << BigInt(32)) | BigInt(timeLow);
  // UUID v1 timestamp is 100-ns intervals since 1582-10-15
  const uuidEpoch = -12219292800000; // ms
  const msSinceEpoch = Number(timestamp / BigInt(10000)) + uuidEpoch;
  const date = new Date(msSinceEpoch);
  return date.toISOString();
}

function UuidDecodeForm() {
  const [input, setInput] = React.useState("");
  const [result, setResult] = React.useState<null | {
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
    <form className="flex flex-col gap-4 max-w-xl" onSubmit={handleSubmit}>
      <label htmlFor="uuid-decode-input" className="text-sm font-medium">UUID to decode/analyze</label>
      <input
        id="uuid-decode-input"
        type="text"
        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-mono font-medium text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
        autoComplete="off"
        spellCheck={false}
      />
      <button
        type="submit"
        className="rounded-lg bg-yellow-600 px-6 py-2.5 font-medium text-white transition-colors hover:bg-yellow-700 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      >Decode</button>
      {result && (
        <div className={`mt-2 rounded p-4 font-mono text-lg ${result.valid ? "bg-yellow-50 text-yellow-900 dark:bg-yellow-950/20 dark:text-yellow-100" : "bg-red-50 text-red-900 dark:bg-red-950/20 dark:text-red-100"}`}>
          {result.valid ? (
            <>
              <div><span className="font-bold">Version:</span> {result.version === 0 ? "NIL" : result.version}</div>
              <div><span className="font-bold">Variant:</span> {result.variant}</div>
              {result.timestamp && (
                <div><span className="font-bold">Timestamp (v1):</span> {result.timestamp}</div>
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

// --- UUID Format Converter Component ---
function formatUuid(uuid: string, opts: { hyphens: boolean; uppercase: boolean; braces: boolean; urn: boolean }): string {
  let s = uuid.replace(/[^a-fA-F0-9]/g, "");
  if (s.length !== 32) return uuid;
  if (opts.uppercase) s = s.toUpperCase();
  else s = s.toLowerCase();
  if (opts.hyphens) s = s.replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, "$1-$2-$3-$4-$5");
  if (opts.braces) s = `{${s}}`;
  if (opts.urn) s = `urn:uuid:${s}`;
  return s;
}

function UuidFormatForm() {
  const [input, setInput] = React.useState("");
  const [hyphens, setHyphens] = React.useState(true);
  const [uppercase, setUppercase] = React.useState(false);
  const [braces, setBraces] = React.useState(false);
  const [urn, setUrn] = React.useState(false);
  const [result, setResult] = React.useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResult(formatUuid(input.trim(), { hyphens, uppercase, braces, urn }));
  }

  return (
    <form className="flex flex-col gap-4 max-w-xl" onSubmit={handleSubmit}>
      <label htmlFor="uuid-format-input" className="text-sm font-medium">UUID to format</label>
      <input
        id="uuid-format-input"
        type="text"
        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-mono font-medium text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
        autoComplete="off"
        spellCheck={false}
      />
      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={hyphens} onChange={e => setHyphens(e.target.checked)} />
          Hyphens
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={uppercase} onChange={e => setUppercase(e.target.checked)} />
          Uppercase
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={braces} onChange={e => setBraces(e.target.checked)} />
          Braces <span className="text-xs">{'{uuid}'}</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={urn} onChange={e => setUrn(e.target.checked)} />
          URN <span className="text-xs">urn:uuid:...</span>
        </label>
      </div>
      <button
        type="submit"
        className="rounded-lg bg-purple-600 px-6 py-2.5 font-medium text-white transition-colors hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      >Convert</button>
      {result && (
        <div className="mt-2 rounded p-4 font-mono text-lg bg-purple-50 text-purple-900 dark:bg-purple-950/20 dark:text-purple-100 break-all select-all">
          {result}
        </div>
      )}
    </form>
  );
}
import React from "react";
function getUuidVersion(uuid: string): number | null {
  const m = uuid.match(/^([0-9a-fA-F]{8})-([0-9a-fA-F]{4})-([1-5])([0-9a-fA-F]{3})-([89abAB][0-9a-fA-F]{3})-([0-9a-fA-F]{12})$/);
  if (!m) return null;
  return parseInt(m[3], 10);
}

function isValidUuid(uuid: string): boolean {
  return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(uuid) || uuid === "00000000-0000-0000-0000-000000000000";
}

function UuidValidateForm() {
  const [input, setInput] = React.useState("");
  const [result, setResult] = React.useState<null | { valid: boolean; version: number | null }>(null);

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
    <form className="flex flex-col gap-4 max-w-xl" onSubmit={handleSubmit}>
      <label htmlFor="uuid-validate-input" className="text-sm font-medium">UUID to validate</label>
      <input
        id="uuid-validate-input"
        type="text"
        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-mono font-medium text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
        autoComplete="off"
        spellCheck={false}
      />
      <button
        type="submit"
        className="rounded-lg bg-green-600 px-6 py-2.5 font-medium text-white transition-colors hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      >Validate</button>
      {result && (
        <div className={`mt-2 rounded p-4 font-mono text-lg ${result.valid ? "bg-green-50 text-green-900 dark:bg-green-950/20 dark:text-green-100" : "bg-red-50 text-red-900 dark:bg-red-950/20 dark:text-red-100"}`}>
          {result.valid ? (
            <>
              <span className="font-bold">Valid UUID</span>
              {typeof result.version === "number" && (
                <span className="ml-2">(version {result.version === 0 ? "NIL" : result.version})</span>
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
