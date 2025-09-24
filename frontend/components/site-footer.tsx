import Link from "next/link"
import { Church, Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

interface SiteFooterProps {
  churchName?: string
  phone?: string
  email?: string
  address?: string
  socialLinks?: {
    facebook?: string
    instagram?: string
    youtube?: string
  }
}

export function SiteFooter({
  churchName = "First United Methodist Church",
  phone,
  email,
  address,
  socialLinks = {}
}: SiteFooterProps) {
  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Service Times", href: "/worship" },
    { name: "Ministries", href: "/ministries" },
    { name: "Events", href: "/events" },
    { name: "Sermons", href: "/sermons" },
    { name: "Contact", href: "/contact" },
  ]

  const ministryLinks = [
    { name: "Children's Ministry", href: "/ministries/children" },
    { name: "Youth Ministry", href: "/ministries/youth" },
    { name: "Adult Ministry", href: "/ministries/adults" },
    { name: "Senior Ministry", href: "/ministries/seniors" },
    { name: "Outreach", href: "/ministries/outreach" },
    { name: "Music Ministry", href: "/ministries/music" },
  ]

  const resourceLinks = [
    { name: "Prayer Requests", href: "/prayer" },
    { name: "Resource Library", href: "/resources" },
    { name: "Study Guides", href: "/resources/study-guides" },
    { name: "Give Online", href: "/give" },
    { name: "Plan Your Visit", href: "/visit" },
    { name: "Volunteer", href: "/volunteer" },
  ]

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Church Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Church className="h-6 w-6" />
              <span className="font-semibold text-lg">{churchName}</span>
            </div>
            
            <div className="space-y-2 text-sm text-muted-foreground">
              {address && (
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{address}</span>
                </div>
              )}
              {phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{phone}</span>
                </div>
              )}
              {email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>{email}</span>
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="flex gap-2">
              {socialLinks.facebook && (
                <Button variant="outline" size="icon" asChild>
                  <Link href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                    <Facebook className="h-4 w-4" />
                    <span className="sr-only">Facebook</span>
                  </Link>
                </Button>
              )}
              {socialLinks.instagram && (
                <Button variant="outline" size="icon" asChild>
                  <Link href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                    <Instagram className="h-4 w-4" />
                    <span className="sr-only">Instagram</span>
                  </Link>
                </Button>
              )}
              {socialLinks.youtube && (
                <Button variant="outline" size="icon" asChild>
                  <Link href={socialLinks.youtube} target="_blank" rel="noopener noreferrer">
                    <Youtube className="h-4 w-4" />
                    <span className="sr-only">YouTube</span>
                  </Link>
                </Button>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ministries */}
          <div>
            <h3 className="font-semibold mb-4">Ministries</h3>
            <ul className="space-y-2 text-sm">
              {ministryLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="font-semibold mb-4">Stay Connected</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to our newsletter for updates on events, sermons, and church news.
            </p>
            <form className="space-y-2">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full"
              />
              <Button type="submit" className="w-full">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div>
            <p>&copy; {new Date().getFullYear()} {churchName}. All rights reserved.</p>
          </div>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}