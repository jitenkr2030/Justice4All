"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { useToast } from "@/components/ui/use-toast"

export function ScheduleConsultation() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const router = useRouter()
  const { toast } = useToast()

  const handleSchedule = async () => {
    if (!date) return

    try {
      const response = await fetch('/api/schedule-consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Consultation scheduled successfully",
        })
        router.refresh()
      } else {
        throw new Error('Scheduling failed')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to schedule consultation",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule Consultation</CardTitle>
        <CardDescription>Book a consultation with a legal professional</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
          <Button onClick={handleSchedule} disabled={!date}>
            Schedule Consultation
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

