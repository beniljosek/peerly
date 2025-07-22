"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Star, Calendar, Settings, LogOut } from "lucide-react"
import { useTopics } from "../contexts/topic-context"

export default function ProfilePage() {
  const { userTopics } = useTopics()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <section className="px-4 py-12 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            My <span className="text-blue-600">Profile</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Manage your account settings and view your teaching history.
          </p>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Info */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="relative inline-block">
                      <Avatar className="h-24 w-24 mx-auto mb-4">
                        <AvatarImage src="/placeholder.svg?height=96&width=96&text=SC" />
                        <AvatarFallback className="text-2xl">SC</AvatarFallback>
                      </Avatar>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 bg-white border-2 border-gray-200 hover:bg-gray-50"
                        title="Change profile picture"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </Button>
                    </div>
                    <h2 className="text-xl font-bold mb-2">Sarah Chen</h2>
                    <p className="text-gray-600 mb-4">React Developer & Educator</p>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">4.9 (127 reviews)</span>
                    </div>
                    <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                      <div>
                        <div className="font-semibold">234</div>
                        <div>Sessions</div>
                      </div>
                      <div>
                        <div className="font-semibold">45</div>
                        <div>Students</div>
                      </div>
                      <div>
                        <div className="font-semibold">2.5K</div>
                        <div>SuperCoins</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="h-4 w-4 mr-2" />
                      Account Settings
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="h-4 w-4 mr-2" />
                      View Schedule
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="topics" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="topics">Teaching Topics</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  <TabsTrigger value="schedule">Schedule</TabsTrigger>
                </TabsList>

                <TabsContent value="topics" className="space-y-4">
                  {userTopics.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-gray-400 mb-4">
                        <Users className="h-12 w-12 mx-auto" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No teaching topics yet</h3>
                      <p className="text-gray-600 mb-4">Start teaching by creating your first topic!</p>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Create Your First Topic
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                             {userTopics.map((topic: any) => (
                        <Card key={topic.id}>
                          <CardHeader>
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-lg">{topic.title}</CardTitle>
                              <Badge variant={topic.level === "Beginner" ? "default" : "secondary"}>
                                {topic.level}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-600 text-sm mb-4">{topic.description}</p>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-4">
                                <span className="font-semibold text-green-600">{topic.price}</span>
                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                  <Users className="h-4 w-4" />
                                  {topic.students || 0} students
                                </div>
                              </div>
                              <Button size="sm">View Details</Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="reviews" className="space-y-4">
                  {[
                    {
                      name: "Alex Johnson",
                      rating: 5,
                      comment:
                        "Sarah is an excellent teacher! She explained React hooks in a way that finally made sense to me.",
                      date: "2 days ago",
                    },
                    {
                      name: "Maria Garcia",
                      rating: 5,
                      comment: "Very patient and knowledgeable. The session was well-structured and informative.",
                      date: "1 week ago",
                    },
                    {
                      name: "David Kim",
                      rating: 4,
                      comment: "Good session overall. Would recommend for anyone learning React.",
                      date: "2 weeks ago",
                    },
                  ].map((review, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={`/placeholder.svg?height=40&width=40&text=${review.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}`}
                            />
                            <AvatarFallback>
                              {review.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{review.name}</span>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-600 text-sm mb-2">{review.comment}</p>
                            <span className="text-xs text-gray-500">{review.date}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="schedule" className="space-y-4">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4">Upcoming Sessions</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                          <div>
                            <div className="font-medium">React Hooks Session</div>
                            <div className="text-sm text-gray-600">with Alex Johnson</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">Tomorrow</div>
                            <div className="text-xs text-gray-600">2:00 PM - 3:00 PM</div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                          <div>
                            <div className="font-medium">JavaScript Fundamentals</div>
                            <div className="text-sm text-gray-600">with Maria Garcia</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">Friday</div>
                            <div className="text-xs text-gray-600">3:30 PM - 4:30 PM</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
