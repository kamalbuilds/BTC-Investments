import { TBTC } from "@keep-network/tbtc-v2.ts"
import { ethers } from "ethers"

export class TBTCService {
  private static instance: TBTC
  private static ethProvider: ethers.providers.JsonRpcProvider
  private static arbProvider: ethers.providers.JsonRpcProvider

  static async initialize() {
    if (!this.instance) {
      this.ethProvider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_ETH_SEPOLIA_RPC_URL
      )
      this.arbProvider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_ARBITRUM_SEPOLIA_RPC_URL
      )

      // Initialize SDK for Sepolia testnet
      this.instance = await TBTC.initializeSepolia(this.ethProvider, true)
      
      // Initialize cross-chain functionality for Arbitrum
      const arbSigner = new ethers.Wallet(
        process.env.NEXT_PUBLIC_PRIVATE_KEY!,
        this.arbProvider
      )
      await this.instance.initializeCrossChain("Arbitrum", arbSigner)
    }
    return this.instance
  }

  static async getDeposit(depositAddress: string) {
    const sdk = await this.initialize()
    return sdk.deposits.getDeposit(depositAddress)
  }

  static async initiateDeposit(amount: string) {
    const sdk = await this.initialize()
    const deposit = await sdk.deposits.initiateDeposit(amount)
    return deposit
  }

  static async requestRedemption(
    btcAddress: string,
    amount: string,
    chainId: number
  ) {
    const sdk = await this.initialize()
    const redemption = await sdk.redemptions.requestRedemption(
      btcAddress,
      amount,
      chainId
    )
    return redemption
  }
} 