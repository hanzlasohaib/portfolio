import type { Metadata } from "next";
import { Fira_Code, Inter, Orbitron } from "next/font/google";
import Script from "next/script";

import { JsonLd } from "@/components/json-ld";
import { defaultMetadata } from "@/config/metadata";
import { ThemeProvider } from "@/providers";

import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${orbitron.variable} ${inter.variable} ${firaCode.variable} h-full antialiased`}
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
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
