/**
 * Gradient Generator Utility Functions
 * Generates CSS gradients and provides beautiful preset gradients
 */

export type GradientType = "linear" | "radial" | "conic";

export interface GradientStop {
  color: string;
  position: number; // 0-100
}

export interface Gradient {
  id: string;
  name: string;
  type: GradientType;
  angle?: number; // For linear gradients (0-360)
  stops: GradientStop[];
  category?: string;
}

/**
 * Convert HEX to RGB
 */
export function hexToRgb(
  hex: string
): { r: number; g: number; b: number } | null {
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
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

/**
 * Interpolate between two colors
 */
export function interpolateColor(
  color1: string,
  color2: string,
  factor: number
): string {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) return color1;

  const r = Math.round(rgb1.r + (rgb2.r - rgb1.r) * factor);
  const g = Math.round(rgb1.g + (rgb2.g - rgb1.g) * factor);
  const b = Math.round(rgb1.b + (rgb2.b - rgb1.b) * factor);

  return rgbToHex(r, g, b);
}

/**
 * Generate CSS for a gradient
 */
export function generateGradientCSS(gradient: Gradient): string {
  const stops = gradient.stops
    .sort((a, b) => a.position - b.position)
    .map((stop) => `${stop.color} ${stop.position}%`)
    .join(", ");

  switch (gradient.type) {
    case "linear":
      return `linear-gradient(${gradient.angle || 90}deg, ${stops})`;
    case "radial":
      return `radial-gradient(circle, ${stops})`;
    case "conic":
      return `conic-gradient(from ${gradient.angle || 0}deg, ${stops})`;
    default:
      return `linear-gradient(90deg, ${stops})`;
  }
}

/**
 * Generate a random gradient
 */
export function generateRandomGradient(): Gradient {
  const randomColor = () =>
    `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`;

  const numStops = 2 + Math.floor(Math.random() * 3); // 2-4 stops
  const stops: GradientStop[] = [];

  for (let i = 0; i < numStops; i++) {
    stops.push({
      color: randomColor(),
      position: (i / (numStops - 1)) * 100,
    });
  }

  return {
    id: `random-${Date.now()}`,
    name: "Random Gradient",
    type: "linear",
    angle: Math.floor(Math.random() * 360),
    stops,
  };
}

/**
 * Beautiful Preset Gradients
 */
