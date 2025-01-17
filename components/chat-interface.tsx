'use client'

import { useState } from 'react'
import { useChat } from 'ai/react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Card className="fixed bottom-4 right-4 w-96">
      {!isOpen ? (
        <Button onClick={() => setIsOpen(true)}>Chat with AI Legal Assistant</Button>
      ) : (
        <>
          <CardHeader>
            <CardTitle>AI Legal Assistant</CardTitle>
            <CardDescription>Get instant legal advice for common queries</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              {messages.map(m => (
                <div key={m.id} className={`mb-4 ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                  <span className={`inline-block p-2 rounded-lg ${m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    {m.content}
                  </span>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <form onSubmit={handleSubmit} className="flex w-full space-x-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask a legal question..."
                className="flex-grow"
              />
              <Button type="submit">Send</Button>
            </form>
          </CardFooter>
        </>
      )}
    </Card>
  )
}

