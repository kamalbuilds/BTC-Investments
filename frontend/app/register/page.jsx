'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
// import { AnonOnly, FacebookButton, GoogleLogin } from '@/components/Auth'
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { AnonOnly } from '../../components/Auth'
import GoogleLogin from '../../components/Auth/GoogleLogin'
import DiscordLogin from '../../components/Auth/DiscordLogin'
const schema = z
  .object({
    email: z.string().email({ message: 'Invalid email' }),
    password: z.string().min(8, {
      message: 'Password must be at least 8 characters'
    }),
    passwordConfirmation: z.string()
  })
  .refine(
    ({ passwordConfirmation, password }) => passwordConfirmation === password,
    {
      message: "Passwords don't match",
      path: ['passwordConfirmation']
    }
  )

export default function Register() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  })
  const router = useRouter()
  const supabase = createClientComponentClient()
  const { toast } = useToast()

  const handleRegister = async (data) => {
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password
      })
      if (error) {
        throw new Error(error.message)
      }
      router.refresh()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error registering",
        description: error.message,
      })
    }
  }

  return (
    <AnonOnly>
      <div className='mt-12 flex flex-col items-center justify-center'>
        <Card className="mt-24 flex w-[auto] flex-col justify-center">
          <CardHeader>
            <CardTitle>Register</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-4">
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
                <FormField
                  control={form.control}
                  name="passwordConfirmation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className='w-full'>Register</Button>
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
                Already have an account?{' '}
                <Link
                  className="text-blue-600 underline"
                  href={'/login'}
                >
                  Login
                </Link>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </AnonOnly>
  )
}
