import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { MobileMenu } from "@/components/mobile-menu"
import { NotificationSystem } from "@/components/notification-system"

const navItems = [
  { href: "/dashboard", title: "Dashboard" },
  { href: "/cases", title: "Cases" },
  { href: "/documents", title: "Documents" },
  { href: "/user-experience", title: "User Experience" },
  { href: "/privacy-security", title: "Privacy & Security" },
]

export function Header() {
  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">JusticeForAll</Link>
        <nav className="hidden md:flex space-x-4 items-center">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:underline">
              {item.title}
            </Link>
          ))}
          <NotificationSystem />
          <ThemeToggle />
          <Button asChild variant="outline">
            <Link href="/login">Login</Link>
          </Button>
        </nav>
        <div className="flex items-center md:hidden">
          <NotificationSystem />
          <ThemeToggle />
          <MobileMenu items={navItems} />
        </div>
      </div>
    </header>
  )
}

