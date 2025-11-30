# Frontend Tools Hub - AI Coding Agent Instructions

## Project Overview

Next.js 15 App Router application providing client-side developer tools. All tools run in-browser (no backend) ensuring privacy. Uses TypeScript, Tailwind CSS 4, and React 19.

## Architecture & Key Patterns

### Client/Server Component Strategy

- **Server Components (default)**: All `app/` pages and layout for metadata/SEO
- **Client Components (`"use client"`)**: Interactive components in `components/`, contexts in `lib/contexts/`
- **Critical Pattern**: Header/Footer extracted to `components/layout-client.tsx` because they use client-side theme context
- **Example**: `app/layout.tsx` (server) imports `<Header />` and `<Footer />` (client) wrapped in `<ThemeProvider>`

### Theme System Architecture

- Context: `lib/contexts/theme-context.tsx` with default values to prevent SSR errors
- Provider must wrap all client components that use `useTheme()`
- Dark mode is default, persisted to `localStorage`
- Uses Tailwind's `class` dark mode strategy (`darkMode: "class"` in `tailwind.config.ts`)
- Initial class set via `<html className="dark">` and `suppressHydrationWarning` to prevent flash

### Content Management Pattern

All site content lives in `lib/i18n/en.ts`:

- Tool definitions: `TOOLS` array with `id`, `name`, `description`, `href`
- Navigation: `NAV_ITEMS` array
- Site metadata: `SITE_NAME`, `SITE_DESCRIPTION`
- **To add a new tool**: Add to `TOOLS` array, create `app/tools/{tool-id}/page.tsx`, tool auto-appears on homepage

### i18n Structure (Future-Ready)

- Current: English-only via `lib/i18n/en.ts`
- Pattern: Export constants from language files, aggregate in `lib/i18n/index.ts`
- To add language: Create `lib/i18n/{locale}.ts`, update `getTranslations()` switch

## Styling Conventions

### Tailwind Usage

- CSS variables in `app/globals.css` for theme colors (e.g., `--background`, `--foreground`)
- Dark mode classes: `dark:bg-gray-950`, `dark:text-gray-50`, etc.
- Consistent spacing: `px-4 py-12` for container, `mb-8` for section spacing
- Border radius: `rounded-xl` for cards, `rounded-lg` for buttons

### Component Styling Pattern

```tsx
// Tool page template structure
<div className="container mx-auto px-4 py-12">
  <div className="mb-8">
    <h1 className="mb-3 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
    <p className="text-lg text-gray-600 dark:text-gray-400">
  </div>
  <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
```

### Icon Pattern

**Lucide Icons Standard**

