"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Bell, 
  X, 
  Calendar, 
  Star, 
  MessageCircle, 
  CheckCircle, 
  AlertCircle,
  Clock,
  User,
  BookOpen,
  Zap
} from "lucide-react"
import { useSuperCoins } from "@/contexts/supercoin-context"

interface Notification {
  id: string
  type: "booking" | "message" | "earning" | "reminder" | "system"
  title: string
  message: string
  timestamp: string
  isRead: boolean
  avatar?: string
  actionUrl?: string
}

interface NotificationDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NotificationDrawer({ open, onOpenChange }: NotificationDrawerProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { balance } = useSuperCoins()

  // Load notifications from localStorage
  useEffect(() => {
    const loadNotifications = () => {
      try {
        const savedNotifications = localStorage.getItem('notifications')
        if (savedNotifications) {
          const parsedNotifications = JSON.parse(savedNotifications)
          setNotifications(parsedNotifications)
        } else {
          // Initialize with some default notifications
          const defaultNotifications: Notification[] = [
            {
              id: "1",
              type: "booking",
              title: "Booking Confirmed",
              message: "Your session with Michael Rodriguez has been confirmed for tomorrow at 2:00 PM",
              timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
              isRead: false,
              avatar: "/placeholder.svg?height=40&width=40&text=MR"
            },
            {
              id: "2",
              type: "earning",
              title: "SuperCoins Earned",
              message: "You earned 15 SuperCoins for teaching React Hooks session",
              timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
              isRead: false,
              avatar: "/placeholder.svg?height=40&width=40&text=SC"
            },
            {
              id: "3",
              type: "reminder",
              title: "Session Reminder",
              message: "You have a Calculus session with Sarah Chen in 1 hour",
              timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
              isRead: true,
              avatar: "/placeholder.svg?height=40&width=40&text=SC"
            },
            {
              id: "4",
              type: "message",
              title: "New Message",
              message: "Isabella Martinez sent you a message about Spanish practice",
              timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), // 6 hours ago
              isRead: false,
              avatar: "/placeholder.svg?height=40&width=40&text=IM"
            }
          ]
          setNotifications(defaultNotifications)
          localStorage.setItem('notifications', JSON.stringify(defaultNotifications))
        }
      } catch (error) {
        console.error('Failed to load notifications:', error)
      }
    }

    loadNotifications()
  }, [])

  const unreadCount = notifications.filter(n => !n.isRead).length

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === notificationId ? { ...n, isRead: true } : n
      )
    )
    
    // Update localStorage
    const updatedNotifications = notifications.map(n => 
      n.id === notificationId ? { ...n, isRead: true } : n
    )
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications))
  }

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(n => ({ ...n, isRead: true }))
    setNotifications(updatedNotifications)
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "booking":
        return <Calendar className="h-4 w-4" />
      case "message":
        return <MessageCircle className="h-4 w-4" />
      case "earning":
        return <Star className="h-4 w-4" />
      case "reminder":
        return <Clock className="h-4 w-4" />
      case "system":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "booking":
        return "text-blue-600 bg-blue-100"
      case "message":
        return "text-green-600 bg-green-100"
      case "earning":
        return "text-yellow-600 bg-yellow-100"
      case "reminder":
        return "text-orange-600 bg-orange-100"
      case "system":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return date.toLocaleDateString()
  }

  return (
    <div className={`fixed inset-y-0 right-0 z-50 w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
      open ? 'translate-x-0' : 'translate-x-full'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-gray-600" />
          <h2 className="text-lg font-semibold">Notifications</h2>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="ml-2">
              {unreadCount}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={markAllAsRead}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Mark all read
            </Button>
          )}
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <Bell className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-600">
              You're all caught up! New notifications will appear here.
            </p>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                  notification.isRead 
                    ? 'bg-gray-50 border-gray-200' 
                    : 'bg-blue-50 border-blue-200'
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10 flex-shrink-0">
                    <AvatarImage src={notification.avatar} />
                    <AvatarFallback>
                      {notification.title.split(" ").map((n: string) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <div className={`p-1 rounded-full ${getNotificationColor(notification.type)}`}>
                            {getNotificationIcon(notification.type)}
                          </div>
                          <h4 className={`font-medium text-sm ${
                            notification.isRead ? 'text-gray-700' : 'text-gray-900'
                          }`}>
                            {notification.title}
                          </h4>
                        </div>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            {formatTimestamp(notification.timestamp)}
                          </span>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t bg-gray-50">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>{notifications.length} notifications</span>
          <span>{unreadCount} unread</span>
        </div>
      </div>
    </div>
  )
} 