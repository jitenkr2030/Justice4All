"use client"

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { getStripe } from '@/lib/stripe'

// ... (services array remains unchanged)

export function PayPerService() {
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handlePayment = async (serviceName: string, price: string) => {
    if (!session) {
      toast({
        title: "Error",
        description: "You must be logged in to purchase a service.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const amount = parseFloat(price.replace('$', '')) * 100 // Convert to cents
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, currency: 'usd' }),
      })

      const { clientSecret } = await response.json()
      const stripe = await getStripe()
      const { error } = await stripe!.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      })

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Success",
          description: `Successfully purchased ${serviceName}`,
        })
      }
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {services.map((service) => (
        <Card key={service.name}>
          <CardHeader>
            <CardTitle>{service.name}</CardTitle>
            <CardDescription>{service.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{service.price}</p>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              onClick={() => handlePayment(service.name, service.price)}
              disabled={isLoading}
            >
              Purchase
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

