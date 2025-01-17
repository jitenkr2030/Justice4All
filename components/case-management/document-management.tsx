'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"

interface Document {
  id: string
  name: string
  fileUrl: string
  uploadedAt: string
}

export function DocumentManagement({ caseId }: { caseId: string }) {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch(`/api/cases/${caseId}/documents`)
        if (response.ok) {
          const data = await response.json()
          setDocuments(data.documents)
        } else {
          throw new Error('Failed to fetch documents')
        }
      } catch (error) {
        console.error('Error fetching documents:', error)
        toast({
          title: "Error",
          description: "Failed to load documents. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchDocuments()
  }, [caseId, toast])

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch(`/api/cases/${caseId}/documents`, {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const newDocument = await response.json()
        setDocuments([...documents, newDocument])
        toast({
          title: "Success",
          description: "Document uploaded successfully.",
        })
      } else {
        throw new Error('Failed to upload document')
      }
    } catch (error) {
      console.error('Error uploading document:', error)
      toast({
        title: "Error",
        description: "Failed to upload document. Please try again.",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  if (loading) {
    return <div>Loading documents...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Document Management</CardTitle>
        <CardDescription>Upload and manage case-related documents</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input
            type="file"
            onChange={handleFileUpload}
            disabled={uploading}
          />
          {uploading && <p>Uploading...</p>}
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Document Name</TableHead>
              <TableHead>Uploaded At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell>{doc.name}</TableCell>
                <TableCell>{new Date(doc.uploadedAt).toLocaleString()}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" asChild>
                    <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer">View</a>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

