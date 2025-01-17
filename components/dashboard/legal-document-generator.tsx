'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from 'lucide-react'

const formSchema = z.object({
  documentType: z.string({
    required_error: "Please select a document type.",
  }),
  jurisdiction: z.string({
    required_error: "Please select a jurisdiction.",
  }),
  parties: z.array(z.object({
    name: z.string().min(1, "Name is required"),
    role: z.string().min(1, "Role is required"),
  })).min(1, "At least one party is required"),
  details: z.string().min(10, {
    message: "Details must be at least 10 characters.",
  }),
})

export function LegalDocumentGenerator({ className }: React.ComponentProps<"div">) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedDocument, setGeneratedDocument] = useState<string | null>(null)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      parties: [{ name: '', role: '' }],
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsGenerating(true)
    setGeneratedDocument(null)

    try {
      const response = await fetch('/api/generate-document', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error('Failed to generate document')
      }

      const data = await response.json()
      setGeneratedDocument(data.document)
      toast({
        title: "Document Generated",
        description: "Your legal document has been generated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate document. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Legal Document Generator</CardTitle>
        <CardDescription>Create customized legal documents based on your needs</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="documentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Document Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a document type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="will">Will</SelectItem>
                      <SelectItem value="powerOfAttorney">Power of Attorney</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose the type of legal document you need.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jurisdiction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jurisdiction</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a jurisdiction" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="california">California</SelectItem>
                      <SelectItem value="newyork">New York</SelectItem>
                      <SelectItem value="texas">Texas</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the jurisdiction for this document.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.watch('parties').map((_, index) => (
              <div key={index} className="space-y-4">
                <FormField
                  control={form.control}
                  name={`parties.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{`Party ${index + 1} Name`}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`parties.${index}.role`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{`Party ${index + 1} Role`}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => form.setValue('parties', [...form.watch('parties'), { name: '', role: '' }])}
            >
              Add Party
            </Button>
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Document Details</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide specific details for your document..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Include any specific information or clauses you want in the document.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isGenerating}>
              {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isGenerating ? "Generating..." : "Generate Document"}
            </Button>
          </form>
        </Form>
        {generatedDocument && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Generated Document:</h3>
            <div className="bg-muted p-4 rounded-md">
              <pre className="whitespace-pre-wrap">{generatedDocument}</pre>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

