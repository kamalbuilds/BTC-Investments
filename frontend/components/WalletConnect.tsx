import { useRouter } from 'next/navigation';
import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useActiveAccount, useActiveWallet, useConnectModal, useDisconnect } from 'thirdweb/react';
import { client } from '@/config/wallet';
import Link from 'next/link';
import { useAuthContext } from '@/hooks/auth';
import { CircleUserRound } from 'lucide-react';
import { Button } from './ui/button';
import WalletLogin from './WalletLogin';
import SocialLogin from './SocialLogin';

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

            {activeAccount && wallet && (
                <WalletLogin activeAccount={activeAccount} wallet={wallet} />
            )}

            {user && (
                <SocialLogin user={user} />
            )}

            {!wallet && !user && (
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button variant='outline' className='rounded-xl'>Connect</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem className='cursor-pointer' onClick={() => {
                            connect({ client: client })
                        }}>
                            Thirdweb
                        </DropdownMenuItem>
                        <DropdownMenuItem className='cursor-pointer'>
                            <Link href='/wallet'>
                                Circle
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}



            {/* {(activeAccount && wallet) || user ? (
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <CircleUserRound size={24} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                            {
                                user ? user?.user_metadata.name : activeAccount?.address
                            }
                        </DropdownMenuItem>

                        <DropdownMenuItem className='justify-end' onClick={() => {
                            if (wallet) {
                                disconnect(wallet)
                            } else if (user) {
                                handleSignOut();
                            }
                        }}>
                            <Button>Disconnect</Button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        Connect
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => {
                            connect({ client: client })
                        }}>
                            Thirdweb
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href='/wallet'>
                                Circle
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )} */}
        </div>
    )
};

export default WalletConnect;