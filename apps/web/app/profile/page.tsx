"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, MessageCircle, Calendar, Users } from "lucide-react"
import { Header } from "../components/header"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCreateTopic={() => {}} />

      <div className="max-w-6xl mx-auto p-4">
        {/* Profile Header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center md:items-start">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src="/placeholder.svg?height=96&width=96&text=SC" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">4.9</span>
                  <span className="text-gray-500">(127 reviews)</span>
                </div>
                <Badge className="bg-green-100 text-green-800">Active Tutor</Badge>
              </div>

              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-2">Sarah Chen</h1>
                <p className="text-gray-600 mb-4">
                  Full-stack developer with 5+ years of experience. Passionate about teaching React, Node.js, and modern
                  web development practices.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">127</div>
                    <div className="text-sm text-gray-500">Sessions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">89</div>
                    <div className="text-sm text-gray-500">Students</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">5</div>
                    <div className="text-sm text-gray-500">Topics</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">2.5</div>
                    <div className="text-sm text-gray-500">Years</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                  <Button variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Session
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Tabs */}
        <Tabs defaultValue="topics" className="space-y-4">
          <TabsList>
            <TabsTrigger value="topics">Teaching Topics</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="topics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: "Advanced React Hooks & State Management",
                  description: "Master useEffect, useContext, useReducer and custom hooks.",
                  level: "Intermediate",
                  price: "Free",
                  students: 45,
                },
                {
                  title: "Node.js API Development",
                  description: "Build RESTful APIs with Express.js and MongoDB.",
                  level: "Intermediate",
                  price: "20 SuperCoins",
                  students: 32,
                },
                {
                  title: "JavaScript Fundamentals",
                  description: "Learn the core concepts of JavaScript programming.",
                  level: "Beginner",
                  price: "15 SuperCoins",
                  students: 67,
                },
              ].map((topic, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{topic.title}</CardTitle>
                      <Badge variant={topic.level === "Beginner" ? "default" : "secondary"}>{topic.level}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">{topic.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <span className="font-semibold text-green-600">{topic.price}</span>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Users className="h-4 w-4" />
                          {topic.students} students
                        </div>
                      </div>
                      <Button size="sm">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
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
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>Available Time Slots</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">Calendar integration would go here</div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
