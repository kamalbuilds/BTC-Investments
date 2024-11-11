"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { AnonOnly } from '@/components/Auth'
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import GoogleLogin from '../../components/Auth/GoogleLogin'
import DiscordLogin from '../../components/Auth/DiscordLogin'

const schema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(1, { message: 'Password is required' })
})

export default function Login() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const router = useRouter()
  const supabase = createClientComponentClient()
  const { toast } = useToast()

  const handleLogin = async (data) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password
    })
    if (error) {
      toast({
        variant: "destructive",
        title: "Error logging in",
        description: error.message,
      })
    } else {
      router.refresh()
    }
  }

  return (
    <AnonOnly>
      <div className='mt-12 flex flex-col items-center justify-center'>
        <Card className="mt-24 flex w-[auto] max-w-lg flex-col justify-center">
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className=" w-full justify-center">
                  <Button type="submit" className='w-full'>Login</Button>
                </div>
              </form>
            </Form>
          </CardContent>

          <CardFooter className='mt-4 flex flex-col items-center justify-center gap-2'>
            <div className='flex gap-4'>
              <GoogleLogin />
              <DiscordLogin />
            </div>

            <div className='flex flex-col gap-4'>
              <div className="mt-4 flex flex-col text-center">
                Don&apos;t have an account?
                <Link
                  className="text-blue-600 underline"
                  href={'/register'}
                >
                  Register here
                </Link>
              </div>
            </div>
          </CardFooter>

        </Card>
      </div>
    </AnonOnly>
  )
}
