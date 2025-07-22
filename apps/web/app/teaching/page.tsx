"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Star, Calendar, DollarSign } from "lucide-react"

export default function TeachingPage() {
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary">Programming</Badge>
                  <Badge variant="default">Intermediate</Badge>
                </div>
                <CardTitle className="text-lg">JavaScript Fundamentals</CardTitle>
                <div className="flex items-center text-sm text-gray-600 mt-2">
                  <Users className="h-4 w-4 mr-1" />
                  <span>12 students enrolled</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">4.9 (45 reviews)</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">$25/hr</div>
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

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary">Mathematics</Badge>
                  <Badge variant="default">Beginner</Badge>
                </div>
                <CardTitle className="text-lg">Algebra Basics</CardTitle>
                <div className="flex items-center text-sm text-gray-600 mt-2">
                  <Users className="h-4 w-4 mr-1" />
                  <span>8 students enrolled</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">4.8 (32 reviews)</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">$20/hr</div>
                    <div className="text-xs text-gray-600">per session</div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Next: Friday 3:30 PM</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">View Details</Button>
                  <Button size="sm" variant="outline">Edit</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary">Languages</Badge>
                  <Badge variant="default">Intermediate</Badge>
                </div>
                <CardTitle className="text-lg">English Conversation</CardTitle>
                <div className="flex items-center text-sm text-gray-600 mt-2">
                  <Users className="h-4 w-4 mr-1" />
                  <span>15 students enrolled</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">5.0 (67 reviews)</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">$18/hr</div>
                    <div className="text-xs text-gray-600">per session</div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Next: Today 1:00 PM</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">View Details</Button>
                  <Button size="sm" variant="outline">Edit</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
} 