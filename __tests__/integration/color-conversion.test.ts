import { describe, it, expect } from "vitest";
import {
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  parseColor,
  getColorFormats,
  getComplementaryColor,
  getAnalogousColors,
  type RGB,
} from "@/app/tools/color-picker/utils";

/**
 * Integration Tests: Color Conversion Pipeline
 *
 * These tests verify that complex color conversions work correctly
 * through multiple transformation steps (e.g., HEX → RGB → HSL → RGB → HEX).
 */
describe("Integration: Color Conversion Pipeline", () => {
  describe("Full Round-Trip Conversions", () => {
    const testColors = [
      { hex: "#ff0000", name: "Red" },
      { hex: "#00ff00", name: "Green" },
      { hex: "#0000ff", name: "Blue" },
      { hex: "#ffff00", name: "Yellow" },
      { hex: "#ff00ff", name: "Magenta" },
      { hex: "#00ffff", name: "Cyan" },
      { hex: "#ffffff", name: "White" },
      { hex: "#000000", name: "Black" },
      { hex: "#808080", name: "Gray" },
      { hex: "#ff8800", name: "Orange" },
      { hex: "#8b4513", name: "Brown" },
      { hex: "#ffc0cb", name: "Pink" },
    ];

    testColors.forEach(({ hex, name }) => {
      it(`should round-trip ${name} through all conversions`, () => {
        // HEX → RGB
        const rgb = hexToRgb(hex);
        expect(rgb).not.toBeNull();

        // RGB → HSL
        const hsl = rgbToHsl(rgb!.r, rgb!.g, rgb!.b);
        expect(hsl).toBeDefined();
        expect(hsl.h).toBeGreaterThanOrEqual(0);
        expect(hsl.h).toBeLessThanOrEqual(360);
        expect(hsl.s).toBeGreaterThanOrEqual(0);
        expect(hsl.s).toBeLessThanOrEqual(100);
        expect(hsl.l).toBeGreaterThanOrEqual(0);
        expect(hsl.l).toBeLessThanOrEqual(100);

        // HSL → RGB
        const rgbFromHsl = hslToRgb(hsl.h, hsl.s, hsl.l);
        expect(rgbFromHsl).toBeDefined();

        // RGB → HEX
        const hexFromRgb = rgbToHex(rgbFromHsl.r, rgbFromHsl.g, rgbFromHsl.b);

        // Should match original (allowing for small rounding errors)
        const originalRgb = rgb!;
        expect(Math.abs(rgbFromHsl.r - originalRgb.r)).toBeLessThanOrEqual(2);
        expect(Math.abs(rgbFromHsl.g - originalRgb.g)).toBeLessThanOrEqual(2);
        expect(Math.abs(rgbFromHsl.b - originalRgb.b)).toBeLessThanOrEqual(2);
      });
    });
  });

  describe("Multi-Format Parsing Pipeline", () => {
    it("should parse and convert HEX → All Formats", () => {
      const inputHex = "#ff5733";
      const rgb = parseColor(inputHex);

      expect(rgb).not.toBeNull();

      const formats = getColorFormats(rgb!);
      expect(formats.hex).toBeDefined();
      expect(formats.rgb).toBeDefined();
      expect(formats.hsl).toBeDefined();
      expect(formats.rgba).toBeDefined();
      expect(formats.hsla).toBeDefined();

      // Verify each format is valid
      expect(formats.hex).toMatch(/^#[A-F0-9]{6}$/);
      expect(formats.rgb).toMatch(/^rgb\(\d+, \d+, \d+\)$/);
      expect(formats.hsl).toMatch(/^hsl\(\d+, \d+%, \d+%\)$/);
    });

    it("should parse and convert RGB string → All Formats", () => {
      const inputRgb = "rgb(75, 150, 225)";
      const rgb = parseColor(inputRgb);

      expect(rgb).not.toBeNull();
      expect(rgb).toEqual({ r: 75, g: 150, b: 225 });

      const formats = getColorFormats(rgb!);
      expect(formats.hex).toBe("#4B96E1");
      expect(formats.rgb).toBe("rgb(75, 150, 225)");
    });

    it("should parse and convert HSL string → All Formats", () => {
      const inputHsl = "hsl(210, 70%, 50%)";
      const rgb = parseColor(inputHsl);

      expect(rgb).not.toBeNull();

      const formats = getColorFormats(rgb!);
      expect(formats.hex).toBeDefined();
      expect(formats.hsl).toContain("210");
    });

    it("should handle different input formats consistently", () => {
      const hexInput = "#3498db";
      const rgbInput = "rgb(52, 152, 219)";
      const hslInput = "hsl(204, 70%, 53%)";

      const rgbFromHex = parseColor(hexInput);
      const rgbFromRgb = parseColor(rgbInput);
      const rgbFromHsl = parseColor(hslInput);

      // All should produce similar RGB values
      expect(rgbFromHex).toEqual({ r: 52, g: 152, b: 219 });
      expect(rgbFromRgb).toEqual({ r: 52, g: 152, b: 219 });

      // HSL conversion may have small rounding differences
      expect(Math.abs(rgbFromHsl!.r - 52)).toBeLessThanOrEqual(2);
      expect(Math.abs(rgbFromHsl!.g - 152)).toBeLessThanOrEqual(2);
      expect(Math.abs(rgbFromHsl!.b - 219)).toBeLessThanOrEqual(2);
    });
  });

  describe("Color Harmony Generation Pipeline", () => {
    it("should generate complementary color and convert back", () => {
      const original = "#ff0000";
      const complementary = getComplementaryColor(original);

      // Parse both colors
      const originalRgb = parseColor(original);
      const complementaryRgb = parseColor(complementary);

      expect(originalRgb).not.toBeNull();
      expect(complementaryRgb).not.toBeNull();

      // Convert both to HSL
      const originalHsl = rgbToHsl(
        originalRgb!.r,
        originalRgb!.g,
        originalRgb!.b
      );
      const complementaryHsl = rgbToHsl(
        complementaryRgb!.r,
        complementaryRgb!.g,
        complementaryRgb!.b
      );

      // Hues should be 180° apart
      const hueDiff = Math.abs(originalHsl.h - complementaryHsl.h);
      expect(hueDiff).toBeCloseTo(180, 0);
    });

    it("should generate analogous colors with consistent spacing", () => {
      const original = "#3498db";
      const analogous = getAnalogousColors(original);

      expect(analogous).toHaveLength(2);

      // Parse all colors
      const originalRgb = parseColor(original)!;
      const analogous1Rgb = parseColor(analogous[0])!;
      const analogous2Rgb = parseColor(analogous[1])!;

      // Convert to HSL
      const originalHsl = rgbToHsl(originalRgb.r, originalRgb.g, originalRgb.b);
      const analogous1Hsl = rgbToHsl(
        analogous1Rgb.r,
        analogous1Rgb.g,
        analogous1Rgb.b
      );
      const analogous2Hsl = rgbToHsl(
        analogous2Rgb.r,
        analogous2Rgb.g,
        analogous2Rgb.b
      );

      // Check hue spacing (should be ~30° apart)
      const diff1 = Math.abs(originalHsl.h - analogous1Hsl.h);
      const diff2 = Math.abs(originalHsl.h - analogous2Hsl.h);

      expect(diff1).toBeGreaterThan(20);
      expect(diff1).toBeLessThan(40);
      expect(diff2).toBeGreaterThan(20);
      expect(diff2).toBeLessThan(40);
    });

    it("should maintain color validity through harmony generation", () => {
      const original = "#e74c3c";

      // Generate all harmony types
      const complementary = getComplementaryColor(original);
      const analogous = getAnalogousColors(original);

      // All generated colors should be valid hex
      expect(complementary).toMatch(/^#[a-f0-9]{6}$/);
      analogous.forEach((color) => {
        expect(color).toMatch(/^#[a-f0-9]{6}$/);

        // Should be parseable
        const rgb = parseColor(color);
        expect(rgb).not.toBeNull();
        expect(rgb!.r).toBeGreaterThanOrEqual(0);
        expect(rgb!.r).toBeLessThanOrEqual(255);
        expect(rgb!.g).toBeGreaterThanOrEqual(0);
        expect(rgb!.g).toBeLessThanOrEqual(255);
        expect(rgb!.b).toBeGreaterThanOrEqual(0);
        expect(rgb!.b).toBeLessThanOrEqual(255);
      });
    });
  });

  describe("Complex Transformation Chains", () => {
    it("should handle: Parse → Format → Parse → Format", () => {
      const input = "rgb(255, 100, 50)";

      // First parse
      const rgb1 = parseColor(input);
      expect(rgb1).not.toBeNull();

      // Get formats
      const formats1 = getColorFormats(rgb1!);

      // Parse the hex format
      const rgb2 = parseColor(formats1.hex);
      expect(rgb2).not.toBeNull();

      // Get formats again
      const formats2 = getColorFormats(rgb2!);

      // Should be identical
      expect(formats2.hex).toBe(formats1.hex);
      expect(formats2.rgb).toBe(formats1.rgb);
    });

    it("should handle: HEX → RGB → HSL → RGB → HEX (10 times)", () => {
      let current = "#8e44ad";

      for (let i = 0; i < 10; i++) {
        const rgb = hexToRgb(current);
        expect(rgb).not.toBeNull();

        const hsl = rgbToHsl(rgb!.r, rgb!.g, rgb!.b);
        const rgbBack = hslToRgb(hsl.h, hsl.s, hsl.l);
        const hexBack = rgbToHex(rgbBack.r, rgbBack.g, rgbBack.b);

        // Small rounding errors accumulate, but should stay very close
        const originalRgb = hexToRgb(current)!;
        const finalRgb = hexToRgb(hexBack)!;

        expect(Math.abs(finalRgb.r - originalRgb.r)).toBeLessThanOrEqual(2);
        expect(Math.abs(finalRgb.g - originalRgb.g)).toBeLessThanOrEqual(2);
        expect(Math.abs(finalRgb.b - originalRgb.b)).toBeLessThanOrEqual(2);

        current = hexBack;
      }
    });

    it("should preserve color through complementary → complementary", () => {
      const original = "#27ae60";

      // Get complementary
      const comp1 = getComplementaryColor(original);
      // Get complementary of complementary
      const comp2 = getComplementaryColor(comp1);

      // Should be very close to original
      const originalRgb = parseColor(original)!;
      const comp2Rgb = parseColor(comp2)!;

      expect(Math.abs(comp2Rgb.r - originalRgb.r)).toBeLessThanOrEqual(2);
      expect(Math.abs(comp2Rgb.g - originalRgb.g)).toBeLessThanOrEqual(2);
      expect(Math.abs(comp2Rgb.b - originalRgb.b)).toBeLessThanOrEqual(2);
    });
  });

  describe("Edge Cases in Pipeline", () => {
    it("should handle pure red through entire pipeline", () => {
      const rgb: RGB = { r: 255, g: 0, b: 0 };

      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      expect(hsl.h).toBe(0);
      expect(hsl.s).toBe(100);
      expect(hsl.l).toBe(50);

      const rgbBack = hslToRgb(hsl.h, hsl.s, hsl.l);
      expect(rgbBack).toEqual(rgb);
    });

    it("should handle grayscale colors (zero saturation)", () => {
      const grays = [
        { r: 0, g: 0, b: 0 },
        { r: 128, g: 128, b: 128 },
        { r: 255, g: 255, b: 255 },
      ];

      grays.forEach((gray) => {
        const hsl = rgbToHsl(gray.r, gray.g, gray.b);
        expect(hsl.s).toBe(0);

        const rgbBack = hslToRgb(hsl.h, hsl.s, hsl.l);
        expect(Math.abs(rgbBack.r - gray.r)).toBeLessThanOrEqual(1);
        expect(Math.abs(rgbBack.g - gray.g)).toBeLessThanOrEqual(1);
        expect(Math.abs(rgbBack.b - gray.b)).toBeLessThanOrEqual(1);
      });
    });

    it("should handle colors at HSL boundaries", () => {
      const boundaryColors = [
        { h: 0, s: 0, l: 0 }, // Black
        { h: 0, s: 0, l: 100 }, // White
        { h: 0, s: 100, l: 50 }, // Pure red
        { h: 360, s: 100, l: 50 }, // Red (360° = 0°)
      ];

      boundaryColors.forEach((hsl) => {
        const rgb = hslToRgb(hsl.h, hsl.s, hsl.l);
        expect(rgb.r).toBeGreaterThanOrEqual(0);
        expect(rgb.r).toBeLessThanOrEqual(255);
        expect(rgb.g).toBeGreaterThanOrEqual(0);
        expect(rgb.g).toBeLessThanOrEqual(255);
        expect(rgb.b).toBeGreaterThanOrEqual(0);
        expect(rgb.b).toBeLessThanOrEqual(255);

        const hslBack = rgbToHsl(rgb.r, rgb.g, rgb.b);
        expect(hslBack.s).toBeGreaterThanOrEqual(0);
        expect(hslBack.s).toBeLessThanOrEqual(100);
        expect(hslBack.l).toBeGreaterThanOrEqual(0);
        expect(hslBack.l).toBeLessThanOrEqual(100);
      });
    });
  });

  describe("Performance and Efficiency", () => {
    it("should handle batch conversions efficiently", () => {
      const colors = Array.from({ length: 100 }, (_, i) => {
        const r = (i * 7) % 256;
        const g = (i * 13) % 256;
        const b = (i * 19) % 256;
        return rgbToHex(r, g, b);
      });

      const startTime = performance.now();

      colors.forEach((hex) => {
        const rgb = hexToRgb(hex);
        if (rgb) {
          const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
          const rgbBack = hslToRgb(hsl.h, hsl.s, hsl.l);
          rgbToHex(rgbBack.r, rgbBack.g, rgbBack.b);
        }
      });

      const endTime = performance.now();

      // 100 full round-trip conversions should complete quickly
      expect(endTime - startTime).toBeLessThan(50);
    });

    it("should handle parallel color parsing efficiently", () => {
      const inputs = [
        "#ff0000",
        "rgb(0, 255, 0)",
        "hsl(240, 100%, 50%)",
        "#00ffff",
        "rgb(255, 255, 0)",
      ];

      const startTime = performance.now();

      const results = inputs.map((input) => {
        const rgb = parseColor(input);
        return rgb ? getColorFormats(rgb) : null;
      });

      const endTime = performance.now();

      expect(results.every((r) => r !== null)).toBe(true);
      expect(endTime - startTime).toBeLessThan(10);
    });
  });
});
