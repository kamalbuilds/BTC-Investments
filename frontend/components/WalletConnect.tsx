import { useRouter } from 'next/navigation';
import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ConnectButton, useActiveAccount, useActiveWallet, useConnectModal, useDisconnect } from 'thirdweb/react';
import { client } from '@/config/wallet';
import Link from 'next/link';
import { useAuthContext } from '@/hooks/auth';
import { CircleUserRound } from 'lucide-react';
import { Button } from './ui/button';
import WalletLogin from './WalletLogin';
import SocialLogin from './SocialLogin';
import { sepolia } from 'thirdweb/chains';
import { BOBMainnet, BOBSepolia } from '@/config/custom-chains';

const WalletConnect = () => {
    const router = useRouter();
    const wallet = useActiveWallet();
    const activeAccount = useActiveAccount();
    const { connect, isConnecting } = useConnectModal();
    const { disconnect } = useDisconnect();

    const { isLoading, user, handleSignOut } = useAuthContext()

    console.log("user", isLoading, user)
    console.log("IsConnecting", isConnecting)
    console.log("wallet", wallet)
    console.log("activeAccount", activeAccount)

    return (
        <div>
            <ConnectButton client={client} chains={[sepolia, BOBSepolia, BOBMainnet]} />
        </div>
    )
};

export default WalletConnect;