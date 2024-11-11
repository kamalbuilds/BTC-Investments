import { NextResponse } from "next/server"
import { GatewayQuoteParams, GatewaySDK } from "@gobob/bob-sdk"
import axios from "axios"

import { BASE_URL } from "@/config/address"

const gatewaySDK = new GatewaySDK("bob-sepolia")

export async function POST(request: Request) {
  try {
    const { address } = await request.json()
    const outputTokens = await gatewaySDK.getTokens()

    console.log("out put toe", outputTokens)

    // const quoteParams: GatewayQuoteParams = {
    //   fromToken: "ETH",
    //   fromChain: "sepolia",
    //   fromUserAddress: address,
    //   toChain: "bob-sepolia",
    //   toUserAddress: address,
    //   toToken: "tBTC",
    //   type: "swap",
    //   amount: 1000000,
    //   gasRefill: 10000,
    // }

    // const quoteParams: GatewayQuoteParams = {
    //   fromToken: "BTC",
    //   fromChain: "Bitcoin",
    //   fromUserAddress: "bc1qafk4yhqvj4wep57m62dgrmutldusqde8adh20d",
    //   toChain: "BOB",
    //   toUserAddress: address,
    //   toToken: '0xBBa2eF945D523C4e2608C9E1214C2Cc64D4fc2e2', // or e.g. "SolvBTC"
    //   amount: 10000000, // 0.1 BTC
    //   gasRefill: 10000, // 0.0001 BTC. The amount of BTC to swap for ETH for tx fees.
    // }

    const BOB_WBTC_V2_TOKEN_ADDRESS =
      "0x236f8c0a61da474db21b693fb2ea7aab0c803894"
    // const quoteParams: GatewayQuoteParams = {
    //   fromChain: "sepolia",
    //   fromToken: "ETH",
    //   fromUserAddress: address,
    //   toChain: "bob-sepolia",
    //   toUserAddress: address,
    //   toToken: "tBTC",
    //   amount: 600000, // 0.1ETH
    //   gasRefill: 10000,
    // }

    // console.log("Quote Params", quoteParams)

    // const quote = await gatewaySDK.getQuote(quoteParams)
    // console.log("quote", quote)

    // const { uuid, psbtBase64 } = await gatewaySDK.startOrder(quote, quoteParams)

    const BOB_TBTC_V2_TOKEN_ADDRESS =
      "0x03c7054bcb39f7b2e5b2c7acb37583e32d70cfa3"
    const quoteParams: GatewayQuoteParams = {
      fromChain: "Bitcoin",
      fromToken: "BTC",
      fromUserAddress: "tb1q4cwpzmucd6jn2smypgr00lq5nud693uz59a8cp",
      toChain: "bob-sepolia",
      toUserAddress: address,
      toToken: BOB_TBTC_V2_TOKEN_ADDRESS,
      amount: 10000, // 0.1 BTC
      gasRefill: 1000,
    }

    const quote = await gatewaySDK.getQuote(quoteParams)

    console.log("Quote", quote)

    const { uuid, psbtBase64 } = await gatewaySDK.startOrder(quote, quoteParams)

    console.log("UUID", uuid)
    console.log("psbtBase64", psbtBase64)

    // const strategies = await gatewaySDK.getStrategies()
    // console.log("strategies", strategies)

    // const strategy = strategies.find(
    //   (contract) => contract.integration.name === "pell-wbtc"
    // )!
    // const quoteParamsStaking: GatewayQuoteParams = {
    //   ...quoteParams,
    //   toChain: strategy.chain.chainId,
    //   toToken: strategy.inputToken.symbol,
    //   strategyAddress: strategy.address,
    // }

    // console.log("quoteParamsStaking", quoteParamsStaking)

    return NextResponse.json({ data: "hello world" }, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: (err as Error).message || "An error occurred" },
      { status: 500 }
    )
  }
}
