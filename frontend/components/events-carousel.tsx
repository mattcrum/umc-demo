"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Calendar, Clock, MapPin, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"

// Mock data - in a real app, this would come from Sanity
const upcomingEvents = [
  {
    id: "1",
    title: "Community Christmas Concert",
    description: "Join us for an evening of beautiful Christmas music performed by our choir and local musicians.",
    date: new Date("2024-12-15T19:00:00"),
    location: "Main Sanctuary",
    category: "Worship",
    image: "/events/christmas-concert.jpg",
    registrationRequired: true,
    capacity: 200,
    attendees: 45
  },
  {
    id: "2",
    title: "Youth Winter Retreat",
    description: "A weekend getaway for teens focused on fellowship, worship, and spiritual growth.",
    date: new Date("2024-12-20T18:00:00"),
    endDate: new Date("2024-12-22T12:00:00"),
    location: "Camp Renewal",
    category: "Youth",
    image: "/events/youth-retreat.jpg",
    registrationRequired: true,
    capacity: 50,
    attendees: 32
  },
  {
    id: "3",
    title: "New Year's Eve Service",
    description: "Ring in the new year with worship, reflection, and communion as we celebrate God's faithfulness.",
    date: new Date("2024-12-31T22:00:00"),
    location: "Main Sanctuary",
    category: "Worship",
    image: "/events/new-years-eve.jpg",
    registrationRequired: false
  },
  {
    id: "4",
    title: "Adult Bible Study",
    description: "Weekly study focusing on the Gospel of John. All adults welcome, no prior knowledge needed.",
    date: new Date("2024-12-05T19:00:00"),
    location: "Fellowship Hall",
    category: "Study",
    image: "/events/bible-study.jpg",
    registrationRequired: false,
    recurring: "Weekly"
  },
  {
    id: "5",
    title: "Food Pantry Volunteer Day",
    description: "Help serve our community by sorting and distributing food to families in need.",
    date: new Date("2024-12-07T09:00:00"),
    location: "Community Center",
    category: "Service",
    image: "/events/food-pantry.jpg",
    registrationRequired: true,
    capacity: 30,
    attendees: 18
  }
]

const categoryColors = {
  Worship: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Youth: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  Study: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  Service: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  Fellowship: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200"
}

export function EventsCarousel() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Upcoming Events
            </h2>
            <p className="text-muted-foreground text-lg">
              Join us for these upcoming opportunities to worship, learn, and serve together.
            </p>
          </div>
          <Button variant="outline" asChild className="hidden md:flex">
            <Link href="/events">View All Events</Link>
          </Button>
        </div>

        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {upcomingEvents.map((event) => {
              const eventDate = format(event.date, "MMM d")
              const eventTime = format(event.date, "h:mm a")
              
              return (
                <CarouselItem key={event.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full group hover:shadow-lg transition-all duration-200">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <div className="w-full h-48 bg-gradient-to-br from-green-100 via-teal-50 to-blue-100 dark:from-gray-600 dark:via-gray-700 dark:to-gray-800 group-hover:scale-105 transition-transform duration-200" />
                      <div className="absolute top-4 left-4">
                        <Badge className={categoryColors[event.category as keyof typeof categoryColors] || "bg-gray-100 text-gray-800"}>
                          {event.category}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4 bg-white dark:bg-gray-900 rounded-lg p-2 text-center min-w-[3rem]">
                        <div className="text-xs font-medium text-muted-foreground">
                          {format(event.date, "MMM")}
                        </div>
                        <div className="text-lg font-bold">
                          {format(event.date, "d")}
                        </div>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                            {event.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {event.description}
                          </p>
                        </div>

                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {eventDate} {event.endDate && `- ${format(event.endDate, "MMM d")}`}
                              {event.recurring && ` (${event.recurring})`}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{eventTime}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{event.location}</span>
                          </div>
                          {event.capacity && (
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              <span>
                                {event.attendees || 0}/{event.capacity} registered
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button size="sm" asChild className="flex-1">
                            <Link href={`/events/${event.id}`}>
                              {event.registrationRequired ? "Register" : "Learn More"}
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              )
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>

        {/* Mobile View All Button */}
        <div className="flex justify-center mt-8 md:hidden">
          <Button variant="outline" asChild>
            <Link href="/events">View All Events</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}