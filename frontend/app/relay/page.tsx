"use client"
import React from 'react';
import { getClient } from "@reservoir0x/relay-sdk";
import { useActiveAccount } from 'thirdweb/react';
import { Button } from '@/components/ui/button';
import { useWalletClient } from "wagmi";
import { useAccount, useSendTransaction, useSignMessage, SatsConnector } from '@gobob/sats-wagmi';

const RelayPage = () => {

    const activeAccount = useActiveAccount();

    const handlegetPrice = async () => {
        if (!activeAccount) return
        const price = await getClient()?.actions.getPrice({
            originChainId: 11155111,
            destinationChainId: 111,
            originCurrency: "0x0000000000000000000000000000000000000000",
            destinationCurrency: "0x0000000000000000000000000000000000000000",
            amount: "10000000000000000",
            user: `0x4e763f42227DF08696389d4fcA2Df0b5Fe33f246`,
            tradeType: 'EXACT_INPUT'
        });

        console.log("price", price);
    }

    const { data: wallet } = useWalletClient();


    const { connector, address } = useAccount()

    const handleGetQuote = async () => {
        const quote = await getClient()?.actions.getQuote({
            chainId: 8253038,
            toChainId: 1,
            currency: "bc1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqmql8k8",
            toCurrency: "0x0000000000000000000000000000000000000000",
            amount: "1000",
            tradeType: 'EXACT_INPUT',
            recipient: '0xE5A730337eaF120A7627AB7A3F083a7b4b865EB0'
        });

        console.log("quote", quote);

        const tx = await getClient().actions.execute({
            quote,
            wallet,
        })

        console.log("tx", tx);


    }

    const { data: hash, error, isPending, sendTransaction } = useSendTransaction();

    const handleRelayBTCToETH = async () => {
        const url = 'https://api.relay.link/quote';

        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "user": "bc1q4vxn43l44h30nkluqfxd9eckf45vr2awz38lwa",
                "recipient": "0x4e763f42227DF08696389d4fcA2Df0b5Fe33f246",
                "originChainId": 8253038,
                "destinationChainId": 1,
                "originCurrency": "bc1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqmql8k8",
                "destinationCurrency": "0x0000000000000000000000000000000000000000",
                "amount": "10000000",
                "tradeType": "EXACT_INPUT"
            })
        })

        const response = await res.json();
        console.log("res", response)
    }

    const { signMessage } = useSignMessage();


    const handleSignPSBT = async () => {
        if (!address) return
        const psbt = '70736274ff0100fd7c010200000007d42809bc084ab8eec99f67ab39d6fdd8d1be5e595cac90f566e8692f1be015570000000000fdffffff0bbc7427e0e2eef716f15ae1664b8a6c948d8faddc8b0c18ce235103e3b08ba82100000000fdfffffff39ad35b3b81dbf8c037a87dbbdded0b5ef53999c06261aeebf2b0389e1ee1cb0000000000fdffffff51e7a87a565d94de99cbf2acaec9357254d93f075be4fa04e5b47209a5a478590000000000fdffffff7062b41114274e3c077447233eb003a7a78a1df656588ab5edbeab3a91af57b10b00000000fdffffff729b54bef687ddceade3c32951b66dd830afa1f719a35ea433060a9bf2fac8690900000000fdffffff2d59fe740528ef01e0ba4bf68b3926c6b49fc4a1a568922078a4c2db7d1366322300000000fdffffff03809698000000000016001402b6c186a88f10daaaad754cca4468824f01586cab10e25917000000160014ab0d3ac7f5ade2f9dbfc024cd2e7164d68c1abae00000000000000000c6a0a30783034323063633035000000000001011f1027000000000000160014ab0d3ac7f5ade2f9dbfc024cd2e7164d68c1abae0001011fec2c000000000000160014ab0d3ac7f5ade2f9dbfc024cd2e7164d68c1abae0001011f2887000000000000160014ab0d3ac7f5ade2f9dbfc024cd2e7164d68c1abae0001011f50c3000000000000160014ab0d3ac7f5ade2f9dbfc024cd2e7164d68c1abae0001011fcd09010000000000160014ab0d3ac7f5ade2f9dbfc024cd2e7164d68c1abae0001011f440c030000000000160014ab0d3ac7f5ade2f9dbfc024cd2e7164d68c1abae0001011f3e09755a17000000160014ab0d3ac7f5ade2f9dbfc024cd2e7164d68c1abae00000000'

        const psbtHex = await connector?.signPsbt(psbt, [{
            address,
            signingIndexes: [0, 1]
        }])

        console.log("psbtHex", psbtHex);



        signMessage({
            message: psbt
        }, {
            onSuccess: (res) => {
                console.log("Res", res);


            },
            onError: (err) => {
                console.log("Err", err);

            }
        })


    }


    return (
        <div>
            <Button onClick={handlegetPrice}> Relay</Button>
            <Button onClick={handleGetQuote}> Get Quote </Button>
            <Button onClick={handleRelayBTCToETH}> BTC to ETH </Button>
            <Button onClick={handleSignPSBT}> handleSignPSBT </Button>

        </div>
    );
};

export default RelayPage;