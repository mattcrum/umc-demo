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
  Globe,
  BookOpen,
  Handshake,
  Calendar,
  Clock,
  MapPin,
  Mail,
  Phone,
  ArrowRight
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const ministries = [
  {
    id: "children",
    title: "Children's Ministry",
    description: "Nurturing young hearts to know and love Jesus through age-appropriate worship, learning, and fun activities. Our children's programs focus on building a strong foundation of faith while creating lasting friendships.",
    icon: Baby,
    image: "/ministries/children.jpg",
    ageRange: "Birth - 5th Grade",
    meetingTime: "Sundays during worship services",
    location: "Children's Wing",
    programs: [
      "Sunday School (Ages 3-11)",
      "Children's Church",
      "Vacation Bible School", 
      "Children's Choir",
      "Family Fun Nights",
      "Holiday Programs"
    ],
    contact: {
      leader: "Sarah Martinez",
      email: "children@church.com",
      phone: "(555) 123-4567"
    },
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-950"
  },
  {
    id: "youth",
    title: "Youth Ministry",
    description: "Empowering teens to grow in faith, build lasting friendships, and discover their purpose in God's plan. We provide a safe space for questions, growth, and authentic community.",
    icon: GraduationCap,
    image: "/ministries/youth.jpg",
    ageRange: "6th - 12th Grade",
    meetingTime: "Sundays 6:00 PM",
    location: "Youth Center",
    programs: [
      "Sunday Youth Group",
      "Wednesday Night Bible Study",
      "Confirmation Classes",
      "Mission Trips",
      "Youth Retreats",
      "Game Nights & Social Events"
    ],
    contact: {
      leader: "Pastor Mike Johnson",
      email: "youth@church.com", 
      phone: "(555) 234-5678"
    },
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-50 dark:bg-green-950"
  },
  {
    id: "adults",
    title: "Adult Ministries",
    description: "Growing together in faith through Bible study, fellowship, and opportunities to serve our community. We offer various ways for adults to connect and deepen their spiritual journey.",
    icon: Users,
    image: "/ministries/adults.jpg",
    ageRange: "18+",
    meetingTime: "Various times throughout the week",
    location: "Fellowship Hall & Classrooms",
    programs: [
      "Sunday School Classes",
      "Bible Study Groups",
      "Men's Ministry",
      "Women's Ministry", 
      "Young Adults Group",
      "Book Clubs & Discussion Groups"
    ],
    contact: {
      leader: "Jennifer Wilson",
      email: "adults@church.com",
      phone: "(555) 345-6789"
    },
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-50 dark:bg-purple-950"
  },
  {
    id: "seniors",
    title: "Senior Ministry",
    description: "Celebrating the wisdom and experience of our seasoned members through fellowship, continued growth, and meaningful connections with all generations.",
    icon: Heart,
    image: "/ministries/seniors.jpg",
    ageRange: "55+",
    meetingTime: "Thursdays 10:00 AM",
    location: "Senior Fellowship Hall",
    programs: [
      "Weekly Fellowship Meetings",
      "Bible Study",
      "Monthly Luncheons",
      "Day Trips & Outings",
      "Craft Groups",
      "Intergenerational Events"
    ],
    contact: {
      leader: "Dorothy Thompson",
      email: "seniors@church.com",
      phone: "(555) 456-7890"
    },
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-50 dark:bg-orange-950"
  },
  {
    id: "music",
    title: "Music Ministry",
    description: "Leading worship through song and creating opportunities for musical expression in service to God. All skill levels welcome in our various musical ensembles.",
    icon: Music,
    image: "/ministries/music.jpg",
    ageRange: "All Ages",
    meetingTime: "Wednesdays 7:00 PM",
    location: "Sanctuary & Music Room",
    programs: [
      "Adult Choir",
      "Praise & Worship Team",
      "Handbell Choir",
      "Children's Music Program",
      "Youth Band",
      "Special Music Events"
    ],
    contact: {
      leader: "David Chen",
      email: "music@church.com",
      phone: "(555) 567-8901"
    },
    color: "text-indigo-600 dark:text-indigo-400",
    bgColor: "bg-indigo-50 dark:bg-indigo-950"
  },
  {
    id: "outreach",
    title: "Outreach & Missions",
    description: "Serving our local community and supporting global missions to share God's love with those in need. Making a difference both locally and internationally.",
    icon: Globe,
    image: "/ministries/outreach.jpg",
    ageRange: "All Ages",
    meetingTime: "Monthly meetings, 2nd Saturday",
    location: "Community Center & Various Locations",
    programs: [
      "Community Food Pantry",
      "Homeless Shelter Meals",
      "International Mission Support",
      "Local Service Projects",
      "Disaster Relief Efforts",
      "Community Garden"
    ],
    contact: {
      leader: "Maria Rodriguez",
      email: "outreach@church.com",
      phone: "(555) 678-9012"
    },
    color: "text-teal-600 dark:text-teal-400",
    bgColor: "bg-teal-50 dark:bg-teal-950"
  }
]

