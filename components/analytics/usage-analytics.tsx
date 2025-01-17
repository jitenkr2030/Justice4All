"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface UsageData {
  date: string
  activeUsers: number
  casesCreated: number
  documentsUploaded: number
}

export function UsageAnalytics() {
  const [usageData, setUsageData] = useState<UsageData[]>([])

  useEffect(() => {
    fetchUsageData()
  }, [])

  const fetchUsageData = async () => {
    try {
      const response = await fetch('/api/analytics/usage')
      if (response.ok) {
        const data = await response.json()
        setUsageData(data.usageData)
      }
    } catch (error) {
      console.error('Error fetching usage data:', error)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Usage Analytics</CardTitle>
        <CardDescription>Track user interactions and popular features</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            activeUsers: {
              label: "Active Users",
              color: "hsl(var(--chart-1))",
            },
            casesCreated: {
              label: "Cases Created",
              color: "hsl(var(--chart-2))",
            },
            documentsUploaded: {
              label: "Documents Uploaded",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={usageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line type="monotone" dataKey="activeUsers" stroke="var(--color-activeUsers)" name="Active Users" />
              <Line type="monotone" dataKey="casesCreated" stroke="var(--color-casesCreated)" name="Cases Created" />
              <Line type="monotone" dataKey="documentsUploaded" stroke="var(--color-documentsUploaded)" name="Documents Uploaded" />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

