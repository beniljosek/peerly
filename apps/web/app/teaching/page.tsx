"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Star, Calendar, DollarSign, BookOpen, CircleDollarSign } from "lucide-react"
import { useTopics } from "../contexts/topic-context"

export default function TeachingPage() {
  const { userTopics } = useTopics()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <section className="px-4 py-12 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            My <span className="text-blue-600">Teaching</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Manage your teaching sessions and track your impact as an educator.
          </p>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">My Courses</h2>
              <p className="text-gray-600">Structured teaching paths with comprehensive content and long-term student engagement.</p>
            </div>
            
            {userTopics.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No topics yet</h3>
                <p className="text-gray-600 mb-4">Start teaching by creating your first topic!</p>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Create Your First Topic
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userTopics.map((topic) => (
                  <Card key={topic.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="secondary">{topic.category}</Badge>
                        <Badge variant={topic.level === "Beginner" ? "default" : "secondary"}>
                          {topic.level}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{topic.title}</CardTitle>
                      <div className="flex items-center text-sm text-gray-600 mt-2">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{topic.students || 0} students enrolled</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">4.9 (45 reviews)</span>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 font-bold text-violet-600">
                            <CircleDollarSign className="h-4 w-4" />
                            {topic.price === "Free" ? "0" : topic.price.replace(" SuperCoins", "")}
                          </div>
                          <div className="text-xs text-gray-600">per session</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>Next: Tomorrow 2:00 PM</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">View Details</Button>
                        <Button size="sm" variant="outline">Edit</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
} 