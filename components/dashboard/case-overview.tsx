"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Case {
  id: string
  title: string
  status: 'active' | 'pending' | 'closed'
  nextAction: string
  nextActionDate: string
}

const mockCases: Case[] = [
  { id: '1', title: 'Divorce Proceedings', status: 'active', nextAction: 'Court Hearing', nextActionDate: '2023-07-15' },
  { id: '2', title: 'Property Dispute', status: 'pending', nextAction: 'Document Submission', nextActionDate: '2023-07-20' },
  { id: '3', title: 'Will Creation', status: 'closed', nextAction: 'None', nextActionDate: 'N/A' },
]

interface CaseOverviewProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CaseOverview({ className, ...props }: CaseOverviewProps) {
  const [cases] = useState<Case[]>(mockCases)

  return (
    <Card className={cn("col-span-3", className)} {...props}>
      <CardHeader>
        <CardTitle>Case Overview</CardTitle>
        <CardDescription>Manage and track your ongoing legal cases</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {cases.map(case_ => (
            <div key={case_.id} className="flex items-center">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{case_.title}</p>
                <p className="text-sm text-muted-foreground">
                  Next action: {case_.nextAction} on {case_.nextActionDate}
                </p>
              </div>
              <div className="ml-auto flex items-center space-x-2">
                <Badge
                  variant={case_.status === 'active' ? 'default' : case_.status === 'pending' ? 'secondary' : 'outline'}
                >
                  {case_.status}
                </Badge>
                <Button variant="outline" size="sm">View</Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <Button>View All Cases</Button>
        </div>
      </CardContent>
    </Card>
  )
}

