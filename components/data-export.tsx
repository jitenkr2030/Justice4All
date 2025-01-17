"use client"

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export function DataExport() {
  const { data: session } = useSession()
  const [isExporting, setIsExporting] = useState(false)
  const { toast } = useToast()

  const handleExportData = async () => {
    setIsExporting(true)
    try {
      const response = await fetch('/api/user/export-data')
      if (!response.ok) throw new Error('Failed to export data')
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = 'my_data_export.json'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      toast({
        title: "Data Exported",
        description: "Your data has been exported successfully.",
      })
    } catch (error) {
      console.error('Error exporting data:', error)
      toast({
        title: "Error",
        description: "Failed to export data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  if (!session) return null

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Data Export</h2>
      <p className="text-sm text-gray-500">
        You can export all your data at any time. The exported file will contain all the information we have about you.
      </p>
      <Button onClick={handleExportData} disabled={isExporting}>
        {isExporting ? "Exporting..." : "Export My Data"}
      </Button>
    </div>
  )
}

