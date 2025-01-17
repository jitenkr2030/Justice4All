'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface LegalResource {
  id: string
  title: string
  type: 'article' | 'guide' | 'video'
  description: string
  url: string
}

const mockResources: LegalResource[] = [
  {
    id: '1',
    title: 'Introduction to Contract Law',
    type: 'article',
    description: 'A comprehensive overview of contract law basics.',
    url: '#',
  },
  {
    id: '2',
    title: 'Understanding Intellectual Property Rights',
    type: 'guide',
    description: 'A step-by-step guide to protecting your intellectual property.',
    url: '#',
  },
  {
    id: '3',
    title: 'Criminal Law Fundamentals',
    type: 'video',
    description: 'Video series covering the basics of criminal law.',
    url: '#',
  },
]

export function LegalLibrary() {
  const [searchTerm, setSearchTerm] = useState('')
  const [resources, setResources] = useState<LegalResource[]>(mockResources)

  const handleSearch = () => {
    // Implement actual search logic here
    const filteredResources = mockResources.filter(resource =>
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setResources(filteredResources)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Legal Library</CardTitle>
        <CardDescription>Access articles, guides, and educational materials on various legal topics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Input
            placeholder="Search legal resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button onClick={handleSearch}>Search</Button>
        </div>
        <ScrollArea className="h-[400px]">
          {resources.map(resource => (
            <Card key={resource.id} className="mb-4">
              <CardHeader>
                <CardTitle>{resource.title}</CardTitle>
                <CardDescription>{resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{resource.description}</p>
                <Button className="mt-2" variant="outline" asChild>
                  <a href={resource.url} target="_blank" rel="noopener noreferrer">View Resource</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

