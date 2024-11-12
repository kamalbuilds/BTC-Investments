"use client"
import React, { useState } from 'react'
import { useActiveAccount } from 'thirdweb/react'
import { TBTCService } from '@/services/tbtc'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useToast } from '@/hooks/use-toast'

const TBTCBridge = () => {
  
  const [amount, setAmount] = useState('')
  const [btcAddress, setBtcAddress] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const activeAccount = useActiveAccount()
  const { toast } = useToast()

  const handleDeposit = async () => {
    
    setIsLoading(true)
    
    try {
      const deposit = await TBTCService.initiateDeposit(amount)
      toast({
        title: "Deposit Initiated",
        description: `Deposit Address: ${deposit.btcDepositAddress}`,
      })
      
      // Monitor deposit status
      const depositStatus = await TBTCService.getDeposit(deposit.btcDepositAddress)
      console.log("Deposit status:", depositStatus)
    } catch (error) {
      console.error("Deposit error:", error)
      toast({
        title: "Error",
        description: "Failed to initiate deposit",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRedemption = async () => {
    if (!activeAccount) return
    setIsLoading(true)
    
    try {
      const redemption = await TBTCService.requestRedemption(
        btcAddress,
        amount,
        activeAccount.chainId
      )
      toast({
        title: "Redemption Requested",
        description: `Transaction Hash: ${redemption.transactionHash}`,
      })
    } catch (error) {
      console.error("Redemption error:", error)
      toast({
        title: "Error",
        description: "Failed to request redemption",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold mb-2">tBTC Bridge</h2>
        <Input
          type="text"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      
      <div>
        <Input
          type="text"
          placeholder="BTC Address (for redemption)"
          value={btcAddress}
          onChange={(e) => setBtcAddress(e.target.value)}
        />
      </div>

      <div className="flex space-x-4">
        <Button
          onClick={handleDeposit}
          disabled={isLoading || !amount}
        >
          Deposit BTC
        </Button>
        
        <Button
          onClick={handleRedemption}
          disabled={isLoading || !amount || !btcAddress}
        >
          Redeem tBTC
        </Button>
      </div>
    </div>
  )
}

export default TBTCBridge