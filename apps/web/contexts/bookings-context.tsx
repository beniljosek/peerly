"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { toast } from "sonner"

interface Booking {
  id: string
  topicId: number
  topicTitle: string
  tutorName: string
  tutorAvatar: string
  date: string
  time: string
  supercoinCost: number
  status: "upcoming" | "completed" | "cancelled"
  createdAt: string
}

interface BookingsContextType {
  bookings: Booking[]
  addBooking: (booking: Omit<Booking, "id" | "createdAt" | "status">) => void
  updateBookingStatus: (bookingId: string, status: Booking["status"]) => void
  isTopicBooked: (topicId: number) => boolean
  getBookingsByStatus: (status: Booking["status"]) => Booking[]
  isLoading: boolean
}

const BookingsContext = createContext<BookingsContextType | undefined>(undefined)

interface BookingsProviderProps {
  children: ReactNode
}

export function BookingsProvider({ children }: BookingsProviderProps) {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Load bookings from localStorage on mount
  useEffect(() => {
    const loadBookings = () => {
      try {
        const savedBookings = localStorage.getItem('user-bookings')
        if (savedBookings) {
          const parsedBookings = JSON.parse(savedBookings)
          setBookings(parsedBookings)
        }
      } catch (error) {
        console.error('Failed to load bookings:', error)
      }
    }

    loadBookings()
  }, [])

  // Save bookings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('user-bookings', JSON.stringify(bookings))
  }, [bookings])

  const addBooking = (bookingData: Omit<Booking, "id" | "createdAt" | "status">) => {
    const newBooking: Booking = {
      ...bookingData,
      id: `BK${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: "upcoming"
    }

    setBookings(prev => [newBooking, ...prev])
    toast.success(`Booking confirmed for ${bookingData.topicTitle}`)
  }

  const updateBookingStatus = (bookingId: string, status: Booking["status"]) => {
    setBookings(prev => 
      prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status } 
          : booking
      )
    )
  }

  const isTopicBooked = (topicId: number): boolean => {
    return bookings.some(booking => 
      booking.topicId === topicId && 
      (booking.status === "upcoming" || booking.status === "completed")
    )
  }

  const getBookingsByStatus = (status: Booking["status"]): Booking[] => {
    return bookings.filter(booking => booking.status === status)
  }

  const value: BookingsContextType = {
    bookings,
    addBooking,
    updateBookingStatus,
    isTopicBooked,
    getBookingsByStatus,
    isLoading
  }

  return (
    <BookingsContext.Provider value={value}>
      {children}
    </BookingsContext.Provider>
  )
}

export function useBookings() {
  const context = useContext(BookingsContext)
  if (context === undefined) {
    throw new Error('useBookings must be used within a BookingsProvider')
  }
  return context
} 