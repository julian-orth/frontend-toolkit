# Frontend Tools Hub

A modern web application built with Next.js 15 that provides a collection of free online developer tools. All tools run client-side, ensuring privacy and speed.

## 🚀 Features

- **15+ Developer Tools** including JSON Formatter, UUID Generator, Base64 Encoder/Decoder, and more
- **Next.js 15 App Router** with TypeScript
- **Tailwind CSS 4** for modern, responsive styling
- **SEO Optimized** with sitemap, metadata, and robots.txt
- **Dark Mode** with persistent theme switching
- **Tool Maintenance System** - Scalable architecture for 100+ tools
- **Zero Registration** - all tools work instantly, client-side only
- **Privacy First** - no data sent to servers

## 📋 Available Tools

- JSON Formatter - Format and validate JSON data
- UUID Generator - Generate unique identifiers
- Base64 Encoder/Decoder - Encode and decode Base64 strings
- URL Encoder/Decoder - Encode and decode URLs
- Regex Tester - Test regular expressions
- Color Picker - Pick and convert colors
- Lorem Ipsum Generator - Generate placeholder text
- Timestamp Converter - Convert Unix timestamps
- Text Diff - Compare text differences
- JWT Decoder - Decode JSON Web Tokens

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Code Quality:** ESLint + Prettier with Tailwind plugin

## 📦 Installation

1. **Clone the repository:**

   ```bash
   git clone <your-repo-url>
   cd frontend-toolkit
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## 🚀 Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Create production build (validates tools)
npm run start            # Start production server
npm run format           # Format code with Prettier
npm run lint             # Lint code with ESLint
npm run create:tool      # Generate a new tool (interactive CLI)
npm run validate:tools   # Validate all tools in registry
```

## 📁 Project Structure

```
frontend-toolkit/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with theme provider
│   ├── page.tsx             # Homepage with tool grid
│   ├── globals.css          # Global styles and CSS variables
│   ├── sitemap.ts           # Dynamic sitemap generation
│   ├── robots.ts            # SEO robots configuration
│   └── tools/               # Tool pages (each tool has own folder)
│       ├── json-formatter/
│       │   ├── page.tsx            # Server component with metadata
│       │   ├── client.tsx          # Client component with UI
│       │   └── utils.ts            # Tool logic
│       └── ...other tools
├── components/              # Reusable React components
│   ├── layout-client.tsx    # Header & Footer (client components)
│   ├── breadcrumb.tsx       # Navigation breadcrumbs
│   └── theme-toggle.tsx     # Dark mode toggle
├── lib/
│   ├── tools/
│   │   ├── registry.ts      # Central tool registry
│   │   └── validator.ts     # Validation functions
│   ├── types/
│   │   └── tool.ts          # TypeScript interfaces
│   ├── contexts/
│   │   └── theme-context.tsx # Theme provider
│   └── i18n/                # Internationalization
│       ├── index.ts
│       └── en.ts            # English content
├── scripts/
│   ├── create-tool.js       # Tool generator CLI
│   └── validate-tools.js    # Tool validator
├── docs/
│   └── TOOL_MAINTENANCE.md  # Maintenance system docs
├── tailwind.config.ts       # Tailwind CSS 4 configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies and scripts
```

## 🔧 Tool Maintenance System

This project includes a powerful maintenance system for scaling to 100+ tools:

### Adding a New Tool

**Quick way (Recommended):**

```bash
npm run create:tool
```

This interactive CLI will:

- ✅ Scaffold all required files
- ✅ Generate boilerplate code
- ✅ Add tool to registry
- ✅ Set up SEO metadata

**Manual way:**

1. Add tool to `lib/tools/registry.ts`
2. Create `app/tools/{tool-id}/page.tsx`
3. Create `app/tools/{tool-id}/{tool-id}-ui.tsx`
4. Create `app/tools/{tool-id}/utils.ts`
5. Run `npm run validate:tools`

See [docs/TOOL_MAINTENANCE.md](docs/TOOL_MAINTENANCE.md) for details.

### Validating Tools

```bash
npm run validate:tools
```

Checks for:

- Required fields present
- Proper naming conventions
- No duplicate IDs or routes
- File structure exists
- SEO optimization (description length, keywords, etc.)

**Validation runs automatically before build!**

## 🌍 Internationalization

The project is structured to support multiple languages. Currently, only English is implemented.

Content is managed through:

- `lib/i18n/en.ts` - English content (re-exports from registry)
- `lib/tools/registry.ts` - Central tool definitions

## 🎨 Customization

### Changing the Theme

Edit `app/globals.css` to customize CSS variables for light/dark modes.

### Adding a New Tool

Use the interactive CLI for the fastest setup:

```bash
npm run create:tool
```

Or follow the manual process in [CONTRIBUTING.md](CONTRIBUTING.md).

All tools automatically appear in:

- Homepage tool grid
- Sidebar navigation
- Sitemap
- Search functionality

## 📚 Documentation

- [CONTRIBUTING.md](CONTRIBUTING.md) - Detailed guide for contributors
- [docs/TOOL_MAINTENANCE.md](docs/TOOL_MAINTENANCE.md) - Tool maintenance system
- [.github/copilot-instructions.md](.github/copilot-instructions.md) - Architecture details

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or suggestions, please open an issue on GitHub.

---

Built with ❤️ using Next.js 15
