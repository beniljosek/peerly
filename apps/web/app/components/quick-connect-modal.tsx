"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Zap, MessageCircle, Star, CircleDollarSign } from "lucide-react"

interface QuickConnectModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const availableTutors = [
  {
    id: 1,
    name: "Sarah Chen",
    avatar: "/placeholder.svg?height=40&width=40&text=SC",
    topic: "React Development",
    status: "online",
    rating: 4.9,
    responseTime: "~2 min",
    cost: 5,
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40&text=MR",
    topic: "Calculus",
    status: "online",
    rating: 4.8,
    responseTime: "~5 min",
    cost: 5,
  },
  {
    id: 3,
    name: "Isabella Martinez",
    avatar: "/placeholder.svg?height=40&width=40&text=IM",
    topic: "Spanish",
    status: "online",
    rating: 5.0,
    responseTime: "~1 min",
    cost: 5,
  },
]

export function QuickConnectModal({ open, onOpenChange }: QuickConnectModalProps) {
  const [searchTopic, setSearchTopic] = useState("")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-600" />
            Quick Connect
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="What do you want to learn?"
              value={searchTopic}
              onChange={(e) => setSearchTopic(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="text-sm text-gray-600">Available tutors online now:</div>

          <div className="space-y-3 max-h-60 overflow-y-auto">
            {availableTutors.map((tutor) => (
              <div key={tutor.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={tutor.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {tutor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <div className="font-medium text-sm">{tutor.name}</div>
                    <div className="text-xs text-gray-500">{tutor.topic}</div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {tutor.rating} • {tutor.responseTime}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-sm font-medium text-violet-600">
                    <CircleDollarSign className="h-4 w-4" />
                    {tutor.cost}
                  </div>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Connect
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-xs text-gray-500 text-center">
            Can't find what you're looking for? Try browsing all topics or post a learning request.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
