/**
 * Tool Configuration Validator
 *
 * Validates tool configurations to ensure they meet all requirements
 * and maintain consistency across the application.
 */

import type {
  Tool,
  ToolConfig,
  ToolValidationResult,
  ToolGroupColor,
  ToolGroup,
} from "@/lib/types/tool";
import * as Icons from "lucide-react";

/**
 * Valid Lucide icon names (kebab-case)
 * This list should be updated as you use new icons
 */
const VALID_ICON_NAMES = [
  "braces",
  "fingerprint",
  "binary",
  "regex",
  "palette",
  "text",
  "clock",
  "shield-check",
  "zap",
  "code",
  "wrench",
  "settings",
  "image",
  "network",
  "lock",
  "database",
] as const;

const VALID_COLORS: ToolGroupColor[] = [
  "blue",
  "purple",
  "green",
  "orange",
  "pink",
  "red",
  "indigo",
  "cyan",
  "teal",
  "yellow",
];

const VALID_GROUPS: ToolGroup[] = [
  "JSON",
  "UUID",
  "Encoding",
  "Regex",
  "Color",
  "Text",
  "Time",
  "JWT",
  "CSS",
  "HTML",
  "Image",
  "Network",
  "Security",
  "Data",
];

/**
 * Validates a tool configuration
 */
export function validateToolConfig(
  config: Tool | ToolConfig
): ToolValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required fields
  if (!config.id) {
    errors.push("Missing required field: id");
  } else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(config.id)) {
    errors.push("id must be kebab-case (lowercase, hyphens only)");
  }

  if (!config.name) {
    errors.push("Missing required field: name");
  }

  if (!config.description) {
    errors.push("Missing required field: description");
  } else if (config.description.length < 50) {
    warnings.push(
      `Description is short (${config.description.length} chars). Aim for 150-160 for better SEO.`
    );
  } else if (config.description.length > 200) {
    warnings.push(
      `Description is long (${config.description.length} chars). Aim for 150-160 for better SEO.`
    );
  }

  if (!config.href) {
    errors.push("Missing required field: href");
  } else if (!config.href.startsWith("/tools/")) {
    errors.push("href must start with /tools/");
  } else if (config.href !== `/tools/${config.id}`) {
    errors.push(
      `href should be /tools/${config.id} (currently ${config.href})`
    );
  }

  if (!config.group) {
    errors.push("Missing required field: group");
  } else if (!VALID_GROUPS.includes(config.group)) {
    errors.push(
      `Invalid group: ${config.group}. Must be one of: ${VALID_GROUPS.join(", ")}`
    );
  }

  if (!config.groupColor) {
    errors.push("Missing required field: groupColor");
  } else if (!VALID_COLORS.includes(config.groupColor)) {
    errors.push(
      `Invalid groupColor: ${config.groupColor}. Must be one of: ${VALID_COLORS.join(", ")}`
    );
  }

  if (!config.groupIcon) {
    errors.push("Missing required field: groupIcon");
  } else {
    // Check if icon exists in Lucide
    const iconName = config.groupIcon
      .replace(/-([a-z])/g, (_, c) => c.toUpperCase())
      .replace(/^\w/, (c: string) => c.toUpperCase());

    if (!(Icons as any)[iconName]) {
      warnings.push(
        `Icon "${config.groupIcon}" may not exist in Lucide. Verify at lucide.dev`
      );
    }
  }

  // Optional but recommended fields
  if (!config.keywords || config.keywords.length === 0) {
    warnings.push("No keywords defined. Consider adding for better SEO.");
  }

  if ("metadata" in config) {
    // Validate Next.js metadata
    const metadata = config.metadata;

    if (!metadata.title) {
      warnings.push("metadata.title not defined");
    }

    if (!metadata.description) {
      warnings.push("metadata.description not defined");
    }

    if (!metadata.openGraph) {
      warnings.push("metadata.openGraph not defined (recommended for sharing)");
    }

    if (!metadata.twitter) {
      warnings.push("metadata.twitter not defined (recommended for Twitter/X)");
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    toolId: config.id || "unknown",
  };
}

/**
 * Validates an array of tools for duplicate IDs, hrefs, etc.
 */
export function validateToolRegistry(tools: Tool[]): {
  valid: boolean;
  errors: string[];
  warnings: string[];
  duplicateIds: string[];
  duplicateHrefs: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];
  const duplicateIds: string[] = [];
  const duplicateHrefs: string[] = [];

  // Check for duplicate IDs
  const ids = new Map<string, number>();
  tools.forEach((tool) => {
    ids.set(tool.id, (ids.get(tool.id) || 0) + 1);
  });
  ids.forEach((count, id) => {
    if (count > 1) {
      duplicateIds.push(id);
      errors.push(`Duplicate tool ID found: ${id} (${count} times)`);
    }
  });

  // Check for duplicate hrefs
  const hrefs = new Map<string, number>();
  tools.forEach((tool) => {
    hrefs.set(tool.href, (hrefs.get(tool.href) || 0) + 1);
  });
  hrefs.forEach((count, href) => {
    if (count > 1) {
      duplicateHrefs.push(href);
      errors.push(`Duplicate href found: ${href} (${count} times)`);
    }
  });

  // Check for missing tools (gaps in common sequences)
  const toolCount = tools.length;
  if (toolCount === 0) {
    errors.push("No tools found in registry");
  } else {
    warnings.push(`Total tools: ${toolCount}`);
  }

  // Check for consistent grouping
  const groups = new Map<string, number>();
  tools.forEach((tool) => {
    groups.set(tool.group, (groups.get(tool.group) || 0) + 1);
  });

  if (groups.size === 0) {
    errors.push("No tool groups found");
  } else {
    const groupSummary = Array.from(groups.entries())
      .map(([group, count]) => `${group} (${count})`)
      .join(", ");
    warnings.push(`Tool groups: ${groupSummary}`);
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    duplicateIds,
    duplicateHrefs,
  };
}

/**
 * Formats validation results for console output
 */
export function formatValidationResult(
  result: ToolValidationResult | ReturnType<typeof validateToolRegistry>
): string {
  const lines: string[] = [];

  if (result.valid) {
    lines.push("✅ Validation passed");
  } else {
    lines.push("❌ Validation failed");
  }

  if (result.errors.length > 0) {
    lines.push("\nErrors:");
    result.errors.forEach((error) => lines.push(`  ❌ ${error}`));
  }

  if (result.warnings.length > 0) {
    lines.push("\nWarnings:");
    result.warnings.forEach((warning) => lines.push(`  ⚠️  ${warning}`));
  }

  return lines.join("\n");
}
