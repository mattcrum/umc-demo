"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Search, 
  Filter,
  CalendarDays,
  ArrowUpDown
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { format, isAfter, isBefore, startOfDay, endOfDay } from "date-fns"

// Mock data - in a real app, this would come from Sanity
const allEvents = [
  {
    id: "1",
    title: "Community Christmas Concert",
    description: "Join us for an evening of beautiful Christmas music performed by our choir and local musicians. This annual concert features traditional carols and contemporary Christmas songs.",
    date: new Date("2024-12-15T19:00:00"),
    endDate: new Date("2024-12-15T21:00:00"),
    location: "Main Sanctuary",
    category: "Worship",
    image: "/events/christmas-concert.jpg",
    registrationRequired: true,
    capacity: 200,
    attendees: 45,
    cost: "Free",
    organizer: "Music Ministry"
  },
  {
    id: "2",
    title: "Youth Winter Retreat",
    description: "A weekend getaway for teens focused on fellowship, worship, and spiritual growth. Includes meals, lodging, and activities.",
    date: new Date("2024-12-20T18:00:00"),
    endDate: new Date("2024-12-22T12:00:00"),
    location: "Camp Renewal, Mountain View",
    category: "Youth",
    image: "/events/youth-retreat.jpg",
    registrationRequired: true,
    capacity: 50,
    attendees: 32,
    cost: "$75",
    organizer: "Youth Ministry"
  },
  {
    id: "3",
    title: "New Year's Eve Service",
    description: "Ring in the new year with worship, reflection, and communion as we celebrate God's faithfulness and look forward to the year ahead.",
    date: new Date("2024-12-31T22:00:00"),
    endDate: new Date("2025-01-01T00:30:00"),
    location: "Main Sanctuary",
    category: "Worship",
    image: "/events/new-years-eve.jpg",
    registrationRequired: false,
    cost: "Free",
    organizer: "Pastoral Team"
  },
  {
    id: "4",
    title: "Adult Bible Study",
    description: "Weekly study focusing on the Gospel of John. All adults welcome, no prior biblical knowledge needed. Study guides provided.",
    date: new Date("2024-12-05T19:00:00"),
    endDate: new Date("2024-12-05T20:30:00"),
    location: "Fellowship Hall",
    category: "Study",
    image: "/events/bible-study.jpg",
    registrationRequired: false,
    recurring: "Weekly (Thursdays)",
    cost: "Free",
    organizer: "Adult Ministry"
  },
  {
    id: "5",
    title: "Food Pantry Volunteer Day",
    description: "Help serve our community by sorting and distributing food to families in need. No experience necessary - training provided.",
    date: new Date("2024-12-07T09:00:00"),
    endDate: new Date("2024-12-07T12:00:00"),
    location: "Community Center",
    category: "Service",
    image: "/events/food-pantry.jpg",
    registrationRequired: true,
    capacity: 30,
    attendees: 18,
    cost: "Free",
    organizer: "Outreach Ministry"
  },
  {
    id: "6",
    title: "Children's Christmas Pageant",
    description: "Our annual Christmas pageant featuring children from our Sunday school program telling the nativity story through song and drama.",
    date: new Date("2024-12-22T10:00:00"),
    endDate: new Date("2024-12-22T11:00:00"),
    location: "Main Sanctuary",
    category: "Children",
    image: "/events/christmas-pageant.jpg",
    registrationRequired: false,
    cost: "Free",
    organizer: "Children's Ministry"
  },
  {
    id: "7",
    title: "Senior Luncheon",
    description: "Monthly fellowship lunch for our senior members with a guest speaker and time for connection and conversation.",
    date: new Date("2024-12-12T12:00:00"),
    endDate: new Date("2024-12-12T14:00:00"),
    location: "Fellowship Hall",
    category: "Fellowship",
    image: "/events/senior-luncheon.jpg",
    registrationRequired: true,
    capacity: 40,
    attendees: 28,
    cost: "$8",
    organizer: "Senior Ministry"
  },
  {
    id: "8",
    title: "Marriage Enrichment Workshop",
    description: "A one-day workshop for married couples focusing on communication, conflict resolution, and strengthening relationships.",
    date: new Date("2025-01-18T09:00:00"),
    endDate: new Date("2025-01-18T16:00:00"),
    location: "Fellowship Hall",
    category: "Adult",
    image: "/events/marriage-workshop.jpg",
    registrationRequired: true,
    capacity: 20,
    attendees: 12,
    cost: "$25 per couple",
    organizer: "Adult Ministry"
  }
]

const categories = [
  "All Categories",
  "Worship",
  "Youth", 
  "Study",
  "Service",
  "Children",
  "Fellowship",
  "Adult"
]

const sortOptions = [
  { value: "date-asc", label: "Date (Earliest First)" },
  { value: "date-desc", label: "Date (Latest First)" },
  { value: "title-asc", label: "Title (A-Z)" },
  { value: "title-desc", label: "Title (Z-A)" }
]

