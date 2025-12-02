/**
 * Tool Registry
 *
 * Centralized registry for all tools. Replaces the hardcoded TOOLS array
 * in lib/i18n/en.ts with a more maintainable, scalable system.
 *
 * Each tool can export its own configuration from a `config.ts` file
 * in its folder (future enhancement), or continue using the central definition.
 */

import type { Tool } from "@/lib/types/tool";

/**
 * All tools in the application
 * To add a new tool:
 * 1. Add the tool configuration here
 * 2. Create /app/tools/{tool-id}/page.tsx
 * 3. Run `npm run validate:tools` to verify
 *
 * Future: Auto-import from individual tool config files
 */
export const TOOL_REGISTRY: Tool[] = [
  {
    id: "json-formatter",
    name: "JSON Formatter",
    description:
      "Format, validate, minify, and beautify JSON with error detection",
    href: "/tools/json-formatter",
    group: "JSON",
    groupColor: "blue",
    groupIcon: "braces",
    keywords: [
      "json",
      "formatter",
      "validator",
      "beautifier",
      "minify",
      "pretty print",
    ],
    relatedTools: ["base64", "jwt-decoder", "url-encoder"],
  },
  {
    id: "uuid-generator",
    name: "UUID Generator",
    description:
      "Generate RFC 4122 compliant UUIDs in multiple versions (v1, v3, v4, v5, v7, NIL) for databases, APIs, and distributed systems",
    href: "/tools/uuid-generator",
    group: "UUID",
    groupColor: "purple",
    groupIcon: "fingerprint",
    keywords: ["uuid", "guid", "unique identifier", "generator"],
    relatedTools: ["uuid-validator", "uuid-decoder", "uuid-format-converter"],
  },
  {
    id: "uuid-validator",
    name: "UUID Validator",
    description:
      "Validate RFC 4122 compliant UUIDs instantly, check format correctness, determine version, and verify basic structural integrity",
    href: "/tools/uuid-validator",
    group: "UUID",
    groupColor: "purple",
    groupIcon: "fingerprint",
    keywords: ["uuid", "guid", "validator", "validate"],
    relatedTools: ["uuid-generator", "uuid-decoder", "uuid-format-converter"],
  },
  {
    id: "uuid-decoder",
    name: "UUID Decoder & Analyzer",
    description:
      "Decode and analyze UUIDs to extract detailed information including version, variant, timestamp, node ID, and clock sequence data",
    href: "/tools/uuid-decoder",
    group: "UUID",
    groupColor: "purple",
    groupIcon: "fingerprint",
    keywords: ["uuid", "guid", "decoder", "analyzer", "timestamp"],
    relatedTools: ["uuid-generator", "uuid-validator", "uuid-format-converter"],
  },
  {
    id: "uuid-format-converter",
    name: "UUID Format Converter",
    description:
      "Convert UUIDs between formats (hyphens, uppercase, URN, etc.)",
    href: "/tools/uuid-format-converter",
    group: "UUID",
    groupColor: "purple",
    groupIcon: "fingerprint",
    keywords: ["uuid", "guid", "converter", "format"],
    relatedTools: ["uuid-generator", "uuid-validator", "uuid-decoder"],
  },
  {
    id: "base64",
    name: "Base64 Encoder/Decoder",
    description:
      "Encode and decode Base64 strings for data transmission, encoding binary data, and working with APIs that require Base64 format",
    href: "/tools/base64",
    group: "Encoding",
    groupColor: "green",
    groupIcon: "binary",
    keywords: ["base64", "encode", "decode", "encoder", "decoder"],
    relatedTools: ["url-encoder", "json-formatter"],
  },
  {
    id: "url-encoder",
    name: "URL Encoder/Decoder",
    description:
      "Encode and decode URLs with percent encoding for safe transmission of special characters in web addresses and query parameters",
    href: "/tools/url-encoder",
    group: "Encoding",
    groupColor: "green",
    groupIcon: "binary",
    keywords: ["url", "encode", "decode", "percent encoding", "uri"],
    relatedTools: ["base64", "json-formatter"],
  },
  {
    id: "regex-tester",
    name: "Regex Tester",
    description:
      "Test and debug regular expressions with real-time pattern matching, capture groups, and detailed match highlighting for any text input",
    href: "/tools/regex-tester",
    group: "Regex",
    groupColor: "orange",
    groupIcon: "regex",
    keywords: ["regex", "regular expression", "tester", "pattern"],
    relatedTools: ["text-diff"],
  },
  {
    id: "color-picker",
    name: "Color Picker",
    description:
      "Pick colors, convert formats (HEX, RGB, HSL), and generate palettes",
    href: "/tools/color-picker",
    group: "Color",
    groupColor: "pink",
    groupIcon: "palette",
    keywords: ["color", "picker", "hex", "rgb", "hsl", "converter"],
    relatedTools: ["color-palettes", "gradient-generator"],
  },
  {
    id: "color-palettes",
    name: "Color Palette Generator",
    description:
      "Generate beautiful color palettes using color theory harmonies",
    href: "/tools/color-palettes",
    group: "Color",
    groupColor: "pink",
    groupIcon: "palette",
    keywords: ["color", "palette", "harmony", "scheme", "generator"],
    relatedTools: ["color-picker", "gradient-generator"],
  },
  {
    id: "gradient-generator",
    name: "Gradient Generator",
    description:
      "Create stunning CSS gradients with 45+ presets and custom options",
    href: "/tools/gradient-generator",
    group: "Color",
    groupColor: "pink",
    groupIcon: "palette",
    keywords: ["gradient", "css", "linear", "radial", "generator"],
    relatedTools: ["color-picker", "color-palettes"],
  },
  {
    id: "lorem-ipsum",
    name: "Lorem Ipsum Generator",
    description:
      "Generate classic placeholder text for designs, mockups, and prototypes",
    href: "/tools/lorem-ipsum",
    group: "Text",
    groupColor: "yellow",
    groupIcon: "text",
    keywords: ["lorem ipsum", "placeholder", "text", "generator", "dummy text"],
    relatedTools: ["text-diff"],
  },
  {
    id: "timestamp-converter",
    name: "Timestamp Converter",
    description:
      "Convert Unix timestamps to human-readable dates and vice versa, supporting milliseconds and multiple timezone formats instantly",
    href: "/tools/timestamp-converter",
    group: "Time",
    groupColor: "cyan",
    groupIcon: "clock",
    keywords: ["timestamp", "unix", "epoch", "date", "converter"],
    relatedTools: ["uuid-decoder"],
  },
  {
    id: "text-diff",
    name: "Text Diff",
    description:
      "Compare text differences side-by-side with highlighted additions, deletions, and changes for easy code review and document comparison",
    href: "/tools/text-diff",
    group: "Text",
    groupColor: "yellow",
    groupIcon: "text",
    keywords: ["diff", "compare", "text", "difference", "merge"],
    relatedTools: ["lorem-ipsum", "regex-tester"],
  },
  {
    id: "jwt-decoder",
    name: "JWT Decoder",
    description:
      "Decode and inspect JSON Web Tokens (JWT) to view headers, payloads, and signatures for debugging authentication and authorization",
    href: "/tools/jwt-decoder",
    group: "JWT",
    groupColor: "red",
    groupIcon: "shield-check",
    keywords: ["jwt", "json web token", "decoder", "authentication"],
    relatedTools: ["json-formatter", "base64"],
  },
];

