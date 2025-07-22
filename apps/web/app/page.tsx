"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MessageCircle, Calendar, Star, BookOpen, Zap } from "lucide-react"
import { Header } from "./components/header"
import { QuickConnectModal } from "./components/quick-connect-modal"
import { TopicModal } from "./components/topic-modal"

// Mock data for topics
const mockTopics = [
  {
    id: 1,
    title: "Advanced React Hooks & State Management",
    description: "Master useEffect, useContext, useReducer and custom hooks. Perfect for intermediate developers.",
    category: "Programming",
    level: "Intermediate",
    tutor: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40&text=SC",
      rating: 4.9,
      sessions: 127,
    },
    price: "Free",
    tags: ["React", "JavaScript", "Hooks"],
  },
  {
    id: 2,
    title: "Calculus I: Limits and Derivatives",
    description: "Comprehensive coverage of limits, continuity, and differentiation with practical examples.",
    category: "Mathematics",
    level: "Beginner",
    tutor: {
      name: "Michael Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40&text=MR",
      rating: 4.8,
      sessions: 89,
    },
    price: "$15/hr",
    tags: ["Calculus", "Math", "Derivatives"],
  },
  {
    id: 3,
    title: "Spanish Conversation Practice",
    description: "Improve your Spanish speaking skills through interactive conversations and cultural insights.",
    category: "Languages",
    level: "Intermediate",
    tutor: {
      name: "Isabella Martinez",
      avatar: "/placeholder.svg?height=40&width=40&text=IM",
      rating: 5.0,
      sessions: 203,
    },
    price: "$12/hr",
    tags: ["Spanish", "Conversation", "Culture"],
  },
  {
    id: 4,
    title: "Digital Marketing Fundamentals",
    description: "Learn SEO, social media marketing, and content strategy from real-world campaigns.",
    category: "Business",
    level: "Beginner",
    tutor: {
      name: "Alex Thompson",
      avatar: "/placeholder.svg?height=40&width=40&text=AT",
      rating: 4.7,
      sessions: 156,
    },
    price: "$20/hr",
    tags: ["Marketing", "SEO", "Social Media"],
  },
  {
    id: 5,
    title: "Data Structures & Algorithms",
    description: "Master arrays, linked lists, trees, and sorting algorithms with coding practice.",
    category: "Programming",
    level: "Advanced",
    tutor: {
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40&text=DK",
      rating: 4.9,
      sessions: 234,
    },
    price: "$25/hr",
    tags: ["Algorithms", "Data Structures", "Coding"],
  },
  {
    id: 6,
    title: "Creative Writing Workshop",
    description: "Develop your storytelling skills, character development, and narrative techniques.",
    category: "Arts",
    level: "Intermediate",
    tutor: {
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40&text=EW",
      rating: 4.8,
      sessions: 78,
    },
    price: "$18/hr",
    tags: ["Writing", "Creative", "Storytelling"],
  },
]

const categories = ["All", "Programming", "Mathematics", "Languages", "Business", "Arts", "Science"]

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [showQuickConnect, setShowQuickConnect] = useState(false)
  const [showTopicModal, setShowTopicModal] = useState(false)

  const filteredTopics = mockTopics.filter((topic) => {
    const matchesSearch =
      topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "All" || topic.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header onCreateTopic={() => setShowTopicModal(true)} />

      {/* Hero Section */}
      <section className="px-4 py-12 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Learn from <span className="text-blue-600">Peers</span>,
            <br />
            Teach your <span className="text-indigo-600">Passion</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with fellow students to share knowledge, learn new skills, and grow together in a collaborative
            learning environment.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowQuickConnect(true)}>
              <Zap className="mr-2 h-5 w-5" />
              Quick Connect
            </Button>
            <Button size="lg" variant="outline" onClick={() => setShowTopicModal(true)}>
              <BookOpen className="mr-2 h-5 w-5" />
              Teach a Topic
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">2.5K+</div>
              <div className="text-sm text-gray-600">Active Learners</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">500+</div>
              <div className="text-sm text-gray-600">Topics Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">10K+</div>
              <div className="text-sm text-gray-600">Sessions Completed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search topics, skills, or tutors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Topics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTopics.map((topic) => (
              <Card key={topic.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary">{topic.category}</Badge>
                    <Badge
                      variant={
                        topic.level === "Beginner"
                          ? "default"
                          : topic.level === "Intermediate"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {topic.level}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{topic.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{topic.description}</p>

                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={topic.tutor.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {topic.tutor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{topic.tutor.name}</div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {topic.tutor.rating} • {topic.tutor.sessions} sessions
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {topic.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-green-600">{topic.price}</span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Chat
                      </Button>
                      <Button size="sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        Book
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Connect Modal */}
      <QuickConnectModal open={showQuickConnect} onOpenChange={setShowQuickConnect} />

      {/* Topic Creation Modal */}
      <TopicModal open={showTopicModal} onOpenChange={setShowTopicModal} />
    </div>
  )
}
