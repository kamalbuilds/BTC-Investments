"use client";
import Link from "next/link"
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"

import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Globe, Wallet, Shield, Zap } from 'lucide-react'
import Image from "next/image";


export default function Component() {
  return (
    <div className="min-h-screen overflow-hidden">
      <div className="relative z-10">
        <section className="container mx-auto px-4 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-4xl"
          >
            <h2 className="mb-6 text-6xl font-bold">
              BTC Investments in One Click
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-xl text-gray-600">
              Navigate the future of cross-chain investments with AI-powered portfolio management and seamless asset transfers across multiple blockchains.
            </p>
            <div className="flex justify-center space-x-4">
              <Link href='/investment-type'>
                <Button size="lg" className="bg-gradient-to-r from-teal-500 to-teal-600">
                  Start Investing <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                Contact Us
              </Button>
            </div>
          </motion.div>
        </section>

        <section className="container mx-auto px-4 py-24 bg-muted">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[
              {
                icon: Globe,
                title: "Cross-Chain Access",
                description: "Seamlessly invest across multiple blockchains with our integrated CCTP protocol",
                color: "from-teal-500 to-teal-600"
              },
              {
                icon: Wallet,
                title: "Portfolio Management",
                description: "AI-powered strategies optimize your investments across different chains",
                color: "from-purple-500 to-purple-600"
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                description: "Bank-grade security with full regulatory compliance and transparency",
                color: "from-blue-500 to-blue-600"
              },
              {
                icon: Zap,
                title: "Real-Time Analytics",
                description: "Track performance and manage risk with advanced analytics",
                color: "from-pink-500 to-pink-600"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group relative overflow-hidden transition-shadow duration-300 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className={`inline-flex rounded-lg bg-gradient-to-r p-3 ${feature.color} mb-4`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 ">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 * 0.2 }}
              viewport={{ once: true }}
              className="p-6"
            >
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Personalized Strategies</div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Tailor Your Investment Journey</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Our customizable AI bot can help you create personalized investment strategies based on your risk
                    tolerance, financial goals, and market conditions.
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 * 0.2 }}
              viewport={{ once: true }}
              className="p-6"
            >
              <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                <Image
                  src="/aibot.png"
                  width="550"
                  height="310"
                  alt="Personalized Strategies"
                  className="mx-auto overflow-hidden rounded-xl object-contain object-center sm:w-full lg:order-last"
                />
                <div className="flex flex-col justify-center space-y-4">
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Customizable AI Bot</h3>
                    <p className="text-muted-foreground">
                      Leverage our advanced AI bot to create personalized investment strategies tailored to your unique
                      financial goals and risk profile.
                    </p>
                  </div>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Telegram Integration</h3>
                    <p className="text-muted-foreground">
                      Receive real-time updates, analytics, and portfolio management tools directly through our Telegram
                      bot integration.
                    </p>
                  </div>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Flexible Strategies</h3>
                    <p className="text-muted-foreground">
                      Easily adjust your investment strategies as your financial goals or market conditions change,
                      ensuring your portfolio remains optimized.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>


          </div>
        </section>


        <section className="container mx-auto px-4 py-24">
          <Card className="bg-gradient-to-r from-teal-500 to-purple-500 text-white">
            <CardContent className="p-12 text-center">
              <h3 className="mb-4 text-3xl font-bold">Ready to start your bitcoin investment journey?</h3>
              <p className="mb-8 text-lg opacity-90">Join thousands of investors already using our platform</p>
              <Link href='/investment-type'>
                <Button size="lg" variant="secondary" className="bg-white text-gray-900 hover:bg-gray-100">
                  Get Started Now <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>



  )
}