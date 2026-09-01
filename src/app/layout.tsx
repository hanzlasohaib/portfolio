import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import Script from "next/script";

import { JsonLd } from "@/components/json-ld";
import { defaultMetadata } from "@/config/metadata";
import { SEO_DEFAULTS } from "@/constants/seo";
import { getSiteProfileForUi } from "@/features/site-profile";
import { ThemeProvider, ToastProvider } from "@/providers";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getSiteProfileForUi();

  return {
    ...defaultMetadata,
    title: {
      default: profile.name,
      template: SEO_DEFAULTS.titleTemplate,
    },
    description: profile.metaDescription,
    keywords: profile.metaKeywords,
    openGraph: {
      ...defaultMetadata.openGraph,
      siteName: profile.name,
      title: profile.name,
      description: profile.metaDescription,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: profile.name,
      description: profile.metaDescription,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {`(() => {
  const key = "theme";
  const fallback = "dark";
  const saved = window.localStorage.getItem(key);
  const theme = saved === "light" || saved === "dark" ? saved : fallback;
  document.documentElement.setAttribute("data-theme", theme);
  if (saved !== theme) {
    window.localStorage.setItem(key, theme);
  }
})();`}
        </Script>
      </head>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <JsonLd />
        <ThemeProvider>
          <ToastProvider>{children}</ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
