"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Church, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

const navigation = [
  {
    name: "About",
    href: "/about",
    children: [
      { name: "Our Story", href: "/about" },
      { name: "Leadership", href: "/about/leadership" },
      { name: "What We Believe", href: "/about/beliefs" },
      { name: "Visit Us", href: "/visit" },
    ],
  },
  {
    name: "Worship",
    href: "/worship",
    children: [
      { name: "Service Times", href: "/worship" },
      { name: "Sermons", href: "/sermons" },
      { name: "Music Ministry", href: "/ministries/music" },
      { name: "Special Events", href: "/events" },
    ],
  },
  {
    name: "Ministries",
    href: "/ministries",
    children: [
      { name: "All Ministries", href: "/ministries" },
      { name: "Children", href: "/ministries/children" },
      { name: "Youth", href: "/ministries/youth" },
      { name: "Adults", href: "/ministries/adults" },
      { name: "Seniors", href: "/ministries/seniors" },
      { name: "Outreach", href: "/ministries/outreach" },
    ],
  },
  {
    name: "Connect",
    href: "/connect",
    children: [
      { name: "Get Connected", href: "/connect" },
      { name: "Events", href: "/events" },
      { name: "Small Groups", href: "/ministries/small-groups" },
      { name: "Volunteer", href: "/volunteer" },
    ],
  },
  {
    name: "Resources",
    href: "/resources",
    children: [
      { name: "Resource Library", href: "/resources" },
      { name: "Sermons", href: "/sermons" },
      { name: "Study Guides", href: "/resources/study-guides" },
      { name: "Prayer Requests", href: "/prayer" },
    ],
  },
]

interface SiteHeaderProps {
  churchName?: string
  phone?: string
  address?: string
}

export function SiteHeader({ 
  churchName = "First United Methodist Church",
  phone,
  address 
}: SiteHeaderProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top contact bar */}
      {(phone || address) && (
        <div className="border-b bg-muted/50">
          <div className="container flex h-10 items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              {phone && (
                <div className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  <span>{phone}</span>
                </div>
              )}
              {address && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{address}</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}

      <div className="container flex h-16 items-center">
        {/* Logo and Church Name */}
        <Link href="/" className="flex items-center gap-2 mr-6">
          <Church className="h-8 w-8" />
          <span className="font-bold text-lg">{churchName}</span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {navigation.map((item) => (
              <NavigationMenuItem key={item.name}>
                <NavigationMenuTrigger>{item.name}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    {item.children.map((child) => (
                      <ListItem
                        key={child.name}
                        title={child.name}
                        href={child.href}
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop CTA Buttons */}
        <div className="ml-auto hidden md:flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/visit">Plan Your Visit</Link>
          </Button>
          <Button asChild>
            <Link href="/give">Give Online</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden ml-auto">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 border-b pb-4">
                <Church className="h-6 w-6" />
                <span className="font-semibold">{churchName}</span>
              </div>
              
              <nav className="flex flex-col gap-2">
                {navigation.map((item) => (
                  <div key={item.name} className="space-y-2">
                    <h3 className="font-semibold text-sm px-2 py-1 bg-muted rounded">
                      {item.name}
                    </h3>
                    <div className="pl-2 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-2 py-1 text-sm hover:bg-muted rounded"
                          onClick={() => setIsOpen(false)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </nav>

              <div className="flex flex-col gap-2 pt-4 border-t">
                <Button asChild className="w-full">
                  <Link href="/visit" onClick={() => setIsOpen(false)}>
                    Plan Your Visit
                  </Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/give" onClick={() => setIsOpen(false)}>
                    Give Online
                  </Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

const ListItem = ({ title, href, ...props }: { title: string; href: string }) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}