import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Resource {
  id: string
  title: string
  description: string
  link: string
}

const resources: Resource[] = [
  { id: '1', title: 'Understanding Divorce Laws', description: 'A comprehensive guide to divorce proceedings', link: '#' },
  { id: '2', title: 'Property Rights Explained', description: 'Learn about your rights in property disputes', link: '#' },
  { id: '3', title: 'Guide to Writing a Will', description: 'Step-by-step instructions for creating a valid will', link: '#' },
]

interface ResourceCenterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ResourceCenter({ className, ...props }: ResourceCenterProps) {
  return (
    <Card className={cn(className)} {...props}>
      <CardHeader>
        <CardTitle>Resource Center</CardTitle>
        <CardDescription>Access helpful legal resources and guides</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {resources.map(resource => (
            <Card key={resource.id}>
              <CardHeader>
                <CardTitle>{resource.title}</CardTitle>
                <CardDescription>{resource.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <a href={resource.link}>Read More</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

