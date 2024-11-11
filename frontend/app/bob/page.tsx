"use client"
import React from 'react';
import { GatewayQuoteParams, GatewaySDK } from "@gobob/bob-sdk";
import { Button } from '@/components/ui/button';
import { useActiveAccount } from 'thirdweb/react';
import { useSendTransaction, useSignMessage, useWaitForTransactionReceipt } from '@gobob/sats-wagmi';

const BobPage = () => {
    const activeAccount = useActiveAccount();
    const { 
        data: hash,
        error,
        isPending,
        sendTransaction 
    } = useSendTransaction();

    const {signMessage} = useSignMessage()


    const { isLoading: isConfirming, isSuccess: isConfirmed } = 
        useWaitForTransactionReceipt({ 
            hash,
        });

    const getOutputTokens = async () => {
        if (!activeAccount) return;

        try {
            // Get PSBT from API
            const res = await fetch('/api/swapBob', {
                method: 'POST',
                body: JSON.stringify({ address: activeAccount.address })
            });
            
            const response = await res.json();
            console.log("psbt", response);
            
            // signMessage({
            //     message: psbt
            // },{
            //     onSuccess:(res)=>{
            //         console.log("REs",res);
                    
            //     },
            //     onError:(err)=>{
            //         console.log("Error",err);
            //     }
            // })

            // // Send transaction using sats-wagmi
            // sendTransaction({ 
            //     psbt,
            //     // Add any other required parameters based on your needs
            // });

        } catch (err) {
            console.error("Error:", err);
        }
    }

    return (
        <div>
            <Button 
                onClick={getOutputTokens}
                disabled={isPending}
            >
                {isPending ? 'Confirming...' : 'Bridge'}
            </Button>

            {hash && <div>Transaction Hash: {hash}</div>}
            {isConfirming && <div>Waiting for confirmation...</div>}
            {isConfirmed && <div>Transaction confirmed.</div>}
            {error && (
                <div>Error: {error.message}</div>
            )}
        </div>
    );
};

export default BobPage;