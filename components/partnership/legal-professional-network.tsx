"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

interface LegalProfessional {
  id: string
  name: string
  specialization: string
  location: string
  rating: number
}

export function LegalProfessionalNetwork() {
  const [professionals, setProfessionals] = useState<LegalProfessional[]>([])
  const [specialization, setSpecialization] = useState('')
  const [location, setLocation] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchProfessionals()
  }, [])

  const fetchProfessionals = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/legal-professionals')
      if (response.ok) {
        const data = await response.json()
        setProfessionals(data.professionals)
      }
    } catch (error) {
      console.error('Error fetching legal professionals:', error)
      toast({
        title: "Error",
        description: "Failed to load legal professionals. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/legal-professionals?specialization=${specialization}&location=${location}`)
      if (response.ok) {
        const data = await response.json()
        setProfessionals(data.professionals)
      }
    } catch (error) {
      console.error('Error searching legal professionals:', error)
      toast({
        title: "Error",
        description: "Failed to search legal professionals. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Legal Professional Network</CardTitle>
          <CardDescription>Find and connect with vetted legal professionals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Select onValueChange={setSpecialization} value={specialization}>
              <SelectTrigger>
                <SelectValue placeholder="Specialization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="family">Family Law</SelectItem>
                <SelectItem value="criminal">Criminal Law</SelectItem>
                <SelectItem value="corporate">Corporate Law</SelectItem>
                <SelectItem value="immigration">Immigration Law</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <Button onClick={handleSearch} disabled={isLoading}>
              {isLoading ? 'Searching...' : 'Search'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {professionals.map((professional) => (
          <Card key={professional.id}>
            <CardHeader>
              <CardTitle>{professional.name}</CardTitle>
              <CardDescription>{professional.specialization} | {professional.location}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Rating: {professional.rating}/5</p>
            </CardContent>
            <CardFooter>
              <Button>Contact</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