export const PRESET_GRADIENTS: Gradient[] = [
  // Sunset & Warm
  {
    id: "sunset-orange",
    name: "Sunset Orange",
    type: "linear",
    angle: 135,
    stops: [
      { color: "#ff6b6b", position: 0 },
      { color: "#feca57", position: 100 },
    ],
    category: "Warm",
  },
  {
    id: "fire-blaze",
    name: "Fire Blaze",
    type: "linear",
    angle: 45,
    stops: [
      { color: "#f12711", position: 0 },
      { color: "#f5af19", position: 100 },
    ],
    category: "Warm",
  },
  {
    id: "warm-flame",
    name: "Warm Flame",
    type: "linear",
    angle: 45,
    stops: [
      { color: "#ff9a56", position: 0 },
      { color: "#ff6196", position: 100 },
    ],
    category: "Warm",
  },
  {
    id: "peach-dream",
    name: "Peach Dream",
    type: "linear",
    angle: 120,
    stops: [
      { color: "#ffecd2", position: 0 },
      { color: "#fcb69f", position: 100 },
    ],
    category: "Warm",
  },
  {
    id: "mango-pulp",
    name: "Mango Pulp",
    type: "linear",
    angle: 135,
    stops: [
      { color: "#f09819", position: 0 },
      { color: "#edde5d", position: 100 },
    ],
    category: "Warm",
  },

  // Ocean & Cool
  {
    id: "ocean-blue",
    name: "Ocean Blue",
    type: "linear",
    angle: 120,
    stops: [
      { color: "#2e3192", position: 0 },
      { color: "#1bffff", position: 100 },
    ],
    category: "Cool",
  },
  {
    id: "deep-sea",
    name: "Deep Sea",
    type: "linear",
    angle: 180,
    stops: [
      { color: "#4776e6", position: 0 },
      { color: "#8e54e9", position: 100 },
    ],
    category: "Cool",
  },
  {
    id: "cool-blues",
    name: "Cool Blues",
    type: "linear",
    angle: 135,
    stops: [
      { color: "#2193b0", position: 0 },
      { color: "#6dd5ed", position: 100 },
    ],
    category: "Cool",
  },
  {
    id: "frozen-dreams",
    name: "Frozen Dreams",
    type: "linear",
    angle: 135,
    stops: [
      { color: "#fdcbf1", position: 0 },
      { color: "#e6dee9", position: 100 },
    ],
    category: "Cool",
  },
  {
    id: "aqua-splash",
    name: "Aqua Splash",
    type: "linear",
    angle: 90,
    stops: [
      { color: "#13547a", position: 0 },
      { color: "#80d0c7", position: 100 },
    ],
    category: "Cool",
  },

  // Purple & Pink
  {
    id: "purple-paradise",
    name: "Purple Paradise",
    type: "linear",
    angle: 135,
    stops: [
      { color: "#a8edea", position: 0 },
      { color: "#fed6e3", position: 100 },
    ],
    category: "Purple",
  },
  {
    id: "lavender-rose",
    name: "Lavender Rose",
    type: "linear",
    angle: 120,
    stops: [
      { color: "#8e2de2", position: 0 },
      { color: "#4a00e0", position: 100 },
    ],
    category: "Purple",
  },
  {
    id: "cotton-candy",
    name: "Cotton Candy",
    type: "linear",
    angle: 135,
    stops: [
      { color: "#fbc2eb", position: 0 },
      { color: "#a6c1ee", position: 100 },
    ],
    category: "Purple",
  },
  {
    id: "purple-bliss",
    name: "Purple Bliss",
    type: "linear",
    angle: 45,
    stops: [
      { color: "#360033", position: 0 },
      { color: "#0b8793", position: 100 },
    ],
    category: "Purple",
  },
  {
    id: "violet-love",
    name: "Violet Love",
    type: "linear",
    angle: 135,
    stops: [
      { color: "#c471f5", position: 0 },
      { color: "#fa71cd", position: 100 },
    ],
    category: "Purple",
  },

  // Nature & Green
  {
    id: "emerald-water",
    name: "Emerald Water",
    type: "linear",
    angle: 120,
    stops: [
      { color: "#348f50", position: 0 },
      { color: "#56b4d3", position: 100 },
    ],
    category: "Green",
  },
  {
    id: "fresh-mint",
    name: "Fresh Mint",
    type: "linear",
    angle: 135,
    stops: [
      { color: "#00f260", position: 0 },
      { color: "#0575e6", position: 100 },
    ],
    category: "Green",
  },
  {
    id: "forest-green",
    name: "Forest Green",
    type: "linear",
    angle: 90,
    stops: [
      { color: "#134e5e", position: 0 },
      { color: "#71b280", position: 100 },
    ],
    category: "Green",
  },
  {
    id: "lime-light",
    name: "Lime Light",
    type: "linear",
    angle: 135,
    stops: [
      { color: "#a8ff78", position: 0 },
      { color: "#78ffd6", position: 100 },
    ],
    category: "Green",
  },
  {
    id: "jungle-green",
    name: "Jungle Green",
    type: "linear",
    angle: 45,
    stops: [
      { color: "#56ab2f", position: 0 },
      { color: "#a8e063", position: 100 },
    ],
    category: "Green",
  },

  // Vibrant & Multi-color
  {
    id: "rainbow-bright",
    name: "Rainbow Bright",
    type: "linear",
    angle: 90,
    stops: [
      { color: "#ff0844", position: 0 },
      { color: "#ffb199", position: 100 },
    ],
    category: "Vibrant",
  },
  {
    id: "cosmic-fusion",
    name: "Cosmic Fusion",
    type: "linear",
    angle: 135,
    stops: [
      { color: "#fa709a", position: 0 },
      { color: "#fee140", position: 100 },
    ],
    category: "Vibrant",
  },
  {
    id: "electric-violet",
    name: "Electric Violet",
    type: "linear",
    angle: 135,
    stops: [
      { color: "#4facfe", position: 0 },
      { color: "#00f2fe", position: 100 },
    ],
    category: "Vibrant",
  },
  {
    id: "neon-life",
    name: "Neon Life",
    type: "linear",
    angle: 45,
    stops: [
      { color: "#b3ffab", position: 0 },
      { color: "#12fff7", position: 100 },
    ],
    category: "Vibrant",
  },
  {
    id: "passion-red",
    name: "Passion Red",
    type: "linear",
    angle: 135,
    stops: [
      { color: "#e53935", position: 0 },
      { color: "#e35d5b", position: 100 },
    ],
    category: "Vibrant",
  },

  // Dark & Professional
  {
    id: "midnight-city",
    name: "Midnight City",
    type: "linear",
    angle: 135,
    stops: [
      { color: "#232526", position: 0 },
      { color: "#414345", position: 100 },
    ],
    category: "Dark",
  },
  {
    id: "dark-ocean",
    name: "Dark Ocean",
    type: "linear",
    angle: 90,
    stops: [
      { color: "#373b44", position: 0 },
      { color: "#4286f4", position: 100 },
    ],
    category: "Dark",
  },
  {
    id: "dark-knight",
    name: "Dark Knight",
    type: "linear",
    angle: 135,
    stops: [
      { color: "#2c3e50", position: 0 },
      { color: "#3498db", position: 100 },
    ],
    category: "Dark",
  },
  {
    id: "evening-night",
    name: "Evening Night",
    type: "linear",
    angle: 180,
    stops: [
      { color: "#005aa7", position: 0 },
      { color: "#fffde4", position: 100 },
    ],
    category: "Dark",
  },
  {
    id: "steel-gray",
    name: "Steel Gray",
    type: "linear",
    angle: 135,
    stops: [
      { color: "#1f1c2c", position: 0 },
      { color: "#928dab", position: 100 },
    ],
    category: "Dark",
  },

  // Pastel & Soft
  {
    id: "soft-grass",
    name: "Soft Grass",
    type: "linear",
    angle: 120,
    stops: [
      { color: "#c1dfc4", position: 0 },
      { color: "#deecdd", position: 100 },
    ],
    category: "Pastel",
  },
  {
    id: "cloudy-apple",
    name: "Cloudy Apple",
    type: "linear",
    angle: 135,
    stops: [
      { color: "#f3e7e9", position: 0 },
      { color: "#e3eeff", position: 100 },
    ],
    category: "Pastel",
  },
  {
    id: "sweet-period",
    name: "Sweet Period",
    type: "linear",
    angle: 135,
    stops: [
      { color: "#3f51b1", position: 0 },
      { color: "#5a55ae", position: 50 },
      { color: "#7b5fac", position: 100 },
    ],
    category: "Pastel",
  },
  {
    id: "pale-wood",
    name: "Pale Wood",
    type: "linear",
    angle: 135,
    stops: [
      { color: "#eacda3", position: 0 },
      { color: "#d6ae7b", position: 100 },
    ],
    category: "Pastel",
  },
  {
    id: "peachy",
    name: "Peachy",
    type: "linear",
    angle: 135,
    stops: [
      { color: "#ed4264", position: 0 },
      { color: "#ffedbc", position: 100 },
    ],
    category: "Pastel",
  },

  // Sunrise & Sunset
  {
    id: "sunrise",
    name: "Sunrise",
    type: "linear",
    angle: 0,
    stops: [
      { color: "#ff512f", position: 0 },
      { color: "#f09819", position: 100 },
    ],
    category: "Sunrise",
  },
  {
    id: "sunset-glow",
    name: "Sunset Glow",
    type: "linear",
    angle: 135,
    stops: [
      { color: "#ff4e50", position: 0 },
      { color: "#f9d423", position: 100 },
    ],
    category: "Sunset",
  },
  {
    id: "dawn-sky",
    name: "Dawn Sky",
    type: "linear",
    angle: 180,
    stops: [
      { color: "#89f7fe", position: 0 },
      { color: "#66a6ff", position: 100 },
    ],
    category: "Sunrise",
  },
  {
    id: "golden-hour",
    name: "Golden Hour",
    type: "linear",
    angle: 90,
    stops: [
      { color: "#fdbb2d", position: 0 },
      { color: "#22c1c3", position: 100 },
    ],
    category: "Sunset",
  },
  {
    id: "twilight",
    name: "Twilight",
    type: "linear",
    angle: 135,
    stops: [
      { color: "#0f2027", position: 0 },
      { color: "#203a43", position: 50 },
      { color: "#2c5364", position: 100 },
    ],
    category: "Sunset",
  },

  // Additional Popular Gradients
  {
    id: "cherry-blossom",
    name: "Cherry Blossom",
    type: "linear",
    angle: 120,
    stops: [
      { color: "#fbc2eb", position: 0 },
      { color: "#a18cd1", position: 100 },
    ],
    category: "Purple",
  },
  {
    id: "instagram",
    name: "Instagram",
    type: "linear",
    angle: 45,
    stops: [
      { color: "#833ab4", position: 0 },
      { color: "#fd1d1d", position: 50 },
      { color: "#fcb045", position: 100 },
    ],
    category: "Vibrant",
  },
  {
    id: "stripe",
    name: "Stripe",
    type: "linear",
    angle: 135,
    stops: [
      { color: "#1fa2ff", position: 0 },
      { color: "#12d8fa", position: 50 },
      { color: "#a6ffcb", position: 100 },
    ],
    category: "Cool",
  },
  {
    id: "messenger",
    name: "Messenger",
    type: "linear",
    angle: 135,
    stops: [
      { color: "#00c6ff", position: 0 },
      { color: "#0072ff", position: 100 },
    ],
    category: "Cool",
  },
];

