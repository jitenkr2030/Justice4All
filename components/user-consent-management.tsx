"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

interface Consent {
  marketing: boolean
  thirdPartySharing: boolean
}

export function UserConsentManagement() {
  const { data: session } = useSession()
  const [consent, setConsent] = useState<Consent>({ marketing: false, thirdPartySharing: false })
  const { toast } = useToast()

  useEffect(() => {
    const fetchConsent = async () => {
      try {
        const response = await fetch('/api/user/consent')
        if (!response.ok) throw new Error('Failed to fetch consent data')
        const data = await response.json()
        setConsent(data.consent)
      } catch (error) {
        console.error('Error fetching consent data:', error)
        toast({
          title: "Error",
          description: "Failed to fetch consent data. Please try again.",
          variant: "destructive",
        })
      }
    }

    if (session) {
      fetchConsent()
    }
  }, [session, toast])

  const handleConsentChange = async (key: keyof Consent, value: boolean) => {
    try {
      const response = await fetch('/api/user/consent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [key]: value }),
      })
      if (!response.ok) throw new Error('Failed to update consent')
      setConsent(prev => ({ ...prev, [key]: value }))
      toast({
        title: "Consent Updated",
        description: `Your consent for ${key} has been updated.`,
      })
    } catch (error) {
      console.error('Error updating consent:', error)
      toast({
        title: "Error",
        description: "Failed to update consent. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (!session) return null

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Consent Management</h2>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Switch
            id="marketing-consent"
            checked={consent.marketing}
            onCheckedChange={(checked) => handleConsentChange('marketing', checked)}
          />
          <Label htmlFor="marketing-consent">Receive marketing communications</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="third-party-consent"
            checked={consent.thirdPartySharing}
            onCheckedChange={(checked) => handleConsentChange('thirdPartySharing', checked)}
          />
          <Label htmlFor="third-party-consent">Allow data sharing with third parties</Label>
        </div>
      </div>
    </div>
  )
}

