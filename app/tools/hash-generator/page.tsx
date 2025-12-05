import Breadcrumb from "@/components/breadcrumb";
import { HashGeneratorUI } from "./hash-generator-ui";
import type { Metadata } from "next";
import { ToolSchema } from "@/components/tool-schema";

export const metadata: Metadata = {
  title: "Hash Generator - MD5, SHA-1, SHA-256, SHA-512 & HMAC",
  description:
    "Generate cryptographic hashes (MD5, SHA-1, SHA-256, SHA-512) and HMAC for data integrity verification, password hashing, and file checksums. Free online hash calculator with live mode.",
  keywords: [
    "hash generator",
    "md5",
    "sha1",
    "sha256",
    "sha512",
    "hmac",
    "checksum",
    "hash calculator",
    "cryptographic hash",
    "message digest",
    "password hash",
  ],
  openGraph: {
    title: "Hash Generator — MD5, SHA-256, SHA-512 & HMAC Calculator",
    description:
      "Generate cryptographic hashes with MD5, SHA-1, SHA-256, SHA-512. HMAC support for API signing. Free online hash tool with instant results.",
    url: "https://developerutilitytools.com/tools/hash-generator",
    siteName: "DeveloperUtilityTools",
  },
  twitter: {
    card: "summary",
    title: "Hash Generator — DeveloperUtilityTools",
    description:
      "Generate MD5, SHA-256, SHA-512 hashes and HMAC. Free cryptographic hash calculator for developers.",
  },
  alternates: {
    canonical: "https://developerutilitytools.com/tools/hash-generator",
  },
};

