import React, { ReactNode } from "react"
import { ToastContainer, toast } from "react-toastify"
import { ThirdwebProvider } from "thirdweb/react"
import "react-toastify/dist/ReactToastify.css"
import { createClient, convertViemChainToRelayChain, MAINNET_RELAY_API, TESTNET_RELAY_API } from '@reservoir0x/relay-sdk'
import { mainnet, sepolia } from 'viem/chains'
import { WagmiProvider } from "wagmi"
import { config } from "@/config/wagmi-config"
import { Network, SatsConnector, SatsWagmiConfig } from "@gobob/sats-wagmi";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const Provider = ({ children }: { children: ReactNode }) => {

  createClient({
    baseApiUrl: MAINNET_RELAY_API,
    source: "relay.link/swap",
    chains: [convertViemChainToRelayChain(mainnet)]
  });

  const queryClient = new QueryClient()

  return (
    <WagmiProvider config={config}>
      <SatsWagmiConfig network={Network.mainnet} queryClient={queryClient}>
        <ThirdwebProvider>
          {children}
          <ToastContainer theme="dark" position="top-right" autoClose={5000} />
        </ThirdwebProvider>
      </SatsWagmiConfig>

    </WagmiProvider>
  )
}

export default Provider
