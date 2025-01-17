import { Metadata } from 'next'
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import { PredictiveLegalAnalytics } from '@/components/ai-features/predictive-legal-analytics'
import { PersonalizedAIAssistant } from '@/components/ai-features/personalized-ai-assistant'
import { AILegalResearch } from '@/components/ai-features/ai-legal-research'

export const metadata: Metadata = {
  title: 'Dashboard | JusticeForAll',
  description: 'Manage your legal cases and access AI-powered features',
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dashboard"
        text="Manage your legal cases and access AI-powered features"
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <PredictiveLegalAnalytics />
        <PersonalizedAIAssistant />
        <AILegalResearch />
      </div>
    </DashboardShell>
  )
}

