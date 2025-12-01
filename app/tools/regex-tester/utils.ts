export type RegexFlags = {
  global: boolean;
  multiline: boolean;
  caseInsensitive: boolean;
  dotAll: boolean;
  unicode: boolean;
  sticky: boolean;
};

export type Match = {
  match: string;
  index: number;
  groups: string[];
  namedGroups?: Record<string, string>;
};

export type RegexResult = {
  isValid: boolean;
  matches: Match[];
  error?: string;
  matchCount: number;
};

/**
 * Build regex flags string from flags object
 */
export function buildFlagsString(flags: RegexFlags): string {
  let flagsStr = "";
  if (flags.global) flagsStr += "g";
  if (flags.multiline) flagsStr += "m";
  if (flags.caseInsensitive) flagsStr += "i";
  if (flags.dotAll) flagsStr += "s";
  if (flags.unicode) flagsStr += "u";
  if (flags.sticky) flagsStr += "y";
  return flagsStr;
}

/**
 * Test a regex pattern against input text and return matches
 */
export function testRegex(
  pattern: string,
  text: string,
  flags: RegexFlags
): RegexResult {
  if (!pattern) {
    return {
      isValid: true,
      matches: [],
      matchCount: 0,
    };
  }

  try {
    const flagsStr = buildFlagsString(flags);
    const regex = new RegExp(pattern, flagsStr);
    const matches: Match[] = [];

    if (flags.global) {
      // Global flag: find all matches
      let match: RegExpExecArray | null;
      let safetyCounter = 0;
      const maxIterations = 10000; // Prevent infinite loops

      while (
        (match = regex.exec(text)) !== null &&
        safetyCounter < maxIterations
      ) {
        matches.push({
          match: match[0],
          index: match.index,
          groups: match.slice(1),
          namedGroups: match.groups,
        });

        // Prevent infinite loop on zero-width matches
        if (match.index === regex.lastIndex) {
          regex.lastIndex++;
        }

        safetyCounter++;
      }

      if (safetyCounter >= maxIterations) {
        return {
          isValid: false,
          matches: [],
          matchCount: 0,
          error:
            "Pattern matched too many times. Consider refining your pattern to avoid excessive matches.",
        };
      }
    } else {
      // Non-global: find first match only
      const match = regex.exec(text);
      if (match) {
        matches.push({
          match: match[0],
          index: match.index,
          groups: match.slice(1),
          namedGroups: match.groups,
        });
      }
    }

    return {
      isValid: true,
      matches,
      matchCount: matches.length,
    };
  } catch (error) {
    return {
      isValid: false,
      matches: [],
      matchCount: 0,
      error: error instanceof Error ? error.message : "Invalid regex pattern",
    };
  }
}

/**
 * Escape special regex characters in a string
 */
export function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Split text into segments for highlighting matches
 */
export function highlightMatches(
  text: string,
  matches: Match[]
): Array<{ text: string; isMatch: boolean; matchIndex?: number }> {
  if (matches.length === 0) {
    return [{ text, isMatch: false }];
  }

  const segments: Array<{
    text: string;
    isMatch: boolean;
    matchIndex?: number;
  }> = [];
  let lastIndex = 0;

  // Sort matches by index
  const sortedMatches = [...matches].sort((a, b) => a.index - b.index);

  sortedMatches.forEach((match, idx) => {
    // Add text before match
    if (match.index > lastIndex) {
      segments.push({
        text: text.slice(lastIndex, match.index),
        isMatch: false,
      });
    }

    // Add match
    segments.push({
      text: match.match,
      isMatch: true,
      matchIndex: idx,
    });

    lastIndex = match.index + match.match.length;
  });

  // Add remaining text
  if (lastIndex < text.length) {
    segments.push({
      text: text.slice(lastIndex),
      isMatch: false,
    });
  }

  return segments;
}

/**
 * Get common regex patterns examples
 */
export const COMMON_PATTERNS = [
  {
    name: "Email Address",
    pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
    description: "Match email addresses",
    sample: "Contact us at support@example.com or info@company.org",
  },
  {
    name: "URL",
    pattern:
      "https?://[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&'\\(\\)\\*\\+,;=.]+",
    description: "Match HTTP/HTTPS URLs",
    sample: "Visit https://www.example.com or http://test.org/page",
  },
  {
    name: "Phone Number (US)",
    pattern: "\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}",
    description: "Match US phone numbers",
    sample: "Call (555) 123-4567 or 555.987.6543 or 5551234567",
  },
  {
    name: "IPv4 Address",
    pattern:
      "\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b",
    description: "Match IPv4 addresses",
    sample: "Server IP: 192.168.1.1 or 10.0.0.255",
  },
  {
    name: "Date (YYYY-MM-DD)",
    pattern: "\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01])",
    description: "Match dates in ISO format",
    sample: "Events: 2024-01-15, 2024-12-31, 2025-06-20",
  },
  {
    name: "Hex Color Code",
    pattern: "#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})\\b",
    description: "Match hex color codes",
    sample: "Colors: #FF5733, #00f, #123456",
  },
  {
    name: "HTML Tag",
    pattern: "<([a-z]+)([^<]+)*(?:>(.*)<\\/\\1>|\\s+\\/>)",
    description: "Match HTML tags",
    sample: '<div class="container">Content</div> or <img src="pic.jpg" />',
  },
  {
    name: "Credit Card",
    pattern: "\\b(?:\\d{4}[\\s-]?){3}\\d{4}\\b",
    description: "Match credit card numbers",
    sample: "Card: 1234 5678 9012 3456 or 1234-5678-9012-3456",
  },
  {
    name: "Username",
    pattern: "@[a-zA-Z0-9_]{3,15}\\b",
    description: "Match @username patterns",
    sample: "Follow @john_doe and @Alice123 on social media",
  },
  {
    name: "Password Strength",
    pattern:
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
    description:
      "Strong password (8+ chars, uppercase, lowercase, digit, special char)",
    sample: "ValidPass1! or Test@1234",
  },
];
