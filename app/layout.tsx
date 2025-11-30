import type { Metadata } from "next";
import "./globals.css";
import { SITE_NAME } from "@/lib/i18n/en";
import { ThemeProvider } from "@/lib/contexts/theme-context";
import { Header, Footer } from "@/components/layout-client";

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: "Free online tools for developers",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>🛠️</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-50">
        <ThemeProvider>
          <Header />
          <main className="flex-1 bg-gray-50 dark:bg-gray-900">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
