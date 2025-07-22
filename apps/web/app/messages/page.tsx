"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Send, MoreVertical, ArrowDown } from "lucide-react"
import { GoogleMeetButton } from "../components/google-meet-button"
import { MeetingMessage } from "../components/meeting-message"

// Mock conversations data
const mockConversations = [
  {
    id: 1,
    name: "Sarah Chen",
    avatar: "/placeholder.svg?height=40&width=40&text=SC",
    lastMessage: "Thanks for the session today!",
    lastMessageTime: "2m ago",
    unread: true,
    topic: "React Development",
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40&text=MR",
    lastMessage: "Can we schedule for tomorrow?",
    lastMessageTime: "1h ago",
    unread: false,
    topic: "Calculus",
  },
  {
    id: 3,
    name: "Isabella Martinez",
    avatar: "/placeholder.svg?height=40&width=40&text=IM",
    lastMessage: "Great progress on Spanish!",
    lastMessageTime: "3h ago",
    unread: false,
    topic: "Spanish",
  },
]

// Message types
type TextMessage = {
  id: number
  type: 'text'
  content: string
  isFromCurrentUser: boolean
}

type MeetingMessageType = {
  id: number
  type: 'meeting'
  meetingLink: string
  meetingTitle: string
  isFromCurrentUser: boolean
}

type Message = TextMessage | MeetingMessageType

// Mock messages data
const mockMessages: Record<number, Message[]> = {
  1: [
    { id: 0, type: 'text', content: 'Hi Sarah! Can you clear a quick doubt?', isFromCurrentUser: true },
    { id: 2, type: 'text', content: 'Sure! What would you like to know about useEffect?', isFromCurrentUser: false },
    { id: 3, type: 'text', content: 'I\'m confused about the dependency array. When should I include values?', isFromCurrentUser: true },
    { id: 4, type: 'text', content: 'Great question! You should include any values that your effect depends on. If you reference a variable inside useEffect, it should be in the dependency array.', isFromCurrentUser: false },
    { id: 5, type: 'text', content: 'That makes sense! What about cleanup functions?', isFromCurrentUser: true },
    { id: 6, type: 'text', content: 'Cleanup functions are returned from useEffect and run before the component unmounts or before the effect runs again. They\'re great for canceling subscriptions or cleaning up timers.', isFromCurrentUser: false },
    { id: 7, type: 'text', content: 'Can you show me an example?', isFromCurrentUser: true },
    { id: 8, type: 'text', content: 'Absolutely! Here\'s a simple example with a timer:', isFromCurrentUser: false },
    { id: 9, type: 'text', content: 'useEffect(() => {\n  const timer = setInterval(() => {\n    console.log("Tick");\n  }, 1000);\n  \n  return () => clearInterval(timer);\n}, []);', isFromCurrentUser: false },
    { id: 10, type: 'text', content: 'Perfect! That\'s much clearer now. Thanks Sarah!', isFromCurrentUser: true },
    { id: 11, type: 'text', content: 'You\'re welcome! One more thing - remember that the cleanup function runs both when the component unmounts AND before the effect runs again if the dependencies change.', isFromCurrentUser: false },
    { id: 12, type: 'text', content: 'Oh, that\'s important to remember! So it\'s like a "clean slate" before each effect run?', isFromCurrentUser: true },
    { id: 13, type: 'text', content: 'Exactly! It ensures you don\'t have memory leaks or stale subscriptions. This is especially important for effects that set up subscriptions, timers, or event listeners.', isFromCurrentUser: false },
    { id: 14, type: 'text', content: 'What about async operations in useEffect?', isFromCurrentUser: true },
    { id: 15, type: 'text', content: 'Great question! You can\'t make useEffect itself async, but you can call async functions inside it. Here\'s the pattern:', isFromCurrentUser: false },
    { id: 16, type: 'text', content: 'useEffect(() => {\n  const fetchData = async () => {\n    const response = await fetch("/api/data");\n    const data = await response.json();\n    setData(data);\n  };\n  \n  fetchData();\n}, []);', isFromCurrentUser: false },
    { id: 17, type: 'text', content: 'That makes perfect sense! Thanks for all the help today!', isFromCurrentUser: true },
    { id: 18, type: 'text', content: 'Anytime! Feel free to reach out if you have more questions about React hooks or anything else!', isFromCurrentUser: false },
  ],
  2: [
    { id: 0, type: 'text', content: 'Hi Michael! Can you clear a quick doubt?', isFromCurrentUser: true },
    { id: 2, type: 'text', content: 'Absolutely! What topic would you like to cover?', isFromCurrentUser: false },
  ],
  3: [
    { id: 0, type: 'text', content: 'Hi Isabella! Can you clear a quick doubt?', isFromCurrentUser: true },
    { id: 2, type: 'text', content: '¡Hola! Estoy muy bien, gracias. ¿Y tú?', isFromCurrentUser: false },
  ],
}

