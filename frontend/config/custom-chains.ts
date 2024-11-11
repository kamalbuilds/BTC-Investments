import { defineChain } from "thirdweb"

export const BOBMainnet = defineChain({
  id: 60808,
  name: "Bob Mainnet",
  rpc: "https://rpc.gobob.xyz/",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
})

export const BOBSepolia = defineChain({
  id: 808813,
  name: "Bob Sepolia",
  rpc: "https://bob-sepolia.rpc.gobob.xyz/",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
})
