'use client'
import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CircleUserRound } from 'lucide-react';
import { Button } from './ui/button';
import { useDisconnect } from 'thirdweb/react';

const WalletLogin = ({
    activeAccount,
    wallet
}) => {
    const { disconnect } = useDisconnect();


    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <CircleUserRound size={24} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    {activeAccount?.address}
                </DropdownMenuItem>
                <DropdownMenuItem >
                    <Button className='justify-end bg-red-500 hover:bg-red-900' onClick={() => {
                        if (wallet) {
                            disconnect(wallet)
                        }
                    }}>
                        Disconnect
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default WalletLogin;