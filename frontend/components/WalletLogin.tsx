'use client'
import React from 'react';
import { ConnectButton, useDisconnect } from 'thirdweb/react';
import { client } from '@/config/wallet';
import { sepolia } from 'thirdweb/chains';
import { BOBMainnet, BOBSepolia } from '@/config/custom-chains';

const WalletLogin = ({
    activeAccount,
    wallet
}) => {
    const { disconnect } = useDisconnect();
    return (
        <ConnectButton client={client} chains={[sepolia, BOBSepolia, BOBMainnet]} />
    );
};

export default WalletLogin;