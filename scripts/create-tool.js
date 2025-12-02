#!/usr/bin/env node

/**
 * Tool Generator CLI
 *
 * Scaffolds new tools with all required boilerplate:
 * - page.tsx with metadata
 * - UI component file
 * - utils.ts file
 * - Adds tool to registry
 *
 * Usage:
 *   node scripts/create-tool.js --id=my-tool --name="My Tool" --group=JSON --color=blue --icon=zap
 *
 * Or interactive mode:
 *   node scripts/create-tool.js
 */

const fs = require("fs");
const path = require("path");
const readline = require("readline");

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

// Parse command line arguments
function parseArgs() {
  const args = {};
  process.argv.slice(2).forEach((arg) => {
    const [key, value] = arg.replace(/^--/, "").split("=");
    args[key] = value;
  });
  return args;
}

// Interactive prompt
function prompt(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

// Kebab case converter
function toKebabCase(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// Pascal case converter
function toPascalCase(str) {
  return str
    .split(/[-_\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}

// Generate page.tsx template
function generatePageTemplate(config) {
  const componentName = `${toPascalCase(config.id)}UI`;

  return `import Breadcrumb from "@/components/breadcrumb";
import type { Metadata } from "next";
import { ${componentName} } from "./${config.id}-ui";

export const metadata: Metadata = {
  title: "${config.name}",
  description: "${config.description}",
  keywords: [
    // Add relevant keywords
  ],
  openGraph: {
    title: "${config.name} — Frontend Tools Hub",
    description: "${config.description}",
    url: "/tools/${config.id}",
    siteName: "Frontend Tools Hub",
  },
  twitter: {
    card: "summary",
    title: "${config.name} — Frontend Tools Hub",
    description: "${config.description}",
  },
  alternates: {
    canonical: "/tools/${config.id}",
  },
};

export default function ${toPascalCase(config.id)}Page() {
  return (
    <div className="px-6 py-8">
      <div className="mb-8">
        <Breadcrumb />
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-black dark:text-white">
          ${config.name}
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          ${config.description}
        </p>
      </div>

      <${componentName} />

      {/* SEO Content Section */}
      <div className="mt-16 space-y-12">
        <section>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-gray-50">
            What is ${config.name}?
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              Add detailed explanation of the tool here...
            </p>
          </div>
        </section>

        {/* Add more SEO sections as needed */}
      </div>
    </div>
  );
}
`;
}

// Generate UI component template
function generateUITemplate(config) {
  const componentName = `${toPascalCase(config.id)}UI`;

  return `"use client";

import { useState } from "react";

export function ${componentName}() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleProcess = () => {
    // TODO: Implement tool logic
    setOutput("Processing: " + input);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="space-y-6">
        {/* Input Section */}
        <div>
          <label
            htmlFor="input"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Input
          </label>
          <textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 font-mono text-sm text-gray-900 focus:border-${config.color}-500 focus:ring-2 focus:ring-${config.color}-500 focus:outline-none dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
            rows={8}
            placeholder="Enter text here..."
          />
        </div>

        {/* Action Button */}
        <div className="flex gap-3">
          <button
            onClick={handleProcess}
            className="rounded-lg bg-${config.color}-600 px-6 py-2.5 font-medium text-white transition-colors hover:bg-${config.color}-700 focus:ring-2 focus:ring-${config.color}-500 focus:ring-offset-2 focus:outline-none dark:bg-${config.color}-700 dark:hover:bg-${config.color}-600"
          >
            Process
          </button>
        </div>

        {/* Output Section */}
        {output && (
          <div>
            <label
              htmlFor="output"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Output
            </label>
            <textarea
              id="output"
              value={output}
              readOnly
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 font-mono text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              rows={8}
            />
          </div>
        )}
      </div>
    </div>
  );
}
`;
}

// Generate utils template
function generateUtilsTemplate(config) {
  return `/**
 * Utility functions for ${config.name}
 */

/**
 * TODO: Implement core logic for ${config.id}
 */
export function process${toPascalCase(config.id)}(input: string): string {
  // Implement your tool logic here
  return input;
}
`;
}

// Add tool to registry
function addToRegistry(config) {
  const registryPath = path.join(__dirname, "../lib/tools/registry.ts");
  let content = fs.readFileSync(registryPath, "utf-8");

  const newTool = `  {
    id: "${config.id}",
    name: "${config.name}",
    description: "${config.description}",
    href: "/tools/${config.id}",
    group: "${config.group}",
    groupColor: "${config.color}",
    groupIcon: "${config.icon}",
    keywords: [],
    relatedTools: [],
  },`;

  // Insert before the closing bracket of TOOL_REGISTRY array
  content = content.replace(
    /(\];[\s\n]*\/\*\*[\s\n]*\* Get a tool by ID)/,
    `${newTool}\n];\n\n/**\n * Get a tool by ID`
  );

  fs.writeFileSync(registryPath, content);
}

// Main function
async function main() {
  console.log("🛠️  Tool Generator\n");

  const args = parseArgs();

  // Collect configuration
  const config = {
    id:
      args.id ||
      toKebabCase(
        await prompt("Tool ID (kebab-case, e.g., 'my-awesome-tool'): ")
      ),
    name: args.name || (await prompt("Tool Name (e.g., 'My Awesome Tool'): ")),
    description:
      args.description ||
      (await prompt("Short Description (150-160 chars for SEO): ")),
    group: args.group || (await prompt(`Group (${VALID_GROUPS.join(", ")}): `)),
    color: args.color || (await prompt(`Color (${VALID_COLORS.join(", ")}): `)),
    icon: args.icon || (await prompt("Lucide Icon Name (e.g., 'zap'): ")),
  };

  // Validate
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(config.id)) {
    console.error("❌ Invalid ID. Must be kebab-case.");
    process.exit(1);
  }

  if (!VALID_GROUPS.includes(config.group)) {
    console.error(
      `❌ Invalid group. Must be one of: ${VALID_GROUPS.join(", ")}`
    );
    process.exit(1);
  }

  if (!VALID_COLORS.includes(config.color)) {
    console.error(
      `❌ Invalid color. Must be one of: ${VALID_COLORS.join(", ")}`
    );
    process.exit(1);
  }

  // Create tool directory
  const toolDir = path.join(__dirname, "../app/tools", config.id);
  if (fs.existsSync(toolDir)) {
    console.error(`❌ Tool directory already exists: ${toolDir}`);
    process.exit(1);
  }

  console.log(`\n✅ Creating tool: ${config.name}`);
  console.log(`📁 Directory: ${toolDir}\n`);

  fs.mkdirSync(toolDir, { recursive: true });

  // Generate files
  const files = [
    { name: "page.tsx", content: generatePageTemplate(config) },
    { name: `${config.id}-ui.tsx`, content: generateUITemplate(config) },
    { name: "utils.ts", content: generateUtilsTemplate(config) },
  ];

  files.forEach((file) => {
    const filePath = path.join(toolDir, file.name);
    fs.writeFileSync(filePath, file.content);
    console.log(`✅ Created: ${file.name}`);
  });

  // Add to registry
  addToRegistry(config);
  console.log("✅ Added to registry\n");

  console.log("🎉 Tool scaffolded successfully!\n");
  console.log("Next steps:");
  console.log(
    `1. Implement the tool logic in app/tools/${config.id}/${config.id}-ui.tsx`
  );
  console.log(`2. Add utility functions in app/tools/${config.id}/utils.ts`);
  console.log(`3. Enhance SEO content in app/tools/${config.id}/page.tsx`);
  console.log(`4. Update keywords and relatedTools in lib/tools/registry.ts`);
  console.log(
    `5. Test your tool at http://localhost:3000/tools/${config.id}\n`
  );
}

main().catch(console.error);
