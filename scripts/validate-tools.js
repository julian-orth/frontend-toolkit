#!/usr/bin/env node

/**
 * Tool Validator Script
 *
 * Validates all tools in the registry to ensure:
 * - Required fields are present
 * - No duplicate IDs or hrefs
 * - Proper naming conventions
 * - Associated files exist
 * - Metadata is complete
 *
 * Usage:
 *   npm run validate:tools
 */

const fs = require("fs");
const path = require("path");

// We'll read the registry as a module by using a workaround
// Since we can't directly import TS, we'll read and evaluate it
function loadRegistry() {
  const registryPath = path.join(__dirname, "../lib/tools/registry.ts");
  const content = fs.readFileSync(registryPath, "utf-8");

  // Extract just the array content between TOOL_REGISTRY = [ and ];
  const startMarker = "export const TOOL_REGISTRY: Tool[] = [";
  const endMarker = "];";

  const startIdx = content.indexOf(startMarker);
  if (startIdx === -1) {
    console.error("❌ Could not find TOOL_REGISTRY in registry.ts");
    process.exit(1);
  }

  const arrayStart = startIdx + startMarker.length - 1; // Include the [
  const arrayEnd = content.indexOf(endMarker, arrayStart) + 1; // Include the ]

  if (arrayEnd === 0) {
    console.error("❌ Could not find end of TOOL_REGISTRY array");
    process.exit(1);
  }

  let arrayContent = content.substring(arrayStart, arrayEnd);

  // Remove TypeScript-specific syntax and convert to valid JSON
  arrayContent = arrayContent
    .replace(/\/\*[\s\S]*?\*\//g, "") // Remove block comments
    .replace(/\/\/.*$/gm, "") // Remove line comments
    .replace(/,(\s*[}\]])/g, "$1"); // Remove trailing commas

  try {
    // Use eval in a safer context (we control the input)
    const tools = eval(`(${arrayContent})`);
    return tools;
  } catch (error) {
    console.error("❌ Failed to parse TOOL_REGISTRY:", error.message);
    process.exit(1);
  }
}

