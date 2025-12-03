/**
 * CSS Minifier/Beautifier Utilities
 */

export interface MinifyOptions {
  removeComments?: boolean;
  preserveImportant?: boolean;
}

export interface BeautifyOptions {
  indentSize?: number;
  indentChar?: string;
  preserveNewlines?: boolean;
}

/**
 * Minify CSS by removing whitespace, comments, and optimizing rules
 */
export function minifyCSS(css: string, options: MinifyOptions = {}): string {
  const { removeComments = true, preserveImportant = true } = options;

  let result = css;

  // Remove all comments except !important ones if preserveImportant is true
  if (removeComments) {
    if (preserveImportant) {
      // Preserve /*! */ style comments (important comments)
      result = result.replace(/\/\*(?!!)[^*]*\*+(?:[^/*][^*]*\*+)*\//g, "");
    } else {
      // Remove all comments
      result = result.replace(/\/\*[^*]*\*+(?:[^/*][^*]*\*+)*\//g, "");
    }
  }

  // Remove newlines and multiple spaces
  result = result.replace(/\n+/g, "");
  result = result.replace(/\s+/g, " ");

  // Remove spaces around special characters
  result = result.replace(/\s*([{}:;,>+~])\s*/g, "$1");

  // Remove space after colons in property values (but not in selectors)
  result = result.replace(/:\s+/g, ":");

  // Remove unnecessary semicolons before closing braces
  result = result.replace(/;}/g, "}");

  // Remove leading/trailing spaces
  result = result.trim();

  // Optimize hex colors (#FFFFFF -> #FFF)
  result = result.replace(
    /#([0-9a-fA-F])\1([0-9a-fA-F])\2([0-9a-fA-F])\3/g,
    "#$1$2$3"
  );

  // Remove units from zero values (0px -> 0)
  result = result.replace(
    /(\s|:)0(?:px|em|rem|%|vh|vw|vmin|vmax|cm|mm|in|pt|pc)/g,
    "$10"
  );

  // Optimize multiple zeros (0 0 0 0 -> 0)
  result = result.replace(/:0 0 0 0([;}])/g, ":0$1");
  result = result.replace(/:0 0 0([;}])/g, ":0$1");
  result = result.replace(/:0 0([;}])/g, ":0$1");

  return result;
}

/**
 * Beautify CSS by adding proper indentation and spacing
 */
export function beautifyCSS(
  css: string,
  options: BeautifyOptions = {}
): string {
  const {
    indentSize = 2,
    indentChar = " ",
    preserveNewlines = false,
  } = options;

  const indent = indentChar.repeat(indentSize);
  let result = css;
  let indentLevel = 0;

  // First, normalize the CSS by removing extra whitespace
  result = result.replace(/\n+/g, "\n");
  result = result.replace(/\s+/g, " ");
  result = result.trim();

  // Add newlines and indentation
  let formatted = "";
  let inComment = false;
  let inString = false;
  let stringChar = "";

  for (let i = 0; i < result.length; i++) {
    const char = result[i];
    const nextChar = result[i + 1];
    const prevChar = result[i - 1];

    // Track if we're inside a string
    if ((char === '"' || char === "'") && prevChar !== "\\") {
      if (!inString) {
        inString = true;
        stringChar = char;
      } else if (char === stringChar) {
        inString = false;
        stringChar = "";
      }
    }

    // Track if we're inside a comment
    if (!inString && char === "/" && nextChar === "*") {
      inComment = true;
    }
    if (inComment && char === "*" && nextChar === "/") {
      formatted += char;
      formatted += nextChar;
      i++;
      inComment = false;
      continue;
    }

    // Don't format inside strings or comments
    if (inString || inComment) {
      formatted += char;
      continue;
    }

    // Handle special characters
    if (char === "{") {
      formatted += " {\n";
      indentLevel++;
      formatted += indent.repeat(indentLevel);
    } else if (char === "}") {
      indentLevel--;
      formatted += "\n" + indent.repeat(indentLevel) + "}";

      // Add newline after closing brace if not at the end
      if (i < result.length - 1 && result[i + 1] !== "}") {
        formatted += "\n";
        if (indentLevel > 0) {
          formatted += indent.repeat(indentLevel);
        }
      }
    } else if (char === ";") {
      formatted += ";\n";
      if (indentLevel > 0) {
        formatted += indent.repeat(indentLevel);
      }
    } else if (char === "," && nextChar !== " ") {
      formatted += ", ";
    } else if (
      char === " " &&
      (prevChar === "{" || prevChar === ";" || prevChar === "}")
    ) {
      // Skip spaces after special characters as we handle them ourselves
      continue;
    } else {
      formatted += char;
    }
  }

  // Clean up multiple blank lines
  formatted = formatted.replace(/\n\s*\n\s*\n/g, "\n\n");

  // Clean up spaces before newlines
  formatted = formatted.replace(/ +\n/g, "\n");

  // Trim trailing whitespace
  formatted = formatted
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n");

  return formatted.trim() + "\n";
}

/**
 * Validate CSS syntax (basic validation)
 */
export function validateCSS(css: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check for unclosed braces
  const openBraces = (css.match(/{/g) || []).length;
  const closeBraces = (css.match(/}/g) || []).length;
  if (openBraces !== closeBraces) {
    errors.push(
      `Unmatched braces: ${openBraces} opening, ${closeBraces} closing`
    );
  }

  // Check for unclosed comments
  const commentStarts = (css.match(/\/\*/g) || []).length;
  const commentEnds = (css.match(/\*\//g) || []).length;
  if (commentStarts !== commentEnds) {
    errors.push(
      `Unclosed comments: ${commentStarts} opening, ${commentEnds} closing`
    );
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Calculate size statistics for CSS
 */
export function calculateCSSStats(original: string, processed: string) {
  const originalSize = new Blob([original]).size;
  const processedSize = new Blob([processed]).size;
  const savedBytes = originalSize - processedSize;
  const savedPercentage =
    originalSize > 0 ? ((savedBytes / originalSize) * 100).toFixed(1) : "0.0";

  return {
    originalSize,
    processedSize,
    savedBytes,
    savedPercentage,
    originalLines: original.split("\n").length,
    processedLines: processed.split("\n").length,
  };
}
