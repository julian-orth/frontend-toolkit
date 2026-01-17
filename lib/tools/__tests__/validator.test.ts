import { describe, it, expect } from "vitest";
import {
  validateToolConfig,
  validateToolRegistry,
  formatValidationResult,
} from "../validator";
import { TOOL_REGISTRY } from "../registry";
import type { Tool, ToolConfig } from "@/lib/types/tool";

describe("Tool Validator", () => {
  describe("validateToolConfig", () => {
    const validTool: Tool = {
      id: "test-tool",
      name: "Test Tool",
      description:
        "A comprehensive test tool description that is long enough for SEO requirements and provides useful information",
      href: "/tools/test-tool",
      group: "JSON",
      groupColor: "blue",
      groupIcon: "braces",
      keywords: ["test", "tool"],
    };

    it("should validate a correct tool configuration", () => {
      const result = validateToolConfig(validTool);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.toolId).toBe("test-tool");
    });

    it("should reject tool without ID", () => {
      const tool = { ...validTool, id: "" };
      const result = validateToolConfig(tool);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors.some((e) => e.includes("id"))).toBe(true);
    });

    it("should reject non-kebab-case ID", () => {
      const tool = { ...validTool, id: "TestTool" };
      const result = validateToolConfig(tool);
      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.includes("kebab-case"))).toBe(true);
    });

    it("should reject ID with spaces", () => {
      const tool = { ...validTool, id: "test tool" };
      const result = validateToolConfig(tool);
      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.includes("kebab-case"))).toBe(true);
    });

    it("should reject ID with underscores", () => {
      const tool = { ...validTool, id: "test_tool" };
      const result = validateToolConfig(tool);
      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.includes("kebab-case"))).toBe(true);
    });

    it("should reject tool without name", () => {
      const tool = { ...validTool, name: "" };
      const result = validateToolConfig(tool);
      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.includes("name"))).toBe(true);
    });

    it("should reject tool without description", () => {
      const tool = { ...validTool, description: "" };
      const result = validateToolConfig(tool);
      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.includes("description"))).toBe(true);
    });

    it("should warn about short description", () => {
      const tool = { ...validTool, description: "Too short" };
      const result = validateToolConfig(tool);
      expect(result.warnings.length).toBeGreaterThan(0);
      expect(result.warnings.some((w) => w.includes("short"))).toBe(true);
    });

    it("should warn about long description", () => {
      const tool = {
        ...validTool,
        description: "A".repeat(250),
      };
      const result = validateToolConfig(tool);
      expect(result.warnings.length).toBeGreaterThan(0);
      expect(result.warnings.some((w) => w.includes("long"))).toBe(true);
    });

    it("should reject tool without href", () => {
      const tool = { ...validTool, href: "" };
      const result = validateToolConfig(tool);
      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.includes("href"))).toBe(true);
    });

    it("should reject href not starting with /tools/", () => {
      const tool = { ...validTool, href: "/test-tool" };
      const result = validateToolConfig(tool);
      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.includes("/tools/"))).toBe(true);
    });

    it("should reject href not matching ID", () => {
      const tool = { ...validTool, href: "/tools/wrong-tool" };
      const result = validateToolConfig(tool);
      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.includes("/tools/test-tool"))).toBe(
        true
      );
    });

    it("should reject invalid group", () => {
      const tool = { ...validTool, group: "InvalidGroup" } as any;
      const result = validateToolConfig(tool);
      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.includes("group"))).toBe(true);
    });

    it("should accept valid groups", () => {
      const validGroups = [
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
      ];
      validGroups.forEach((group) => {
        const tool = { ...validTool, group } as any;
        const result = validateToolConfig(tool);
        const hasGroupError = result.errors.some((e) =>
          e.toLowerCase().includes("group")
        );
        expect(hasGroupError).toBe(false);
      });
    });

    it("should reject invalid groupColor", () => {
      const tool = { ...validTool, groupColor: "invalid-color" } as any;
      const result = validateToolConfig(tool);
      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.includes("groupColor"))).toBe(true);
    });

    it("should accept valid groupColors", () => {
      const validColors = [
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
      validColors.forEach((color) => {
        const tool = { ...validTool, groupColor: color } as any;
        const result = validateToolConfig(tool);
        const hasColorError = result.errors.some((e) =>
          e.toLowerCase().includes("groupcolor")
        );
        expect(hasColorError).toBe(false);
      });
    });

    it("should reject tool without groupIcon", () => {
      const tool = { ...validTool, groupIcon: "" };
      const result = validateToolConfig(tool);
      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.includes("groupIcon"))).toBe(true);
    });

    it("should warn when no keywords are provided", () => {
      const tool = { ...validTool, keywords: [] };
      const result = validateToolConfig(tool);
      expect(result.warnings.some((w) => w.includes("keywords"))).toBe(true);
    });

    it("should warn when keywords are undefined", () => {
      const tool = { ...validTool, keywords: undefined };
      const result = validateToolConfig(tool);
      expect(result.warnings.some((w) => w.includes("keywords"))).toBe(true);
    });

    it("should handle tool with metadata", () => {
      const toolWithMetadata = {
        ...validTool,
        metadata: {
          title: "Test Tool",
          description: "Test description",
          openGraph: {
            title: "Test Tool",
            description: "Test description",
          },
          twitter: {
            card: "summary" as const,
            title: "Test Tool",
          },
        },
      };
      const result = validateToolConfig(toolWithMetadata);
      // Should not have warnings about missing metadata
      const metadataWarnings = result.warnings.filter((w) =>
        w.includes("metadata")
      );
      expect(metadataWarnings.length).toBe(0);
    });

    it("should warn about missing metadata fields", () => {
      const toolWithIncompleteMetadata = {
        ...validTool,
        metadata: {
          title: "Test",
        },
      } as any;
      const result = validateToolConfig(toolWithIncompleteMetadata);
      expect(result.warnings.length).toBeGreaterThan(0);
    });
  });

  describe("validateToolRegistry", () => {
    it("should validate the actual TOOL_REGISTRY", () => {
      const result = validateToolRegistry(TOOL_REGISTRY);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.duplicateIds).toHaveLength(0);
      expect(result.duplicateHrefs).toHaveLength(0);
    });

    it("should detect duplicate IDs", () => {
      const tools: Tool[] = [
        {
          id: "tool-1",
          name: "Tool 1",
          description: "Description for tool 1 that is long enough for SEO",
          href: "/tools/tool-1",
          group: "JSON",
          groupColor: "blue",
          groupIcon: "braces",
        },
        {
          id: "tool-1", // Duplicate!
          name: "Tool 1 Copy",
          description: "Description for tool 1 copy that is long enough",
          href: "/tools/tool-1-copy",
          group: "JSON",
          groupColor: "blue",
          groupIcon: "braces",
        },
      ];
      const result = validateToolRegistry(tools);
      expect(result.valid).toBe(false);
      expect(result.duplicateIds).toContain("tool-1");
      expect(result.errors.some((e) => e.includes("Duplicate tool ID"))).toBe(
        true
      );
    });

    it("should detect duplicate hrefs", () => {
      const tools: Tool[] = [
        {
          id: "tool-1",
          name: "Tool 1",
          description: "Description for tool 1 that is long enough for SEO",
          href: "/tools/tool-1",
          group: "JSON",
          groupColor: "blue",
          groupIcon: "braces",
        },
        {
          id: "tool-2",
          name: "Tool 2",
          description: "Description for tool 2 that is long enough for SEO",
          href: "/tools/tool-1", // Duplicate!
          group: "JSON",
          groupColor: "blue",
          groupIcon: "braces",
        },
      ];
      const result = validateToolRegistry(tools);
      expect(result.valid).toBe(false);
      expect(result.duplicateHrefs).toContain("/tools/tool-1");
      expect(result.errors.some((e) => e.includes("Duplicate href"))).toBe(
        true
      );
    });

    it("should report error for empty registry", () => {
      const result = validateToolRegistry([]);
      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.includes("No tools found"))).toBe(
        true
      );
    });

    it("should provide tool count in warnings", () => {
      const result = validateToolRegistry(TOOL_REGISTRY);
      expect(result.warnings.some((w) => w.includes("Total tools:"))).toBe(
        true
      );
    });

    it("should provide group summary in warnings", () => {
      const result = validateToolRegistry(TOOL_REGISTRY);
      expect(result.warnings.some((w) => w.includes("Tool groups:"))).toBe(
        true
      );
    });

    it("should handle tools with multiple groups", () => {
      const tools: Tool[] = [
        {
          id: "tool-1",
          name: "Tool 1",
          description: "Description for tool 1 that is long enough for SEO",
          href: "/tools/tool-1",
          group: "JSON",
          groupColor: "blue",
          groupIcon: "braces",
        },
        {
          id: "tool-2",
          name: "Tool 2",
          description: "Description for tool 2 that is long enough for SEO",
          href: "/tools/tool-2",
          group: "UUID",
          groupColor: "purple",
          groupIcon: "fingerprint",
        },
        {
          id: "tool-3",
          name: "Tool 3",
          description: "Description for tool 3 that is long enough for SEO",
          href: "/tools/tool-3",
          group: "JSON",
          groupColor: "blue",
          groupIcon: "braces",
        },
      ];
      const result = validateToolRegistry(tools);
      expect(result.valid).toBe(true);
      const groupWarning = result.warnings.find((w) =>
        w.includes("Tool groups:")
      );
      expect(groupWarning).toBeDefined();
      expect(groupWarning).toContain("JSON");
      expect(groupWarning).toContain("UUID");
    });

    it("should detect multiple duplicate IDs", () => {
      const tools: Tool[] = [
        {
          id: "dup",
          name: "Tool 1",
          description: "Description that is long enough for SEO",
          href: "/tools/dup-1",
          group: "JSON",
          groupColor: "blue",
          groupIcon: "braces",
        },
        {
          id: "dup",
          name: "Tool 2",
          description: "Description that is long enough for SEO",
          href: "/tools/dup-2",
          group: "JSON",
          groupColor: "blue",
          groupIcon: "braces",
        },
        {
          id: "dup",
          name: "Tool 3",
          description: "Description that is long enough for SEO",
          href: "/tools/dup-3",
          group: "JSON",
          groupColor: "blue",
          groupIcon: "braces",
        },
      ];
      const result = validateToolRegistry(tools);
      expect(result.valid).toBe(false);
      expect(result.duplicateIds).toContain("dup");
      expect(result.errors.some((e) => e.includes("3 times"))).toBe(true);
    });
  });

  describe("formatValidationResult", () => {
    it("should format successful validation", () => {
      const result = {
        valid: true,
        errors: [],
        warnings: [],
        toolId: "test-tool",
      };
      const formatted = formatValidationResult(result);
      expect(formatted).toContain("✅");
      expect(formatted).toContain("passed");
    });

    it("should format failed validation", () => {
      const result = {
        valid: false,
        errors: ["Error 1", "Error 2"],
        warnings: [],
        toolId: "test-tool",
      };
      const formatted = formatValidationResult(result);
      expect(formatted).toContain("❌");
      expect(formatted).toContain("failed");
      expect(formatted).toContain("Error 1");
      expect(formatted).toContain("Error 2");
    });

    it("should format warnings", () => {
      const result = {
        valid: true,
        errors: [],
        warnings: ["Warning 1", "Warning 2"],
        toolId: "test-tool",
      };
      const formatted = formatValidationResult(result);
      expect(formatted).toContain("⚠️");
      expect(formatted).toContain("Warning 1");
      expect(formatted).toContain("Warning 2");
    });

    it("should format both errors and warnings", () => {
      const result = {
        valid: false,
        errors: ["Error 1"],
        warnings: ["Warning 1"],
        toolId: "test-tool",
      };
      const formatted = formatValidationResult(result);
      expect(formatted).toContain("Error 1");
      expect(formatted).toContain("Warning 1");
      expect(formatted).toContain("Errors:");
      expect(formatted).toContain("Warnings:");
    });

    it("should handle registry validation results", () => {
      const result = {
        valid: true,
        errors: [],
        warnings: ["Total tools: 20"],
        duplicateIds: [],
        duplicateHrefs: [],
      };
      const formatted = formatValidationResult(result);
      expect(formatted).toContain("✅");
      expect(formatted).toContain("Total tools: 20");
    });
  });

  describe("Integration with Real Registry", () => {
    it("should validate all tools in registry individually", () => {
      TOOL_REGISTRY.forEach((tool) => {
        const result = validateToolConfig(tool);
        // All tools should have valid configuration
        expect(result.errors.length).toBe(0);
      });
    });

    it("should have consistent group colors within groups", () => {
      const groupColors = new Map<string, Set<string>>();

      TOOL_REGISTRY.forEach((tool) => {
        if (!groupColors.has(tool.group)) {
          groupColors.set(tool.group, new Set());
        }
        groupColors.get(tool.group)!.add(tool.groupColor);
      });

      // Each group should typically have one color (warning, not error)
      groupColors.forEach((colors, group) => {
        if (colors.size > 1) {
          console.warn(
            `Group "${group}" has multiple colors: ${Array.from(colors).join(", ")}`
          );
        }
      });
    });

    it("should have consistent group icons within groups", () => {
      const groupIcons = new Map<string, Set<string>>();

      TOOL_REGISTRY.forEach((tool) => {
        if (!groupIcons.has(tool.group)) {
          groupIcons.set(tool.group, new Set());
        }
        groupIcons.get(tool.group)!.add(tool.groupIcon);
      });

      // Each group should typically have one icon
      groupIcons.forEach((icons, group) => {
        if (icons.size > 1) {
          console.warn(
            `Group "${group}" has multiple icons: ${Array.from(icons).join(", ")}`
          );
        }
      });
    });

    it("should have valid related tools references", () => {
      TOOL_REGISTRY.forEach((tool) => {
        if (tool.relatedTools) {
          tool.relatedTools.forEach((relatedId) => {
            const relatedTool = TOOL_REGISTRY.find((t) => t.id === relatedId);
            expect(relatedTool).toBeDefined();
            expect(relatedTool?.id).toBe(relatedId);
          });
        }
      });
    });
  });
});
