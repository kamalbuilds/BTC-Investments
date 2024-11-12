'use client'

import "@/styles/globals.css"

import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Provider from "./Provider";

import { AuthProvider } from '@/hooks/auth'
import { CircleProvider } from '@/hooks/circle'
import { useState } from "react"
import { BasketProvider } from "@/context/BasketContext"

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 60 * 1000
          }
        }
      })
  )

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "bg-background min-h-screen font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <QueryClientProvider client={queryClient}>
              <AuthProvider>
                <CircleProvider>
                  <BasketProvider>
                    <Provider>
                      <div className="relative flex min-h-screen flex-col">
                        <SiteHeader />
                        <div className="flex-1">{children}</div>
                      </div>
                    </Provider>
                  </BasketProvider>
                  <TailwindIndicator />
                </CircleProvider>
              </AuthProvider>
            </QueryClientProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