/**
 * Get gradient categories
 */
export function getCategories(): string[] {
  const categories = new Set(
    PRESET_GRADIENTS.map((g) => g.category).filter(Boolean)
  );
  return Array.from(categories) as string[];
}

/**
 * Export gradient in various formats
 */
export function exportGradient(
  gradient: Gradient,
  format: "css" | "scss" | "tailwind" | "json" | "svg"
): string {
  const css = generateGradientCSS(gradient);

  switch (format) {
    case "css":
      return `background: ${css};`;

    case "scss":
      return `$gradient: ${css};`;

    case "tailwind":
      return `background-image: ${css};`;

    case "json":
      return JSON.stringify(gradient, null, 2);

    case "svg":
      const stops = gradient.stops
        .sort((a, b) => a.position - b.position)
        .map(
          (stop, i) =>
            `  <stop offset="${stop.position}%" stop-color="${stop.color}"/>`
        )
        .join("\n");

      if (gradient.type === "linear") {
        const angle = gradient.angle || 90;
        const rad = (angle * Math.PI) / 180;
        const x1 = 50 + 50 * Math.cos(rad + Math.PI / 2);
        const y1 = 50 + 50 * Math.sin(rad + Math.PI / 2);
        const x2 = 50 + 50 * Math.cos(rad - Math.PI / 2);
        const y2 = 50 + 50 * Math.sin(rad - Math.PI / 2);

        return `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="grad" x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%">
${stops}
    </linearGradient>
  </defs>
  <rect width="100" height="100" fill="url(#grad)"/>
</svg>`;
      } else {
        return `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="grad">
${stops}
    </radialGradient>
  </defs>
  <rect width="100" height="100" fill="url(#grad)"/>
</svg>`;
      }

    default:
      return css;
  }
}
