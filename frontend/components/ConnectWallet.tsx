import React, { useState } from 'react';
import { useConnect, useAccount, useDisconnect } from "@gobob/sats-wagmi";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ConnectWallet = () => {
    const { connectors, connect } = useConnect();
    const { address } = useAccount();
    const { disconnect } = useDisconnect();
    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleConnect = async (connector) => {
        await connect({ connector });
        setDialogOpen(false);
    };

    return (
        <div>


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
                <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger>
                        <button>Connect Wallet</button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Select a Connector</DialogTitle>
                        </DialogHeader>
                        {connectors.map((connector) => (
                            <button key={connector.name} onClick={() => handleConnect(connector)}>
                                {connector.name}
                            </button>
                        ))}
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default ConnectWallet;