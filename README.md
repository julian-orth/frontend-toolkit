# Frontend Tools Hub

A modern web application built with Next.js 15 that provides a collection of free online developer tools. All tools run client-side, ensuring privacy and speed.

## 🚀 Features

- **10+ Developer Tools** including JSON Formatter, UUID Generator, Base64 Encoder/Decoder, and more
- **Next.js 15 App Router** with TypeScript
- **TailwindCSS** for modern, responsive styling
- **SEO Optimized** with sitemap and robots.txt
- **i18n Ready** structure for easy future translations
- **Dark Mode** support
- **Zero Registration** - all tools work instantly

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
   # or
   yarn install
   # or
   pnpm install
   ```

## 🚀 Development

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🏗️ Build

Create an optimized production build:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

## 🌐 Production

Start the production server:

```bash
npm run start
# or
yarn start
# or
pnpm start
```

## 🧹 Code Quality

Format code with Prettier:

```bash
npm run format
# or
yarn format
# or
pnpm format
```

Lint code with ESLint:

```bash
npm run lint
# or
yarn lint
# or
pnpm lint
```

## 📁 Project Structure

```
frontend-toolkit/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with header & footer
│   ├── page.tsx             # Homepage
│   ├── globals.css          # Global styles
│   ├── sitemap.ts           # Sitemap generation
│   ├── robots.ts            # Robots.txt generation
│   └── tools/               # Tool pages
│       ├── json-formatter/
│       ├── uuid-generator/
│       ├── base64/
│       ├── url-encoder/
│       ├── regex-tester/
│       ├── color-picker/
│       ├── lorem-ipsum/
│       ├── timestamp-converter/
│       ├── text-diff/
│       └── jwt-decoder/
├── lib/
│   └── i18n/                # Internationalization structure
│       ├── index.ts         # i18n configuration
│       └── en.ts            # English translations
├── public/                   # Static assets
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
├── next.config.ts           # Next.js configuration
├── .eslintrc.json           # ESLint configuration
├── .prettierrc              # Prettier configuration
└── package.json             # Dependencies and scripts
```

## 🌍 Internationalization

The project is structured to support multiple languages in the future. Currently, only English is implemented.

To add a new language:

1. Create a new file in `lib/i18n/` (e.g., `de.ts` for German)
2. Copy the structure from `en.ts` and translate the strings
3. Update `lib/i18n/index.ts` to include the new locale

## 🎨 Customization

### Changing the Theme

Edit `tailwind.config.ts` to customize colors, fonts, and other design tokens.

### Adding a New Tool

1. Create a new folder in `app/tools/` with your tool name
2. Add a `page.tsx` file with the tool component
3. Add the tool to the `TOOLS` array in `lib/i18n/en.ts`
4. The tool will automatically appear on the homepage

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or suggestions, please open an issue on GitHub.

---

Built with ❤️ using Next.js 15