export default function HashGeneratorPage() {
  return (
    <>
      <ToolSchema
        name="Hash Generator"
        description="Generate cryptographic hashes (MD5, SHA-1, SHA-256, SHA-512) and HMAC for data integrity and password hashing"
        url="/tools/hash-generator"
        keywords={[
          "hash generator",
          "md5 generator",
          "sha256 generator",
          "hmac calculator",
          "cryptographic hash",
        ]}
      />
      <div className="container mx-auto px-4 py-4">
        <div className="mb-8">
          <Breadcrumb />
          <h1 className="mb-3 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            Hash Generator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Generate cryptographic hashes using MD5, SHA-1, SHA-256, and SHA-512
            algorithms. Support for HMAC, multiple input formats, and instant
            browser-based processing for complete privacy.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <HashGeneratorUI />
        </div>

        {/* SEO Content Sections */}
        <div className="mt-16 space-y-12">
          {/* What is Hash */}
          <section>
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-gray-50">
              What is a Cryptographic Hash?
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                A cryptographic hash function is a mathematical algorithm that
                takes an input (or &apos;message&apos;) and returns a fixed-size
                string of bytes called a hash value, message digest, or simply
                hash. The output is typically a hexadecimal number that uniquely
                represents the input data.
              </p>
              <p>
                Hash functions are designed to be one-way functions, meaning
                it&apos;s practically impossible to reverse the process and
                determine the original input from the hash output. Even a tiny
                change to the input data produces a completely different hash
                value, making hash functions ideal for detecting data tampering
                and ensuring data integrity.
              </p>
              <p>
                Unlike encryption, which is designed to be reversible with the
                correct key, hash functions are intentionally irreversible. This
                makes them perfect for password storage, digital signatures, and
                verifying data hasn&apos;t been corrupted or modified during
                transmission.
              </p>
            </div>
          </section>

          {/* Common Use Cases */}
          <section>
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-gray-50">
              Common Use Cases for Hash Functions
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-6 dark:border-indigo-800 dark:bg-indigo-950/20">
                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-gray-50">
                  Password Storage
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Storing password hashes instead of plain text passwords
                  ensures that even if a database is compromised, the actual
                  passwords remain protected. Modern systems use SHA-256 or
                  stronger algorithms combined with salting and key stretching.
                </p>
              </div>
              <div className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-6 dark:border-indigo-800 dark:bg-indigo-950/20">
                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-gray-50">
                  File Integrity Verification
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Software downloads often include SHA-256 checksums that allow
                  users to verify the downloaded file hasn&apos;t been corrupted
                  or tampered with. Comparing the hash of the downloaded file
                  with the published hash confirms authenticity.
                </p>
              </div>
              <div className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-6 dark:border-indigo-800 dark:bg-indigo-950/20">
                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-gray-50">
                  Digital Signatures
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Hash functions are essential in digital signature schemes. The
                  document is hashed first, then the hash is encrypted with a
                  private key. This ensures authenticity and non-repudiation
                  while keeping signature sizes manageable.
                </p>
              </div>
              <div className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-6 dark:border-indigo-800 dark:bg-indigo-950/20">
                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-gray-50">
                  Blockchain and Cryptocurrencies
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Bitcoin and other cryptocurrencies use SHA-256 extensively for
                  mining and creating secure, tamper-proof chains of
                  transactions. Each block contains the hash of the previous
                  block, creating an immutable ledger.
                </p>
              </div>
              <div className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-6 dark:border-indigo-800 dark:bg-indigo-950/20">
                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-gray-50">
                  Data Deduplication
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Cloud storage and backup systems use hash functions to
                  identify duplicate files. Files with identical hashes are
                  stored only once, saving storage space while maintaining data
                  integrity across multiple users.
                </p>
              </div>
              <div className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-6 dark:border-indigo-800 dark:bg-indigo-950/20">
                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-gray-50">
                  API Security
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  HMAC (Hash-based Message Authentication Code) uses hash
                  functions with a secret key to verify both data integrity and
                  authenticity in API requests, webhooks, and secure
                  communications between services.
                </p>
              </div>
            </div>
          </section>

          {/* Algorithm Comparison */}
          <section>
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-gray-50">
              Hash Algorithm Comparison
            </h2>
            <div className="space-y-6">
              <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-800/50">
                    <tr>
                      <th className="px-6 py-3 font-semibold text-gray-900 dark:text-gray-50">
                        Algorithm
                      </th>
                      <th className="px-6 py-3 font-semibold text-gray-900 dark:text-gray-50">
                        Hash Size
                      </th>
                      <th className="px-6 py-3 font-semibold text-gray-900 dark:text-gray-50">
                        Security
                      </th>
                      <th className="px-6 py-3 font-semibold text-gray-900 dark:text-gray-50">
                        Use Cases
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/30">
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-50">
                        MD5
                      </td>
                      <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                        128-bit (32 hex chars)
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900/30 dark:text-red-400">
                          Broken
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                        Legacy checksums, not for security
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/30">
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-50">
                        SHA-1
                      </td>
                      <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                        160-bit (40 hex chars)
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">
                          Deprecated
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                        Git commits, legacy systems
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/30">
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-50">
                        SHA-256
                      </td>
                      <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                        256-bit (64 hex chars)
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          Strong
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                        Passwords, certificates, blockchain
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/30">
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-50">
                        SHA-512
                      </td>
                      <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                        512-bit (128 hex chars)
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          Very Strong
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                        High-security applications, government
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-6 dark:border-yellow-800/50 dark:bg-yellow-950/20">
                <h3 className="mb-3 flex items-start gap-2 text-lg font-semibold text-yellow-900 dark:text-yellow-200">
                  <span className="text-xl">⚠️</span>
                  Security Note
                </h3>
                <p className="text-yellow-800 dark:text-yellow-300">
                  <strong>MD5 and SHA-1 are cryptographically broken</strong>{" "}
                  and should not be used for security purposes. Collision
                  attacks have been demonstrated for both algorithms. Use
                  SHA-256 or SHA-512 for any security-critical applications. MD5
                  is acceptable only for non-security purposes like checksums
                  for data corruption detection.
                </p>
              </div>
            </div>
          </section>

          {/* HMAC Explanation */}
          <section>
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-gray-50">
              Understanding HMAC
            </h2>
            <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <p className="text-gray-700 dark:text-gray-300">
                HMAC (Hash-based Message Authentication Code) is a mechanism for
                calculating a message authentication code involving a
                cryptographic hash function in combination with a secret key. It
                provides both data integrity and authentication.
              </p>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                  Key Features:
                </h3>
                <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
                  <li>
                    <strong>Authentication:</strong> Verifies the message came
                    from the claimed sender
                  </li>
                  <li>
                    <strong>Integrity:</strong> Ensures the message hasn&apos;t
                    been tampered with
                  </li>
                  <li>
                    <strong>Secret Key:</strong> Only parties with the secret
                    key can generate valid HMACs
                  </li>
                  <li>
                    <strong>Algorithm Agnostic:</strong> Can be used with any
                    hash function (HMAC-MD5, HMAC-SHA256, etc.)
                  </li>
                </ul>
              </div>
              <div className="mt-6 rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
                <h3 className="mb-2 text-sm font-semibold text-gray-900 dark:text-gray-50">
                  Common HMAC Use Cases:
                </h3>
                <ul className="ml-6 list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  <li>API request signing (AWS, Stripe, GitHub webhooks)</li>
                  <li>JWT token signatures</li>
                  <li>Cookie tamper protection</li>
                  <li>Message verification in secure communications</li>
                  <li>Password-based key derivation (PBKDF2)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section>
            <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-gray-50">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <details className="group rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                <summary className="cursor-pointer text-lg font-semibold text-gray-900 dark:text-gray-50">
                  Can I reverse a hash to get the original data?
                </summary>
                <p className="mt-3 text-gray-700 dark:text-gray-300">
                  No, cryptographic hash functions are designed to be one-way
                  and irreversible. You cannot recover the original input from a
                  hash. This is a fundamental property of hash functions, not a
                  bug or limitation. However, weak hashes like MD5 can be
                  vulnerable to rainbow table attacks where pre-computed hashes
                  are used to guess common inputs.
                </p>
              </details>

              <details className="group rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                <summary className="cursor-pointer text-lg font-semibold text-gray-900 dark:text-gray-50">
                  Is hashing the same as encryption?
                </summary>
                <p className="mt-3 text-gray-700 dark:text-gray-300">
                  No, they serve different purposes. Encryption is designed to
                  be reversible with the correct key—you can decrypt encrypted
                  data. Hashing is one-way and irreversible. Encryption protects
                  confidentiality, while hashing ensures integrity and is used
                  for verification, not secrecy. Never use hash functions when
                  you need to retrieve the original data later.
                </p>
              </details>

              <details className="group rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                <summary className="cursor-pointer text-lg font-semibold text-gray-900 dark:text-gray-50">
                  Which hash algorithm should I use?
                </summary>
                <p className="mt-3 text-gray-700 dark:text-gray-300">
                  For security purposes, use <strong>SHA-256 or SHA-512</strong>
                  . Avoid MD5 and SHA-1 as they&apos;re cryptographically
                  broken. For general-purpose checksums where security
                  isn&apos;t a concern, MD5 is acceptable. For password hashing,
                  use specialized algorithms like bcrypt, scrypt, or Argon2
                  instead of plain hash functions. For blockchain applications,
                  SHA-256 is the industry standard.
                </p>
              </details>

              <details className="group rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                <summary className="cursor-pointer text-lg font-semibold text-gray-900 dark:text-gray-50">
                  What is a hash collision?
                </summary>
                <p className="mt-3 text-gray-700 dark:text-gray-300">
                  A hash collision occurs when two different inputs produce the
                  same hash output. While theoretically possible due to the
                  pigeonhole principle (infinite inputs, finite outputs), good
                  hash functions make collisions extremely unlikely. MD5 and
                  SHA-1 are vulnerable to collision attacks, which is why
                  they&apos;re deprecated. SHA-256 and SHA-512 are currently
                  collision-resistant.
                </p>
              </details>

              <details className="group rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                <summary className="cursor-pointer text-lg font-semibold text-gray-900 dark:text-gray-50">
                  Is my data safe using this tool?
                </summary>
                <p className="mt-3 text-gray-700 dark:text-gray-300">
                  Absolutely. All hash calculations are performed entirely in
                  your browser using the Web Crypto API. No data is ever sent to
                  our servers or any third party. You can even use this tool
                  offline once the page is loaded. Your sensitive data remains
                  completely private and secure on your device.
                </p>
              </details>

              <details className="group rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                <summary className="cursor-pointer text-lg font-semibold text-gray-900 dark:text-gray-50">
                  Why are the hash outputs always the same length?
                </summary>
                <p className="mt-3 text-gray-700 dark:text-gray-300">
                  Hash functions produce fixed-size outputs regardless of input
                  size. MD5 always produces 128 bits (32 hex characters),
                  SHA-256 always produces 256 bits (64 hex characters), and
                  SHA-512 always produces 512 bits (128 hex characters). This
                  consistency makes hashes predictable and suitable for storage
                  in databases and comparison operations.
                </p>
              </details>

              <details className="group rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                <summary className="cursor-pointer text-lg font-semibold text-gray-900 dark:text-gray-50">
                  When should I use HMAC instead of regular hashing?
                </summary>
                <p className="mt-3 text-gray-700 dark:text-gray-300">
                  Use HMAC when you need both integrity and authenticity
                  verification with a shared secret key. Regular hashes verify
                  integrity only—anyone can compute them. HMAC requires a secret
                  key, so only parties with the key can generate valid
                  signatures. This is essential for API authentication, message
                  verification, and preventing tampering in untrusted
                  environments.
                </p>
              </details>

              <details className="group rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                <summary className="cursor-pointer text-lg font-semibold text-gray-900 dark:text-gray-50">
                  Can I use this for password hashing?
                </summary>
                <p className="mt-3 text-gray-700 dark:text-gray-300">
                  While you can technically hash passwords with SHA-256,
                  it&apos;s not recommended for production systems. Password
                  hashing requires specialized algorithms like bcrypt, scrypt,
                  or Argon2 that are designed to be slow and include automatic
                  salting. This tool is best for testing, learning, or
                  generating hashes for non-password data like file checksums
                  and API signatures.
                </p>
              </details>

              <details className="group rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                <summary className="cursor-pointer text-lg font-semibold text-gray-900 dark:text-gray-50">
                  What input formats are supported?
                </summary>
                <p className="mt-3 text-gray-700 dark:text-gray-300">
                  This tool supports plain text (UTF-8), hexadecimal strings,
                  and Base64-encoded data as input formats. UTF-8 handles all
                  Unicode characters including emoji and international text. For
                  file hashing, you can paste the file content, though for large
                  binary files, specialized tools are more appropriate. The tool
                  automatically handles character encoding to ensure consistent
                  results.
                </p>
              </details>

              <details className="group rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                <summary className="cursor-pointer text-lg font-semibold text-gray-900 dark:text-gray-50">
                  Why do some websites use salted hashes?
                </summary>
                <p className="mt-3 text-gray-700 dark:text-gray-300">
                  A salt is random data added to passwords before hashing to
                  defend against rainbow table attacks and prevent identical
                  passwords from producing identical hashes. Each user gets a
                  unique salt stored alongside their hash. This means attackers
                  must compute rainbow tables for each salt, making pre-computed
                  attacks impractical. Salting is crucial for password security
                  but isn&apos;t needed for checksums or file verification.
                </p>
              </details>
            </div>
          </section>

          {/* Technical Details */}
          <section>
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-gray-50">
              Technical Implementation
            </h2>
            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  This tool uses the{" "}
                  <strong>Web Crypto API (SubtleCrypto)</strong> built into
                  modern browsers for native, hardware-accelerated hash
                  computation. The Web Crypto API provides cryptographically
                  secure implementations of:
                </p>
                <ul className="ml-6 list-disc space-y-2">
                  <li>
                    <strong>SHA-1:</strong> Part of the SHA family, now
                    deprecated for security use
                  </li>
                  <li>
                    <strong>SHA-256:</strong> Part of SHA-2 family, widely used
                    and recommended
                  </li>
                  <li>
                    <strong>SHA-512:</strong> Part of SHA-2 family, highest
                    security in SHA-2
                  </li>
                </ul>
                <p className="mt-4">
                  For MD5 (not available in Web Crypto API due to its
                  vulnerabilities), we use a JavaScript implementation. Note
                  that MD5 is provided for compatibility and legacy checksums
                  only—it should never be used for security purposes.
                </p>
                <div className="mt-6 rounded-lg bg-indigo-50 p-4 dark:bg-indigo-950/30">
                  <h3 className="mb-2 text-sm font-semibold text-gray-900 dark:text-gray-50">
                    Browser Compatibility:
                  </h3>
                  <p className="text-sm">
                    Web Crypto API is supported in all modern browsers: Chrome
                    37+, Firefox 34+, Safari 11+, Edge 12+. All hash
                    computations are performed locally—no server round-trips or
                    external dependencies.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Related Tools */}
          <section>
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-gray-50">
              Related Tools
            </h2>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              Explore other security and encoding tools:
            </p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <a
                href="/tools/base64"
                className="group rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-green-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-green-700"
              >
                <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-green-600 dark:text-gray-50 dark:group-hover:text-green-400">
                  Base64 Encoder/Decoder
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Encode and decode Base64 strings for data transmission
                </p>
              </a>
              <a
                href="/tools/jwt-decoder"
                className="group rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-red-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-red-700"
              >
                <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-red-600 dark:text-gray-50 dark:group-hover:text-red-400">
                  JWT Decoder
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Decode and verify JSON Web Tokens with HMAC signatures
                </p>
              </a>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
