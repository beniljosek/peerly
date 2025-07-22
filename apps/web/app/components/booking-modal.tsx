"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, CircleDollarSign, User, Star, AlertCircle, CheckCircle } from "lucide-react"
import { toast } from "sonner"
import { useSuperCoins } from "@/contexts/supercoin-context"

interface BookingModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  topic: {
    id: number
    title: string
    description: string
    price: string
    tutor: {
      name: string
      avatar: string
      rating: number
      sessions: number
    }
  }
  userSupercoinBalance: number
  onBookingSuccess?: (bookingDetails: any) => void
}

export function BookingModal({ 
  open, 
  onOpenChange, 
  topic, 
  userSupercoinBalance,
  onBookingSuccess 
}: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [bookingStep, setBookingStep] = useState<"details" | "confirmation" | "success">("details")
  const { deductSuperCoins } = useSuperCoins()

  // Extract supercoin cost from price string
  const supercoinCost = topic.price === "Free" ? 0 : parseInt(topic.price.replace(" SuperCoins", ""))
  const hasEnoughBalance = userSupercoinBalance >= supercoinCost

  // Available time slots (you can make this dynamic based on tutor availability)
  const availableTimeSlots = [
    "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"
  ]

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value)
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(e.target.value)
  }

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Please select both date and time")
      return
    }

    if (!hasEnoughBalance) {
      toast.error("Insufficient SuperCoin balance")
      return
    }

    setIsProcessing(true)

    try {
      // Only deduct supercoins if the session costs something
      if (supercoinCost > 0) {
        const success = await deductSuperCoins(
          supercoinCost, 
          `Booking: ${topic.title} with ${topic.tutor.name}`
        )
        
        if (!success) {
          throw new Error('Failed to deduct SuperCoins')
        }
      }

      // Generate a mock booking ID
      const bookingId = "BK" + Date.now()

      // Create notification for the booking
      createBookingNotification(topic, selectedDate, selectedTime, supercoinCost)

      setBookingStep("success")
      toast.success("Booking confirmed! SuperCoins deducted successfully.")
      
      if (onBookingSuccess) {
        onBookingSuccess({
          bookingId,
          topicId: topic.id,
          topicTitle: topic.title, // Add topic title
          tutorName: topic.tutor.name,
          date: selectedDate,
          time: selectedTime,
          supercoinCost,
          newBalance: userSupercoinBalance - supercoinCost
        })
      }
    } catch (error) {
      toast.error("Failed to book session. Please try again.")
      console.error("Booking error:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const createBookingNotification = (topic: any, date: string, time: string, cost: number) => {
    try {
      const savedNotifications = localStorage.getItem('notifications')
      const notifications = savedNotifications ? JSON.parse(savedNotifications) : []
      
      const newNotification = {
        id: Date.now().toString(),
        type: "booking",
        title: "Booking Confirmed",
        message: `Your session "${topic.title}" with ${topic.tutor.name} has been confirmed for ${date} at ${time}. ${cost > 0 ? `${cost} SuperCoins deducted.` : 'Free session!'}`,
        timestamp: new Date().toISOString(),
        isRead: false,
        avatar: topic.tutor.avatar
      }
      
      notifications.unshift(newNotification)
      localStorage.setItem('notifications', JSON.stringify(notifications))
      
      // Trigger storage event for other components to update
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'notifications',
        newValue: JSON.stringify(notifications)
      }))
    } catch (error) {
      console.error('Failed to create notification:', error)
    }
  }

  const handleConfirm = () => {
    setBookingStep("confirmation")
  }

  const handleBack = () => {
    setBookingStep("details")
  }

  const handleClose = () => {
    setBookingStep("details")
    setSelectedDate("")
    setSelectedTime("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            Book Session
          </DialogTitle>
        </DialogHeader>

        {bookingStep === "details" && (
          <div className="space-y-4">
            {/* Topic and Tutor Info */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">{topic.title}</h3>
              <div className="flex items-center gap-3 mb-3">
                <img 
                  src={topic.tutor.avatar} 
                  alt={topic.tutor.name}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <div className="font-medium">{topic.tutor.name}</div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{topic.tutor.rating}</span>
                    <span>•</span>
                    <span>{topic.tutor.sessions} sessions</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CircleDollarSign className="h-4 w-4 text-violet-600" />
                <span className="font-medium text-violet-600">
                  {topic.price === "Free" ? "Free" : `${supercoinCost} SuperCoins`}
                </span>
              </div>
            </div>

            {/* Balance Check */}
            <div className={`p-3 rounded-lg border ${
              hasEnoughBalance 
                ? "bg-green-50 border-green-200" 
                : "bg-red-50 border-red-200"
            }`}>
              <div className="flex items-center gap-2">
                {hasEnoughBalance ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-600" />
                )}
                <span className={`text-sm font-medium ${
                  hasEnoughBalance ? "text-green-800" : "text-red-800"
                }`}>
                  Your Balance: {userSupercoinBalance} SuperCoins
                </span>
              </div>
              {!hasEnoughBalance && (
                <p className="text-sm text-red-600 mt-1">
                  You need {supercoinCost - userSupercoinBalance} more SuperCoins
                </p>
              )}
            </div>

            {/* Date Selection */}
            <div className="space-y-2">
              <Label htmlFor="date">Select Date</Label>
              <Input
                id="date"
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full"
              />
            </div>

            {/* Time Selection */}
            <div className="space-y-2">
              <Label htmlFor="time">Select Time</Label>
              <select
                id="time"
                value={selectedTime}
                onChange={handleTimeChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose a time...</option>
                {availableTimeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                variant="outline" 
                onClick={handleClose} 
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleConfirm}
                disabled={!selectedDate || !selectedTime || !hasEnoughBalance}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {bookingStep === "confirmation" && (
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-lg mb-3">Confirm Your Booking</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Topic:</span>
                  <span className="font-medium">{topic.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tutor:</span>
                  <span className="font-medium">{topic.tutor.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{selectedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-medium">{selectedTime}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-gray-600">Cost:</span>
                  <span className="font-bold text-violet-600">
                    {supercoinCost} SuperCoins
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">New Balance:</span>
                  <span className="font-bold text-green-600">
                    {userSupercoinBalance - supercoinCost} SuperCoins
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={handleBack} 
                className="flex-1"
              >
                Back
              </Button>
              <Button 
                onClick={handleBooking}
                disabled={isProcessing}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                {isProcessing ? "Processing..." : "Confirm Booking"}
              </Button>
            </div>
          </div>
        )}

        {bookingStep === "success" && (
          <div className="space-y-4 text-center">
            <div className="p-4 bg-green-50 rounded-lg">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">Booking Confirmed!</h3>
              <p className="text-gray-600 mb-3">
                Your session with {topic.tutor.name} has been scheduled successfully.
              </p>
              
              <div className="bg-white p-3 rounded border">
                <div className="text-sm text-gray-600 mb-2">Session Details:</div>
                <div className="space-y-1 text-sm">
                  <div><strong>Date:</strong> {selectedDate}</div>
                  <div><strong>Time:</strong> {selectedTime}</div>
                  <div><strong>Cost:</strong> {supercoinCost} SuperCoins</div>
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-500">
              You'll receive a confirmation email and calendar invite shortly.
            </div>

            <Button 
              onClick={handleClose}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
} 