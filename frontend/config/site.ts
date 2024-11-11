import { title } from "process"

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Bitcoin Investments",
  description: "Investment Strategies for the Investors powered by AI",
  mainNav: [
    {
      title: "Investment Type",
      href: "/investment-type",
    },
    {
      title: "Portfolio",
      href: "/portfolio",
    },
    {
      title: " Bot",
      href: "/createaibot",
    }
  ],
  links: {
    twitter: "https://x.com/0xkamal7",
  },
}
