import { describe, it, expect } from "vitest";
import {
  validateToolRegistry,
  validateToolConfig,
} from "@/lib/tools/validator";
import { TOOL_REGISTRY, getToolById } from "@/lib/tools/registry";

/**
 * Integration Tests: Tool Validation Pipeline
 *
 * These tests verify that the complete tool validation system works correctly,
 * from individual tool validation to registry-wide checks.
 */
describe("Integration: Tool Validation Pipeline", () => {
  describe("Complete Registry Validation", () => {
    it("should validate entire registry without errors", () => {
      const result = validateToolRegistry(TOOL_REGISTRY);

      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.duplicateIds).toHaveLength(0);
      expect(result.duplicateHrefs).toHaveLength(0);
    });

    it("should provide comprehensive statistics", () => {
      const result = validateToolRegistry(TOOL_REGISTRY);

      // Should have warnings with tool count and group info
      expect(result.warnings.length).toBeGreaterThan(0);

      const toolCountWarning = result.warnings.find((w) =>
        w.includes("Total tools:")
      );
      const groupWarning = result.warnings.find((w) =>
        w.includes("Tool groups:")
      );

      expect(toolCountWarning).toBeDefined();
      expect(groupWarning).toBeDefined();
    });

    it("should validate each tool individually", () => {
      TOOL_REGISTRY.forEach((tool) => {
        const result = validateToolConfig(tool);

        if (!result.valid) {
          console.error(`Tool ${tool.id} validation failed:`, result.errors);
        }

        expect(result.valid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });
    });

    it("should ensure all tools are accessible by ID", () => {
      TOOL_REGISTRY.forEach((tool) => {
        const foundTool = getToolById(tool.id);
        expect(foundTool).toBeDefined();
        expect(foundTool?.id).toBe(tool.id);
      });
    });

    it("should ensure all href patterns are correct", () => {
      TOOL_REGISTRY.forEach((tool) => {
        expect(tool.href).toBe(`/tools/${tool.id}`);
        expect(tool.href).toMatch(/^\/tools\/[a-z0-9-]+$/);
      });
    });

    it("should verify related tools exist", () => {
      TOOL_REGISTRY.forEach((tool) => {
        if (tool.relatedTools && tool.relatedTools.length > 0) {
          tool.relatedTools.forEach((relatedId) => {
            const relatedTool = getToolById(relatedId);
            expect(relatedTool).toBeDefined();
            expect(relatedTool?.id).toBe(relatedId);
          });
        }
      });
    });

    it("should ensure no self-references in related tools", () => {
      TOOL_REGISTRY.forEach((tool) => {
        if (tool.relatedTools) {
          expect(tool.relatedTools).not.toContain(tool.id);
        }
      });
    });

    it("should have consistent group metadata", () => {
      const groupsMap = new Map<
        string,
        { color: string; icon: string; count: number }
      >();

      TOOL_REGISTRY.forEach((tool) => {
        if (!groupsMap.has(tool.group)) {
          groupsMap.set(tool.group, {
            color: tool.groupColor,
            icon: tool.groupIcon,
            count: 0,
          });
        }

        const groupData = groupsMap.get(tool.group)!;
        groupData.count++;

        // All tools in same group should have same color and icon
        expect(tool.groupColor).toBe(groupData.color);
        expect(tool.groupIcon).toBe(groupData.icon);
      });

      // Each group should have at least one tool
      groupsMap.forEach((data, group) => {
        expect(data.count).toBeGreaterThan(0);
      });
    });
  });

  describe("SEO and Metadata Quality", () => {
    it("should have meaningful descriptions for all tools", () => {
      TOOL_REGISTRY.forEach((tool) => {
        expect(tool.description.length).toBeGreaterThan(50);
        expect(tool.description.length).toBeLessThan(200);

        // Should not be placeholder text (but lorem-ipsum tool can mention it)
        expect(tool.description.toLowerCase()).not.toContain("lorem ipsum");
        if (tool.id !== "lorem-ipsum") {
          expect(tool.description.toLowerCase()).not.toContain("placeholder");
        }
        expect(tool.description.toLowerCase()).not.toContain("todo");
      });
    });

    it("should have keywords for all tools", () => {
      const toolsWithKeywords = TOOL_REGISTRY.filter(
        (tool) => tool.keywords && tool.keywords.length > 0
      );

      // At least 90% of tools should have keywords
      const percentage =
        (toolsWithKeywords.length / TOOL_REGISTRY.length) * 100;
      expect(percentage).toBeGreaterThan(90);
    });

    it("should have reasonable keyword counts", () => {
      TOOL_REGISTRY.forEach((tool) => {
        if (tool.keywords) {
          expect(tool.keywords.length).toBeGreaterThan(0);
          expect(tool.keywords.length).toBeLessThan(15); // Not too many
        }
      });
    });

    it("should have unique names", () => {
      const names = TOOL_REGISTRY.map((tool) => tool.name);
      const uniqueNames = new Set(names);
      expect(uniqueNames.size).toBe(names.length);
    });
  });

  describe("Data Integrity and Consistency", () => {
    it("should have valid color values", () => {
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

      TOOL_REGISTRY.forEach((tool) => {
        expect(validColors).toContain(tool.groupColor);
      });
    });

    it("should have balanced group distribution", () => {
      const groupCounts = new Map<string, number>();

      TOOL_REGISTRY.forEach((tool) => {
        groupCounts.set(tool.group, (groupCounts.get(tool.group) || 0) + 1);
      });

      // No group should dominate (more than 50% of tools)
      const maxGroupSize = Math.max(...groupCounts.values());
      const totalTools = TOOL_REGISTRY.length;

      expect(maxGroupSize / totalTools).toBeLessThan(0.5);
    });

    it("should have at least multiple groups", () => {
      const uniqueGroups = new Set(TOOL_REGISTRY.map((tool) => tool.group));
      expect(uniqueGroups.size).toBeGreaterThanOrEqual(5);
    });

    it("should have proper ID formatting", () => {
      const kebabCaseRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

      TOOL_REGISTRY.forEach((tool) => {
        expect(tool.id).toMatch(kebabCaseRegex);
        expect(tool.id).not.toContain("_");
        expect(tool.id).not.toContain(" ");
        expect(tool.id).toBe(tool.id.toLowerCase());
      });
    });
  });

  describe("Cross-Tool Relationships", () => {
    it("should have bidirectional related tools where appropriate", () => {
      const relatedToolsMap = new Map<string, Set<string>>();

      TOOL_REGISTRY.forEach((tool) => {
        if (tool.relatedTools) {
          tool.relatedTools.forEach((relatedId) => {
            if (!relatedToolsMap.has(tool.id)) {
              relatedToolsMap.set(tool.id, new Set());
            }
            relatedToolsMap.get(tool.id)!.add(relatedId);
          });
        }
      });

      // Check if some relationships are bidirectional
      let bidirectionalCount = 0;
      relatedToolsMap.forEach((related, toolId) => {
        related.forEach((relatedId) => {
          const reverseRelated = relatedToolsMap.get(relatedId);
          if (reverseRelated?.has(toolId)) {
            bidirectionalCount++;
          }
        });
      });

      // At least some relationships should be bidirectional
      expect(bidirectionalCount).toBeGreaterThan(0);
    });

    it("should have related tools within reasonable count", () => {
      TOOL_REGISTRY.forEach((tool) => {
        if (tool.relatedTools) {
          // Not too few (less useful)
          expect(tool.relatedTools.length).toBeGreaterThan(0);
          // Not too many (overwhelming)
          expect(tool.relatedTools.length).toBeLessThanOrEqual(6);
        }
      });
    });
  });

  describe("Build Process Integration", () => {
    it("should be ready for sitemap generation", () => {
      // All tools should have valid hrefs for sitemap
      TOOL_REGISTRY.forEach((tool) => {
        expect(tool.href).toBeDefined();
        expect(tool.href).toMatch(/^\/tools\/[a-z0-9-]+$/);
      });
    });

    it("should be ready for navigation generation", () => {
      // All tools should have required fields for navigation
      TOOL_REGISTRY.forEach((tool) => {
        expect(tool.id).toBeDefined();
        expect(tool.name).toBeDefined();
        expect(tool.href).toBeDefined();
        expect(tool.group).toBeDefined();
      });
    });

    it("should have no circular dependencies", () => {
      // Simple check: no tool references itself
      TOOL_REGISTRY.forEach((tool) => {
        if (tool.relatedTools) {
          expect(tool.relatedTools).not.toContain(tool.id);
        }
      });
    });
  });

  describe("Performance Considerations", () => {
    it("should be efficient to validate", () => {
      const startTime = performance.now();
      validateToolRegistry(TOOL_REGISTRY);
      const endTime = performance.now();

      // Validation should be fast (< 50ms)
      expect(endTime - startTime).toBeLessThan(50);
    });

    it("should be efficient to validate individual tools", () => {
      const startTime = performance.now();
      TOOL_REGISTRY.forEach((tool) => {
        validateToolConfig(tool);
      });
      const endTime = performance.now();

      // Should validate all tools in reasonable time (< 100ms)
      expect(endTime - startTime).toBeLessThan(100);
    });

    it("should have reasonable registry size", () => {
      // Not empty, but not too large to manage
      expect(TOOL_REGISTRY.length).toBeGreaterThan(10);
      expect(TOOL_REGISTRY.length).toBeLessThan(100);
    });
  });
});
