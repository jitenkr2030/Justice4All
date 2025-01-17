"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

export function LegalAidMatching() {
  const [legalIssue, setLegalIssue] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/legal-aid-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ legalIssue, location, description }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit legal aid request')
      }

      toast({
        title: "Request Submitted",
        description: "We'll match you with a pro bono legal professional soon.",
      })

      setLegalIssue('')
      setLocation('')
      setDescription('')
    } catch (error) {
      console.error('Error submitting legal aid request:', error)
      toast({
        title: "Error",
        description: "Failed to submit your request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Legal Aid & Pro Bono Matching</CardTitle>
        <CardDescription>Get connected with pro bono legal services</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="legalIssue">Legal Issue</Label>
            <Select onValueChange={setLegalIssue} value={legalIssue}>
              <SelectTrigger id="legalIssue">
                <SelectValue placeholder="Select a legal issue" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="family">Family Law</SelectItem>
                <SelectItem value="housing">Housing Law</SelectItem>
                <SelectItem value="employment">Employment Law</SelectItem>
                <SelectItem value="immigration">Immigration Law</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, State"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Brief Description of Your Situation</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please provide a brief description of your legal issue..."
              required
            />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Request Legal Aid'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

