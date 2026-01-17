import { describe, it, expect } from "vitest";
import {
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  isValidHex,
  normalizeHex,
  parseColor,
  getColorFormats,
  adjustLightness,
  generateLighterShades,
  generateDarkerShades,
  getComplementaryColor,
  getAnalogousColors,
  getTriadicColors,
  getTetradicColors,
  getLuminance,
  getContrastRatio,
  hasGoodContrast,
  getReadableTextColor,
  type RGB,
  type HSL,
} from "../utils";

describe("Color Picker Utils", () => {
  describe("hexToRgb", () => {
    it("should convert 6-digit hex to RGB", () => {
      const result = hexToRgb("#ff0000");
      expect(result).toEqual({ r: 255, g: 0, b: 0 });
    });

    it("should handle hex without # prefix", () => {
      const result = hexToRgb("00ff00");
      expect(result).toEqual({ r: 0, g: 255, b: 0 });
    });

    it("should be case insensitive", () => {
      const upper = hexToRgb("#FFFFFF");
      const lower = hexToRgb("#ffffff");
      expect(upper).toEqual(lower);
      expect(upper).toEqual({ r: 255, g: 255, b: 255 });
    });

    it("should return null for invalid hex", () => {
      expect(hexToRgb("invalid")).toBeNull();
      expect(hexToRgb("#gg0000")).toBeNull();
      expect(hexToRgb("#fff")).toBeNull(); // 3-digit not supported by hexToRgb
    });

    it("should convert common colors correctly", () => {
      expect(hexToRgb("#000000")).toEqual({ r: 0, g: 0, b: 0 });
      expect(hexToRgb("#ffffff")).toEqual({ r: 255, g: 255, b: 255 });
      expect(hexToRgb("#0080ff")).toEqual({ r: 0, g: 128, b: 255 });
    });
  });

  describe("rgbToHex", () => {
    it("should convert RGB to hex", () => {
      expect(rgbToHex(255, 0, 0)).toBe("#ff0000");
      expect(rgbToHex(0, 255, 0)).toBe("#00ff00");
      expect(rgbToHex(0, 0, 255)).toBe("#0000ff");
    });

    it("should handle black and white", () => {
      expect(rgbToHex(0, 0, 0)).toBe("#000000");
      expect(rgbToHex(255, 255, 255)).toBe("#ffffff");
    });

    it("should pad single digit values", () => {
      expect(rgbToHex(1, 2, 3)).toBe("#010203");
      expect(rgbToHex(10, 20, 30)).toBe("#0a141e");
    });

    it("should round decimal values", () => {
      expect(rgbToHex(255.4, 128.6, 0.1)).toBe("#ff8100");
    });

    it("should handle common colors", () => {
      expect(rgbToHex(128, 128, 128)).toBe("#808080");
      expect(rgbToHex(0, 128, 255)).toBe("#0080ff");
    });
  });

  describe("Hex ↔ RGB Round-trip", () => {
    const testColors = [
      "#ff0000",
      "#00ff00",
      "#0000ff",
      "#ffffff",
      "#000000",
      "#808080",
      "#ff8800",
      "#123456",
      "#abcdef",
    ];

    testColors.forEach((hex) => {
      it(`should round-trip ${hex}`, () => {
        const rgb = hexToRgb(hex);
        expect(rgb).not.toBeNull();
        const backToHex = rgbToHex(rgb!.r, rgb!.g, rgb!.b);
        expect(backToHex).toBe(hex);
      });
    });
  });

  describe("rgbToHsl", () => {
    it("should convert red to HSL", () => {
      const result = rgbToHsl(255, 0, 0);
      expect(result.h).toBe(0);
      expect(result.s).toBe(100);
      expect(result.l).toBe(50);
    });

    it("should convert green to HSL", () => {
      const result = rgbToHsl(0, 255, 0);
      expect(result.h).toBe(120);
      expect(result.s).toBe(100);
      expect(result.l).toBe(50);
    });

    it("should convert blue to HSL", () => {
      const result = rgbToHsl(0, 0, 255);
      expect(result.h).toBe(240);
      expect(result.s).toBe(100);
      expect(result.l).toBe(50);
    });

    it("should convert white to HSL", () => {
      const result = rgbToHsl(255, 255, 255);
      expect(result.l).toBe(100);
      expect(result.s).toBe(0);
    });

    it("should convert black to HSL", () => {
      const result = rgbToHsl(0, 0, 0);
      expect(result.l).toBe(0);
      expect(result.s).toBe(0);
    });

    it("should convert gray to HSL", () => {
      const result = rgbToHsl(128, 128, 128);
      expect(result.s).toBe(0);
      expect(result.l).toBeGreaterThan(40);
      expect(result.l).toBeLessThan(60);
    });
  });

  describe("hslToRgb", () => {
    it("should convert HSL red to RGB", () => {
      const result = hslToRgb(0, 100, 50);
      expect(result).toEqual({ r: 255, g: 0, b: 0 });
    });

    it("should convert HSL green to RGB", () => {
      const result = hslToRgb(120, 100, 50);
      expect(result).toEqual({ r: 0, g: 255, b: 0 });
    });

    it("should convert HSL blue to RGB", () => {
      const result = hslToRgb(240, 100, 50);
      expect(result).toEqual({ r: 0, g: 0, b: 255 });
    });

    it("should convert HSL white to RGB", () => {
      const result = hslToRgb(0, 0, 100);
      expect(result).toEqual({ r: 255, g: 255, b: 255 });
    });

    it("should convert HSL black to RGB", () => {
      const result = hslToRgb(0, 0, 0);
      expect(result).toEqual({ r: 0, g: 0, b: 0 });
    });

    it("should handle gray (zero saturation)", () => {
      const result = hslToRgb(180, 0, 50);
      expect(result.r).toBe(result.g);
      expect(result.g).toBe(result.b);
    });
  });

  describe("RGB ↔ HSL Round-trip", () => {
    const testRgbColors: RGB[] = [
      { r: 255, g: 0, b: 0 },
      { r: 0, g: 255, b: 0 },
      { r: 0, g: 0, b: 255 },
      { r: 255, g: 255, b: 255 },
      { r: 0, g: 0, b: 0 },
      { r: 128, g: 128, b: 128 },
      { r: 255, g: 128, b: 0 },
    ];

    testRgbColors.forEach((rgb) => {
      it(`should round-trip RGB(${rgb.r},${rgb.g},${rgb.b})`, () => {
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        const backToRgb = hslToRgb(hsl.h, hsl.s, hsl.l);
        // Allow small rounding errors (±1)
        expect(Math.abs(backToRgb.r - rgb.r)).toBeLessThanOrEqual(1);
        expect(Math.abs(backToRgb.g - rgb.g)).toBeLessThanOrEqual(1);
        expect(Math.abs(backToRgb.b - rgb.b)).toBeLessThanOrEqual(1);
      });
    });
  });

  describe("isValidHex", () => {
    it("should validate 6-digit hex colors", () => {
      expect(isValidHex("#ff0000")).toBe(true);
      expect(isValidHex("#FFFFFF")).toBe(true);
      expect(isValidHex("123456")).toBe(true);
    });

    it("should validate 3-digit hex colors", () => {
      expect(isValidHex("#fff")).toBe(true);
      expect(isValidHex("#000")).toBe(true);
      expect(isValidHex("abc")).toBe(true);
    });

    it("should reject invalid formats", () => {
      expect(isValidHex("#gg0000")).toBe(false);
      expect(isValidHex("12345")).toBe(false); // 5 digits
      expect(isValidHex("#1234567")).toBe(false); // 7 digits
      expect(isValidHex("invalid")).toBe(false);
      expect(isValidHex("")).toBe(false);
    });
  });

  describe("normalizeHex", () => {
    it("should expand 3-digit hex to 6-digit", () => {
      expect(normalizeHex("#fff")).toBe("#ffffff");
      expect(normalizeHex("#000")).toBe("#000000");
      expect(normalizeHex("#abc")).toBe("#aabbcc");
    });

    it("should add # prefix if missing", () => {
      expect(normalizeHex("ff0000")).toBe("#ff0000");
    });

    it("should convert to lowercase", () => {
      expect(normalizeHex("#FF0000")).toBe("#ff0000");
      expect(normalizeHex("#ABC")).toBe("#aabbcc");
    });

    it("should handle already normalized hex", () => {
      expect(normalizeHex("#ff0000")).toBe("#ff0000");
    });
  });

  describe("parseColor", () => {
    it("should parse hex colors", () => {
      expect(parseColor("#ff0000")).toEqual({ r: 255, g: 0, b: 0 });
      expect(parseColor("00ff00")).toEqual({ r: 0, g: 255, b: 0 });
    });

    it("should parse 3-digit hex colors", () => {
      expect(parseColor("#fff")).toEqual({ r: 255, g: 255, b: 255 });
      expect(parseColor("000")).toEqual({ r: 0, g: 0, b: 0 });
    });

    it("should parse RGB format", () => {
      expect(parseColor("rgb(255, 0, 0)")).toEqual({ r: 255, g: 0, b: 0 });
      expect(parseColor("rgb(0,255,0)")).toEqual({ r: 0, g: 255, b: 0 });
    });

    it("should parse RGBA format (ignoring alpha)", () => {
      expect(parseColor("rgba(255, 0, 0, 0.5)")).toEqual({
        r: 255,
        g: 0,
        b: 0,
      });
    });

    it("should parse HSL format", () => {
      const result = parseColor("hsl(0, 100%, 50%)");
      expect(result).toEqual({ r: 255, g: 0, b: 0 });
    });

    it("should parse HSLA format (ignoring alpha)", () => {
      const result = parseColor("hsla(120, 100%, 50%, 0.8)");
      expect(result).toEqual({ r: 0, g: 255, b: 0 });
    });

    it("should return null for invalid formats", () => {
      expect(parseColor("invalid")).toBeNull();
      expect(parseColor("")).toBeNull();
      expect(parseColor("blue")).toBeNull();
    });

    it("should handle whitespace", () => {
      expect(parseColor("  #ff0000  ")).toEqual({ r: 255, g: 0, b: 0 });
      expect(parseColor("  rgb(255, 0, 0)  ")).toEqual({ r: 255, g: 0, b: 0 });
    });
  });

  describe("getColorFormats", () => {
    it("should return all color formats", () => {
      const rgb: RGB = { r: 255, g: 0, b: 0 };
      const formats = getColorFormats(rgb);

      expect(formats.hex).toBe("#FF0000");
      expect(formats.rgb).toBe("rgb(255, 0, 0)");
      expect(formats.hsl).toBe("hsl(0, 100%, 50%)");
      expect(formats.rgba).toBe("rgba(255, 0, 0, 1)");
      expect(formats.hsla).toBe("hsla(0, 100%, 50%, 1)");
    });

    it("should handle custom alpha", () => {
      const rgb: RGB = { r: 0, g: 128, b: 255 };
      const formats = getColorFormats(rgb, 0.5);

      expect(formats.rgba).toBe("rgba(0, 128, 255, 0.5)");
      expect(formats.hsla).toContain("0.5");
    });

    it("should return uppercase hex", () => {
      const rgb: RGB = { r: 171, g: 205, b: 239 };
      const formats = getColorFormats(rgb);

      expect(formats.hex).toMatch(/^#[A-F0-9]{6}$/);
    });
  });

  describe("adjustLightness", () => {
    it("should lighten a color", () => {
      const lighter = adjustLightness("#808080", 20);
      const originalRgb = hexToRgb("#808080")!;
      const lighterRgb = hexToRgb(lighter)!;

      // Lighter color should have higher values
      expect(lighterRgb.r).toBeGreaterThan(originalRgb.r);
    });

    it("should darken a color", () => {
      const darker = adjustLightness("#808080", -20);
      const originalRgb = hexToRgb("#808080")!;
      const darkerRgb = hexToRgb(darker)!;

      // Darker color should have lower values
      expect(darkerRgb.r).toBeLessThan(originalRgb.r);
    });

    it("should not exceed white", () => {
      const result = adjustLightness("#ffffff", 50);
      expect(result).toBe("#ffffff");
    });

    it("should not go below black", () => {
      const result = adjustLightness("#000000", -50);
      expect(result).toBe("#000000");
    });

    it("should return original for invalid hex", () => {
      const result = adjustLightness("invalid", 20);
      expect(result).toBe("invalid");
    });
  });

  describe("generateLighterShades", () => {
    it("should generate lighter shades", () => {
      const shades = generateLighterShades("#808080", 3);
      expect(shades).toHaveLength(3);

      // Each shade should be lighter than the previous
      const rgb0 = hexToRgb(shades[0])!;
      const rgb1 = hexToRgb(shades[1])!;
      const rgb2 = hexToRgb(shades[2])!;

      expect(rgb1.r).toBeGreaterThanOrEqual(rgb0.r);
      expect(rgb2.r).toBeGreaterThanOrEqual(rgb1.r);
    });

    it("should generate default 5 shades", () => {
      const shades = generateLighterShades("#808080");
      expect(shades).toHaveLength(5);
    });
  });

  describe("generateDarkerShades", () => {
    it("should generate darker shades", () => {
      const shades = generateDarkerShades("#808080", 3);
      expect(shades).toHaveLength(3);

      // Each shade should be darker than the previous
      const rgb0 = hexToRgb(shades[0])!;
      const rgb1 = hexToRgb(shades[1])!;
      const rgb2 = hexToRgb(shades[2])!;

      expect(rgb1.r).toBeLessThanOrEqual(rgb0.r);
      expect(rgb2.r).toBeLessThanOrEqual(rgb1.r);
    });

    it("should generate default 5 shades", () => {
      const shades = generateDarkerShades("#808080");
      expect(shades).toHaveLength(5);
    });
  });

  describe("getComplementaryColor", () => {
    it("should return complementary color (180° hue shift)", () => {
      // Red complementary is cyan
      const complementary = getComplementaryColor("#ff0000");
      const rgb = hexToRgb(complementary)!;
      expect(rgb.r).toBeLessThan(50); // Should be low red
      expect(rgb.g).toBeGreaterThan(200); // High green
      expect(rgb.b).toBeGreaterThan(200); // High blue
    });

    it("should return original for invalid hex", () => {
      const result = getComplementaryColor("invalid");
      expect(result).toBe("invalid");
    });

    it("should maintain same lightness and saturation", () => {
      const original = "#ff0000";
      const complementary = getComplementaryColor(original);

      const originalRgb = hexToRgb(original)!;
      const complementaryRgb = hexToRgb(complementary)!;

      const originalHsl = rgbToHsl(originalRgb.r, originalRgb.g, originalRgb.b);
      const complementaryHsl = rgbToHsl(
        complementaryRgb.r,
        complementaryRgb.g,
        complementaryRgb.b
      );

      expect(Math.abs(originalHsl.s - complementaryHsl.s)).toBeLessThan(5);
      expect(Math.abs(originalHsl.l - complementaryHsl.l)).toBeLessThan(5);
    });
  });

  describe("getAnalogousColors", () => {
    it("should return 2 analogous colors", () => {
      const colors = getAnalogousColors("#ff0000");
      expect(colors).toHaveLength(2);
    });

    it("should return different colors", () => {
      const colors = getAnalogousColors("#ff0000");
      expect(colors[0]).not.toBe(colors[1]);
    });

    it("should return original hex for invalid input", () => {
      const colors = getAnalogousColors("invalid");
      expect(colors).toEqual(["invalid"]);
    });
  });

  describe("getTriadicColors", () => {
    it("should return 2 triadic colors", () => {
      const colors = getTriadicColors("#ff0000");
      expect(colors).toHaveLength(2);
    });

    it("should return different colors", () => {
      const colors = getTriadicColors("#ff0000");
      expect(colors[0]).not.toBe(colors[1]);
    });
  });

  describe("getTetradicColors", () => {
    it("should return 3 tetradic colors", () => {
      const colors = getTetradicColors("#ff0000");
      expect(colors).toHaveLength(3);
    });

    it("should return different colors", () => {
      const colors = getTetradicColors("#ff0000");
      const uniqueColors = new Set(colors);
      expect(uniqueColors.size).toBe(3);
    });
  });

  describe("getLuminance", () => {
    it("should return 1 for white", () => {
      const luminance = getLuminance({ r: 255, g: 255, b: 255 });
      expect(luminance).toBeCloseTo(1, 2);
    });

    it("should return 0 for black", () => {
      const luminance = getLuminance({ r: 0, g: 0, b: 0 });
      expect(luminance).toBe(0);
    });

    it("should return intermediate values for colors", () => {
      const luminance = getLuminance({ r: 128, g: 128, b: 128 });
      expect(luminance).toBeGreaterThan(0);
      expect(luminance).toBeLessThan(1);
    });

    it("should calculate different luminance for different colors", () => {
      const redLum = getLuminance({ r: 255, g: 0, b: 0 });
      const greenLum = getLuminance({ r: 0, g: 255, b: 0 });
      const blueLum = getLuminance({ r: 0, g: 0, b: 255 });

      // Green has the highest luminance factor
      expect(greenLum).toBeGreaterThan(redLum);
      expect(greenLum).toBeGreaterThan(blueLum);
    });
  });

  describe("getContrastRatio", () => {
    it("should return 21 for black on white", () => {
      const ratio = getContrastRatio(
        { r: 0, g: 0, b: 0 },
        { r: 255, g: 255, b: 255 }
      );
      expect(ratio).toBeCloseTo(21, 0);
    });

    it("should return 1 for identical colors", () => {
      const ratio = getContrastRatio(
        { r: 128, g: 128, b: 128 },
        { r: 128, g: 128, b: 128 }
      );
      expect(ratio).toBeCloseTo(1, 2);
    });

    it("should be symmetric", () => {
      const ratio1 = getContrastRatio(
        { r: 255, g: 0, b: 0 },
        { r: 0, g: 0, b: 255 }
      );
      const ratio2 = getContrastRatio(
        { r: 0, g: 0, b: 255 },
        { r: 255, g: 0, b: 0 }
      );
      expect(ratio1).toBe(ratio2);
    });
  });

  describe("hasGoodContrast", () => {
    it("should pass AA for black on white", () => {
      const result = hasGoodContrast(
        { r: 0, g: 0, b: 0 },
        { r: 255, g: 255, b: 255 },
        "AA"
      );
      expect(result.passes).toBe(true);
      expect(result.ratio).toBeGreaterThan(4.5);
    });

    it("should pass AAA for black on white", () => {
      const result = hasGoodContrast(
        { r: 0, g: 0, b: 0 },
        { r: 255, g: 255, b: 255 },
        "AAA"
      );
      expect(result.passes).toBe(true);
      expect(result.ratio).toBeGreaterThan(7);
    });

    it("should fail for low contrast", () => {
      const result = hasGoodContrast(
        { r: 200, g: 200, b: 200 },
        { r: 210, g: 210, b: 210 },
        "AA"
      );
      expect(result.passes).toBe(false);
    });

    it("should return contrast ratio", () => {
      const result = hasGoodContrast(
        { r: 0, g: 0, b: 0 },
        { r: 255, g: 255, b: 255 }
      );
      expect(result.ratio).toBeGreaterThan(20);
    });
  });

  describe("getReadableTextColor", () => {
    it("should return white for dark backgrounds", () => {
      const textColor = getReadableTextColor({ r: 0, g: 0, b: 0 });
      expect(textColor).toBe("#ffffff");
    });

    it("should return black for light backgrounds", () => {
      const textColor = getReadableTextColor({ r: 255, g: 255, b: 255 });
      expect(textColor).toBe("#000000");
    });

    it("should return black for yellow (high luminance)", () => {
      const textColor = getReadableTextColor({ r: 255, g: 255, b: 0 });
      expect(textColor).toBe("#000000");
    });

    it("should return white for blue (low luminance)", () => {
      const textColor = getReadableTextColor({ r: 0, g: 0, b: 255 });
      expect(textColor).toBe("#ffffff");
    });
  });
});
