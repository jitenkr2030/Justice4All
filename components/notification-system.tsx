"use client"

import React, { useState, useEffect } from 'react'
import { Bell } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"

interface Notification {
  id: string
  message: string
  read: boolean
}

export function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const { toast } = useToast()

  useEffect(() => {
    // In a real application, you would set up a WebSocket connection here
    // For this example, we'll simulate real-time notifications with setInterval
    const interval = setInterval(() => {
      const newNotification: Notification = {
        id: Date.now().toString(),
        message: `New notification at ${new Date().toLocaleTimeString()}`,
        read: false,
      }
      setNotifications(prev => [...prev, newNotification])
      toast({
        title: "New Notification",
        description: newNotification.message,
      })
    }, 60000) // New notification every minute

    return () => clearInterval(interval)
  }, [toast])

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ))
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Bell />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        {notifications.length === 0 ? (
          <DropdownMenuItem>No notifications</DropdownMenuItem>
        ) : (
          notifications.map(notif => (
            <DropdownMenuItem key={notif.id} onClick={() => markAsRead(notif.id)}>
              <span className={notif.read ? 'text-gray-500' : 'font-bold'}>
                {notif.message}
              </span>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

