"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface Activity {
  id: string
  description: string
  date: string
}

const mockActivities: Activity[] = [
  { id: '1', description: 'Document uploaded: Marriage Certificate', date: '2023-07-10' },
  { id: '2', description: 'Consultation scheduled with Atty. Johnson', date: '2023-07-08' },
  { id: '3', description: 'Case status updated: Divorce Proceedings', date: '2023-07-05' },
]

interface RecentActivityProps extends React.HTMLAttributes<HTMLDivElement> {}

export function RecentActivity({ className, ...props }: RecentActivityProps) {
  const [activities] = useState<Activity[]>(mockActivities)

  return (
    <Card className={cn("col-span-3", className)} {...props}>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest actions and updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.map(activity => (
            <div key={activity.id} className="flex items-center">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{activity.description}</p>
                <p className="text-sm text-muted-foreground">{activity.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