const specialPrograms = [
  {
    id: "grief-support",
    title: "Grief Support",
    description: "A caring community for those walking through loss and finding hope in difficult times.",
    icon: HandHeart,
    meetingTime: "Mondays 7:00 PM",
    contact: "Pastor Sarah",
    color: "text-pink-600 dark:text-pink-400"
  },
  {
    id: "fellowship-meals",
    title: "Fellowship Meals",
    description: "Monthly community dinners bringing people together around food and fellowship.",
    icon: Coffee,
    meetingTime: "First Sunday of each month",
    contact: "Fellowship Committee",
    color: "text-amber-600 dark:text-amber-400"
  },
  {
    id: "small-groups",
    title: "Small Groups",
    description: "Intimate gatherings for deeper Bible study, prayer, and authentic community.",
    icon: BookOpen,
    meetingTime: "Various times and locations",
    contact: "Small Groups Coordinator",
    color: "text-emerald-600 dark:text-emerald-400"
  },
  {
    id: "volunteer-coordination",
    title: "Volunteer Coordination",
    description: "Connecting people with opportunities to serve and make a difference in our community.",
    icon: Handshake,
    meetingTime: "As needed",
    contact: "Volunteer Coordinator",
    color: "text-rose-600 dark:text-rose-400"
  }
]

export function MinistriesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 to-primary/5 py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Ministries & Programs
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              From cradle to grave, we have ministries designed to help you grow in faith, 
              connect with others, and discover your unique calling to serve.
            </p>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>All Ages Welcome</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Weekly Programs</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                <span>Community Focused</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-12">
        {/* Main Ministries */}
        <div className="space-y-12">
          {ministries.map((ministry, index) => {
            const Icon = ministry.icon
            const isEven = index % 2 === 0
            
            return (
              <div key={ministry.id} className={`grid gap-8 lg:grid-cols-2 items-center ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}>
                {/* Image */}
                <div className={`relative h-96 overflow-hidden rounded-lg ${!isEven ? 'lg:col-start-2' : ''}`}>
                  <Image
                    src={ministry.image}
                    alt={ministry.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <Badge className={`${ministry.bgColor} ${ministry.color} border-0 mb-2`}>
                      {ministry.ageRange}
                    </Badge>
                    <h2 className="text-white text-2xl font-bold">{ministry.title}</h2>
                  </div>
                </div>

                {/* Content */}
                <div className={`space-y-6 ${!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-3 rounded-lg ${ministry.bgColor}`}>
                        <Icon className={`h-6 w-6 ${ministry.color}`} />
                      </div>
                      <h2 className="text-3xl font-bold">{ministry.title}</h2>
                    </div>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {ministry.description}
                    </p>
                  </div>

                  {/* Meeting Info */}
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{ministry.meetingTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{ministry.location}</span>
                    </div>
                  </div>

                  {/* Programs */}
                  <div>
                    <h3 className="font-semibold mb-3">Programs & Activities:</h3>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {ministry.programs.map((program) => (
                        <div key={program} className="flex items-center gap-2 text-sm">
                          <ArrowRight className="h-3 w-3 text-primary" />
                          <span>{program}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contact & CTA */}
                  <Card className={ministry.bgColor}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium mb-1">Ministry Leader</div>
                          <div className="text-sm text-muted-foreground mb-2">{ministry.contact.leader}</div>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              <span>{ministry.contact.email}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              <span>{ministry.contact.phone}</span>
                            </div>
                          </div>
                        </div>
                        <Button asChild>
                          <Link href={`/ministries/${ministry.id}`}>
                            Learn More
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )
          })}
        </div>

        {/* Special Programs */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Special Programs</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Additional opportunities for connection, growth, and support within our church community.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {specialPrograms.map((program) => {
              const Icon = program.icon
              return (
                <Card key={program.id} className="group hover:shadow-lg transition-all duration-200">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4">
                      <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <Icon className={`h-6 w-6 ${program.color} group-hover:scale-110 transition-transform`} />
                      </div>
                    </div>
                    <h3 className="font-semibold mb-2">{program.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {program.description}
                    </p>
                    <div className="space-y-2 text-xs text-muted-foreground">
                      <div className="flex items-center justify-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{program.meetingTime}</span>
                      </div>
                      <div>Contact: {program.contact}</div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Get Involved CTA */}
        <div className="mt-20">
          <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Involved?</h2>
              <p className="text-lg mb-8 opacity-90 max-w-3xl mx-auto">
                Whether you're looking to serve, learn, or connect with others, 
                we have a place for you in our church family. Take the next step 
                in your faith journey with us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/volunteer">Find Volunteer Opportunities</Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary" asChild>
                  <Link href="/connect">Get Connected</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}