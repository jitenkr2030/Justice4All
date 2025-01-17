"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  totpCode: z.string().optional(),
})

export function LoginForm() {
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const [requiresMFA, setRequiresMFA] = React.useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      totpCode: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const signInResult = await signIn("credentials", {
      email: values.email,
      password: values.password,
      totpCode: values.totpCode,
      redirect: false,
    })

    if (signInResult?.error === "MFA_REQUIRED") {
      setRequiresMFA(true)
      toast({
        title: "MFA Required",
        description: "Please enter your MFA code to continue.",
      })
    } else if (signInResult?.error) {
      toast({
        title: "Error",
        description: "Invalid email or password",
        variant: "destructive",
      })
    } else {
      const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"
      window.location.replace(callbackUrl)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="m@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {requiresMFA && (
          <FormField
            control={form.control}
            name="totpCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>MFA Code</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your MFA code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </form>
    </Form>
  )
}

