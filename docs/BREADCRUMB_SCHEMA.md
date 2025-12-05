# Breadcrumb Navigation with Schema.org Markup

## Overview

All tool pages now include breadcrumb navigation with automatic Schema.org BreadcrumbList structured data for better SEO and rich snippets in search results.

## Component

**Location:** `components/breadcrumb.tsx`

### Features

- ✅ Automatic path-based breadcrumb generation
- ✅ Schema.org BreadcrumbList JSON-LD
- ✅ Intelligent acronym handling (UUID, JSON, JWT, etc.)
- ✅ Semantic HTML with `<nav>` and ARIA labels
- ✅ Dark mode support
- ✅ Responsive design
- ✅ Keyboard navigation

## Implementation

### Usage

```tsx
import Breadcrumb from "@/components/breadcrumb";

export default function YourToolPage() {
  return (
    <div>
      <Breadcrumb />
      {/* Your content */}
    </div>
  );
}
```

### Generated Schema Example

For URL `/tools/json-formatter`, the component generates:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://developerutilitytools.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Tools",
      "item": "https://developerutilitytools.com/tools"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "JSON Formatter",
      "item": "https://developerutilitytools.com/tools/json-formatter"
    }
  ]
}
```

## Benefits

### SEO Benefits

1. **Rich Snippets**: Breadcrumbs appear in Google search results
2. **Better Indexing**: Search engines understand site structure
3. **Improved CTR**: Visual breadcrumbs in SERPs increase click-through rates
4. **Site Architecture**: Clear hierarchy signals to search engines

### User Benefits

1. **Navigation**: Easy way to navigate up the hierarchy
2. **Context**: Users understand their location in the site
3. **Accessibility**: Screen reader friendly with ARIA labels
4. **Mobile-Friendly**: Responsive design works on all devices

## Acronym Handling

The component automatically capitalizes common tech acronyms:

- `uuid` → UUID
- `json` → JSON
- `jwt` → JWT
- `url` → URL
- `html` → HTML
- `css` → CSS
- `xml` → XML
- `api` → API
- `guid` → GUID

Add new acronyms in the `acronyms` object in `breadcrumb.tsx`.

## Testing

### Manual Testing

1. Navigate to any tool page (e.g., `/tools/json-formatter`)
2. Check breadcrumb appears at top of page
3. Click breadcrumb links to navigate
4. Verify visual styling in light/dark mode

### Schema Validation

Use Google's Rich Results Test:

```
https://search.google.com/test/rich-results
```

Enter your tool page URL to verify BreadcrumbList markup.

### View Schema in Browser

1. Open any tool page
2. View page source (Ctrl+U / Cmd+Option+U)
3. Search for `"@type": "BreadcrumbList"`
4. Verify JSON-LD is present and correct

## Current Status

- ✅ Implemented on all 20 tool pages
- ✅ Implemented on all blog posts
- ✅ Schema.org markup included
- ✅ Absolute URLs using `SITE_CONFIG.domain`
- ✅ Dark mode compatible
- ✅ Accessibility compliant

## Future Enhancements

- [ ] Add microdata fallback for older crawlers
- [ ] Custom breadcrumb overrides for special pages
- [ ] Breadcrumb analytics tracking
- [ ] Truncation for very long paths

## References

- [Schema.org BreadcrumbList](https://schema.org/BreadcrumbList)
- [Google Search Central - Breadcrumb](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)
- [W3C ARIA Breadcrumb Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/)
