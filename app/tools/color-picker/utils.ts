export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
}

export interface ColorFormats {
  hex: string;
  rgb: string;
  hsl: string;
  rgba: string;
  hsla: string;
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
 * Convert RGB to HEX
 */
export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const hex = Math.round(n).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

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

  let r, g, b;

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
 * Validate HEX color
 */
export function isValidHex(hex: string): boolean {
  return /^#?([a-f\d]{3}|[a-f\d]{6})$/i.test(hex);
}

/**
 * Normalize HEX color (3-digit to 6-digit)
 */
export function normalizeHex(hex: string): string {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }
  return `#${hex}`.toLowerCase();
}

/**
 * Parse color from various formats and convert to RGB
 */
export function parseColor(color: string): RGB | null {
  color = color.trim();

  // Try HEX format
  if (color.startsWith("#") || /^[a-f\d]{3}$|^[a-f\d]{6}$/i.test(color)) {
    const normalized = normalizeHex(color);
    return hexToRgb(normalized);
  }

  // Try RGB format
  const rgbMatch = color.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (rgbMatch) {
    return {
      r: parseInt(rgbMatch[1]),
      g: parseInt(rgbMatch[2]),
      b: parseInt(rgbMatch[3]),
    };
  }

  // Try HSL format
  const hslMatch = color.match(/hsla?\s*\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%/i);
  if (hslMatch) {
    return hslToRgb(
      parseInt(hslMatch[1]),
      parseInt(hslMatch[2]),
      parseInt(hslMatch[3])
    );
  }

  return null;
}

/**
 * Get all color formats from RGB
 */
export function getColorFormats(rgb: RGB, alpha = 1): ColorFormats {
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const hex = rgbToHex(rgb.r, rgb.g, rgb.b);

  return {
    hex: hex.toUpperCase(),
    rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
    hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
    rgba: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`,
    hsla: `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${alpha})`,
  };
}

/**
 * Adjust lightness of a color
 */
export function adjustLightness(hex: string, amount: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  hsl.l = Math.max(0, Math.min(100, hsl.l + amount));

  const newRgb = hslToRgb(hsl.h, hsl.s, hsl.l);
  return rgbToHex(newRgb.r, newRgb.g, newRgb.b);
}

/**
 * Generate lighter shades
 */
export function generateLighterShades(hex: string, count = 5): string[] {
  const shades: string[] = [];
  const step = 10;

  for (let i = 1; i <= count; i++) {
    shades.push(adjustLightness(hex, step * i));
  }

  return shades;
}

/**
 * Generate darker shades
 */
export function generateDarkerShades(hex: string, count = 5): string[] {
  const shades: string[] = [];
  const step = 10;

  for (let i = 1; i <= count; i++) {
    shades.push(adjustLightness(hex, -step * i));
  }

  return shades;
}

/**
 * Get complementary color
 */
export function getComplementaryColor(hex: string): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  hsl.h = (hsl.h + 180) % 360;

  const newRgb = hslToRgb(hsl.h, hsl.s, hsl.l);
  return rgbToHex(newRgb.r, newRgb.g, newRgb.b);
}

/**
 * Get analogous colors
 */
export function getAnalogousColors(hex: string): string[] {
  const rgb = hexToRgb(hex);
  if (!rgb) return [hex];

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const colors: string[] = [];

  [-30, 30].forEach((offset) => {
    const newHsl = { ...hsl, h: (hsl.h + offset + 360) % 360 };
    const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
    colors.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
  });

  return colors;
}

/**
 * Get triadic colors
 */
export function getTriadicColors(hex: string): string[] {
  const rgb = hexToRgb(hex);
  if (!rgb) return [hex];

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const colors: string[] = [];

  [120, 240].forEach((offset) => {
    const newHsl = { ...hsl, h: (hsl.h + offset) % 360 };
    const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
    colors.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
  });

  return colors;
}

/**
 * Get tetradic colors
 */
export function getTetradicColors(hex: string): string[] {
  const rgb = hexToRgb(hex);
  if (!rgb) return [hex];

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const colors: string[] = [];

  [90, 180, 270].forEach((offset) => {
    const newHsl = { ...hsl, h: (hsl.h + offset) % 360 };
    const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
    colors.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
  });

  return colors;
}

/**
 * Calculate relative luminance for WCAG contrast ratio
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
export function getContrastRatio(color1: RGB, color2: RGB): number {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if text color has sufficient contrast with background
 */
export function hasGoodContrast(
  textColor: RGB,
  bgColor: RGB,
  level: "AA" | "AAA" = "AA"
): {
  ratio: number;
  passes: boolean;
  level: string;
} {
  const ratio = getContrastRatio(textColor, bgColor);
  const minRatio = level === "AAA" ? 7 : 4.5;

  return {
    ratio: Math.round(ratio * 100) / 100,
    passes: ratio >= minRatio,
    level,
  };
}

/**
 * Get readable text color (black or white) for a background
 */
export function getReadableTextColor(bgColor: RGB): string {
  const white = { r: 255, g: 255, b: 255 };
  const black = { r: 0, g: 0, b: 0 };

  const contrastWithWhite = getContrastRatio(white, bgColor);
  const contrastWithBlack = getContrastRatio(black, bgColor);

  return contrastWithWhite > contrastWithBlack ? "#ffffff" : "#000000";
}
