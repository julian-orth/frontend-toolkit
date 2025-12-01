import Breadcrumb from "@/components/breadcrumb";
import type { Metadata } from "next";
import { TextDiffUI } from "./text-diff-ui";

export const metadata: Metadata = {
  title: "Text Diff Checker - Compare Text Differences Online",
  description:
    "Free online text diff tool to compare two texts side-by-side or in unified view. Visualize additions, deletions, and changes with line-by-line, word-by-word, or character-by-character comparison.",
  keywords:
    "text diff, compare text, text comparison, diff checker, side by side diff, unified diff, text changes, file comparison, merge conflicts, code review",
  openGraph: {
    title: "Text Diff Checker - Compare Text Differences Online",
    description:
      "Compare two texts and visualize differences with split or unified view. Perfect for reviewing changes, merging files, and code reviews.",
  },
};

export default function TextDiffPage() {
  return (
    <div className="px-6 py-8">
      <div className="mb-8">
        <Breadcrumb />
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-black dark:text-white">
          Text Diff Checker
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Compare two texts and visualize differences side-by-side or in unified
          view
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <TextDiffUI />
      </div>

      {/* SEO Content Section */}
      <div className="mt-12 space-y-8">
        <section>
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
            About Text Diff Comparison
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              The Text Diff Checker is a powerful online tool for comparing two
              text documents and visualizing their differences. Whether you're
              reviewing code changes, comparing document versions, or resolving
              merge conflicts, our diff tool makes it easy to spot additions,
              deletions, and modifications between two texts.
            </p>
            <p>
              Our tool uses the industry-standard Myers diff algorithm, the same
              algorithm used by Git, to compute the smallest set of changes
              needed to transform one text into another. This ensures accurate
              and efficient comparison results.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
            Key Features
          </h2>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong>Multiple View Modes:</strong> Switch between split view
              (side-by-side) and unified view to see differences in your
              preferred format
            </li>
            <li>
              <strong>Flexible Comparison Modes:</strong> Compare texts
              line-by-line, word-by-word, or character-by-character for
              different levels of detail
            </li>
            <li>
              <strong>Smart Options:</strong> Ignore case sensitivity,
              whitespace, or treat newlines as separate tokens for customized
              comparisons
            </li>
            <li>
              <strong>Color-Coded Results:</strong> Additions are highlighted in
              green, deletions in red, making changes instantly visible
            </li>
            <li>
              <strong>File Upload Support:</strong> Load text files directly
              from your computer for quick comparison
            </li>
            <li>
              <strong>Export to Patch:</strong> Generate and download unified
              diff patches compatible with Git and other version control systems
            </li>
            <li>
              <strong>Real-Time Statistics:</strong> See counts of added,
              removed, and total changes at a glance
            </li>
            <li>
              <strong>Swap Function:</strong> Quickly switch between original
              and modified texts
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
            Common Use Cases
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Software Development
            </h3>
            <p>
              Perfect for code reviews, comparing different versions of source
              code, reviewing pull requests, and understanding changes between
              commits. The line-by-line comparison mode is ideal for reviewing
              code modifications.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Document Editing
            </h3>
            <p>
              Compare drafts of documents, articles, contracts, or any text
              content. Track edits made by collaborators and ensure no important
              changes are missed during the review process.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Configuration Management
            </h3>
            <p>
              Compare configuration files, settings, or environment variables
              before deploying changes. Quickly spot differences in JSON, XML,
              YAML, or any text-based configuration format.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Data Analysis
            </h3>
            <p>
              Compare CSV files, log files, or data exports to identify changes
              in datasets. The word and character comparison modes help identify
              even subtle differences in data.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
            Understanding Diff Formats
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Split View (Side-by-Side)
            </h3>
            <p>
              Split view displays the original text on the left and the modified
              text on the right, aligned by line numbers. Removed lines appear
              only on the left with red highlighting, added lines only on the
              right with green highlighting, and unchanged lines appear on both
              sides. This format is excellent for visual comparison and
              understanding the context around changes.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Unified View
            </h3>
            <p>
              Unified view shows all changes in a single column with markers:
              lines prefixed with "-" (minus) are deletions shown in red, lines
              prefixed with "+" (plus) are additions shown in green, and lines
              with no prefix are unchanged context. This format is compact and
              commonly used in version control systems like Git.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Unified Diff Patches
            </h3>
            <p>
              The tool can generate standard unified diff patches that follow
              the format used by the Unix diff utility and Git. These patches
              include file headers, line number ranges (@@), and change hunks
              that can be applied using patch tools or Git apply commands.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
            Comparison Modes Explained
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Line by Line
            </h3>
            <p>
              Treats each line as a single unit. Best for comparing code,
              configuration files, or structured text where line boundaries are
              meaningful. Changes within a line are shown as a complete line
              replacement. Supports options for ignoring whitespace and treating
              newlines as tokens.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Word by Word
            </h3>
            <p>
              Splits text into words and punctuation marks, comparing each as a
              separate token. Ideal for comparing prose, documentation, or
              natural language text where you want to see which specific words
              changed while preserving sentence structure. Supports
              case-insensitive comparison.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Character by Character
            </h3>
            <p>
              Compares every character individually, providing the most granular
              level of detail. Useful for finding subtle differences in strings,
              detecting typos, or comparing data where even single-character
              changes matter. Supports case-insensitive comparison for finding
              differences that aren't just capitalization.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
            Tips for Effective Comparison
          </h2>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              Use "Ignore whitespace" when comparing code to focus on actual
              changes rather than formatting differences like indentation or
              trailing spaces
            </li>
            <li>
              Enable "Ignore case" when capitalization differences aren't
              important, such as when comparing user-generated content
            </li>
            <li>
              Start with line-by-line comparison for a quick overview, then
              switch to word or character mode for detailed analysis of specific
              changes
            </li>
            <li>
              Use the sample data to familiarize yourself with how different
              modes and options affect the diff display
            </li>
            <li>
              Load files directly rather than copy-pasting for comparing large
              documents or code files
            </li>
            <li>
              Export patches when you need to share or apply changes using
              version control tools
            </li>
            <li>
              Use the swap button to quickly reverse the comparison direction
              and see changes from a different perspective
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
            Privacy and Security
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            All text comparison happens entirely in your browser - no data is
            sent to any server. Your text files and comparisons remain
            completely private and secure on your device. The tool works offline
            once loaded, so you can compare sensitive documents without any
            privacy concerns.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div>
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
                What algorithm does this tool use?
              </h3>
              <p>
                The tool uses the Myers diff algorithm (Eugene W. Myers, 1986),
                which is the industry standard for computing differences between
                texts. It's the same algorithm used by Git, Unix diff, and many
                other version control systems.
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
                Can I compare binary files?
              </h3>
              <p>
                This tool is designed for text comparison only. For binary
                files, you would need a specialized binary diff tool.
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
                Is there a file size limit?
              </h3>
              <p>
                The tool can handle reasonably large files (several megabytes),
                but very large files may be slow to process depending on your
                browser and device performance. For best results, consider
                comparing files under 1MB.
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
                Can I use the generated patch file with Git?
              </h3>
              <p>
                Yes! The unified diff patch format generated by this tool is
                compatible with Git and can be applied using "git apply" or
                similar patch tools.
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
                What's the difference between split and unified view?
              </h3>
              <p>
                Split view shows both texts side-by-side, making it easier to
                see the context and structure of both versions. Unified view
                combines both texts into a single column with +/- markers, which
                is more compact and matches the format used by Git and other
                version control systems.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
