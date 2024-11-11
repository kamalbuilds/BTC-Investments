"use client"

import React, { useEffect } from "react"
import { useActiveAccount } from "thirdweb/react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ContributedBTS from "@/components/portfolio/ContributedBTS"
import UsersBTS from "@/components/portfolio/usersBTS"

const PortfolioPage = () => {
  const activeAccount = useActiveAccount()

  const [btscontributed, setBtsContributed] = React.useState<any[]>([])
  const [createdBTS, setCreatedBTS] = React.useState<any[]>([])

  const getPortfolioDetails = async ({ address }: { address: string }) => {
    if (address) {
      try {
        const res = await fetch('/api/getPortfolioDetails', {
          method: 'POST',
          body: JSON.stringify({ address })
        })
        const response = await res.json()
        console.log("Response >>>>", response)

        const { users } = response.data
        setBtsContributed(users)
      } catch (error) {
        console.log("Error", error)
      }
    }
  }

  const getUsersCreatedBTS = async ({ address }: { address: string }) => {
    if (address) {
      const res = await fetch('/api/getUserCreatedBTS', {
        method: 'POST',
        body: JSON.stringify({ address })
      })
      const response = await res.json()
      console.log("Created BTS >>>>", response)

      const { users } = response.data
      setCreatedBTS(users)
    }
  }

  useEffect(() => {
    if (activeAccount?.address) {
      getPortfolioDetails({
        address: activeAccount.address,
      })
      getUsersCreatedBTS({
        address: activeAccount.address,
      })
    }
  }, [activeAccount])

  return (
    <>
      <Tabs defaultValue="contributions" className="my-12">
        <TabsList className="ml-12">
          <TabsTrigger value="contributions">Contributed-BTS</TabsTrigger>
          <TabsTrigger value="myBTS">My-BTS</TabsTrigger>
        </TabsList>

        {activeAccount ? (
          <>
            <TabsContent value="contributions">
              <ContributedBTS btscontributed={btscontributed} />
            </TabsContent>
            <TabsContent value="myBTS">
              <UsersBTS createdBTS={createdBTS} />
            </TabsContent>
          </>
        ) : (
          <p className="text-muted-foreground max-w-[700px] text-lg">
            Connect your wallet to continue
          </p>
        )}
      </Tabs>
    </>
  )
}

export default PortfolioPage
