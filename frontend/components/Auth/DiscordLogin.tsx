import React from 'react';
import { Button } from '../ui/button';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation';
import { FaDiscord } from 'react-icons/fa6';

const DiscordLogin = () => {

    const supabase = createClientComponentClient()
    const router = useRouter()
    const { toast } = useToast()

    const handleLoginWithDiscord = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'discord',
            options: {
                redirectTo: process.env.NEXT_PUBLIC_HOST
            }
        })
        if (error) {
            toast({
                variant: "destructive",
                title: "Error logging in",
                description: error.message,
            })
        }
        router.refresh()
    }

    return (
        <Button onClick={handleLoginWithDiscord} className='bg-blue-500'>
            <FaDiscord />
            Sign In With Discord
        </Button>
    );
};

export default DiscordLogin;