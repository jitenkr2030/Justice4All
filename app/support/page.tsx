import { Metadata } from 'next'
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import { AIChatSupport } from '@/components/support/ai-chat-support'
import { LiveCustomerSupport } from '@/components/support/live-customer-support'
import { HelpCenter } from '@/components/support/help-center'

export const metadata: Metadata = {
  title: 'Support & Customer Service | JusticeForAll',
  description: 'Get help and support for your legal needs',
}

export default async function SupportPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Support & Customer Service"
        text="Get help and support for your legal needs"
      />
      <div className="grid gap-8">
        <AIChatSupport />
        <LiveCustomerSupport />
        <HelpCenter />
      </div>
    </DashboardShell>
  )
}

