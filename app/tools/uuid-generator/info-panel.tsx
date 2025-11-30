import { Info } from "lucide-react";

export function InfoPanel() {
  return (
    <section
      aria-label="UUID information"
      className="w-full rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900"
    >
      <div className="flex gap-4">
        <Info
          className="h-6 w-6 flex-shrink-0 text-gray-700 dark:text-gray-300"
          aria-hidden="true"
        />
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p className="font-medium text-gray-900 dark:text-gray-50">
            About UUIDs
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Universally Unique Identifiers (UUIDs) are 128-bit values
            standardized by RFC 4122. They are commonly used as identifiers that
            do not require a centralized authority.
          </p>
          <ul className="list-disc space-y-1 pl-5 text-gray-600 dark:text-gray-400">
            <li>RFC 4122 compliant 128-bit identifiers</li>
            <li>
              Common versions: v1 (timestamp), v3/v5 (name-based), v4 (random),
              v7 (time-ordered), NIL (all zeros)
            </li>
            <li>
              Typical uses: database keys, API resource IDs, client-generated
              IDs
            </li>
            <li>
              v4 has ~122 bits of randomness; collisions are practically
              negligible
            </li>
            <li>
              Format: xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx (M = version, N =
              variant)
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
