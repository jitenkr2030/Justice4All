"use client"

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export function DataRetentionPolicy() {
  const { data: session } = useSession()
  const { toast } = useToast()

  const handleDeleteData = async () => {
    if (confirm("Are you sure you want to delete all your data? This action cannot be undone.")) {
      try {
        const response = await fetch('/api/user/delete-data', {
          method: 'POST',
        })
        if (!response.ok) throw new Error('Failed to delete data')
        toast({
          title: "Data Deleted",
          description: "All your data has been permanently deleted.",
        })
      } catch (error) {
        console.error('Error deleting data:', error)
        toast({
          title: "Error",
          description: "Failed to delete data. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  if (!session) return null

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Data Retention</h2>
      <p className="text-sm text-gray-500">
        We retain your data for as long as your account is active. You can request deletion of your data at any time.
      </p>
      <Button onClick={handleDeleteData} variant="destructive">
        Delete All My Data
      </Button>
    </div>
  )
}

