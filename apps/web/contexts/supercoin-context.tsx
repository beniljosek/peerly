"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { toast } from "sonner"

interface SuperCoinContextType {
  balance: number
  deductSuperCoins: (amount: number, reason: string) => Promise<boolean>
  addSuperCoins: (amount: number, reason: string) => void
  refreshBalance: () => Promise<void>
  isLoading: boolean
}

const SuperCoinContext = createContext<SuperCoinContextType | undefined>(undefined)

interface SuperCoinProviderProps {
  children: ReactNode
  initialBalance?: number
}

export function SuperCoinProvider({ children, initialBalance = 250 }: SuperCoinProviderProps) {
  const [balance, setBalance] = useState(initialBalance)
  const [isLoading, setIsLoading] = useState(false)

  // Load balance from localStorage on mount
  useEffect(() => {
    const savedBalance = localStorage.getItem('supercoin-balance')
    if (savedBalance) {
      setBalance(parseInt(savedBalance))
    }
  }, [])

  // Save balance to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('supercoin-balance', balance.toString())
  }, [balance])

  const refreshBalance = async () => {
    setIsLoading(true)
    try {
      // Simulate a brief loading state
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Load from localStorage
      const savedBalance = localStorage.getItem('supercoin-balance')
      if (savedBalance) {
        setBalance(parseInt(savedBalance))
      }
    } catch (error) {
      console.error('Failed to refresh balance:', error)
      toast.error('Failed to refresh balance')
    } finally {
      setIsLoading(false)
    }
  }

  const deductSuperCoins = async (amount: number, reason: string): Promise<boolean> => {
    if (balance < amount) {
      toast.error(`Insufficient balance. You need ${amount - balance} more SuperCoins.`)
      return false
    }

    setIsLoading(true)
    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Update balance
      const newBalance = balance - amount
      setBalance(newBalance)
      
      toast.success(`${amount} SuperCoins deducted for ${reason}`)
      
      // Log transaction locally for immediate UI feedback
      const transaction = {
        id: Date.now(),
        type: 'spent',
        amount,
        reason,
        timestamp: new Date().toISOString()
      }
      
      const transactions = JSON.parse(localStorage.getItem('supercoin-transactions') || '[]')
      transactions.unshift(transaction)
      localStorage.setItem('supercoin-transactions', JSON.stringify(transactions))
      
      return true
    } catch (error) {
      console.error('Failed to deduct supercoins:', error)
      toast.error('Failed to deduct SuperCoins. Please try again.')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const addSuperCoins = async (amount: number, reason: string) => {
    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 500))

      // Update balance
      const newBalance = balance + amount
      setBalance(newBalance)
      
      toast.success(`${amount} SuperCoins added for ${reason}`)
      
      // Log transaction locally for immediate UI feedback
      const transaction = {
        id: Date.now(),
        type: 'earned',
        amount,
        reason,
        timestamp: new Date().toISOString()
      }
      
      const transactions = JSON.parse(localStorage.getItem('supercoin-transactions') || '[]')
      transactions.unshift(transaction)
      localStorage.setItem('supercoin-transactions', JSON.stringify(transactions))
    } catch (error) {
      console.error('Failed to add supercoins:', error)
      toast.error('Failed to add SuperCoins. Please try again.')
    }
  }

  const value: SuperCoinContextType = {
    balance,
    deductSuperCoins,
    addSuperCoins,
    refreshBalance,
    isLoading
  }

  return (
    <SuperCoinContext.Provider value={value}>
      {children}
    </SuperCoinContext.Provider>
  )
}

export function useSuperCoins() {
  const context = useContext(SuperCoinContext)
  if (context === undefined) {
    throw new Error('useSuperCoins must be used within a SuperCoinProvider')
  }
  return context
} 