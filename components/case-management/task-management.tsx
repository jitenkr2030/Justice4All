'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

interface Task {
  id: string
  title: string
  status: string
  assignedTo: string
  dueDate: string
}

export function TaskManagement({ caseId }: { caseId: string }) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`/api/cases/${caseId}/tasks`)
        if (response.ok) {
          const data = await response.json()
          setTasks(data.tasks)
        } else {
          throw new Error('Failed to fetch tasks')
        }
      } catch (error) {
        console.error('Error fetching tasks:', error)
        toast({
          title: "Error",
          description: "Failed to load tasks. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [caseId, toast])

  const handleAddTask = () => {
    // Implement add task functionality
  }

  const handleUpdateTaskStatus = (taskId: string, newStatus: string) => {
    // Implement update task status functionality
  }

  if (loading) {
    return <div>Loading tasks...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Management</CardTitle>
        <CardDescription>Manage tasks related to your legal case</CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={handleAddTask} className="mb-4">Add New Task</Button>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>
                  <Badge variant={task.status === 'Completed' ? 'default' : 'secondary'}>
                    {task.status}
                  </Badge>
                </TableCell>
                <TableCell>{task.assignedTo}</TableCell>
                <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUpdateTaskStatus(task.id, task.status === 'Completed' ? 'In Progress' : 'Completed')}
                  >
                    {task.status === 'Completed' ? 'Reopen' : 'Complete'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