const categoryColors = {
  Worship: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Youth: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  Study: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  Service: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  Children: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
  Fellowship: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  Adult: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
}

export function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [sortBy, setSortBy] = useState("date-asc")
  const [timeFilter, setTimeFilter] = useState("upcoming")

  const filteredAndSortedEvents = useMemo(() => {
    let filtered = allEvents.filter((event) => {
      // Search filter
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())

      // Category filter
      const matchesCategory = selectedCategory === "All Categories" || event.category === selectedCategory

      // Time filter
      const now = new Date()
      const eventDate = new Date(event.date)
      let matchesTime = true

      if (timeFilter === "upcoming") {
        matchesTime = isAfter(eventDate, now)
      } else if (timeFilter === "past") {
        matchesTime = isBefore(eventDate, now)
      } else if (timeFilter === "this-week") {
        const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
        matchesTime = isAfter(eventDate, now) && isBefore(eventDate, weekFromNow)
      } else if (timeFilter === "this-month") {
        const monthFromNow = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate())
        matchesTime = isAfter(eventDate, now) && isBefore(eventDate, monthFromNow)
      }

      return matchesSearch && matchesCategory && matchesTime
    })

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date-asc":
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case "date-desc":
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case "title-asc":
          return a.title.localeCompare(b.title)
        case "title-desc":
          return b.title.localeCompare(a.title)
        default:
          return 0
      }
    })

    return filtered
  }, [searchTerm, selectedCategory, sortBy, timeFilter])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/50 py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Church Events
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Join us for fellowship, worship, learning, and service opportunities throughout the year.
            </p>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                <span>{allEvents.length} Total Events</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{allEvents.filter(e => e.registrationRequired).length} Require Registration</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-12">
        {/* Filters */}
        <div className="mb-8">
          <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-5">
            {/* Search */}
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Time Filter */}
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger>
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="this-week">This Week</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="past">Past Events</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <ArrowUpDown className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Active Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            {searchTerm && (
              <Badge variant="secondary" className="gap-1">
                Search: "{searchTerm}"
                <button
                  onClick={() => setSearchTerm("")}
                  className="ml-1 hover:bg-muted rounded-full p-0.5"
                >
                  ×
                </button>
              </Badge>
            )}
            {selectedCategory !== "All Categories" && (
              <Badge variant="secondary" className="gap-1">
                Category: {selectedCategory}
                <button
                  onClick={() => setSelectedCategory("All Categories")}
                  className="ml-1 hover:bg-muted rounded-full p-0.5"
                >
                  ×
                </button>
              </Badge>
            )}
            {timeFilter !== "upcoming" && (
              <Badge variant="secondary" className="gap-1">
                Time: {timeFilter.replace("-", " ")}
                <button
                  onClick={() => setTimeFilter("upcoming")}
                  className="ml-1 hover:bg-muted rounded-full p-0.5"
                >
                  ×
                </button>
              </Badge>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="mb-6 text-sm text-muted-foreground">
          Showing {filteredAndSortedEvents.length} of {allEvents.length} events
        </div>

        {/* Events Grid */}
        {filteredAndSortedEvents.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No events found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or filters.
            </p>
            <Button onClick={() => {
              setSearchTerm("")
              setSelectedCategory("All Categories")
              setTimeFilter("upcoming")
              setSortBy("date-asc")
            }}>
              Clear All Filters
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredAndSortedEvents.map((event) => (
              <Card key={event.id} className="group hover:shadow-lg transition-all duration-200 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-green-100 via-teal-50 to-blue-100 dark:from-gray-600 dark:via-gray-700 dark:to-gray-800 group-hover:scale-105 transition-transform duration-200" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className={categoryColors[event.category as keyof typeof categoryColors] || "bg-gray-100 text-gray-800"}>
                      {event.category}
                    </Badge>
                    {event.registrationRequired && (
                      <Badge variant="outline" className="bg-white/90">
                        Registration Required
                      </Badge>
                    )}
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
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {event.description}
                      </p>
                    </div>

                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {format(event.date, "MMM d, yyyy")} 
                          {event.endDate && ` - ${format(event.endDate, "MMM d, yyyy")}`}
                          {event.recurring && ` (${event.recurring})`}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>
                          {format(event.date, "h:mm a")}
                          {event.endDate && ` - ${format(event.endDate, "h:mm a")}`}
                        </span>
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

                    <div className="flex items-center justify-between pt-2">
                      <div className="text-sm">
                        <span className="font-medium">Cost: </span>
                        <span className="text-muted-foreground">{event.cost}</span>
                      </div>
                      <Button size="sm" asChild>
                        <Link href={`/events/${event.id}`}>
                          {event.registrationRequired ? "Register" : "Learn More"}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}