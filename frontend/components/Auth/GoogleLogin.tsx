import React from 'react';
import { Button } from '../ui/button';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation';
import { FaGoogle } from "react-icons/fa";

const GoogleLogin = () => {
    const supabase = createClientComponentClient()
    const router = useRouter()
    const { toast } = useToast()

    const handleLoginWithGoogle = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
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
        <Button onClick={handleLoginWithGoogle} className='bg-red-500'>
            <FaGoogle />
            Sign In With Google
        </Button>
    );
};

export default GoogleLogin;