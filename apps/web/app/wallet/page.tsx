"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Zap, 
  BookOpen, 
  Star,
  ArrowUpRight,
  ArrowDownRight,
  CircleDollarSign,
  Calendar,
  MessageCircle
} from "lucide-react"
import { useSuperCoins } from "@/contexts/supercoin-context"

interface Transaction {
  id: number
  type: "earned" | "spent"
  amount: number
  reason: string
  timestamp: string
}

export default function WalletPage() {
  const { balance, refreshBalance } = useSuperCoins()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Load transactions from localStorage
  useEffect(() => {
    const loadTransactions = () => {
      try {
        const savedTransactions = localStorage.getItem('supercoin-transactions')
        if (savedTransactions) {
          const parsedTransactions = JSON.parse(savedTransactions)
          setTransactions(parsedTransactions)
        }
      } catch (error) {
        console.error('Failed to load transactions:', error)
      }
    }

    loadTransactions()

    // Listen for storage changes (in case transactions are updated from other components)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'supercoin-transactions') {
        loadTransactions()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const handleRefresh = async () => {
    setIsLoading(true)
    await refreshBalance()
    setIsLoading(false)
  }

  // Transform transactions for display
  const displayTransactions = transactions.map((tx) => {
    const date = new Date(tx.timestamp)
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })

    // Determine icon and category based on reason
    let icon = <CircleDollarSign className="h-4 w-4" />
    let category = "Transaction"

    if (tx.reason.toLowerCase().includes('booking')) {
      icon = <Calendar className="h-4 w-4" />
      category = "Session Booking"
    } else if (tx.reason.toLowerCase().includes('teaching')) {
      icon = <Star className="h-4 w-4" />
      category = "Teaching Reward"
    } else if (tx.reason.toLowerCase().includes('course')) {
      icon = <BookOpen className="h-4 w-4" />
      category = "Course"
    } else if (tx.reason.toLowerCase().includes('quick connect')) {
      icon = <Zap className="h-4 w-4" />
      category = "Quick Connect"
    } else if (tx.reason.toLowerCase().includes('chat')) {
      icon = <MessageCircle className="h-4 w-4" />
      category = "Chat Session"
    }

    return {
      id: tx.id,
      type: tx.type,
      amount: tx.amount,
      description: tx.reason,
      date: formattedDate,
      icon,
      category,
      timestamp: tx.timestamp
    }
  })

  const totalEarned = displayTransactions
    .filter(t => t.type === "earned")
    .reduce((sum, t) => sum + t.amount, 0)

  const totalSpent = displayTransactions
    .filter(t => t.type === "spent")
    .reduce((sum, t) => sum + t.amount, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <section className="px-4 py-12 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Wallet</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Manage your SuperCoins and track your learning investments.
          </p>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Balance Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CircleDollarSign className="h-6 w-6" />
                  Current Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{balance}</div>
                <div className="text-indigo-100 text-sm">SuperCoins</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-6 w-6" />
                  Total Earned
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalEarned}</div>
                <div className="text-teal-100 text-sm">SuperCoins</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-violet-500 to-violet-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="h-6 w-6" />
                  Total Spent
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalSpent}</div>
                <div className="text-violet-100 text-sm">SuperCoins</div>
              </CardContent>
            </Card>
          </div>

          {/* Refresh Button */}
          <div className="flex justify-end mb-6">
            <Button 
              onClick={handleRefresh} 
              disabled={isLoading}
              variant="outline"
              className="flex items-center gap-2"
            >
              <TrendingUp className="h-4 w-4" />
              {isLoading ? "Refreshing..." : "Refresh Balance"}
            </Button>
          </div>

          {/* SuperCoin Information */}
          <Card className="mb-8 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CircleDollarSign className="h-5 w-5 text-indigo-600" />
                How SuperCoins Work
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-gray-900">Spending SuperCoins</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                      <Calendar className="h-5 w-5 text-violet-600" />
                      <div>
                        <div className="font-medium">Session Bookings</div>
                        <div className="text-sm text-gray-600">Cost: Varies by session (0-50 SuperCoins)</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                      <Zap className="h-5 w-5 text-indigo-600" />
                      <div>
                        <div className="font-medium">Quick Connect Sessions</div>
                        <div className="text-sm text-gray-600">Cost: 5 SuperCoins per session</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-gray-900">Earning SuperCoins</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                      <Star className="h-5 w-5 text-teal-600" />
                      <div>
                        <div className="font-medium">Teaching Sessions</div>
                        <div className="text-sm text-gray-600">Earn: 5-20 SuperCoins per session</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                      <BookOpen className="h-5 w-5 text-teal-600" />
                      <div>
                        <div className="font-medium">Course Completion</div>
                        <div className="text-sm text-gray-600">Earn: 10-30 SuperCoins per course</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transaction History */}
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-600" />
                Transaction History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all">All ({displayTransactions.length})</TabsTrigger>
                  <TabsTrigger value="earned">Earned ({displayTransactions.filter(t => t.type === "earned").length})</TabsTrigger>
                  <TabsTrigger value="spent">Spent ({displayTransactions.filter(t => t.type === "spent").length})</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                  {displayTransactions.length === 0 ? (
                    <div className="text-center py-12">
                      <CircleDollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No transactions yet</h3>
                      <p className="text-gray-600">
                        Your transaction history will appear here once you start using SuperCoins.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {displayTransactions.map((transaction) => (
                        <Card key={transaction.id} className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-white/60 backdrop-blur-sm border-0">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className={`p-3 rounded-full shadow-md ${
                                  transaction.type === "earned" 
                                    ? "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-600"
                                    : "bg-gradient-to-r from-orange-100 to-red-100 text-orange-600"
                                }`}>
                                  {transaction.icon}
                                </div>
                                <div>
                                  <div className="font-medium">{transaction.description}</div>
                                  <div className="text-sm text-gray-600">{transaction.category}</div>
                                  <div className="text-xs text-gray-500">{transaction.date}</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {transaction.type === "earned" ? (
                                  <ArrowUpRight className="h-4 w-4 text-teal-600" />
                                ) : (
                                  <ArrowDownRight className="h-4 w-4 text-violet-600" />
                                )}
                                <span className={`font-bold ${
                                  transaction.type === "earned" ? "text-teal-600" : "text-violet-600"
                                }`}>
                                  {transaction.type === "earned" ? "+" : "-"}{transaction.amount}
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="earned" className="space-y-4">
                  {displayTransactions.filter(t => t.type === "earned").length === 0 ? (
                    <div className="text-center py-12">
                      <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No earnings yet</h3>
                      <p className="text-gray-600">
                        Start teaching to earn SuperCoins!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {displayTransactions
                        .filter(t => t.type === "earned")
                        .map((transaction) => (
                          <Card key={transaction.id} className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-white/60 backdrop-blur-sm border-0">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="p-3 rounded-full shadow-md bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-600">
                                    {transaction.icon}
                                  </div>
                                  <div>
                                    <div className="font-medium">{transaction.description}</div>
                                    <div className="text-sm text-gray-600">{transaction.category}</div>
                                    <div className="text-xs text-gray-500">{transaction.date}</div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <ArrowUpRight className="h-4 w-4 text-emerald-600" />
                                  <span className="font-bold text-emerald-600">+{transaction.amount}</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="spent" className="space-y-4">
                  {displayTransactions.filter(t => t.type === "spent").length === 0 ? (
                    <div className="text-center py-12">
                      <TrendingDown className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No spending yet</h3>
                      <p className="text-gray-600">
                        Book sessions to start using your SuperCoins!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {displayTransactions
                        .filter(t => t.type === "spent")
                        .map((transaction) => (
                          <Card key={transaction.id} className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-white/60 backdrop-blur-sm border-0">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="p-3 rounded-full shadow-md bg-gradient-to-r from-orange-100 to-red-100 text-orange-600">
                                    {transaction.icon}
                                  </div>
                                  <div>
                                    <div className="font-medium">{transaction.description}</div>
                                    <div className="text-sm text-gray-600">{transaction.category}</div>
                                    <div className="text-xs text-gray-500">{transaction.date}</div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <ArrowDownRight className="h-4 w-4 text-orange-600" />
                                  <span className="font-bold text-orange-600">-{transaction.amount}</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
} 