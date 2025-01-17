import { Metadata } from 'next'
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import { LegalAidMatching } from '@/components/partnership/legal-aid-matching'
import { CommunityForums } from '@/components/community/community-forums'
import { LegalProfessionalNetwork } from '@/components/partnership/legal-professional-network'

export const metadata: Metadata = {
  title: 'Community & Partnerships | JusticeForAll',
  description: 'Connect with legal professionals and community members',
}

export default async function CommunityPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Community & Partnerships"
        text="Connect with legal professionals and community members"
      />
      <div className="grid gap-8">
        <LegalAidMatching />
        <CommunityForums />
        <LegalProfessionalNetwork />
      </div>
    </DashboardShell>
  )
}

