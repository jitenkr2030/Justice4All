'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from 'lucide-react'

export function ESignatureIntegration() {
  const [documentUrl, setDocumentUrl] = useState('')
  const [signerEmail, setSignerEmail] = useState('')
  const [isSending, setIsSending] = useState(false)
  const { toast } = useToast()

  const handleSendForSignature = async () => {
    if (!documentUrl.trim() || !signerEmail.trim()) {
      toast({
        title: "Error",
        description: "Please enter both document URL and signer email.",
        variant: "destructive",
      })
      return
    }

    setIsSending(true)

    try {
      const response = await fetch('/api/send-for-signature', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ documentUrl, signerEmail }),
      })

      if (!response.ok) {
        throw new Error('Failed to send document for signature')
      }

      toast({
        title: "Success",
        description: "Document sent for e-signature successfully.",
      })
    } catch (error) {
      console.error('Error sending document for signature:', error)
      toast({
        title: "Error",
        description: "Failed to send document for signature. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>E-Signature Integration</CardTitle>
        <CardDescription>Send documents for digital signature</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="documentUrl">Document URL</Label>
            <Input
              id="documentUrl"
              placeholder="Enter the URL of the document to be signed"
              value={documentUrl}
              onChange={(e) => setDocumentUrl(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signerEmail">Signer's Email</Label>
            <Input
              id="signerEmail"
              type="email"
              placeholder="Enter the email of the signer"
              value={signerEmail}
              onChange={(e) => setSignerEmail(e.target.value)}
            />
          </div>
          <Button onClick={handleSendForSignature} disabled={isSending}>
            {isSending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSending ? "Sending..." : "Send for Signature"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

