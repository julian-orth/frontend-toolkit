/**
 * Site Content and Configuration
 *
 * IMPORTANT: TOOLS has moved to lib/tools/registry.ts
 * Import from there for better maintainability:
 * import { TOOLS } from "@/lib/tools/registry"
 */

export const SITE_NAME = "Frontend Tools Hub";
export const SITE_DESCRIPTION = "Free online tools for developers";

/**
 * @deprecated Import from @/lib/tools/registry instead
 * This export maintained for backward compatibility
 */
export { TOOLS } from "@/lib/tools/registry";

export const NAV_ITEMS = [
  { name: "Home", href: "/" },
  { name: "Tools", href: "/tools" },
];
