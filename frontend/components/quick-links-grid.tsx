import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Clock, Users, Heart, Calendar, Book, Handshake, Gift } from "lucide-react"

const quickLinks = [
  {
    title: "Find a Church",
    description: "Discover our locations and service times",
    icon: MapPin,
    href: "/locations",
    color: "text-blue-600 dark:text-blue-400"
  },
  {
    title: "Service Times",
    description: "Join us for worship every Sunday",
    icon: Clock,
    href: "/worship",
    color: "text-green-600 dark:text-green-400"
  },
  {
    title: "I'm New",
    description: "Learn about our church and plan your visit",
    icon: Users,
    href: "/visit",
    color: "text-purple-600 dark:text-purple-400"
  },
  {
    title: "Give",
    description: "Support our ministry and mission",
    icon: Gift,
    href: "/give",
    color: "text-red-600 dark:text-red-400"
  },
  {
    title: "Events",
    description: "Stay connected with upcoming activities",
    icon: Calendar,
    href: "/events",
    color: "text-orange-600 dark:text-orange-400"
  },
  {
    title: "Ministries",
    description: "Find ways to serve and grow",
    icon: Handshake,
    href: "/ministries",
    color: "text-teal-600 dark:text-teal-400"
  },
  {
    title: "Sermons",
    description: "Listen to recent messages and series",
    icon: Book,
    href: "/sermons",
    color: "text-indigo-600 dark:text-indigo-400"
  },
  {
    title: "Care & Support",
    description: "Find help and pastoral care",
    icon: Heart,
    href: "/care",
    color: "text-pink-600 dark:text-pink-400"
  }
]

export function QuickLinksGrid() {
  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How Can We Help You?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Whether you're looking to worship, serve, or connect, we're here to guide you on your journey of faith.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickLinks.map((link) => {
            const Icon = link.icon
            return (
              <Link key={link.title} href={link.href} className="group">
                <Card className="h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1 border-2 hover:border-primary/20">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 flex justify-center">
                      <div className="rounded-full bg-muted p-3 group-hover:bg-primary/10 transition-colors">
                        <Icon className={`h-6 w-6 ${link.color} group-hover:scale-110 transition-transform`} />
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      {link.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {link.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* Emergency Contact */}
        <div className="mt-12 text-center">
          <Card className="max-w-md mx-auto bg-muted/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-center mb-3">
                <Heart className="h-5 w-5 text-red-500 mr-2" />
                <h3 className="font-semibold">Need Immediate Help?</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Our pastoral care team is available 24/7 for emergencies.
              </p>
              <Link 
                href="tel:+1234567890"
                className="text-primary hover:underline font-medium"
              >
                Call (123) 456-7890
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}