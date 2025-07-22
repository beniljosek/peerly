"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Bell, MessageCircle, User, Settings, LogOut, Plus, BookOpen, CircleDollarSign, Award } from "lucide-react"
import { NotificationDrawer } from "./notification-drawer"

interface HeaderProps {
  onCreateTopic: () => void
  supercoinBalance?: number
  verifiedTopics?: string[]
}

export function Header({ onCreateTopic, supercoinBalance = 250, verifiedTopics = [] }: HeaderProps) {
  const pathname = usePathname()
  const [showNotifications, setShowNotifications] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  const isActive = (path: string) => {
    return pathname === path
  }

  // Load unread notification count
  useEffect(() => {
    const loadUnreadCount = () => {
      try {
        const savedNotifications = localStorage.getItem('notifications')
        if (savedNotifications) {
          const notifications = JSON.parse(savedNotifications)
          const unread = notifications.filter((n: any) => !n.isRead).length
          setUnreadCount(unread)
        }
      } catch (error) {
        console.error('Failed to load notification count:', error)
      }
    }

    loadUnreadCount()

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'notifications') {
        loadUnreadCount()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  return (
    <>
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
                Peerly
              </Link>
            </div>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex space-x-8">
              <Link 
                href="/learning" 
                className={`font-medium transition-colors ${
                  isActive('/learning') 
                    ? 'text-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                My Learning
              </Link>
              <Link 
                href="/teaching" 
                className={`font-medium transition-colors ${
                  isActive('/teaching') 
                    ? 'text-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                My Teaching
              </Link>
              <Link 
                href="/bookings" 
                className={`font-medium transition-colors ${
                  isActive('/bookings') 
                    ? 'text-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Bookings
              </Link>
              <Link 
                href="/wallet" 
                className={`font-medium transition-colors ${
                  isActive('/wallet') 
                    ? 'text-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Wallet
              </Link>
            </nav>

            {/* Right side */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* SuperCoin Balance */}
              <div className="hidden sm:flex items-center space-x-1 bg-gradient-to-r from-indigo-50 to-blue-50 px-3 py-1 rounded-full shadow-md">
                <CircleDollarSign className="h-4 w-4 text-indigo-600" />
                <span className="text-sm font-medium text-indigo-600">{supercoinBalance}</span>
              </div>

              {/* Badge Indicator */}
              {verifiedTopics.length > 0 && (
                <div className="hidden sm:flex items-center space-x-1 bg-green-50 px-2 py-1 rounded-full">
                  <Award className="h-4 w-4 text-green-600" />
                  <span className="text-xs text-green-600">{verifiedTopics.length}</span>
                </div>
              )}

              {/* Quick Actions */}
              <div className="flex items-center space-x-2">
                <Button onClick={onCreateTopic} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Teach Topic</span>
                </Button>
              </div>

              {/* Notifications */}
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowNotifications(true)}
                  className="relative"
                >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                    >
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </Badge>
                  )}
                </Button>
              </div>

              {/* Messages */}
              <Link href="/messages">
                <Button variant="ghost" size="sm">
                  <MessageCircle className="h-5 w-5" />
                </Button>
              </Link>

              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32&text=JD" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/wallet" className="flex items-center">
                      <CircleDollarSign className="mr-2 h-4 w-4" />
                      <span>Wallet</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden border-t border-gray-200 py-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <Link 
                  href="/learning" 
                  className={`text-sm font-medium ${
                    isActive('/learning') ? 'text-blue-600' : 'text-gray-700'
                  }`}
                >
                  Learning
                </Link>
                <Link 
                  href="/teaching" 
                  className={`text-sm font-medium ${
                    isActive('/teaching') ? 'text-blue-600' : 'text-gray-700'
                  }`}
                >
                  Teaching
                </Link>
                <Link 
                  href="/bookings" 
                  className={`text-sm font-medium ${
                    isActive('/bookings') ? 'text-blue-600' : 'text-gray-700'
                  }`}
                >
                  Bookings
                </Link>
                <Link 
                  href="/wallet" 
                  className={`text-sm font-medium ${
                    isActive('/wallet') ? 'text-blue-600' : 'text-gray-700'
                  }`}
                >
                  Wallet
                </Link>
              </div>
              {/* Mobile SuperCoin Display */}
              <div className="flex items-center space-x-1 bg-gradient-to-r from-indigo-50 to-blue-50 px-2 py-1 rounded-full shadow-md">
                <CircleDollarSign className="h-3 w-3 text-indigo-600" />
                <span className="text-xs font-medium text-indigo-600">{supercoinBalance}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Notification Drawer */}
      <NotificationDrawer 
        open={showNotifications} 
        onOpenChange={setShowNotifications}
      />
    </>
  )
}
