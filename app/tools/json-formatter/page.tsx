import Breadcrumb from "@/components/breadcrumb";
import type { Metadata } from "next";
import { JsonFormatterClient } from "./client";

export const metadata: Metadata = {
  title: "JSON Formatter & Validator",
  description:
    "Format, validate, minify, and beautify JSON data online. Features include syntax highlighting, error detection, key sorting, and multiple indentation options.",
  keywords: [
    "json",
    "formatter",
    "validator",
    "beautifier",
    "minify",
    "pretty print",
    "json lint",
    "syntax",
  ],
  openGraph: {
    title: "JSON Formatter & Validator — Format, Validate & Beautify JSON",
    description:
      "Online JSON formatter and validator with advanced features: beautify, minify, validate, sort keys, and detect errors with line numbers.",
    url: "/tools/json-formatter",
    siteName: "Frontend Tools Hub",
  },
  twitter: {
    card: "summary",
    title: "JSON Formatter & Validator — Frontend Tools Hub",
    description:
      "Format, validate, and minify JSON with detailed error detection and multiple formatting options.",
  },
  alternates: {
    canonical: "/tools/json-formatter",
  },
};

export default function JsonFormatterPage() {
  return (
    <div className="px-6 py-8">
      <div className="mb-8">
        <Breadcrumb />
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-black dark:text-white">
          JSON Formatter & Validator
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Format, validate, minify, and beautify JSON data with advanced error
          detection and formatting options
        </p>
      </div>

      <JsonFormatterClient />

      <div className="mb-8 space-y-8">
        <section className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-2 text-2xl font-semibold text-gray-900 dark:text-gray-50">
            What is JSON?
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            JSON (JavaScript Object Notation) is a lightweight, text-based data
            interchange format that is easy for humans to read and write, and
            easy for machines to parse and generate. It&apos;s widely used for
            transmitting data in web applications between servers and clients,
            configuration files, and API responses.
          </p>
          <p className="mt-3 text-gray-600 dark:text-gray-400">
            JSON is language-independent but uses conventions familiar to
            programmers of C-family languages including C, C++, C#, Java,
            JavaScript, Perl, Python, and many others.
          </p>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-2 text-2xl font-semibold text-gray-900 dark:text-gray-50">
            Key Features
          </h2>
          <ul className="mt-4 list-disc pl-5 text-gray-600 dark:text-gray-400">
            <li>
              <strong>Format & Beautify:</strong> Convert minified JSON into
              human-readable format with customizable indentation (2, 3, or 4
              spaces)
            </li>
            <li>
              <strong>Validate:</strong> Check JSON syntax and get detailed
              error messages with line and column numbers
            </li>
            <li>
              <strong>Minify:</strong> Compress JSON by removing whitespace for
              reduced file size
            </li>
            <li>
              <strong>Sort Keys:</strong> Alphabetically sort object keys for
              better readability and consistency
            </li>
            <li>
              <strong>Line Numbers:</strong> Optional line numbering for easier
              navigation and debugging
            </li>
            <li>
              <strong>Copy & Download:</strong> Easily copy formatted JSON to
              clipboard or download as a file
            </li>
          </ul>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-2 text-2xl font-semibold text-gray-900 dark:text-gray-50">
            Common Use Cases
          </h2>
          <ul className="mt-4 list-disc pl-5 text-gray-600 dark:text-gray-400">
            <li>
              <strong>API Development:</strong> Format and validate API request
              and response payloads
            </li>
            <li>
              <strong>Configuration Files:</strong> Edit and validate JSON
              configuration files for applications
            </li>
            <li>
              <strong>Data Migration:</strong> Transform and validate data
              during migration processes
            </li>
            <li>
              <strong>Debugging:</strong> Identify syntax errors in JSON data
              with precise error locations
            </li>
            <li>
              <strong>Code Review:</strong> Format JSON for better readability
              in code reviews and documentation
            </li>
            <li>
              <strong>Performance:</strong> Minify JSON to reduce payload size
              in production environments
            </li>
          </ul>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-2 text-2xl font-semibold text-gray-900 dark:text-gray-50">
            JSON Syntax Rules
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            To write valid JSON, follow these basic rules:
          </p>
          <ul className="mt-4 list-disc pl-5 text-gray-600 dark:text-gray-400">
            <li>Data is in name/value pairs separated by colons</li>
            <li>Data is separated by commas</li>
            <li>
              Objects are enclosed in curly braces <code>{"{}"}</code>
            </li>
            <li>
              Arrays are enclosed in square brackets <code>[]</code>
            </li>
            <li>
              Strings must be enclosed in double quotes{" "}
              <code>&quot;text&quot;</code>
            </li>
            <li>
              Numbers can be integers or floating-point (no quotes required)
            </li>
            <li>
              Boolean values are <code>true</code> or <code>false</code> (no
              quotes)
            </li>
            <li>
              Null values are represented as <code>null</code>
            </li>
            <li>No trailing commas allowed after the last element</li>
            <li>
              No comments allowed (use a separate field for documentation if
              needed)
            </li>
          </ul>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-2 text-2xl font-semibold text-gray-900 dark:text-gray-50">
            Example JSON
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Here&apos;s an example of well-formatted JSON representing a user
            profile:
          </p>
          <pre className="mt-4 overflow-x-auto rounded bg-gray-100 p-4 text-sm dark:bg-gray-800">
            <code>{`{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "country": "USA"
  },
  "hobbies": ["reading", "coding", "hiking"],
  "isActive": true,
  "balance": 1234.56,
  "metadata": null
}`}</code>
          </pre>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-2 text-2xl font-semibold text-gray-900 dark:text-gray-50">
            Common JSON Errors
          </h2>
          <ul className="mt-4 list-disc pl-5 text-gray-600 dark:text-gray-400">
            <li>
              <strong>Trailing commas:</strong> Remove commas after the last
              item in objects or arrays
            </li>
            <li>
              <strong>Single quotes:</strong> Replace single quotes with double
              quotes around strings
            </li>
            <li>
              <strong>Unquoted keys:</strong> Always wrap object keys in double
              quotes
            </li>
            <li>
              <strong>Missing commas:</strong> Ensure items in arrays and
              objects are separated by commas
            </li>
            <li>
              <strong>Invalid escape sequences:</strong> Use proper escaping for
              special characters like <code>\n</code>, <code>\t</code>,{" "}
              <code>\"</code>
            </li>
            <li>
              <strong>Unclosed brackets/braces:</strong> Every opening bracket
              or brace must have a matching closing one
            </li>
          </ul>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-2 text-2xl font-semibold text-gray-900 dark:text-gray-50">
            Privacy & Security
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            All JSON formatting and validation is performed entirely in your
            browser. Your data never leaves your device and is not sent to any
            server. This ensures complete privacy and security for sensitive
            data.
          </p>
        </section>
      </div>
    </div>
  );
}
