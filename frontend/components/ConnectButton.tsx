import React, { useState } from 'react';
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useConnect, useAccount, useDisconnect } from "@gobob/sats-wagmi";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const ConnectButton = () => {
    const [isOpen, setIsOpen] = useState(false)

    const { connectors, connect } = useConnect();
    const { address } = useAccount();
    const { disconnect } = useDisconnect();

    const handleConnect = async (connector) => {
        await connect({ connector });
    };


    return (
        <>

            {address ? (
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <div>Connected</div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>{address}</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => disconnect()}>Disconnect</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-emerald-600 text-white hover:bg-emerald-700">
                            Connect Bitcoin
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <div className="flex items-center justify-between">
                                <DialogTitle className="text-2xl font-normal">Connect Wallet</DialogTitle>
                            </div>
                            <DialogDescription className="">
                                On BOB, you have the option to link both your EVM and BTC wallets. For optimal functionality, it&apos;s advised to connect wallets from both networks.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col gap-4 space-y-4 py-4">
                            {connectors.map((connector) => (
                                <Button variant='outline' key={connector.name} onClick={() => handleConnect(connector)}>
                                    {connector.name}
                                </Button>
                            ))}
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
};

export default ConnectButton;