"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

export function PartnershipPrograms() {
  const [organizationName, setOrganizationName] = useState('')
  const [email, setEmail] = useState('')
  const [partnershipType, setPartnershipType] = useState('')
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to your backend
    console.log('Partnership application submitted:', { organizationName, email, partnershipType })
    toast({
      title: "Application Submitted",
      description: "We'll review your application and get back to you soon.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Partnership Programs</CardTitle>
        <CardDescription>Join our network of legal service providers</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Organization Name</Label>
              <Input id="name" value={organizationName} onChange={(e) => setOrganizationName(e.target.value)} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="type">Partnership Type</Label>
              <Input id="type" value={partnershipType} onChange={(e) => setPartnershipType(e.target.value)} placeholder="e.g., NGO, Law Firm, Educational Institution" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit">Apply for Partnership</Button>
      </CardFooter>
    </Card>
  )
}

