/**
 * Color Palettes Utility Functions
 * Generates various color schemes based on color theory
 */

export type RGB = { r: number; g: number; b: number };
export type HSL = { h: number; s: number; l: number };

/**
 * Convert RGB to HSL
 */
export function rgbToHsl(r: number, g: number, b: number): HSL {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/**
 * Convert HSL to RGB
 */
export function hslToRgb(h: number, s: number, l: number): RGB {
  h /= 360;
  s /= 100;
  l /= 100;

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

/**
 * Convert RGB to HEX
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

/**
 * Convert HEX to RGB
 */
export function hexToRgb(hex: string): RGB | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Normalize a color to ensure it's a valid hex
 */
export function normalizeHex(color: string): string {
  // If it's already a hex, return it
  if (color.startsWith("#")) {
    return color.length === 4
      ? `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`
      : color;
  }
  return color;
}

/**
 * Generate a random color
 */
export function generateRandomColor(): string {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;
}

/**
 * Generate monochromatic palette (variations in lightness)
 */
export function generateMonochromaticPalette(
  baseColor: string,
  count: number = 5
): string[] {
  const rgb = hexToRgb(baseColor);
  if (!rgb) return [baseColor];

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const palette: string[] = [];

  // Generate variations in lightness
  const step = 80 / (count - 1);
  for (let i = 0; i < count; i++) {
    const lightness = 10 + step * i;
    const rgb = hslToRgb(hsl.h, hsl.s, lightness);
    palette.push(rgbToHex(rgb.r, rgb.g, rgb.b));
  }

  return palette;
}

/**
 * Generate analogous palette (adjacent colors on the color wheel)
 */
export function generateAnalogousPalette(
  baseColor: string,
  count: number = 5
): string[] {
  const rgb = hexToRgb(baseColor);
  if (!rgb) return [baseColor];

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const palette: string[] = [];

  // Generate colors with hue variations (±30 degrees)
  const angleRange = 60; // Total range
  const step = angleRange / (count - 1);
  const startAngle = hsl.h - angleRange / 2;

  for (let i = 0; i < count; i++) {
    const hue = (startAngle + step * i + 360) % 360;
    const rgb = hslToRgb(hue, hsl.s, hsl.l);
    palette.push(rgbToHex(rgb.r, rgb.g, rgb.b));
  }

  return palette;
}

/**
 * Generate complementary palette (opposite on color wheel)
 */
export function generateComplementaryPalette(baseColor: string): string[] {
  const rgb = hexToRgb(baseColor);
  if (!rgb) return [baseColor];

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const complementaryHue = (hsl.h + 180) % 360;

  const complementaryRgb = hslToRgb(complementaryHue, hsl.s, hsl.l);
  const complementary = rgbToHex(
    complementaryRgb.r,
    complementaryRgb.g,
    complementaryRgb.b
  );

  // Add variations
  const baseDark = hslToRgb(hsl.h, hsl.s, Math.max(hsl.l - 20, 10));
  const compDark = hslToRgb(complementaryHue, hsl.s, Math.max(hsl.l - 20, 10));
  const neutral = hslToRgb(hsl.h, 10, 50);

  return [
    rgbToHex(baseDark.r, baseDark.g, baseDark.b),
    baseColor,
    rgbToHex(neutral.r, neutral.g, neutral.b),
    complementary,
    rgbToHex(compDark.r, compDark.g, compDark.b),
  ];
}

/**
 * Generate triadic palette (120 degrees apart)
 */
export function generateTriadicPalette(baseColor: string): string[] {
  const rgb = hexToRgb(baseColor);
  if (!rgb) return [baseColor];

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const palette: string[] = [baseColor];

  // Add two colors 120 degrees apart
  for (let i = 1; i <= 2; i++) {
    const hue = (hsl.h + i * 120) % 360;
    const rgb = hslToRgb(hue, hsl.s, hsl.l);
    palette.push(rgbToHex(rgb.r, rgb.g, rgb.b));
  }

  // Add lighter and darker variations
  const lighter = hslToRgb(hsl.h, hsl.s, Math.min(hsl.l + 20, 90));
  const darker = hslToRgb(hsl.h, hsl.s, Math.max(hsl.l - 20, 10));

  return [
    rgbToHex(darker.r, darker.g, darker.b),
    ...palette,
    rgbToHex(lighter.r, lighter.g, lighter.b),
  ];
}

/**
 * Generate tetradic (square) palette (90 degrees apart)
 */
export function generateTetradicPalette(baseColor: string): string[] {
  const rgb = hexToRgb(baseColor);
  if (!rgb) return [baseColor];

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const palette: string[] = [];

  // Generate 4 colors 90 degrees apart
  for (let i = 0; i < 4; i++) {
    const hue = (hsl.h + i * 90) % 360;
    const rgb = hslToRgb(hue, hsl.s, hsl.l);
    palette.push(rgbToHex(rgb.r, rgb.g, rgb.b));
  }

  // Add a neutral shade
  const neutral = hslToRgb(hsl.h, 10, 50);
  palette.push(rgbToHex(neutral.r, neutral.g, neutral.b));

  return palette;
}

/**
 * Generate split-complementary palette
 */
export function generateSplitComplementaryPalette(baseColor: string): string[] {
  const rgb = hexToRgb(baseColor);
  if (!rgb) return [baseColor];

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const palette: string[] = [baseColor];

  // Add split complementary colors (150 and 210 degrees)
  const angles = [150, 210];
  angles.forEach((angle) => {
    const hue = (hsl.h + angle) % 360;
    const rgb = hslToRgb(hue, hsl.s, hsl.l);
    palette.push(rgbToHex(rgb.r, rgb.g, rgb.b));
  });

  // Add variations
  const lighter = hslToRgb(hsl.h, hsl.s, Math.min(hsl.l + 25, 90));
  const darker = hslToRgb(hsl.h, hsl.s, Math.max(hsl.l - 25, 10));

  return [
    rgbToHex(darker.r, darker.g, darker.b),
    ...palette,
    rgbToHex(lighter.r, lighter.g, lighter.b),
  ];
}

/**
 * Generate a random palette
 */
export function generateRandomPalette(count: number = 5): string[] {
  const palette: string[] = [];
  const baseHue = Math.floor(Math.random() * 360);

  for (let i = 0; i < count; i++) {
    // Generate harmonious random colors
    const hue = (baseHue + Math.random() * 60 - 30 + i * (360 / count)) % 360;
    const saturation = 40 + Math.random() * 60; // 40-100%
    const lightness = 30 + Math.random() * 50; // 30-80%

    const rgb = hslToRgb(hue, saturation, lightness);
    palette.push(rgbToHex(rgb.r, rgb.g, rgb.b));
  }

  return palette;
}

/**
 * Generate a pastel palette
 */
export function generatePastelPalette(count: number = 5): string[] {
  const palette: string[] = [];
  const baseHue = Math.floor(Math.random() * 360);

  for (let i = 0; i < count; i++) {
    const hue = (baseHue + i * (360 / count)) % 360;
    const saturation = 30 + Math.random() * 30; // 30-60%
    const lightness = 70 + Math.random() * 20; // 70-90%

    const rgb = hslToRgb(hue, saturation, lightness);
    palette.push(rgbToHex(rgb.r, rgb.g, rgb.b));
  }

  return palette;
}

/**
 * Generate a vibrant palette
 */
export function generateVibrantPalette(count: number = 5): string[] {
  const palette: string[] = [];
  const baseHue = Math.floor(Math.random() * 360);

  for (let i = 0; i < count; i++) {
    const hue = (baseHue + i * (360 / count)) % 360;
    const saturation = 80 + Math.random() * 20; // 80-100%
    const lightness = 45 + Math.random() * 20; // 45-65%

    const rgb = hslToRgb(hue, saturation, lightness);
    palette.push(rgbToHex(rgb.r, rgb.g, rgb.b));
  }

  return palette;
}

/**
 * Generate a dark palette
 */
export function generateDarkPalette(count: number = 5): string[] {
  const palette: string[] = [];
  const baseHue = Math.floor(Math.random() * 360);

  for (let i = 0; i < count; i++) {
    const hue = (baseHue + i * (360 / count)) % 360;
    const saturation = 40 + Math.random() * 40; // 40-80%
    const lightness = 15 + Math.random() * 25; // 15-40%

    const rgb = hslToRgb(hue, saturation, lightness);
    palette.push(rgbToHex(rgb.r, rgb.g, rgb.b));
  }

  return palette;
}

/**
 * Calculate relative luminance (for contrast calculations)
 */
export function getLuminance(rgb: RGB): number {
  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((val) => {
    val /= 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Calculate contrast ratio between two colors
 */
export function getContrastRatio(rgb1: RGB, rgb2: RGB): number {
  const lum1 = getLuminance(rgb1);
  const lum2 = getLuminance(rgb2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Get readable text color (black or white) for a background
 */
export function getReadableTextColor(rgb: RGB): string {
  const whiteContrast = getContrastRatio(rgb, { r: 255, g: 255, b: 255 });
  const blackContrast = getContrastRatio(rgb, { r: 0, g: 0, b: 0 });
  return whiteContrast > blackContrast ? "#ffffff" : "#000000";
}

/**
 * Export palette in various formats
 */
export function exportPalette(
  colors: string[],
  format: "css" | "scss" | "json" | "svg" | "tailwind" | "array"
): string {
  switch (format) {
    case "css":
      return colors
        .map((color, i) => `  --color-${i + 1}: ${color};`)
        .join("\n");

    case "scss":
      return colors.map((color, i) => `$color-${i + 1}: ${color};`).join("\n");

    case "json":
      return JSON.stringify(colors, null, 2);

    case "svg":
      const width = 100;
      const height = 20;
      const rectWidth = width / colors.length;
      const rects = colors
        .map(
          (color, i) =>
            `  <rect x="${i * rectWidth}" y="0" width="${rectWidth}" height="${height}" fill="${color}"/>`
        )
        .join("\n");
      return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">\n${rects}\n</svg>`;

    case "tailwind":
      return colors
        .map((color, i) => `  '${(i + 1) * 100}': '${color}',`)
        .join("\n");

    case "array":
      return `[${colors.map((c) => `'${c}'`).join(", ")}]`;

    default:
      return colors.join(", ");
  }
}