export default function MessagesPage() {
  const searchParams = useSearchParams()
  const [selectedConversation, setSelectedConversation] = useState<typeof mockConversations[0] | null>(null)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [showScrollButton, setShowScrollButton] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Check if we have URL parameters from Quick Connect
  useEffect(() => {
    const tutorId = searchParams.get('tutorId')
    const tutorName = searchParams.get('tutorName')
    const topic = searchParams.get('topic')

    if (tutorId && tutorName && topic) {
      // Find or create conversation for this tutor
      const existingConversation = mockConversations.find(conv => conv.name === tutorName)
      if (existingConversation) {
        setSelectedConversation(existingConversation)
        setMessages(mockMessages[existingConversation.id] || [])
      } else {
        // Create a new conversation for this tutor
        const newConversation = {
          id: parseInt(tutorId),
          name: tutorName,
          avatar: `/placeholder.svg?height=40&width=40&text=${tutorName.split(' ').map(n => n[0]).join('')}`,
          lastMessage: "New conversation started",
          lastMessageTime: "now",
          unread: false,
          topic: topic,
        }
        setSelectedConversation(newConversation)
        
        // Add automatic welcome message for new conversations
        const firstName = tutorName.split(' ')[0]
        const welcomeMessage: TextMessage = {
          id: Date.now(),
          type: 'text',
          content: `Hi ${firstName}! Can you clear a quick doubt?`,
          isFromCurrentUser: true,
        }
        setMessages([welcomeMessage])
      }
    } else {
      // Default to first conversation if no parameters
      setSelectedConversation(mockConversations[0])
      setMessages(mockMessages[1])
    }
  }, [searchParams])

  // Ensure page stays at top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      // Get the scroll container
      const scrollContainer = chatContainerRef.current
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100
      
      if (isNearBottom) {
        // Scroll to bottom within the chat container
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages])

  // Handle scroll events to show/hide scroll button
  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100
      setShowScrollButton(!isNearBottom)
    }
  }

  // Scroll to bottom function - only within chat container
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const scrollContainer = chatContainerRef.current
      scrollContainer.scrollTop = scrollContainer.scrollHeight
    }
  }

  // Manual scroll to bottom
  const handleScrollToBottom = () => {
    scrollToBottom()
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: TextMessage = {
        id: Date.now(),
        type: 'text',
        content: message,
        isFromCurrentUser: true,
      }
      setMessages(prev => [...prev, newMessage])
      setMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleMeetingCreated = (meetingLink: string, meetingTitle: string) => {
    const newMessage: MeetingMessageType = {
      id: Date.now(),
      type: 'meeting',
      meetingLink,
      meetingTitle,
      isFromCurrentUser: true,
    }
    setMessages(prev => [...prev, newMessage])
  }

  const renderMessage = (msg: Message) => {
    if (msg.type === 'meeting') {
      return (
        <MeetingMessage
          key={msg.id}
          meetingLink={msg.meetingLink}
          meetingTitle={msg.meetingTitle}
          isFromCurrentUser={msg.isFromCurrentUser}
        />
      )
    }

    return (
      <div key={msg.id} className={`flex ${msg.isFromCurrentUser ? 'justify-end' : 'justify-start'}`}>
        <div className={`rounded-lg px-4 py-2 max-w-xs ${
          msg.isFromCurrentUser 
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-100 text-gray-900'
        }`}>
          <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <section className="px-4 py-12 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="text-blue-600">Messages</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Quick doubt clearing through chat. Need more help? Create a video session for interactive learning.
          </p>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Conversations List */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Conversations</CardTitle>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input placeholder="Search conversations..." className="pl-10" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockConversations.map((conversation) => (
                    <div 
                      key={conversation.id} 
                      className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedConversation?.id === conversation.id 
                          ? 'bg-blue-50 border border-blue-200' 
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => {
                        setSelectedConversation(conversation)
                        setMessages(mockMessages[conversation.id] || [])
                      }}
                    >
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={conversation.avatar} />
                        <AvatarFallback>
                          {conversation.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">{conversation.name}</p>
                          <span className="text-xs text-gray-500">{conversation.lastMessageTime}</span>
                        </div>
                        <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
                        <p className="text-xs text-blue-600">{conversation.topic}</p>
                      </div>
                      {conversation.unread && (
                    <Badge variant="destructive" className="h-2 w-2 rounded-full p-0"></Badge>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Chat Area */}
            <div className="lg:col-span-2">
              <Card className="h-[600px] flex flex-col">
                <CardHeader className="border-b flex-shrink-0">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={selectedConversation?.avatar} />
                      <AvatarFallback>
                        {selectedConversation?.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{selectedConversation?.name}</CardTitle>
                      <p className="text-sm text-gray-500">{selectedConversation?.topic} • Quick Chat</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {selectedConversation && (
                        <GoogleMeetButton 
                          tutorName={selectedConversation.name}
                          topic={selectedConversation.topic}
                          onMeetingCreated={handleMeetingCreated}
                        />
                      )}
                    <Button size="sm" variant="ghost">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                    </div>
                  </div>
                </CardHeader>
                
                {/* Messages Container with Scroll */}
                <div className="flex-1 relative overflow-hidden">
                  <div 
                    ref={chatContainerRef}
                    className="h-full overflow-y-auto space-y-4 p-4 scroll-smooth"
                    onScroll={handleScroll}
                  >
                    {messages.map(renderMessage)}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Scroll to Bottom Button */}
                  {showScrollButton && (
                    <div className="absolute bottom-4 right-4 z-10">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={handleScrollToBottom}
                        className="rounded-full w-10 h-10 p-0 shadow-lg hover:shadow-xl transition-all duration-200 bg-white border border-gray-200"
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>

                {/* Message Input */}
                <div className="border-t p-4 flex-shrink-0">
                  <div className="flex space-x-2">
                    <Input 
                      placeholder="Ask a quick question..." 
                      className="flex-1"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                    <Button size="sm" onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 