import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE_NAME } from "@/lib/i18n/en";
import { SITE_CONFIG } from "@/lib/site-config";
import { ThemeProvider } from "@/lib/contexts/theme-context";
import { MobileNavProvider } from "@/lib/contexts/mobile-nav-context";
import { ClientLayoutWrapper } from "@/components/layout-client";
import { LoadingBar } from "@/components/loading-bar";
import MobileNav from "@/components/MobileNav";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.domain),
  title: {
    default: `${SITE_CONFIG.name} - ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "developer tools",
    "online utilities",
    "json formatter",
    "base64 encoder",
    "uuid generator",
    "regex tester",
    "color converter",
    "privacy-first tools",
    "client-side tools",
  ],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.domain,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} - ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} - ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.svg",
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: SITE_CONFIG.domain,
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
