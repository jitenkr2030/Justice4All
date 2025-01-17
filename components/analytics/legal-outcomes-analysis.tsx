"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface OutcomeData {
  caseType: string
  favorableOutcomes: number
  unfavorableOutcomes: number
}

export function LegalOutcomesAnalysis() {
  const [outcomeData, setOutcomeData] = useState<OutcomeData[]>([])

  useEffect(() => {
    fetchOutcomeData()
  }, [])

  const fetchOutcomeData = async () => {
    try {
      const response = await fetch('/api/analytics/legal-outcomes')
      if (response.ok) {
        const data = await response.json()
        setOutcomeData(data.outcomeData)
      }
    } catch (error) {
      console.error('Error fetching legal outcome data:', error)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Legal Outcomes Analysis</CardTitle>
        <CardDescription>Analyze data on legal outcomes for different types of cases</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            favorableOutcomes: {
              label: "Favorable Outcomes",
              color: "hsl(var(--chart-1))",
            },
            unfavorableOutcomes: {
              label: "Unfavorable Outcomes",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={outcomeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="caseType" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="favorableOutcomes" fill="var(--color-favorableOutcomes)" name="Favorable Outcomes" />
              <Bar dataKey="unfavorableOutcomes" fill="var(--color-unfavorableOutcomes)" name="Unfavorable Outcomes" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

