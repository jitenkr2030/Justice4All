"use client"

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export function PrivacySettings() {
  const { data: session } = useSession()
  const [anonymizeData, setAnonymizeData] = useState(false)
  const { toast } = useToast()

  const handleAnonymizeChange = async (checked: boolean) => {
    setAnonymizeData(checked)
    try {
      const response = await fetch('/api/user/privacy-settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ anonymizeData: checked }),
      })
      if (!response.ok) throw new Error('Failed to update privacy settings')
      toast({
        title: "Settings Updated",
        description: `Data anonymization is now ${checked ? 'enabled' : 'disabled'}.`,
      })
    } catch (error) {
      console.error('Error updating privacy settings:', error)
      toast({
        title: "Error",
        description: "Failed to update privacy settings. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (!session) return null

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Privacy Settings</h2>
      <div className="flex items-center space-x-2">
        <Switch
          id="anonymize-data"
          checked={anonymizeData}
          onCheckedChange={handleAnonymizeChange}
        />
        <Label htmlFor="anonymize-data">Anonymize my data</Label>
      </div>
      <p className="text-sm text-gray-500">
        When enabled, your personal information will be anonymized in our system.
        This may affect personalized features of the platform.
      </p>
    </div>
  )
}

