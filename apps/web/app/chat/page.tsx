"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, Phone, Video, MoreVertical, Calendar } from "lucide-react"
import { Header } from "../components/header"

const mockMessages = [
  {
    id: 1,
    sender: "Sarah Chen",
    content: "Hi! I saw you're interested in learning React hooks. I'd be happy to help you with that!",
    timestamp: "2:30 PM",
    isOwn: false,
  },
  {
    id: 2,
    sender: "You",
    content: "That's great! I'm particularly struggling with useEffect and its dependencies.",
    timestamp: "2:32 PM",
    isOwn: true,
  },
  {
    id: 3,
    sender: "Sarah Chen",
    content:
      "Perfect! useEffect can be tricky at first. Would you like to schedule a session where we can go through some practical examples?",
    timestamp: "2:33 PM",
    isOwn: false,
  },
  {
    id: 4,
    sender: "You",
    content: "Yes, that would be amazing! When are you available?",
    timestamp: "2:35 PM",
    isOwn: true,
  },
]

export default function ChatPage() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState(mockMessages)

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: "You",
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isOwn: true,
      }
      setMessages([...messages, newMessage])
      setMessage("")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCreateTopic={() => {}} />

      <div className="max-w-6xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-120px)]">
          {/* Chat List Sidebar */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">Messages</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {[
                    {
                      name: "Sarah Chen",
                      topic: "React Hooks",
                      lastMessage: "Perfect! useEffect can be...",
                      time: "2:33 PM",
                      unread: 2,
                      online: true,
                    },
                    {
                      name: "Michael Rodriguez",
                      topic: "Calculus",
                      lastMessage: "The derivative of x² is...",
                      time: "1:45 PM",
                      unread: 0,
                      online: false,
                    },
                    {
                      name: "Isabella Martinez",
                      topic: "Spanish",
                      lastMessage: "¡Hola! ¿Cómo estás?",
                      time: "12:30 PM",
                      unread: 1,
                      online: true,
                    },
                  ].map((chat, index) => (
                    <div
                      key={index}
                      className={`p-3 hover:bg-gray-50 cursor-pointer border-l-4 ${index === 0 ? "border-blue-500 bg-blue-50" : "border-transparent"}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={`/placeholder.svg?height=40&width=40&text=${chat.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}`}
                            />
                            <AvatarFallback>
                              {chat.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {chat.online && (
                            <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <div className="font-medium text-sm truncate">{chat.name}</div>
                            <div className="text-xs text-gray-500">{chat.time}</div>
                          </div>
                          <div className="text-xs text-blue-600 mb-1">{chat.topic}</div>
                          <div className="text-xs text-gray-500 truncate">{chat.lastMessage}</div>
                        </div>
                        {chat.unread > 0 && (
                          <Badge className="bg-blue-600 text-white text-xs h-5 w-5 rounded-full p-0 flex items-center justify-center">
                            {chat.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Window */}
          <div className="lg:col-span-3">
            <Card className="h-full flex flex-col">
              {/* Chat Header */}
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg?height=40&width=40&text=SC" />
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <div className="font-medium">Sarah Chen</div>
                      <div className="text-sm text-gray-500">Teaching React Hooks • Online</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline">
                      <Calendar className="h-4 w-4 mr-1" />
                      Schedule
                    </Button>
                    <Button size="sm" variant="outline">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          msg.isOwn ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <div className="text-sm">{msg.content}</div>
                        <div className={`text-xs mt-1 ${msg.isOwn ? "text-blue-100" : "text-gray-500"}`}>
                          {msg.timestamp}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>

              {/* Message Input */}
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={sendMessage} className="bg-blue-600 hover:bg-blue-700">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
