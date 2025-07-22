"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MessageCircle, Calendar, Star, BookOpen, Zap, CircleDollarSign } from "lucide-react"
import { QuickConnectModal } from "./components/quick-connect-modal"
import { TopicModal } from "./components/topic-modal"
import { useTopics } from "./contexts/topic-context"

const categories = ["All", "Programming", "Mathematics", "Languages", "Business", "Arts", "Science"]

export default function HomePage() {
  const { browserTopics } = useTopics()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [showQuickConnect, setShowQuickConnect] = useState(false)
  const [showTopicModal, setShowTopicModal] = useState(false)
  const router = useRouter()

  const filteredTopics = browserTopics.filter((topic) => {
    const matchesSearch =
      topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "All" || topic.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleChatClick = (tutor: typeof browserTopics[0]['tutor']) => {
    if (!tutor) return
    
    const params = new URLSearchParams({
      tutorId: "1", // You might want to add tutor IDs to your mock data
      tutorName: tutor.name,
      topic: "General", // You might want to add topic to your tutor data
    })
    
    router.push(`/messages?${params.toString()}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
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
              <div className="text-2xl font-bold text-indigo-600">{browserTopics.length}+</div>
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
                    <Badge variant={topic.level === "Beginner" ? "default" : "secondary"}>
                      {topic.level}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{topic.title}</CardTitle>
                  <p className="text-gray-600 text-sm">{topic.description}</p>
                </CardHeader>
                <CardContent>
                  {topic.tutor && (
                    <div className="flex items-center gap-2 mb-4">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={topic.tutor.avatar} />
                        <AvatarFallback>
                          {topic.tutor.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{topic.tutor.name}</div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{topic.tutor.rating}</span>
                          <span>•</span>
                          <span>{topic.tutor.sessions} sessions</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1 mb-4">
                    {topic.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1 font-semibold">
                      {topic.price === "Free" ? (
                        <span className="text-green-600">{topic.price}</span>
                      ) : (
                        <>
                          <CircleDollarSign className="h-4 w-4 text-violet-600" />
                          <span className="text-violet-600">{topic.price.replace(" SuperCoins", "")}</span>
                        </>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {topic.tutor && topic.tutor.name !== "Sarah Chen" && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleChatClick(topic.tutor!)
                          }}
                        >
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Chat
                        </Button>
                      )}
                      {topic.tutor && topic.tutor.name !== "Sarah Chen" && (
                        <Button size="sm">
                          <Calendar className="h-4 w-4 mr-1" />
                          Book
                        </Button>
                      )}
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
