'use client'

import { useState } from 'react'
import { useChat } from 'ai/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

export function AILegalResearch() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/ai-legal-research',
  })

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>AI-Powered Legal Research</CardTitle>
        <CardDescription>Find relevant legal precedents, laws, and case studies</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Enter your legal research query..."
            value={input}
            onChange={handleInputChange}
          />
          <Button type="submit">Search</Button>
        </form>
        <ScrollArea className="h-[400px] mt-4">
          {messages.map(m => (
            <div key={m.id} className="mb-4">
              <p className="font-semibold">{m.role === 'user' ? 'You:' : 'AI:'}</p>
              <p className="mt-1">{m.content}</p>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

