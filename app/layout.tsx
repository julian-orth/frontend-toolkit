import type { Metadata } from "next";
import "./globals.css";
import { SITE_NAME } from "@/lib/i18n/en";
import { ThemeProvider } from "@/lib/contexts/theme-context";
import { MobileNavProvider } from "@/lib/contexts/mobile-nav-context";
import { ClientLayoutWrapper } from "@/components/layout-client";
import { LoadingBar } from "@/components/loading-bar";
import MobileNav from "@/components/MobileNav";

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Free online developer utilities and tools for everyday coding tasks. JSON formatter, UUID generator, Base64 encoder, and more.",
  keywords: [
    "developer tools",
    "online utilities",
    "json formatter",
    "uuid generator",
    "base64 encoder",
    "developer utilities",
  ],
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='none'><defs><linearGradient id='g' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%233b82f6'/><stop offset='100%' stop-color='%238b5cf6'/></linearGradient></defs><path d='M 38 20 L 15 50 L 38 80' stroke='url(%23g)' stroke-width='8' stroke-linecap='round' stroke-linejoin='round' fill='none'/><path d='M 62 20 L 85 50 L 62 80' stroke='url(%23g)' stroke-width='8' stroke-linecap='round' stroke-linejoin='round' fill='none'/><circle cx='50' cy='50' r='10' fill='url(%23g)'/></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') || 'dark';
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className="flex min-h-screen flex-col bg-gradient-to-br from-gray-50 via-white to-gray-50 text-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 dark:text-gray-50"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <MobileNavProvider>
            <MobileNav />
            <LoadingBar />
            <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
          </MobileNavProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
