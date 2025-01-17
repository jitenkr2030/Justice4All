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
  formType: z.string({
    required_error: "Please select a form type.",
  }),
  userInfo: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
  }),
  additionalInfo: z.string().optional(),
})

export function FormCompletionAssistance() {
  const [isAssisting, setIsAssisting] = useState(false)
  const [assistedForm, setAssistedForm] = useState<string | null>(null)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsAssisting(true)
    setAssistedForm(null)

    try {
      const response = await fetch('/api/assist-form-completion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error('Failed to assist with form completion')
      }

      const data = await response.json()
      setAssistedForm(data.assistedForm)
      toast({
        title: "Form Assisted",
        description: "Your form has been completed with AI assistance.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to assist with form completion. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsAssisting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Form Completion Assistance</CardTitle>
        <CardDescription>Get AI-powered assistance in filling out legal forms</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="formType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Form Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a form type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="divorceApplication">Divorce Application</SelectItem>
                      <SelectItem value="smallClaimsFiling">Small Claims Filing</SelectItem>
                      <SelectItem value="bankruptcyPetition">Bankruptcy Petition</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose the type of legal form you need assistance with.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userInfo.name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userInfo.email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userInfo.phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="additionalInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Information</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide any additional details that might be relevant..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Include any specific information that might help in completing the form.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isAssisting}>
              {isAssisting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isAssisting ? "Assisting..." : "Get Assistance"}
            </Button>
          </form>
        </Form>
        {assistedForm && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Assisted Form:</h3>
            <div className="bg-muted p-4 rounded-md">
              <pre className="whitespace-pre-wrap">{assistedForm}</pre>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

