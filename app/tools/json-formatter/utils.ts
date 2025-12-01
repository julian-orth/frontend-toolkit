type ValidationResult = {
  isValid: boolean;
  error?: string;
  line?: number;
  column?: number;
};

type FormatResult = {
  formatted: string;
  validation: ValidationResult;
};

/**
 * Parse error message to extract line and column numbers
 */
function parseErrorPosition(errorMessage: string): {
  line?: number;
  column?: number;
} {
  // Try to extract position from error messages like:
  // "Unexpected token } in JSON at position 123"
  // "JSON.parse: expected property name or '}' at line 2 column 3"
  const lineMatch = errorMessage.match(/line (\d+)/i);
  const columnMatch = errorMessage.match(/column (\d+)/i);
  const positionMatch = errorMessage.match(/position (\d+)/i);

  const result: { line?: number; column?: number } = {};

  if (lineMatch) {
    result.line = parseInt(lineMatch[1], 10);
  }
  if (columnMatch) {
    result.column = parseInt(columnMatch[1], 10);
  }

  // If we only have position, try to calculate line/column
  if (!lineMatch && positionMatch) {
    // This is approximate - we'd need the input to be accurate
    result.column = parseInt(positionMatch[1], 10);
  }

  return result;
}

/**
 * Validate JSON and return detailed error information
 */
export function validateJson(input: string): ValidationResult {
  if (!input.trim()) {
    return {
      isValid: false,
      error: "Input is empty",
    };
  }

  try {
    JSON.parse(input);
    return { isValid: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const position = parseErrorPosition(message);

    return {
      isValid: false,
      error: message,
      ...position,
    };
  }
}

/**
 * Sort object keys recursively
 */
function sortObjectKeys(obj: unknown): unknown {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(sortObjectKeys);
  }

  const sorted: Record<string, unknown> = {};
  const keys = Object.keys(obj).sort();

  for (const key of keys) {
    sorted[key] = sortObjectKeys((obj as Record<string, unknown>)[key]);
  }

  return sorted;
}

/**
 * Format JSON with specified indentation and optional key sorting
 */
export function formatJson(
  input: string,
  indentSize: number = 2,
  sortKeys: boolean = false
): FormatResult {
  const validation = validateJson(input);

  if (!validation.isValid) {
    return {
      formatted: "",
      validation,
    };
  }

  try {
    let parsed = JSON.parse(input);

    if (sortKeys) {
      parsed = sortObjectKeys(parsed);
    }

    const formatted = JSON.stringify(parsed, null, indentSize);

    return {
      formatted,
      validation: { isValid: true },
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      formatted: "",
      validation: {
        isValid: false,
        error: message,
      },
    };
  }
}

/**
 * Minify JSON to a single line
 */
export function minifyJson(input: string): FormatResult {
  const validation = validateJson(input);

  if (!validation.isValid) {
    return {
      formatted: "",
      validation,
    };
  }

  try {
    const parsed = JSON.parse(input);
    const formatted = JSON.stringify(parsed);

    return {
      formatted,
      validation: { isValid: true },
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      formatted: "",
      validation: {
        isValid: false,
        error: message,
      },
    };
  }
}

/**
 * Sort JSON keys alphabetically
 */
export function sortJsonKeys(input: string): FormatResult {
  const validation = validateJson(input);

  if (!validation.isValid) {
    return {
      formatted: "",
      validation,
    };
  }

  try {
    const parsed = JSON.parse(input);
    const sorted = sortObjectKeys(parsed);
    const formatted = JSON.stringify(sorted, null, 2);

    return {
      formatted,
      validation: { isValid: true },
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      formatted: "",
      validation: {
        isValid: false,
        error: message,
      },
    };
  }
}
