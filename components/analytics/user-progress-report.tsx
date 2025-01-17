"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface UserProgress {
  casesCompleted: number
  totalCases: number
  tasksCompleted: number
  totalTasks: number
  documentsUploaded: number
}

export function UserProgressReport() {
  const [progress, setProgress] = useState<UserProgress | null>(null)

  useEffect(() => {
    fetchUserProgress()
  }, [])

  const fetchUserProgress = async () => {
    try {
      const response = await fetch('/api/analytics/user-progress')
      if (response.ok) {
        const data = await response.json()
        setProgress(data.progress)
      }
    } catch (error) {
      console.error('Error fetching user progress:', error)
    }
  }

  if (!progress) {
    return <div>Loading progress report...</div>
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Your Progress Report</CardTitle>
        <CardDescription>Track your progress in managing legal cases and tasks</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span>Cases Completed</span>
            <span>{progress.casesCompleted} / {progress.totalCases}</span>
          </div>
          <Progress value={(progress.casesCompleted / progress.totalCases) * 100} />
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span>Tasks Completed</span>
            <span>{progress.tasksCompleted} / {progress.totalTasks}</span>
          </div>
          <Progress value={(progress.tasksCompleted / progress.totalTasks) * 100} />
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span>Documents Uploaded</span>
            <span>{progress.documentsUploaded}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

