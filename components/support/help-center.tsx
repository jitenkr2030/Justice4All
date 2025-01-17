"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: "How do I create a new case?",
    answer: "To create a new case, navigate to the 'Cases' section in your dashboard and click on the 'New Case' button. Fill in the required information and submit the form."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept various payment methods including credit/debit cards, PayPal, and bank transfers. You can manage your payment options in the 'Billing' section of your account settings."
  },
  {
    question: "How can I schedule a consultation with a lawyer?",
    answer: "To schedule a consultation, go to the 'Consultations' tab in your dashboard. Choose your preferred date and time, and select the type of consultation (video, phone, or in-person). Confirm your booking, and you'll receive a confirmation email with further details."
  },
  // Add more FAQs as needed
]

export function HelpCenter() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <HelpCircle className="mr-2" />
          Help Center
        </CardTitle>
        <CardDescription>Find answers to common questions and learn how to use our platform</CardDescription>
      </CardHeader>
      <CardContent>
        <Input
          placeholder="Search FAQs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4"
        />
        <ScrollArea className="h-[400px]">
          <Accordion type="single" collapsible className="w-full">
            {filteredFAQs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">View All Help Articles</Button>
      </CardFooter>
    </Card>
  )
}

