# Contributing to Frontend Tools Hub

Thank you for your interest in contributing to Frontend Tools Hub! This guide will help you create new tools efficiently and maintain consistency across the project.

## 🚀 Quick Start: Adding a New Tool

### 1. Use the Tool Generator (Recommended)

The easiest way to create a new tool is using our CLI generator:

```bash
npm run create:tool
```

This will interactively prompt you for:

- **Tool ID**: Kebab-case identifier (e.g., `css-minifier`)
- **Tool Name**: Display name (e.g., `CSS Minifier`)
- **Description**: 150-160 characters for optimal SEO
- **Group**: Category (JSON, UUID, Encoding, Color, Text, etc.)
- **Color**: Theme color (blue, purple, green, orange, etc.)
- **Icon**: Lucide icon name (e.g., `zap`, `code`, `palette`)

The generator will:

- ✅ Create the tool directory structure
- ✅ Generate boilerplate files (page.tsx, UI component, utils)
- ✅ Add the tool to the registry
- ✅ Set up proper metadata and SEO structure

### 2. Manual Setup (Alternative)

If you prefer manual setup:

1. **Create the tool directory:**

   ```bash
   mkdir app/tools/your-tool-name
   ```

2. **Add required files:**
   - `page.tsx` - Next.js page with metadata
   - `your-tool-name-ui.tsx` - Client component with UI
   - `utils.ts` - Tool logic and utility functions

3. **Register the tool:**
   Add an entry to `lib/tools/registry.ts` in the `TOOL_REGISTRY` array:

   ```typescript
   {
     id: "your-tool-name",
     name: "Your Tool Name",
     description: "Brief description (150-160 chars)",
     href: "/tools/your-tool-name",
     group: "JSON", // or another group
     groupColor: "blue",
     groupIcon: "zap",
     keywords: ["keyword1", "keyword2"],
     relatedTools: ["related-tool-id"],
   }
   ```

## 📋 Tool Development Checklist

- [ ] Tool ID is kebab-case and unique
- [ ] Description is 150-160 characters (optimal for SEO)
- [ ] Proper Next.js metadata (title, description, Open Graph, Twitter)
- [ ] Keywords array includes relevant search terms
- [ ] Related tools are linked for cross-promotion
- [ ] UI component uses consistent styling (see Design Patterns)
- [ ] All functionality is client-side (no backend required)
- [ ] Dark mode support with proper color classes
- [ ] Accessibility: proper labels, ARIA attributes, focus states
- [ ] SEO content: What is X?, Use Cases, FAQ sections
- [ ] Mobile responsive design

## 🎨 Design Patterns

### Component Structure

```tsx
// page.tsx (Server Component)
import Breadcrumb from "@/components/breadcrumb";
import type { Metadata } from "next";
import { YourToolUI } from "./your-tool-ui";

export const metadata: Metadata = {
  title: "Your Tool Name",
  description: "Description here...",
  // ... OpenGraph, Twitter, etc.
};

export default function YourToolPage() {
  return (
    <div className="px-6 py-8">
      <div className="mb-8">
        <Breadcrumb />
        <h1>Your Tool Name</h1>
        <p>Description...</p>
      </div>
      <YourToolUI />
      {/* SEO content sections */}
    </div>
  );
}
```

### UI Component Pattern

```tsx
// your-tool-ui.tsx (Client Component)
"use client";

import { useState } from "react";

export function YourToolUI() {
  const [input, setInput] = useState("");

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      {/* Tool UI here */}
    </div>
  );
}
```

### Consistent Styling

Use the project's established color system:

```tsx
// Input fields
className =
  "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100";

// Buttons (use tool's groupColor)
className =
  "rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-700 dark:hover:bg-blue-600";

// Cards
className =
  "rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900";
```

## 🔍 Validation

Always validate your tool before committing:

```bash
npm run validate:tools
```

This checks for:

- ✅ Required fields present
- ✅ Proper naming conventions
- ✅ No duplicate IDs or routes
- ✅ File structure exists
- ✅ Description length optimal for SEO
- ⚠️ Missing keywords or related tools

Fix all errors and address warnings before submitting.

## 📦 Tool Registry

The registry (`lib/tools/registry.ts`) is the single source of truth for all tools. It provides:

