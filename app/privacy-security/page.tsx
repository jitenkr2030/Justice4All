import { Metadata } from 'next'
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import { PrivacySettings } from '@/components/privacy-settings'
import { DataRetentionPolicy } from '@/components/data-retention-policy'
import { UserConsentManagement } from '@/components/user-consent-management'
import { DataExport } from '@/components/data-export'

export const metadata: Metadata = {
  title: 'Privacy & Security | JusticeForAll',
  description: 'Manage your privacy and security settings',
}

export default async function PrivacySecurityPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Privacy & Security"
        text="Manage your privacy settings and data"
      />
      <div className="grid gap-8">
        <PrivacySettings />
        <DataRetentionPolicy />
        <UserConsentManagement />
        <DataExport />
      </div>
    </DashboardShell>
  )
}

