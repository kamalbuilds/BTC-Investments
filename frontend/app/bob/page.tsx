"use client"
import React from 'react';
import { GatewayQuoteParams, GatewaySDK } from "@gobob/bob-sdk";
import { Button } from '@/components/ui/button';
import { useActiveAccount } from 'thirdweb/react';
import { useSendGatewayTransaction } from '@gobob/sats-wagmi';

const BobPage = () => {
    const gatewaySDK = new GatewaySDK("bob-sepolia"); // or "bob-sepolia"

    const activeAccount = useActiveAccount();

    const getOutputTokens = async () => {
        if (!activeAccount) return
        // const outputTokens = await gatewaySDK.getTokens();

        // console.log("out put toe", outputTokens);

        // const quoteParams: GatewayQuoteParams = {
        //     fromToken: "ETH",
        //     fromChain: "sepolia",
        //     fromUserAddress: activeAccount.address,
        //     toChain: "bob-sepolia",
        //     toUserAddress: activeAccount.address,
        //     toToken: "tBTC",
        //     amount: 10000000000000000,
        //     gasRefill: 10000,
        // };

        // const quote = await gatewaySDK.getQuote(quoteParams);
        // console.log("quote", quote);

        // const strategies = await gatewaySDK.getStrategies();
        // console.log("strategies", strategies);

        // const strategy = strategies.find(
        //     (contract) => contract.integration.name === "pell-wbtc",
        // )!;
        // const quoteParamsStaking: GatewayQuoteParams = {
        //     ...quoteParams,
        //     toChain: strategy.chain.chainId,
        //     toToken: strategy.inputToken.symbol,
        //     strategyAddress: strategy.address,
        // };

        // console.log("quoteParamsStaking", quoteParamsStaking);

        const res = await fetch('/api/swapBob', {
            method: 'POST',
            body: JSON.stringify({ address: activeAccount.address })
        })

        console.log("Res", res)

    }



    return (
        <div>
            <Button onClick={getOutputTokens}>Bridge</Button>
        </div>
    );
};

export default BobPage;