const VALID_GROUPS = [
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

const VALID_COLORS = [
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

function validateTool(tool, index) {
  const errors = [];
  const warnings = [];

  // Required fields
  if (!tool.id) {
    errors.push("Missing required field: id");
  } else if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(tool.id)) {
    errors.push("id must be kebab-case (lowercase, hyphens only)");
  }

  if (!tool.name) {
    errors.push("Missing required field: name");
  }

  if (!tool.description) {
    errors.push("Missing required field: description");
  } else {
    const len = tool.description.length;
    if (len < 50) {
      warnings.push(`Description too short (${len} chars, aim for 150-160)`);
    } else if (len > 200) {
      warnings.push(`Description too long (${len} chars, aim for 150-160)`);
    }
  }

  if (!tool.href) {
    errors.push("Missing required field: href");
  } else if (!tool.href.startsWith("/tools/")) {
    errors.push("href must start with /tools/");
  } else if (tool.href !== `/tools/${tool.id}`) {
    errors.push(`href should be /tools/${tool.id} (got ${tool.href})`);
  }

  if (!tool.group) {
    errors.push("Missing required field: group");
  } else if (!VALID_GROUPS.includes(tool.group)) {
    errors.push(`Invalid group: ${tool.group}`);
  }

  if (!tool.groupColor) {
    errors.push("Missing required field: groupColor");
  } else if (!VALID_COLORS.includes(tool.groupColor)) {
    errors.push(`Invalid groupColor: ${tool.groupColor}`);
  }

  if (!tool.groupIcon) {
    errors.push("Missing required field: groupIcon");
  }

  // Check if tool directory exists
  const toolDir = path.join(__dirname, "../app/tools", tool.id);
  if (!fs.existsSync(toolDir)) {
    errors.push(`Tool directory does not exist: ${toolDir}`);
  } else {
    // Check for required files
    const pageFile = path.join(toolDir, "page.tsx");
    if (!fs.existsSync(pageFile)) {
      errors.push("Missing page.tsx file");
    }

    // Check for UI component (loose check)
    // Note: Some tools use inline components in page.tsx, which is valid
    const files = fs.readdirSync(toolDir);
    const hasUIFile = files.some(
      (f) => f.endsWith("-ui.tsx") || f === "client.tsx"
    );
    const hasOnlyPageFile = files.length === 1 && files.includes("page.tsx");

    if (!hasUIFile && !hasOnlyPageFile && files.length > 1) {
      warnings.push(
        "No UI component file found (*-ui.tsx or client.tsx). Consider extracting UI to separate file."
      );
    }
  }

  // Optional but recommended
  if (!tool.keywords || tool.keywords.length === 0) {
    warnings.push("No keywords defined (recommended for SEO)");
  }

  return { errors, warnings, toolId: tool.id || `Tool #${index}` };
}

function validateRegistry(tools) {
  const errors = [];
  const warnings = [];

  // Check for duplicates
  const ids = new Map();
  const hrefs = new Map();

  tools.forEach((tool, index) => {
    if (tool.id) {
      if (ids.has(tool.id)) {
        errors.push(
          `Duplicate tool ID: ${tool.id} (indices ${ids.get(tool.id)}, ${index})`
        );
      } else {
        ids.set(tool.id, index);
      }
    }

    if (tool.href) {
      if (hrefs.has(tool.href)) {
        errors.push(
          `Duplicate href: ${tool.href} (indices ${hrefs.get(tool.href)}, ${index})`
        );
      } else {
        hrefs.set(tool.href, index);
      }
    }
  });

  // Summary
  if (tools.length === 0) {
    errors.push("No tools found in registry");
  } else {
    warnings.push(`Total tools: ${tools.length}`);

    // Group summary
    const groups = tools.reduce((acc, tool) => {
      acc[tool.group] = (acc[tool.group] || 0) + 1;
      return acc;
    }, {});

    const groupSummary = Object.entries(groups)
      .map(([group, count]) => `${group} (${count})`)
      .join(", ");
    warnings.push(`Tool groups: ${groupSummary}`);
  }

  return { errors, warnings };
}

function main() {
  console.log("🔍 Validating Tools Registry...\n");

  const tools = loadRegistry();
  console.log(`Found ${tools.length} tools\n`);

  let hasErrors = false;

  // Validate each tool
  tools.forEach((tool, index) => {
    const result = validateTool(tool, index);

    if (result.errors.length > 0 || result.warnings.length > 0) {
      console.log(`\n📦 Tool: ${result.toolId}`);

      if (result.errors.length > 0) {
        hasErrors = true;
        console.log("  Errors:");
        result.errors.forEach((error) => console.log(`    ❌ ${error}`));
      }

      if (result.warnings.length > 0) {
        console.log("  Warnings:");
        result.warnings.forEach((warning) => console.log(`    ⚠️  ${warning}`));
      }
    }
  });

  // Validate registry-level issues
  const registryResult = validateRegistry(tools);

  if (registryResult.errors.length > 0 || registryResult.warnings.length > 0) {
    console.log("\n📋 Registry-Level Validation:");

    if (registryResult.errors.length > 0) {
      hasErrors = true;
      console.log("  Errors:");
      registryResult.errors.forEach((error) => console.log(`    ❌ ${error}`));
    }

    if (registryResult.warnings.length > 0) {
      console.log("  Info:");
      registryResult.warnings.forEach((warning) =>
        console.log(`    ℹ️  ${warning}`)
      );
    }
  }

  // Summary
  console.log("\n" + "=".repeat(50));
  if (hasErrors) {
    console.log("❌ Validation failed with errors");
    process.exit(1);
  } else {
    console.log("✅ All tools validated successfully!");
    process.exit(0);
  }
}

main();
