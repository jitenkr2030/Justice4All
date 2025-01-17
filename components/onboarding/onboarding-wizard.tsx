"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const steps = [
  {
    title: "Welcome to JusticeForAll",
    description: "Let's get you started with our platform.",
    content: "JusticeForAll is designed to make legal services accessible to everyone. We'll guide you through the main features of our platform."
  },
  {
    title: "Create Your Profile",
    description: "Set up your personal information and legal needs.",
    content: "Your profile helps us tailor our services to your specific needs. You can always update this information later."
  },
  {
    title: "Explore Legal Resources",
    description: "Access our comprehensive legal library and AI-powered research tools.",
    content: "Our platform provides a wealth of legal information and resources. Use our AI-powered search to find relevant laws, cases, and articles."
  },
  {
    title: "Get Legal Assistance",
    description: "Connect with legal professionals or use our AI chatbot.",
    content: "Whether you need quick answers or in-depth consultation, we've got you covered with our AI chatbot and network of legal professionals."
  },
  {
    title: "Manage Your Cases",
    description: "Track and organize your legal matters.",
    content: "Use our case management system to keep all your legal documents, tasks, and communications in one place."
  }
]

export function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>{steps[currentStep].title}</CardTitle>
        <CardDescription>{steps[currentStep].description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{steps[currentStep].content}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handlePrevious} disabled={currentStep === 0}>Previous</Button>
        <Button onClick={handleNext} disabled={currentStep === steps.length - 1}>
          {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </CardFooter>
    </Card>
  )
}

