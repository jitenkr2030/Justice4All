import { Metadata } from 'next'
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import { UsageAnalytics } from '@/components/analytics/usage-analytics'
import { LegalOutcomesAnalysis } from '@/components/analytics/legal-outcomes-analysis'
import { UserProgressReport } from '@/components/analytics/user-progress-report'

export const metadata: Metadata = {
  title: 'Analytics & Reporting | JusticeForAll',
  description: 'View analytics and reports on platform usage and legal outcomes',
}

export default async function AnalyticsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Analytics & Reporting"
        text="View analytics and reports on platform usage and legal outcomes"
      />
      <div className="grid gap-8">
        <UsageAnalytics />
        <LegalOutcomesAnalysis />
        <UserProgressReport />
      </div>
    </DashboardShell>
  )
}

