"use client"

import { useRouter } from "next/navigation"
import { createWallet, inAppWallet } from "thirdweb/wallets"

import { siteConfig } from "@/config/site"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

import WalletConnect from "./WalletConnect"
import ConnectWallet from "./ConnectWallet"
import ConnectButton from "./ConnectButton"

export function SiteHeader() {
  const router = useRouter()
  const wallets = [
    inAppWallet(),
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    createWallet("me.rainbow"),
  ]

  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <ConnectButton />
            <WalletConnect />
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
