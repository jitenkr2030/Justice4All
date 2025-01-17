'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

interface Case {
  id: string
  title: string
  status: string
  createdAt: string
  updatedAt: string
}

export function CaseTrackingDashboard() {
  const [cases, setCases] = useState<Case[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await fetch('/api/cases')
        if (response.ok) {
          const data = await response.json()
          setCases(data.cases)
        } else {
          throw new Error('Failed to fetch cases')
        }
      } catch (error) {
        console.error('Error fetching cases:', error)
        toast({
          title: "Error",
          description: "Failed to load cases. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchCases()
  }, [toast])

  if (loading) {
    return <div>Loading cases...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Case Tracking Dashboard</CardTitle>
        <CardDescription>Manage and track your ongoing legal cases</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Case Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cases.map((case_) => (
              <TableRow key={case_.id}>
                <TableCell>{case_.title}</TableCell>
                <TableCell>
                  <Badge variant={case_.status === 'Active' ? 'default' : 'secondary'}>
                    {case_.status}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(case_.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(case_.updatedAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">View Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

