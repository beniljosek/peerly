"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Calendar, 
  Clock, 
  User, 
  Star, 
  Video, 
  X, 
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Play
} from "lucide-react"
import { useBookings } from "@/contexts/bookings-context"

export default function BookingsPage() {
  const { bookings, updateBookingStatus, getBookingsByStatus } = useBookings()
  const [activeTab, setActiveTab] = useState("upcoming")

  const upcomingBookings = getBookingsByStatus("upcoming")
  const completedBookings = getBookingsByStatus("completed")
  const cancelledBookings = getBookingsByStatus("cancelled")

  const handleCancelBooking = (bookingId: string) => {
    updateBookingStatus(bookingId, "cancelled")
  }

  const handleCompleteBooking = (bookingId: string) => {
    updateBookingStatus(bookingId, "completed")
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "cancelled":
        return <X className="h-4 w-4 text-red-600" />
      default:
        return <Calendar className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge variant="default" className="bg-blue-100 text-blue-800">Upcoming</Badge>
      case "completed":
        return <Badge variant="default" className="bg-green-100 text-green-800">Completed</Badge>
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (timeString: string) => {
    return timeString
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <section className="px-4 py-12 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">My Bookings</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Manage your learning sessions and track your progress.
          </p>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="upcoming">
                Upcoming ({upcomingBookings.length})
              </TabsTrigger>
              <TabsTrigger value="completed">
                Completed ({completedBookings.length})
              </TabsTrigger>
              <TabsTrigger value="cancelled">
                Cancelled ({cancelledBookings.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4">
              {upcomingBookings.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No upcoming bookings</h3>
                  <p className="text-gray-600">
                    You don't have any upcoming sessions. Book a session to get started!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingBookings.map((booking) => (
                    <Card key={booking.id} className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          {getStatusBadge(booking.status)}
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            {getStatusIcon(booking.status)}
                            <span>Upcoming</span>
                          </div>
                        </div>
                        <CardTitle className="text-lg line-clamp-2">{booking.topicTitle}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={booking.tutorAvatar} />
                              <AvatarFallback>
                                {booking.tutorName.split(" ").map((n: string) => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{booking.tutorName}</div>
                              <div className="text-sm text-gray-600">Tutor</div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="h-4 w-4 text-gray-500" />
                              <span>{formatDate(booking.date)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <span>{formatTime(booking.time)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <User className="h-4 w-4 text-gray-500" />
                              <span>Booking ID: {booking.id}</span>
                            </div>
                          </div>

                          <div className="flex gap-2 pt-2">
                            <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                              <Video className="h-4 w-4 mr-1" />
                              Join Meeting
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleCompleteBooking(booking.id)}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleCancelBooking(booking.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              {completedBookings.length === 0 ? (
                <div className="text-center py-12">
                  <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No completed sessions</h3>
                  <p className="text-gray-600">
                    Complete your first session to see it here!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {completedBookings.map((booking) => (
                    <Card key={booking.id} className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          {getStatusBadge(booking.status)}
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            {getStatusIcon(booking.status)}
                            <span>Completed</span>
                          </div>
                        </div>
                        <CardTitle className="text-lg line-clamp-2">{booking.topicTitle}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={booking.tutorAvatar} />
                              <AvatarFallback>
                                {booking.tutorName.split(" ").map((n: string) => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{booking.tutorName}</div>
                              <div className="text-sm text-gray-600">Tutor</div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="h-4 w-4 text-gray-500" />
                              <span>{formatDate(booking.date)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <span>{formatTime(booking.time)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <User className="h-4 w-4 text-gray-500" />
                              <span>Booking ID: {booking.id}</span>
                            </div>
                          </div>

                          <div className="flex gap-2 pt-2">
                            <Button size="sm" variant="outline" className="flex-1">
                              <Star className="h-4 w-4 mr-1" />
                              Rate Session
                            </Button>
                            <Button size="sm" variant="outline">
                              <RefreshCw className="h-4 w-4 mr-1" />
                              Book Again
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="cancelled" className="space-y-4">
              {cancelledBookings.length === 0 ? (
                <div className="text-center py-12">
                  <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No cancelled sessions</h3>
                  <p className="text-gray-600">
                    Great! You haven't cancelled any sessions yet.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cancelledBookings.map((booking) => (
                    <Card key={booking.id} className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          {getStatusBadge(booking.status)}
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            {getStatusIcon(booking.status)}
                            <span>Cancelled</span>
                          </div>
                        </div>
                        <CardTitle className="text-lg line-clamp-2">{booking.topicTitle}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={booking.tutorAvatar} />
                              <AvatarFallback>
                                {booking.tutorName.split(" ").map((n: string) => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{booking.tutorName}</div>
                              <div className="text-sm text-gray-600">Tutor</div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="h-4 w-4 text-gray-500" />
                              <span>{formatDate(booking.date)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <span>{formatTime(booking.time)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <User className="h-4 w-4 text-gray-500" />
                              <span>Booking ID: {booking.id}</span>
                            </div>
                          </div>

                          <div className="flex gap-2 pt-2">
                            <Button size="sm" variant="outline" className="flex-1">
                              <RefreshCw className="h-4 w-4 mr-1" />
                              Reschedule
                            </Button>
                          </div>
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