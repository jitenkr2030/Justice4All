'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from 'lucide-react'

export function DocumentReviewTools() {
  const [documentText, setDocumentText] = useState('')
  const [reviewResult, setReviewResult] = useState<string | null>(null)
  const [isReviewing, setIsReviewing] = useState(false)
  const { toast } = useToast()

  const handleReview = async () => {
    if (!documentText.trim()) {
      toast({
        title: "Error",
        description: "Please enter document text to review.",
        variant: "destructive",
      })
      return
    }

    setIsReviewing(true)
    setReviewResult(null)

    try {
      const response = await fetch('/api/review-document', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ documentText }),
      })

      if (!response.ok) {
        throw new Error('Failed to review document')
      }

      const data = await response.json()
      setReviewResult(data.review)
      toast({
        title: "Review Complete",
        description: "Your document has been reviewed successfully.",
      })
    } catch (error) {
      console.error('Error reviewing document:', error)
      toast({
        title: "Error",
        description: "Failed to review document. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsReviewing(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Document Review Tools</CardTitle>
        <CardDescription>AI-powered review to highlight potential issues in legal documents</CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Paste your document text here..."
          value={documentText}
          onChange={(e) => setDocumentText(e.target.value)}
          className="min-h-[200px] mb-4"
        />
        <Button onClick={handleReview} disabled={isReviewing}>
          {isReviewing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isReviewing ? "Reviewing..." : "Review Document"}
        </Button>
        {reviewResult && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Review Results:</h3>
            <div className="bg-muted p-4 rounded-md">
              <pre className="whitespace-pre-wrap">{reviewResult}</pre>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

