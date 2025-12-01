import * as Diff from "diff";

export type DiffMode = "chars" | "words" | "lines";
export type ViewMode = "unified" | "split";

export interface DiffOptions {
  ignoreCase?: boolean;
  ignoreWhitespace?: boolean;
  newlineIsToken?: boolean;
}

export interface Change {
  value: string;
  added?: boolean;
  removed?: boolean;
  count?: number;
}

export interface DiffResult {
  changes: Change[];
  addedCount: number;
  removedCount: number;
  unchangedCount: number;
}

/**
 * Compute the difference between two texts
 */
export function computeDiff(
  oldText: string,
  newText: string,
  mode: DiffMode,
  options: DiffOptions = {}
): DiffResult {
  let changes: Change[] = [];

  switch (mode) {
    case "chars":
      changes = Diff.diffChars(oldText, newText, {
        ignoreCase: options.ignoreCase,
      });
      break;
    case "words":
      changes = Diff.diffWords(oldText, newText, {
        ignoreCase: options.ignoreCase,
      });
      break;
    case "lines":
      changes = Diff.diffLines(oldText, newText, {
        ignoreWhitespace: options.ignoreWhitespace,
        newlineIsToken: options.newlineIsToken,
      });
      break;
  }

  // Calculate statistics
  let addedCount = 0;
  let removedCount = 0;
  let unchangedCount = 0;

  changes.forEach((change) => {
    if (change.added) {
      addedCount += change.count || 0;
    } else if (change.removed) {
      removedCount += change.count || 0;
    } else {
      unchangedCount += change.count || 0;
    }
  });

  return {
    changes,
    addedCount,
    removedCount,
    unchangedCount,
  };
}

/**
 * Split text into lines while preserving line endings
 */
export function splitLines(text: string): string[] {
  return text.split(/\r?\n/);
}

/**
 * Prepare changes for unified view
 */
export function prepareUnifiedView(changes: Change[]): Change[] {
  return changes;
}

/**
 * Prepare changes for split view
 */
export function prepareSplitView(changes: Change[]): {
  leftLines: Array<{ value: string; type: "removed" | "unchanged" | "empty" }>;
  rightLines: Array<{ value: string; type: "added" | "unchanged" | "empty" }>;
} {
  const leftLines: Array<{
    value: string;
    type: "removed" | "unchanged" | "empty";
  }> = [];
  const rightLines: Array<{
    value: string;
    type: "added" | "unchanged" | "empty";
  }> = [];

  changes.forEach((change) => {
    const lines = splitLines(change.value);

    if (change.added) {
      // Add empty lines to left side
      lines.forEach((line) => {
        leftLines.push({ value: "", type: "empty" });
        rightLines.push({ value: line, type: "added" });
      });
    } else if (change.removed) {
      // Add empty lines to right side
      lines.forEach((line) => {
        leftLines.push({ value: line, type: "removed" });
        rightLines.push({ value: "", type: "empty" });
      });
    } else {
      // Unchanged lines appear on both sides
      lines.forEach((line) => {
        leftLines.push({ value: line, type: "unchanged" });
        rightLines.push({ value: line, type: "unchanged" });
      });
    }
  });

  return { leftLines, rightLines };
}

/**
 * Format changes as a unified diff patch
 */
export function createUnifiedPatch(
  oldText: string,
  newText: string,
  oldFilename = "Original",
  newFilename = "Modified",
  options: DiffOptions = {}
): string {
  return Diff.createPatch(
    oldFilename,
    oldText,
    newText,
    oldFilename,
    newFilename,
    {
      ignoreWhitespace: options.ignoreWhitespace,
    }
  );
}

/**
 * Get line numbers for split view
 */
export function getLineNumbers(text: string): number[] {
  const lines = splitLines(text);
  return lines.map((_, index) => index + 1);
}

/**
 * Highlight inline differences within a change
 */
export function highlightInlineChanges(
  oldValue: string,
  newValue: string
): {
  oldSegments: Array<{ text: string; changed: boolean }>;
  newSegments: Array<{ text: string; changed: boolean }>;
} {
  const charDiff = Diff.diffChars(oldValue, newValue);

  const oldSegments: Array<{ text: string; changed: boolean }> = [];
  const newSegments: Array<{ text: string; changed: boolean }> = [];

  charDiff.forEach((change) => {
    if (change.removed) {
      oldSegments.push({ text: change.value, changed: true });
    } else if (change.added) {
      newSegments.push({ text: change.value, changed: true });
    } else {
      oldSegments.push({ text: change.value, changed: false });
      newSegments.push({ text: change.value, changed: false });
    }
  });

  return { oldSegments, newSegments };
}
