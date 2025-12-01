export interface TimestampResult {
  isValid: boolean;
  output: string;
  error?: string;
  timestamp?: number;
  date?: Date;
  formats?: {
    iso8601: string;
    rfc2822: string;
    utc: string;
    local: string;
    relative: string;
  };
}

/**
 * Detect timestamp format (seconds, milliseconds, microseconds, nanoseconds)
 */
export function detectTimestampFormat(value: number): {
  format: "seconds" | "milliseconds" | "microseconds" | "nanoseconds";
  normalized: number;
} {
  const length = Math.abs(value).toString().length;

  if (length <= 10) {
    return { format: "seconds", normalized: value };
  } else if (length <= 13) {
    return { format: "milliseconds", normalized: value };
  } else if (length <= 16) {
    return { format: "microseconds", normalized: Math.floor(value / 1000) };
  } else {
    return {
      format: "nanoseconds",
      normalized: Math.floor(value / 1000000),
    };
  }
}

/**
 * Convert timestamp to human-readable date
 */
export function timestampToDate(input: string): TimestampResult {
  try {
    const trimmed = input.trim();
    if (!trimmed) {
      return {
        isValid: false,
        output: "",
        error: "Please enter a timestamp",
      };
    }

    // Try to parse as number
    const num = parseFloat(trimmed);
    if (isNaN(num)) {
      return {
        isValid: false,
        output: "",
        error: "Invalid timestamp format. Please enter a valid number.",
      };
    }

    // Detect format and normalize to milliseconds
    const { format, normalized } = detectTimestampFormat(num);
    const date = new Date(normalized);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return {
        isValid: false,
        output: "",
        error: "Invalid timestamp. Please check your input.",
      };
    }

    // Check if date is reasonable (between 1970 and 2100)
    const year = date.getFullYear();
    if (year < 1970 || year > 2100) {
      return {
        isValid: false,
        output: "",
        error: `Timestamp results in year ${year}. Please verify your input format.`,
      };
    }

    const formats = {
      iso8601: date.toISOString(),
      rfc2822: date.toUTCString(),
      utc: date.toUTCString(),
      local: date.toLocaleString(),
      relative: getRelativeTime(date),
    };

    const output = `Detected format: ${format}

ISO 8601: ${formats.iso8601}
RFC 2822: ${formats.rfc2822}
UTC: ${formats.utc}
Local: ${formats.local}
Relative: ${formats.relative}

Unix Timestamp (seconds): ${Math.floor(normalized / 1000)}
Unix Timestamp (milliseconds): ${normalized}`;

    return {
      isValid: true,
      output,
      timestamp: Math.floor(normalized / 1000),
      date,
      formats,
    };
  } catch (error) {
    return {
      isValid: false,
      output: "",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

/**
 * Convert human-readable date to timestamp
 */
export function dateToTimestamp(input: string): TimestampResult {
  try {
    const trimmed = input.trim();
    if (!trimmed) {
      return {
        isValid: false,
        output: "",
        error: "Please enter a date",
      };
    }

    // Try to parse the date
    const date = new Date(trimmed);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return {
        isValid: false,
        output: "",
        error:
          "Invalid date format. Try formats like: 2024-12-01, Dec 1 2024, 12/1/2024",
      };
    }

    const timestampSeconds = Math.floor(date.getTime() / 1000);
    const timestampMillis = date.getTime();

    const output = `Unix Timestamp (seconds): ${timestampSeconds}
Unix Timestamp (milliseconds): ${timestampMillis}

ISO 8601: ${date.toISOString()}
RFC 2822: ${date.toUTCString()}
UTC: ${date.toUTCString()}
Local: ${date.toLocaleString()}`;

    return {
      isValid: true,
      output,
      timestamp: timestampSeconds,
      date,
    };
  } catch (error) {
    return {
      isValid: false,
      output: "",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

/**
 * Get current timestamp
 */
export function getCurrentTimestamp(): TimestampResult {
  const now = new Date();
  const timestampSeconds = Math.floor(now.getTime() / 1000);
  const timestampMillis = now.getTime();

  const output = `Unix Timestamp (seconds): ${timestampSeconds}
Unix Timestamp (milliseconds): ${timestampMillis}

ISO 8601: ${now.toISOString()}
RFC 2822: ${now.toUTCString()}
UTC: ${now.toUTCString()}
Local: ${now.toLocaleString()}`;

  return {
    isValid: true,
    output,
    timestamp: timestampSeconds,
    date: now,
  };
}

/**
 * Get relative time description
 */
function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(Math.abs(diffMs) / 1000);
  const isPast = diffMs > 0;

  if (diffSeconds < 60) {
    return isPast ? "just now" : "in a few seconds";
  }

  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) {
    const unit = diffMinutes === 1 ? "minute" : "minutes";
    return isPast ? `${diffMinutes} ${unit} ago` : `in ${diffMinutes} ${unit}`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    const unit = diffHours === 1 ? "hour" : "hours";
    return isPast ? `${diffHours} ${unit} ago` : `in ${diffHours} ${unit}`;
  }

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) {
    const unit = diffDays === 1 ? "day" : "days";
    return isPast ? `${diffDays} ${unit} ago` : `in ${diffDays} ${unit}`;
  }

  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) {
    const unit = diffMonths === 1 ? "month" : "months";
    return isPast ? `${diffMonths} ${unit} ago` : `in ${diffMonths} ${unit}`;
  }

  const diffYears = Math.floor(diffMonths / 12);
  const unit = diffYears === 1 ? "year" : "years";
  return isPast ? `${diffYears} ${unit} ago` : `in ${diffYears} ${unit}`;
}

/**
 * Format timestamp for specific timezone
 */
export function formatTimestampInTimezone(
  timestamp: number,
  timezone: string
): string {
  try {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      timeZone: timezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  } catch (error) {
    return "Invalid timezone";
  }
}

/**
 * Get common timezones
 */
export function getCommonTimezones(): string[] {
  return [
    "UTC",
    "America/New_York",
    "America/Chicago",
    "America/Denver",
    "America/Los_Angeles",
    "America/Anchorage",
    "Pacific/Honolulu",
    "Europe/London",
    "Europe/Paris",
    "Europe/Berlin",
    "Europe/Moscow",
    "Asia/Dubai",
    "Asia/Kolkata",
    "Asia/Singapore",
    "Asia/Shanghai",
    "Asia/Tokyo",
    "Australia/Sydney",
  ];
}