- All icon-related components must use [Lucide React icons](https://lucide.dev/icons/) via the `lucide-react` package.
- Do **not** use inline SVGs or other icon libraries directly in components.
- Import Lucide icons as React components and pass `className` for styling (color, size, etc.).
- Example usage:

```tsx
import { Zap } from "lucide-react";
<Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />;
```

- Each tool placeholder has a colored icon badge:
  - Structure: `rounded-full bg-{color}-100 p-4 dark:bg-{color}-900/30`
  - Icon: Lucide icon with `h-8 w-8 text-{color}-600 dark:text-{color}-400`
  - Unique colors per tool (blue, purple, green, orange, pink, red, indigo, cyan, teal, yellow)

## Development Workflow

### Commands

```bash
npm run dev          # Development server (default port 3000, uses 3002 if taken)
npm run build        # Production build
npm run start        # Production server
npm run format       # Prettier (auto-sorts Tailwind classes)
npm run lint         # ESLint
```

### Lock File Issues

If dev server won't start: `rm -rf .next/dev/lock && npm run dev`

### PostCSS Configuration

Uses Tailwind CSS 4 with `@tailwindcss/postcss` (not legacy `tailwindcss` plugin)
Config: `postcss.config.js` with `@tailwindcss/postcss` and `autoprefixer`

## File Organization

### Adding New Pages

1. Create `app/tools/{tool-name}/page.tsx`
2. Export metadata: `export const metadata: Metadata = { title: "...", description: "..." }`
3. Use tool page template (see "Component Styling Pattern")
4. Add to `TOOLS` in `lib/i18n/en.ts`

### Component Extraction

- Shared UI: `components/` directory
- Must be client components if using hooks/interactivity
- Import in server components without `"use client"` directive

### Component Size Guideline

- **Line limit:** Prefer React components to be at most **300 lines** (including imports and exports). If a component grows beyond this, split it into smaller, focused components (presentation vs logic). Keep utility functions in `*.utils.ts` or `*/utils.ts` files.
- **Why:** Keeps files maintainable, easier to review, and improves reusability. Aim for single responsibility per component and prefer composition.
- **When splitting:** Move pure helper functions, type definitions, and complex algorithms into `utils` files; extract UI sections into named child components and place them alongside the parent (same folder) with clear names.

## Critical Context Dependencies

### Imports Always Required

- Content: `import { SITE_NAME, TOOLS, NAV_ITEMS } from "@/lib/i18n/en"`
- Types: `import type { Metadata } from "next"`
- Theme: `import { useTheme } from "@/lib/contexts/theme-context"` (client only)

### TypeScript Path Aliases

- `@/` maps to root directory (configured in `tsconfig.json`)
- Use `@/lib/`, `@/components/`, `@/app/` for all imports

## SEO Configuration

- Sitemap: `app/sitemap.ts` - auto-generates from `TOOLS` array
- Robots: `app/robots.ts` - allows all crawlers
- Metadata: Template in `app/layout.tsx` - `%s | ${SITE_NAME}` for page titles
- Favicon: Inline SVG emoji in metadata (🛠️)

## Testing & Debugging

- No testing framework currently configured
- Use browser DevTools for client-side debugging
- Check for hydration errors via `suppressHydrationWarning` on `<html>`
- Theme flash prevention: Initial dark class + localStorage sync in `useEffect`

## Common Pitfalls

1. **Theme context errors**: Ensure `ThemeProvider` wraps components using `useTheme()`
2. **Server/client mismatch**: Don't use `useEffect`, `useState`, or browser APIs in server components
3. **Tailwind not updating**: Run `npm run format` to sort classes and check PostCSS config
4. **Port conflicts**: Kill existing Next.js process or use auto-assigned port
5. **Hydration warnings**: Use `suppressHydrationWarning` on elements that differ between SSR/CSR

## Performance Considerations

- All tools are client-side only (no API routes)
- Static generation for all pages except dynamic tool implementations
- Lazy load tool logic when implementing actual functionality
- Use Next.js Image component for any future images

## SEO Best Practices

### Metadata Requirements

- **Always export metadata** from server components (pages, layouts)
- **Title format**: Descriptive title (50-60 chars optimal)
- **Description**: Detailed, keyword-rich (150-160 chars optimal)
- **Keywords**: Include relevant search terms (optional but recommended)
- **Open Graph**: Add `openGraph` object for social media sharing
- **Twitter Card**: Add `twitter` object for Twitter/X previews

### Content Structure

- Use proper heading hierarchy: `h1` → `h2` → `h3` (only one `h1` per page)
- Use semantic HTML5 elements: `<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, `<footer>`
- Include descriptive text, not just keywords (search engines prefer natural language)
- Add dynamic content like counts ("Browse our {TOOLS.length} tools")

### URL Structure

- Use descriptive, hyphenated URLs: `/tools/json-formatter` not `/tools/jf`
- Keep URLs short and readable
- Match URL structure to site hierarchy

## Accessibility (a11y) Best Practices

### Keyboard Navigation

- **Focus states**: Always include `focus:` styles on interactive elements
- **Focus rings**: Use `focus:ring-2 focus:ring-{color}-500 focus:ring-offset-2`
- **Skip links**: Consider adding skip-to-content links for long pages
- **Tab order**: Ensure logical tab order matches visual layout

### ARIA Labels

- **Links**: Use `aria-label` when link text isn't descriptive: `aria-label="Open JSON Formatter tool"`
- **Buttons**: Provide clear labels for icon-only buttons
- **Regions**: Label sections with `aria-label` or `aria-labelledby`
- **Decorative elements**: Mark decorative icons with `aria-hidden="true"`

### Semantic HTML

- Use `<article>` for self-contained content (tool cards, blog posts)
- Use `<section>` for thematic groupings with headings
- Use `<nav>` for navigation blocks
- Prefer semantic elements over `<div>` when appropriate

### Color Contrast

- Maintain WCAG AA contrast ratios (4.5:1 for normal text, 3:1 for large text)
- Test both light and dark modes
- Don't rely solely on color to convey information

### Screen Reader Support

- Provide alternative text for images: `alt="..."`
- Use `aria-hidden="true"` for decorative icons/SVGs
- Ensure form inputs have associated labels
- Use `role` attributes when semantic HTML isn't sufficient

### Interactive Elements

- Minimum touch target size: 44x44px (or 48x48px for better UX)
- Ensure sufficient spacing between clickable elements
- Provide visual feedback for all interactive states (hover, focus, active)
- Use proper button/link elements (not `<div onClick>`)
