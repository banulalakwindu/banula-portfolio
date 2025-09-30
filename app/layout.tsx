import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Banula Lakwindu - Software Engineer",
  description:
    "Software Engineer specializing in PHP, Laravel, Next.js, React, and AWS Serverless.",
  generator: "portfolio",
  keywords: ["Software Engineer", "PHP", "Laravel", "Next.js", "React", "AWS Serverless", "Web Development"],
  authors: [{ name: "Banula Lakwindu" }],
  openGraph: {
    title: "Banula Lakwindu - Software Engineer",
    description: "Software Engineer specializing in PHP, Laravel, Next.js, React, and AWS Serverless.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`scrollbar-thin`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=JetBrains+Mono:wght@100..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
