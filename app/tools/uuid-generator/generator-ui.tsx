"use client";
import React, { useState, useEffect } from "react";
import { Loader2, ChevronDown } from "lucide-react";
import { uuidv1, uuidv3, uuidv4, uuidv5, uuidv7, uuidNil } from "./uuid-utils";
import { CopyButton } from "./copy-button";

export function GeneratorUI() {
  const [version, setVersion] = useState<
    "v1" | "v3" | "v4" | "v5" | "v7" | "nil"
  >("v4");

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const v = params.get("version");
      if (v && ["v1", "v3", "v4", "v5", "v7", "nil"].includes(v)) {
        setVersion(v as any);
      }
    } catch (e) {
      // noop
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (version === "v4") {
        params.delete("version");
      } else {
        params.set("version", version);
      }
      const search = params.toString();
      const newUrl =
        window.location.pathname +
        (search ? `?${search}` : "") +
        window.location.hash;
      window.history.replaceState({}, "", newUrl);
    } catch (e) {
      // noop
    }
  }, [version]);

  const [namespace, setNamespace] = useState(
    "6ba7b810-9dad-11d1-80b4-00c04fd430c8"
  );
  const [name, setName] = useState("example.com");
  const [count, setCount] = useState(1);
  const [result, setResult] = useState<string[] | null>(null);
  const [generating, setGenerating] = useState(false);

  async function handleGenerate() {
    setGenerating(true);
    const start = Date.now();
    try {
      const uuids: string[] = [];
      const n = Math.max(1, Math.min(count, 100));
      for (let i = 0; i < n; i++) {
        let uuid = "";
        if (version === "v1") uuid = uuidv1();
        else if (version === "v3") uuid = uuidv3(name, namespace);
        else if (version === "v4") uuid = uuidv4();
        else if (version === "v5") uuid = uuidv5(name, namespace);
        else if (version === "v7") uuid = uuidv7();
        else if (version === "nil") uuid = uuidNil();
        uuids.push(uuid);
      }
      const elapsed = Date.now() - start;
      if (elapsed < 1000) {
        await new Promise((res) => setTimeout(res, 1000 - elapsed));
      }
      setResult(uuids);
    } catch (e) {
      setResult(["Error: " + (e as Error).message]);
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div>
      <form
        className="mb-6 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleGenerate();
        }}
      >
        <div className="flex w-full flex-col">
          <label
            className="mb-1 block text-sm font-medium"
            htmlFor="uuid-version"
          >
            Version
          </label>
          <div className="select-icon-wrapper">
            <select
              id="uuid-version"
              className="h-12 w-full cursor-pointer appearance-none rounded-xl border border-teal-200 bg-white/80 px-3 pr-10 text-sm font-medium text-gray-900 focus:border-teal-500 focus:ring-2 focus:ring-teal-500 dark:border-teal-800 dark:bg-gray-900/60 dark:text-gray-100"
              value={version}
              onChange={(e) => setVersion(e.target.value as any)}
            >
              <option value="v1">v1 (timestamp)</option>
              <option value="v3">v3 (namespace+MD5)</option>
              <option value="v4">v4 (random)</option>
              <option value="v5">v5 (namespace+SHA-1)</option>
              <option value="v7">v7 (Unix time, random)</option>
              <option value="nil">NIL (all zeros)</option>
            </select>
            <ChevronDown
              className="select-icon h-4 w-4 text-gray-400 dark:text-gray-300"
              aria-hidden="true"
            />
          </div>
        </div>

        {(version === "v3" || version === "v5") && (
          <div className="flex w-full flex-col">
            <label
              className="mb-1 block text-sm font-medium"
              htmlFor="uuid-namespace"
            >
              Namespace UUID
            </label>
            <input
              id="uuid-namespace"
              type="text"
              className="h-12 w-full rounded-xl border border-teal-200 bg-white/80 px-3 font-mono text-sm font-medium text-gray-900 focus:border-teal-500 focus:ring-2 focus:ring-teal-500 dark:border-teal-800 dark:bg-gray-900/60 dark:text-gray-100"
              value={namespace}
              onChange={(e) => setNamespace(e.target.value)}
            />
          </div>
        )}

        {(version === "v3" || version === "v5") && (
          <div className="flex w-full flex-col">
            <label
              className="mb-1 block text-sm font-medium"
              htmlFor="uuid-name"
            >
              Name
            </label>
            <input
              id="uuid-name"
              type="text"
              className="h-12 w-full rounded-xl border border-teal-200 bg-white/80 px-3 text-sm font-medium text-gray-900 focus:border-teal-500 focus:ring-2 focus:ring-teal-500 dark:border-teal-800 dark:bg-gray-900/60 dark:text-gray-100"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        <div className="flex w-full flex-col">
          <label
            className="mb-1 block text-sm font-medium"
            htmlFor="uuid-count"
          >
            Count
          </label>
          <div className="select-icon-wrapper">
            <select
              id="uuid-count"
              className="h-12 w-full cursor-pointer appearance-none rounded-xl border border-teal-200 bg-white/80 px-3 pr-10 text-sm font-medium text-gray-900 focus:border-teal-500 focus:ring-2 focus:ring-teal-500 dark:border-teal-800 dark:bg-gray-900/60 dark:text-gray-100"
              value={String(count)}
              onChange={(e) => setCount(Number(e.target.value))}
            >
              <option value="1">1</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <ChevronDown
              className="select-icon h-4 w-4 text-gray-400 dark:text-gray-300"
              aria-hidden="true"
            />
          </div>
        </div>

        <button
          type="submit"
          className="h-12 w-full cursor-pointer rounded-xl bg-teal-600 px-6 font-semibold text-white shadow-md transition hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 dark:bg-teal-500 dark:hover:bg-teal-600"
          style={{ marginTop: "23px" }}
          disabled={generating}
        >
          {generating ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2
                className="h-5 w-5 animate-spin text-white"
                aria-hidden="true"
              />
              Generating...
            </span>
          ) : (
            "Generate"
          )}
        </button>
      </form>

      {result && (
        <div className="mt-4 flex w-full flex-col gap-2">
          {result.map((uuid, idx) => (
            <div key={idx} className="flex w-full items-center gap-3">
              <input
                type="text"
                value={uuid}
                readOnly
                className="h-12 flex-1 rounded-xl border border-teal-200 bg-white/60 px-4 font-mono text-lg text-gray-900 shadow-inner transition focus:ring-2 focus:ring-teal-500 focus:outline-none dark:border-teal-800 dark:bg-gray-900/60 dark:text-gray-100"
                aria-label={`Generated UUID ${idx + 1}`}
                style={{ letterSpacing: "0.04em" }}
              />
              <CopyButton value={uuid} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
