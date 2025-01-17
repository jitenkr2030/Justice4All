"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell } from 'lucide-react'

interface Notification {
  id: string
  message: string
  createdAt: string
}

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('/api/notifications')
        if (response.ok) {
          const data = await response.json()
          setNotifications(data.notifications)
        }
      } catch (error) {
        console.error('Failed to fetch notifications:', error)
      }
    }

    fetchNotifications()
    // Set up polling or WebSocket connection for real-time updates
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bell className="mr-2" />
          Notifications
        </CardTitle>
        <CardDescription>Stay updated on your cases and appointments</CardDescription>
      </CardHeader>
      <CardContent>
        {notifications.length === 0 ? (
          <p>No new notifications</p>
        ) : (
          <ul className="space-y-2">
            {notifications.map((notification) => (
              <li key={notification.id} className="text-sm">
                {notification.message}
                <span className="block text-xs text-muted-foreground">
                  {new Date(notification.createdAt).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}