/**
 * Get a tool by ID
 */
export function getToolById(id: string): Tool | undefined {
  return TOOL_REGISTRY.find((tool) => tool.id === id);
}

/**
 * Get tools by group
 */
export function getToolsByGroup(group: string): Tool[] {
  return TOOL_REGISTRY.filter((tool) => tool.group === group);
}

/**
 * Get all unique groups
 */
export function getAllGroups(): string[] {
  const groups = new Set(TOOL_REGISTRY.map((tool) => tool.group));
  return Array.from(groups).sort();
}

/**
 * Search tools by query (name, description, keywords)
 */
export function searchTools(query: string): Tool[] {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return TOOL_REGISTRY;

  return TOOL_REGISTRY.filter((tool) => {
    const searchText = [
      tool.name,
      tool.description,
      ...(tool.keywords || []),
      ...(tool.aliases || []),
    ]
      .join(" ")
      .toLowerCase();

    return searchText.includes(lowerQuery);
  });
}

/**
 * Get related tools for a tool ID
 */
export function getRelatedTools(toolId: string): Tool[] {
  const tool = getToolById(toolId);
  if (!tool?.relatedTools) return [];

  return tool.relatedTools
    .map((id) => getToolById(id))
    .filter((t): t is Tool => t !== undefined);
}

/**
 * Backward compatibility export
 * This allows existing code to continue using TOOLS
 */
export const TOOLS = TOOL_REGISTRY;
