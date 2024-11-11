"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ConnectButton } from "thirdweb/react"
import { client } from "@/config/wallet"
import { polygonAmoy, sepolia } from "thirdweb/chains"
import { createWallet, inAppWallet } from "thirdweb/wallets"
import { useRouter } from "next/navigation";

export function ConnectWalletModal() {
  const router = useRouter();
  const wallets = [
    inAppWallet(),
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    createWallet("me.rainbow"),
  ]

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Connect Wallet</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Connect Your Wallet</DialogTitle>
          <DialogDescription>
            Choose your preferred wallet connection method
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <Button
            variant="outline"
            onClick={() => router.push("/wallet")}
          >
            Connect with Circle Wallet
          </Button>
          <ConnectButton
            client={client}
            wallets={wallets}
            chains={[polygonAmoy, sepolia]}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}