- **Type Safety**: TypeScript interfaces ensure consistency
- **Helper Functions**: `getToolById()`, `getToolsByGroup()`, `searchTools()`
- **Related Tools**: Automatic cross-linking between tools
- **Search Support**: Keywords and aliases for better discoverability

### Registry Structure

```typescript
export interface Tool {
  id: string; // Unique kebab-case identifier
  name: string; // Display name
  description: string; // 150-160 chars for SEO
  href: string; // Route (must be /tools/{id})
  group: ToolGroup; // Category
  groupColor: ToolGroupColor; // Theme color
  groupIcon: string; // Lucide icon name
  keywords?: string[]; // Search terms
  aliases?: string[]; // Alternative names
  relatedTools?: string[]; // Related tool IDs
}
```

## 🎯 SEO Best Practices

### Metadata Requirements

Every tool page must have:

```typescript
export const metadata: Metadata = {
  title: "Tool Name (50-60 chars)",
  description: "Description (150-160 chars)",
  keywords: ["keyword1", "keyword2", ...],
  openGraph: {
    title: "Tool Name — Frontend Tools Hub",
    description: "...",
    url: "/tools/tool-id",
    siteName: "Frontend Tools Hub",
  },
  twitter: {
    card: "summary",
    title: "Tool Name — Frontend Tools Hub",
    description: "...",
  },
  alternates: {
    canonical: "/tools/tool-id",
  },
};
```

### Content Structure

Include these SEO sections:

1. **What is [Tool]?** - Detailed explanation
2. **Common Use Cases** - Practical applications (grid layout with cards)
3. **Features Explained** - Detailed feature breakdown
4. **FAQ** - Common questions (use `<details>` elements)
5. **Best Practices** - Expert tips
6. **Related Tools** - Cross-links to related tools

## ♿ Accessibility Guidelines

- **Keyboard Navigation**: All interactive elements must be keyboard accessible
- **Focus States**: Use `focus:ring-2 focus:ring-{color}-500 focus:ring-offset-2`
- **ARIA Labels**: Use `aria-label` for icon-only buttons
- **Semantic HTML**: Use `<button>` for actions, `<a>` for navigation
- **Color Contrast**: Maintain WCAG AA ratios (test both light/dark modes)
- **Screen Readers**: Add `aria-hidden="true"` to decorative icons
- **Form Labels**: Associate labels with inputs using `htmlFor` and `id`

## 🧪 Testing Checklist

Before submitting:

- [ ] Tool works in light and dark mode
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] All interactive elements are keyboard accessible
- [ ] Focus states are visible and styled
- [ ] No console errors or warnings
- [ ] Tool state doesn't break on edge cases
- [ ] Copy/paste functionality works
- [ ] Browser back/forward navigation works
- [ ] Tool validates successfully: `npm run validate:tools`

## 📝 Code Style

- **Prettier**: Run `npm run format` before committing
- **ESLint**: Run `npm run lint` to check for issues
- **TypeScript**: Use proper types, avoid `any`
- **Component Size**: Keep components under 300 lines (see copilot-instructions.md)
- **Imports**: Use `@/` path alias for consistency

## 🔧 Utility Functions

Keep tool logic in `utils.ts`:

```typescript
// app/tools/your-tool/utils.ts

/**
 * Core logic for your tool
 */
export function processYourTool(input: string): string {
  // Implementation
  return result;
}

/**
 * Validation logic
 */
export function validateInput(input: string): boolean {
  // Implementation
  return true;
}
```

## 🚫 Common Pitfalls

1. **Don't hardcode tool lists** - Use the registry instead
2. **Don't create backend/API routes** - All tools are client-side
3. **Don't skip validation** - Always run `npm run validate:tools`
4. **Don't forget dark mode** - Test with `dark:` classes
5. **Don't ignore accessibility** - Add proper labels and ARIA attributes
6. **Don't skip SEO content** - Include What/Use Cases/FAQ sections
7. **Don't use inline styles** - Use Tailwind classes
8. **Don't forget mobile** - Design mobile-first

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/icons/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## 🤝 Getting Help

- Review existing tools for patterns and examples
- Check `copilot-instructions.md` for architecture details
- Run validation early and often: `npm run validate:tools`
- Test your tool thoroughly before submitting

## 🎉 Thank You!

Your contributions make Frontend Tools Hub better for everyone. Happy coding! 🛠️
