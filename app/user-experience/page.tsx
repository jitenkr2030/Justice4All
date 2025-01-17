import { Metadata } from 'next'
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import { VoiceCommands } from '@/components/accessibility/voice-commands'
import { TextToSpeech } from '@/components/accessibility/text-to-speech'
import { NotificationSystem } from '@/components/notification-system'
import { UserFeedback } from '@/components/user-feedback'

export const metadata: Metadata = {
  title: 'User Experience | JusticeForAll',
  description: 'Enhance your experience with accessibility features and feedback options',
}

export default async function UserExperiencePage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="User Experience"
        text="Accessibility features and feedback options"
      />
      <div className="grid gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Accessibility Features</h2>
          <div className="space-y-4">
            <VoiceCommands />
            <TextToSpeech />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Notifications</h2>
          <NotificationSystem />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">User Feedback</h2>
          <UserFeedback />
        </div>
      </div>
    </DashboardShell>
  )
}

