"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

export function PredictiveLegalAnalytics() {
  const [caseDetails, setCaseDetails] = useState('')
  const [prediction, setPrediction] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handlePredict = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/predict-outcome', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ caseDetails }),
      })

      if (!response.ok) {
        throw new Error('Failed to predict outcome')
      }

      const data = await response.json()
      setPrediction(data.prediction)
    } catch (error) {
      console.error('Error predicting outcome:', error)
      toast({
        title: "Error",
        description: "Failed to predict case outcome. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Predictive Legal Analytics</CardTitle>
        <CardDescription>Predict case outcomes based on historical data and trends</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="caseDetails">Case Details</Label>
            <Textarea
              id="caseDetails"
              placeholder="Enter case details..."
              value={caseDetails}
              onChange={(e) => setCaseDetails(e.target.value)}
            />
          </div>
          <Button onClick={handlePredict} disabled={isLoading}>
            {isLoading ? 'Predicting...' : 'Predict Outcome'}
          </Button>
        </div>
        {prediction && (
          <div className="mt-4">
            <h3 className="font-semibold">Predicted Outcome:</h3>
            <p>{prediction}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

