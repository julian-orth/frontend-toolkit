import { Info } from "lucide-react";

export function InfoPanel() {
  return (
    <section
      className="w-full max-w-xl rounded-2xl border border-teal-100 bg-teal-50/60 p-6 dark:border-teal-900/40 dark:bg-teal-950/20"
      aria-label="UUID information"
    >
      <div className="flex gap-3">
        <Info
          className="h-6 w-6 flex-shrink-0 text-teal-600 dark:text-teal-400"
          aria-hidden="true"
        />
        <div className="space-y-2 text-sm text-teal-900 dark:text-teal-100">
          <p className="font-medium">About UUIDs (All Versions)</p>
          <ul className="list-disc space-y-1 pl-5 text-teal-800 dark:text-teal-200">
            <li>RFC 4122 compliant universally unique identifiers (128-bit)</li>
            <li>
              Versions: v1 (timestamp), v3 (namespace+MD5), v4 (random), v5
              (namespace+SHA-1), NIL (all zeros)
            </li>
            <li>Used in databases, APIs, distributed systems, and more</li>
            <li>
              Negligible collision probability (1 in 2<sup>122</sup> for v4)
            </li>
            <li>
              Format: xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx (M=version,
              N=variant)
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
