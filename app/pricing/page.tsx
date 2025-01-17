import { Metadata } from 'next'
import { PricingPlans } from '@/components/pricing/pricing-plans'
import { PayPerService } from '@/components/pricing/pay-per-service'

export const metadata: Metadata = {
  title: 'Pricing | JusticeForAll',
  description: 'Choose the right plan for your legal needs',
}

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Pricing Plans</h1>
      <PricingPlans />
      <h2 className="text-3xl font-bold mt-16 mb-8 text-center">Pay-Per-Service Options</h2>
      <PayPerService />
    </div>
  )
}

