import "@/styles/globals.css"
import { Metadata, Viewport } from "next"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
// import { Analytics } from "@/components/analytics"
import { ThemeProvider } from "@/components/providers"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { Toaster as DefaultToaster } from "@/components/ui/toaster"
import { Toaster as NewYorkSonner } from "@/components/ui/sonner"
import GoogleAnalytics from "@/components/ganalytics"

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s - ${siteConfig.title}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: [
    "Observability",
    "OpenTelemetry",
    "Prometheus",
    "APM",
    "Distributed Tracing",
    "AI-FIRST",
    "AI-Powered Observability",
    "AI-First Observability",
    "Smart Monitoring",
    "LLM Observability",
    "Application observability",
    "Traces, Metrics, Logs",
    "Smart Alerting",
  ],
  authors: [
    {
      name: "InfraStack AI",
      url: "https://infrastack.ai",
    },
  ],
  creator: "InfraStack AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 800,
        height: 800,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@infrastackai",
  },
  manifest: `/site.webmanifest`,
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.className
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <div vaul-drawer-wrapper="">
              <div className="relative flex min-h-screen flex-col bg-background">
                <SiteHeader />
                <main className="flex-1 md:mb-14">{children}</main>
                <SiteFooter />
              </div>
            </div>
            <TailwindIndicator />
            <ThemeSwitcher />
            {/* <Analytics /> */}
            <DefaultToaster />
            <NewYorkSonner />
          </ThemeProvider>
          {process.env.NODE_ENV === "production" &&  <GoogleAnalytics />}
        </body>
      </html>
    </>
  )
}