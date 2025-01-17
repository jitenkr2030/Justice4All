"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

interface Partnership {
  id: string
  name: string
  type: string
  discountPercentage: number
}

export function PartnershipManagement() {
  const { data: session } = useSession()
  const [partnerships, setPartnerships] = useState<Partnership[]>([])
  const [newPartnership, setNewPartnership] = useState({ name: '', type: '', discountPercentage: 0 })
  const { toast } = useToast()

  useEffect(() => {
    const fetchPartnerships = async () => {
      try {
        const response = await fetch('/api/partnerships')
        if (response.ok) {
          const data = await response.json()
          setPartnerships(data.partnerships)
        }
      } catch (error) {
        console.error('Error fetching partnerships:', error)
      }
    }

    fetchPartnerships()
  }, [])

  const handleAddPartnership = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/partnerships', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPartnership),
      })

      if (response.ok) {
        const addedPartnership = await response.json()
        setPartnerships([...partnerships, addedPartnership])
        setNewPartnership({ name: '', type: '', discountPercentage: 0 })
        toast({
          title: "Success",
          description: "Partnership added successfully",
        })
      }
    } catch (error) {
      console.error('Error adding partnership:', error)
      toast({
        title: "Error",
        description: "Failed to add partnership",
        variant: "destructive",
      })
    }
  }

  if (!session) return null

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Partnership</CardTitle>
          <CardDescription>Create a new partnership program</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddPartnership} className="space-y-4">
            <div>
              <Label htmlFor="name">Partner Name</Label>
              <Input
                id="name"
                value={newPartnership.name}
                onChange={(e) => setNewPartnership({ ...newPartnership, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="type">Partnership Type</Label>
              <Input
                id="type"
                value={newPartnership.type}
                onChange={(e) => setNewPartnership({ ...newPartnership, type: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="discount">Discount Percentage</Label>
              <Input
                id="discount"
                type="number"
                value={newPartnership.discountPercentage}
                onChange={(e) => setNewPartnership({ ...newPartnership, discountPercentage: parseInt(e.target.value) })}
                required
              />
            </div>
            <Button type="submit">Add Partnership</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Partnerships</CardTitle>
          <CardDescription>Manage your current partnerships</CardDescription>
        </CardHeader>
        <CardContent>
          {partnerships.map((partnership) => (
            <Card key={partnership.id} className="mb-4">
              <CardHeader>
                <CardTitle>{partnership.name}</CardTitle>
                <CardDescription>{partnership.type}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Discount: {partnership.discountPercentage}%</p>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

