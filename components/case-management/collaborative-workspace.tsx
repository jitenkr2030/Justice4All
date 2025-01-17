'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/components/ui/use-toast"

interface Message {
  id: string
  sender: string
  content: string
  timestamp: string
}

export function CollaborativeWorkspace({ caseId }: { caseId: string }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/cases/${caseId}/messages`)
        if (response.ok) {
          const data = await response.json()
          setMessages(data.messages)
        } else {
          throw new Error('Failed to fetch messages')
        }
      } catch (error) {
        console.error('Error fetching messages:', error)
        toast({
          title: "Error",
          description: "Failed to load messages. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()
    // Set up real-time updates here (e.g., using WebSockets)
  }, [caseId, toast])

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return

    try {
      const response = await fetch(`/api/cases/${caseId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newMessage }),
      })

      if (response.ok) {
        const sentMessage = await response.json()
        setMessages([...messages, sentMessage])
        setNewMessage('')
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return <div>Loading workspace...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Collaborative Workspace</CardTitle>
        <CardDescription>Communicate with your legal team</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] mb-4">
          {messages.map((message) => (
            <div key={message.id} className="mb-2">
              <strong>{message.sender}:</strong> {message.content}
              <small className="block text-gray-500">
                {new Date(message.timestamp).toLocaleString()}
              </small>
            </div>
          ))}
        </ScrollArea>
        <div className="flex space-x-2">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow"
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </div>
      </CardContent>
    </Card>
  )
}

