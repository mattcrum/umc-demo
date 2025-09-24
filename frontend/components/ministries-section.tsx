import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Users, 
  Baby, 
  GraduationCap, 
  Heart, 
  Music, 
  HandHeart,
  Coffee,
  Globe
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const ministryHighlights = [
  {
    id: "children",
    title: "Children's Ministry",
    description: "Nurturing young hearts to know and love Jesus through age-appropriate worship, learning, and fun activities.",
    icon: Baby,
    image: "/ministries/children.jpg",
    ageRange: "Birth - 5th Grade",
    meetingTime: "Sundays during worship",
    highlights: ["Sunday School", "VBS", "Children's Choir", "Family Events"],
    color: "text-blue-600 dark:text-blue-400"
  },
  {
    id: "youth",
    title: "Youth Ministry",
    description: "Empowering teens to grow in faith, build lasting friendships, and discover their purpose in God's plan.",
    icon: GraduationCap,
    image: "/ministries/youth.jpg",
    ageRange: "6th - 12th Grade",
    meetingTime: "Sundays 6:00 PM",
    highlights: ["Youth Group", "Mission Trips", "Confirmation", "Retreats"],
    color: "text-green-600 dark:text-green-400"
  },
  {
    id: "adults",
    title: "Adult Ministries",
    description: "Growing together in faith through Bible study, fellowship, and opportunities to serve our community.",
    icon: Users,
    image: "/ministries/adults.jpg",
    ageRange: "18+",
    meetingTime: "Various times",
    highlights: ["Bible Studies", "Small Groups", "Book Clubs", "Men's & Women's Groups"],
    color: "text-purple-600 dark:text-purple-400"
  },
  {
    id: "seniors",
    title: "Senior Ministry",
    description: "Celebrating the wisdom and experience of our seasoned members through fellowship and continued growth.",
    icon: Heart,
    image: "/ministries/seniors.jpg",
    ageRange: "55+",
    meetingTime: "Thursdays 10:00 AM",
    highlights: ["Senior Fellowship", "Bible Study", "Luncheons", "Day Trips"],
    color: "text-orange-600 dark:text-orange-400"
  },
  {
    id: "music",
    title: "Music Ministry",
    description: "Leading worship through song and creating opportunities for musical expression in service to God.",
    icon: Music,
    image: "/ministries/music.jpg",
    ageRange: "All Ages",
    meetingTime: "Wednesdays 7:00 PM",
    highlights: ["Adult Choir", "Praise Team", "Handbell Choir", "Children's Music"],
    color: "text-indigo-600 dark:text-indigo-400"
  },
  {
    id: "outreach",
    title: "Outreach & Missions",
    description: "Serving our local community and supporting global missions to share God's love with those in need.",
    icon: Globe,
    image: "/ministries/outreach.jpg",
    ageRange: "All Ages",
    meetingTime: "Monthly meetings",
    highlights: ["Food Pantry", "Mission Trips", "Community Service", "Global Partners"],
    color: "text-teal-600 dark:text-teal-400"
  }
]

const specialPrograms = [
  {
    title: "Grief Support",
    description: "A caring community for those walking through loss",
    icon: HandHeart,
    link: "/ministries/grief-support"
  },
  {
    title: "Fellowship Meals",
    description: "Monthly community dinners bringing people together",
    icon: Coffee,
    link: "/ministries/fellowship"
  }
]

export function MinistriesSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ministry Highlights
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            From cradle to grave, we have ministries designed to help you grow in faith, 
            connect with others, and discover your unique calling to serve.
          </p>
        </div>

        {/* Main Ministry Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {ministryHighlights.map((ministry) => {
            const Icon = ministry.icon
            return (
              <Card key={ministry.id} className="group hover:shadow-lg transition-all duration-200 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 via-primary/5 to-background group-hover:scale-105 transition-transform duration-200" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center gap-2 text-white mb-2">
                      <Icon className={`h-5 w-5 ${ministry.color}`} />
                      <Badge className="bg-white/20 text-white border-white/30">
                        {ministry.ageRange}
                      </Badge>
                    </div>
                    <h3 className="text-white font-semibold text-lg">
                      {ministry.title}
                    </h3>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {ministry.description}
                    </p>
                    
                    <div className="text-sm">
                      <div className="font-medium mb-1">Meeting Time:</div>
                      <div className="text-muted-foreground">{ministry.meetingTime}</div>
                    </div>

                    <div>
                      <div className="font-medium text-sm mb-2">Programs Include:</div>
                      <div className="flex flex-wrap gap-1">
                        {ministry.highlights.slice(0, 3).map((highlight) => (
                          <Badge key={highlight} variant="secondary" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                        {ministry.highlights.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{ministry.highlights.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <Button asChild className="w-full">
                      <Link href={`/ministries/${ministry.id}`}>
                        Learn More
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Special Programs */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-center">Special Programs</h3>
          <div className="grid gap-4 md:grid-cols-2 max-w-2xl mx-auto">
            {specialPrograms.map((program) => {
              const Icon = program.icon
              return (
                <Card key={program.title} className="group hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <Link href={program.link} className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium group-hover:text-primary transition-colors">
                          {program.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {program.description}
                        </p>
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Get Involved CTA */}
        <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Involved?</h3>
            <p className="mb-6 opacity-90 max-w-2xl mx-auto">
              Whether you're looking to serve, learn, or connect with others, 
              we have a place for you in our church family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" asChild>
                <Link href="/ministries">Explore All Ministries</Link>
              </Button>
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary" asChild>
                <Link href="/volunteer">Volunteer Opportunities</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}