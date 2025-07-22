"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Calendar, 
  Clock, 
  Star, 
  Video, 
  MessageCircle, 
  CheckCircle, 
  XCircle,
  Clock as ClockIcon,
  User
} from "lucide-react"
import { useSuperCoins } from "@/contexts/supercoin-context"

// Mock booking data
const mockBookings = [
  {
    id: "BK001",
    topicTitle: "Calculus I: Limits and Derivatives",
    tutorName: "Michael Rodriguez",
    tutorAvatar: "/placeholder.svg?height=40&width=40&text=MR",
    date: "2024-01-20",
    time: "14:00",
    duration: 30,
    status: "upcoming",
    supercoinCost: 15,
    meetingLink: null,
  },
  {
    id: "BK002",
    topicTitle: "Advanced React Hooks & State Management",
    tutorName: "Sarah Chen",
    tutorAvatar: "/placeholder.svg?height=40&width=40&text=SC",
    date: "2024-01-18",
    time: "10:00",
    duration: 45,
    status: "completed",
    supercoinCost: 0,
    meetingLink: "https://meet.google.com/abc-defg-hij",
  },
  {
    id: "BK003",
    topicTitle: "Spanish Conversation Practice",
    tutorName: "Isabella Martinez",
    tutorAvatar: "/placeholder.svg?height=40&width=40&text=IM",
    date: "2024-01-15",
    time: "16:00",
    duration: 30,
    status: "cancelled",
    supercoinCost: 12,
    meetingLink: null,
  },
]

export default function BookingsPage() {
  const [bookings, setBookings] = useState(mockBookings)
  const { balance } = useSuperCoins()

  const upcomingBookings = bookings.filter(b => b.status === "upcoming")
  const completedBookings = bookings.filter(b => b.status === "completed")
  const cancelledBookings = bookings.filter(b => b.status === "cancelled")

  const handleJoinMeeting = (booking: any) => {
    if (booking.meetingLink) {
      window.open(booking.meetingLink, '_blank')
    }
  }

  const handleCancelBooking = (bookingId: string) => {
    // Here you would make an API call to cancel the booking
    setBookings(prev => 
      prev.map(b => 
        b.id === bookingId 
          ? { ...b, status: "cancelled" as const }
          : b
      )
    )
  }

  const handleReschedule = (bookingId: string) => {
    // Here you would open a reschedule modal
    console.log("Reschedule booking:", bookingId)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge className="bg-blue-100 text-blue-800">Upcoming</Badge>
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "upcoming":
        return <ClockIcon className="h-4 w-4 text-blue-600" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <ClockIcon className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <section className="px-4 py-12 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            My <span className="text-blue-600">Bookings</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Manage your scheduled sessions and view your learning history.
          </p>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="upcoming" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="upcoming" className="flex items-center gap-2">
                <ClockIcon className="h-4 w-4" />
                Upcoming ({upcomingBookings.length})
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Completed ({completedBookings.length})
              </TabsTrigger>
              <TabsTrigger value="cancelled" className="flex items-center gap-2">
                <XCircle className="h-4 w-4" />
                Cancelled ({cancelledBookings.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4">
              {upcomingBookings.length === 0 ? (
                <Card className="text-center py-12">
                  <CardContent>
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No upcoming bookings</h3>
                    <p className="text-gray-600 mb-4">
                      You don't have any scheduled sessions yet.
                    </p>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Browse Topics
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6">
                  {upcomingBookings.map((booking) => (
                    <Card key={booking.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start gap-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={booking.tutorAvatar} />
                              <AvatarFallback>
                                {booking.tutorName.split(" ").map((n: string) => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold mb-1">{booking.topicTitle}</h3>
                              <p className="text-gray-600 mb-2">with {booking.tutorName}</p>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  <span>{booking.date}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  <span>{booking.time} ({booking.duration} min)</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <User className="h-4 w-4" />
                                  <span>{booking.supercoinCost} SuperCoins</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(booking.status)}
                          </div>
                        </div>

                        <div className="flex gap-3">
                          {booking.meetingLink ? (
                            <Button 
                              onClick={() => handleJoinMeeting(booking)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Video className="h-4 w-4 mr-2" />
                              Join Meeting
                            </Button>
                          ) : (
                            <Button variant="outline" disabled>
                              <Clock className="h-4 w-4 mr-2" />
                              Meeting link will be available soon
                            </Button>
                          )}
                          <Button variant="outline">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Message Tutor
                          </Button>
                          <Button 
                            variant="outline"
                            onClick={() => handleReschedule(booking.id)}
                          >
                            Reschedule
                          </Button>
                          <Button 
                            variant="outline"
                            onClick={() => handleCancelBooking(booking.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            Cancel
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              {completedBookings.length === 0 ? (
                <Card className="text-center py-12">
                  <CardContent>
                    <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No completed sessions</h3>
                    <p className="text-gray-600">
                      Your completed sessions will appear here.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6">
                  {completedBookings.map((booking) => (
                    <Card key={booking.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start gap-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={booking.tutorAvatar} />
                              <AvatarFallback>
                                {booking.tutorName.split(" ").map((n: string) => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold mb-1">{booking.topicTitle}</h3>
                              <p className="text-gray-600 mb-2">with {booking.tutorName}</p>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  <span>{booking.date}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  <span>{booking.time} ({booking.duration} min)</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <User className="h-4 w-4" />
                                  <span>{booking.supercoinCost} SuperCoins</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(booking.status)}
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <Button variant="outline">
                            <Star className="h-4 w-4 mr-2" />
                            Rate Session
                          </Button>
                          <Button variant="outline">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Message Tutor
                          </Button>
                          <Button variant="outline">
                            Book Again
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="cancelled" className="space-y-4">
              {cancelledBookings.length === 0 ? (
                <Card className="text-center py-12">
                  <CardContent>
                    <XCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No cancelled sessions</h3>
                    <p className="text-gray-600">
                      Your cancelled sessions will appear here.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6">
                  {cancelledBookings.map((booking) => (
                    <Card key={booking.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start gap-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={booking.tutorAvatar} />
                              <AvatarFallback>
                                {booking.tutorName.split(" ").map((n: string) => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold mb-1">{booking.topicTitle}</h3>
                              <p className="text-gray-600 mb-2">with {booking.tutorName}</p>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  <span>{booking.date}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  <span>{booking.time} ({booking.duration} min)</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <User className="h-4 w-4" />
                                  <span>{booking.supercoinCost} SuperCoins</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(booking.status)}
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <Button variant="outline">
                            Book Again
                          </Button>
                          <Button variant="outline">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Message Tutor
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
} 