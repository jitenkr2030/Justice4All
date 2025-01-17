"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

interface LegalReference {
  title: string
  citation: string
  relevance: string
}

export function AILegalResearch() {
  const [researchQuery, setResearchQuery] = useState('')
  const [researchResults, setResearchResults] = useState<LegalReference[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleResearch = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/legal-research', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: researchQuery }),
      })

      if (!response.ok) {
        throw new Error('Failed to perform legal research')
      }

      const data = await response.json()
      setResearchResults(data.results)
    } catch (error) {
      console.error('Error performing legal research:', error)
      toast({
        title: "Error",
        description: "Failed to perform legal research. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI-Driven Legal Research Assistant</CardTitle>
        <CardDescription>Find relevant case laws and legal precedents</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="researchQuery">Research Query</Label>
            <Input
              id="researchQuery"
              placeholder="Enter your legal research query..."
              value={researchQuery}
              onChange={(e) => setResearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={handleResearch} disabled={isLoading}>
            {isLoading ? 'Researching...' : 'Perform Research'}
          </Button>
        </div>
        {researchResults.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Research Results:</h3>
            {researchResults.map((result, index) => (
              <Card key={index} className="mb-2">
                <CardHeader>
                  <CardTitle className="text-lg">{result.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p><strong>Citation:</strong> {result.citation}</p>
                  <p><strong>Relevance:</strong> {result.relevance}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

