'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Recommendation {
  id: string
  title: string
  description: string
  type: 'resource' | 'action'
  url?: string
}

export function PersonalizedRecommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch('/api/personalized-recommendations')
        if (response.ok) {
          const data = await response.json()
          setRecommendations(data.recommendations)
        } else {
          throw new Error('Failed to fetch recommendations')
        }
      } catch (error) {
        console.error('Error fetching recommendations:', error)
        // Set some mock data in case of error
        setRecommendations([
          {
            id: '1',
            title: 'Review Your Contract',
            description: 'Based on your recent activity, it might be helpful to review your contract terms.',
            type: 'action',
          },
          {
            id: '2',
            title: 'Intellectual Property Protection Guide',
            description: 'This guide could help you understand how to protect your business ideas.',
            type: 'resource',
            url: '#',
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendations()
  }, [])

  if (loading) {
    return <div>Loading recommendations...</div>
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Personalized Legal Recommendations</CardTitle>
        <CardDescription>Tailored suggestions based on your activity and case history</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          {recommendations.map(recommendation => (
            <Card key={recommendation.id} className="mb-4">
              <CardHeader>
                <CardTitle>{recommendation.title}</CardTitle>
                <CardDescription>{recommendation.type === 'resource' ? 'Resource' : 'Suggested Action'}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{recommendation.description}</p>
                {recommendation.type === 'resource' && recommendation.url && (
                  <Button className="mt-2" variant="outline" asChild>
                    <a href={recommendation.url} target="_blank" rel="noopener noreferrer">View Resource</a>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

