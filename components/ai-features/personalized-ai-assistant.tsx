"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

export function PersonalizedAIAssistant() {
  const [userQuery, setUserQuery] = useState('')
  const [assistantResponse, setAssistantResponse] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleAskAssistant = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: userQuery }),
      })

      if (!response.ok) {
        throw new Error('Failed to get assistant response')
      }

      const data = await response.json()
      setAssistantResponse(data.response)
    } catch (error) {
      console.error('Error getting assistant response:', error)
      toast({
        title: "Error",
        description: "Failed to get a response from the AI assistant. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personalized AI Legal Assistant</CardTitle>
        <CardDescription>Get personalized legal advice and navigation assistance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="userQuery">Your Question</Label>
            <Input
              id="userQuery"
              placeholder="Ask your legal question..."
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
            />
          </div>
          <Button onClick={handleAskAssistant} disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Ask Assistant'}
          </Button>
        </div>
        {assistantResponse && (
          <div className="mt-4">
            <h3 className="font-semibold">Assistant's Response:</h3>
            <p>{assistantResponse}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

