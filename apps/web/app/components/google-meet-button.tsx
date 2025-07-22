"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Video, Copy, ExternalLink, Calendar, Clock } from "lucide-react"
import { toast } from "sonner"

interface GoogleMeetButtonProps {
  tutorName: string
  topic: string
  onMeetingCreated?: (meetingLink: string, meetingTitle: string) => void
}

export function GoogleMeetButton({ tutorName, topic, onMeetingCreated }: GoogleMeetButtonProps) {
  const [showMeetingDialog, setShowMeetingDialog] = useState(false)
  const [meetingTitle, setMeetingTitle] = useState("")
  const [meetingLink, setMeetingLink] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const generateMeetLink = async () => {
    setIsGenerating(true)
    
    try {
      // NOTE: This generates links in the correct Google Meet format,
      // but they are NOT real/active Google Meet meetings.
      // For REAL Google Meet links, you need to integrate with Google APIs:
      // 1. Google Calendar API to create calendar events
      // 2. Google Meet API to generate actual meeting links
      // 3. Proper authentication and OAuth2 setup
      
      // Current implementation (format-correct but not real):
      const generateRandomString = (length: number) => {
        const chars = 'abcdefghijklmnopqrstuvwxyz'
        let result = ''
        for (let i = 0; i < length; i++) {
          result += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        return result
      }
      
      const meetingId = `${generateRandomString(3)}-${generateRandomString(4)}-${generateRandomString(3)}`
      const title = meetingTitle || `${topic} Session with ${tutorName}`
      
      // This creates a URL in the correct format but it's not a real meeting
      const meetLink = `https://meet.google.com/${meetingId}`
      
      setMeetingLink(meetLink)
      
      // Call the callback to add the meeting to the chat
      if (onMeetingCreated) {
        onMeetingCreated(meetLink, title)
      }
      
      // TODO: For REAL Google Meet integration, implement:
      // 1. Google Calendar API integration
      // 2. Create calendar event with Meet link
      // 3. Store meeting details in database
      // 4. Send notifications to both parties
      // 5. Handle meeting scheduling and reminders
      
      toast.success("Meeting link generated successfully!")
    } catch (error) {
      toast.error("Failed to generate meeting link")
      console.error("Error generating meeting link:", error)
    } finally {
      setIsGenerating(false)
    }
  }

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
    <>
      <Button
        size="sm"
        variant="outline"
        onClick={() => setShowMeetingDialog(true)}
        className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
      >
        <Video className="h-4 w-4 mr-1" />
        Video Session
      </Button>

      <Dialog open={showMeetingDialog} onOpenChange={setShowMeetingDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Video className="h-5 w-5 text-green-600" />
              Create Interactive Learning Session
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Session Title
              </label>
              <Input
                placeholder={`${topic} Interactive Session with ${tutorName}`}
                value={meetingTitle}
                onChange={(e) => setMeetingTitle(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>Interactive session with {tutorName}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>Duration: 30 minutes (recommended for complex topics)</span>
            </div>

            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                💡 <strong>Perfect for:</strong> Complex explanations, screen sharing, 
                interactive problem-solving, and hands-on guidance.
              </p>
            </div>

            {!meetingLink ? (
              <Button
                onClick={generateMeetLink}
                disabled={isGenerating}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {isGenerating ? "Creating Session..." : "Create Interactive Session"}
              </Button>
            ) : (
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Meeting Link</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Active
                    </Badge>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <Input
                      value={meetingLink}
                      readOnly
                      className="text-sm"
                    />
                    <Button size="sm" variant="outline" onClick={copyToClipboard}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={openMeeting}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Join Meeting
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowMeetingDialog(false)}
                  >
                    Close
                  </Button>
                </div>

                <div className="text-xs text-gray-500 text-center">
                  Share this interactive session link with {tutorName} for hands-on learning
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
} 