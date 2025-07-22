"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Video, Copy, ExternalLink, Clock } from "lucide-react"
import { toast } from "sonner"

interface MeetingMessageProps {
  meetingLink: string
  meetingTitle: string
  isFromCurrentUser: boolean
}

export function MeetingMessage({ meetingLink, meetingTitle, isFromCurrentUser }: MeetingMessageProps) {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(meetingLink)
      toast.success("Meeting link copied to clipboard!")
    } catch (error) {
      toast.error("Failed to copy link")
    }
  }

  const openMeeting = () => {
    window.open(meetingLink, '_blank')
  }

  return (
    <div className={`flex ${isFromCurrentUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`rounded-lg px-4 py-3 max-w-xs shadow-sm ${
        isFromCurrentUser 
          ? 'bg-green-600 text-white' 
          : 'bg-gray-100 text-gray-900'
      }`}>
        <div className="flex items-center gap-2 mb-2">
          <Video className="h-4 w-4" />
          <span className="text-sm font-medium">Interactive Session</span>
          <Badge 
            variant="secondary" 
            className={`text-xs ${
              isFromCurrentUser 
                ? 'bg-green-500 text-white' 
                : 'bg-green-100 text-green-800'
            }`}
          >
            Active
          </Badge>
        </div>
        
        <p className="text-sm mb-3">{meetingTitle}</p>
        
        <div className="text-xs opacity-80 mb-3">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>30 min interactive session</span>
          </div>
        </div>

        <div className="flex gap-2 mt-3">
          <Button
            size="sm"
            onClick={openMeeting}
            className={`text-xs font-medium ${
              isFromCurrentUser
                ? 'bg-green-500 hover:bg-green-400 text-white border-0'
                : 'bg-green-600 hover:bg-green-700 text-white border-0'
            }`}
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            Join
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={copyToClipboard}
            className={`text-xs font-medium ${
              isFromCurrentUser
                ? 'border-green-400 text-black bg-white hover:text-grey'
                : 'border-gray-300 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
            }`}
          >
            <Copy className="h-3 w-3 mr-1" />
            Copy
          </Button>
        </div>
      </div>
    </div>
  )
} 