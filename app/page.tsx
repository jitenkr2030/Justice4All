import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Scale, Users, FileText, MessageCircle, TrendingUp } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Welcome to JusticeForAll</h1>
            <p className="text-xl mb-8">Empowering individuals with accessible legal solutions</p>
            <div className="space-x-4">
              <Button asChild size="lg">
                <Link href="/register">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Scale className="w-12 h-12 text-blue-600" />}
              title="AI-Powered Legal Assistance"
              description="Get instant answers to your legal questions with our advanced AI chatbot."
            />
            <FeatureCard
              icon={<FileText className="w-12 h-12 text-blue-600" />}
              title="Document Automation"
              description="Create and review legal documents with ease using our smart tools."
            />
            <FeatureCard
              icon={<Users className="w-12 h-12 text-blue-600" />}
              title="Expert Consultations"
              description="Connect with experienced legal professionals for personalized advice."
            />
            <FeatureCard
              icon={<MessageCircle className="w-12 h-12 text-blue-600" />}
              title="Community Support"
              description="Join our forums to connect with others facing similar legal challenges."
            />
            <FeatureCard
              icon={<CheckCircle className="w-12 h-12 text-blue-600" />}
              title="Case Management"
              description="Efficiently manage your legal cases, documents, and deadlines in one place."
            />
            <FeatureCard
              icon={<TrendingUp className="w-12 h-12 text-blue-600" />}
              title="Legal Analytics"
              description="Gain insights into legal trends and outcomes to make informed decisions."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8">Join thousands of users who have already benefited from our platform.</p>
          <Button asChild size="lg">
            <Link href="/register">Sign Up Now</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-4">
          {icon}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  )
}

