'use client'
import React from 'react';
import { Button } from './ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CircleUserRound } from 'lucide-react';
import { useAuthContext } from '@/hooks/auth';
const SocialLogin = ({
    user
}) => {

    const { handleSignOut } = useAuthContext()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <CircleUserRound size={24} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    {
                        user?.user_metadata.name
                    }
                </DropdownMenuItem>

                <DropdownMenuItem >
                    <Button className='justify-end bg-red-500 hover:bg-red-900' onClick={() => {
                        if (user) {
                            handleSignOut();
                        }
                    }}>
                        Sign Out
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default SocialLogin;