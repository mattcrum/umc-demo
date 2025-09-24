"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Play, 
  Download, 
  Search, 
  Calendar, 
  User, 
  Clock,
  BookOpen,
  Filter,
  ArrowUpDown
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"

// Mock data - in a real app, this would come from Sanity
const sermonSeries = [
  {
    id: "advent-2024",
    title: "Advent: Waiting in Wonder",
    description: "A four-week journey exploring hope, peace, joy, and love as we prepare for Christmas.",
    startDate: new Date("2024-12-01"),
    endDate: new Date("2024-12-22"),
    image: "/series/advent-2024.jpg",
    sermonCount: 4,
    status: "current"
  },
  {
    id: "heart-of-christmas",
    title: "The Heart of Christmas",
    description: "Discovering the true meaning of Christmas through the lens of God's transformative love.",
    startDate: new Date("2024-11-10"),
    endDate: new Date("2024-11-30"),
    image: "/series/heart-of-christmas.jpg",
    sermonCount: 3,
    status: "completed"
  },
  {
    id: "thanksgiving-reflections",
    title: "Thanksgiving Reflections",
    description: "Exploring gratitude as a way of life and recognizing God's faithfulness in all seasons.",
    startDate: new Date("2024-11-03"),
    endDate: new Date("2024-11-24"),
    image: "/series/thanksgiving.jpg",
    sermonCount: 4,
    status: "completed"
  }
]

const allSermons = [
  {
    id: "1",
    title: "The Gift of Hope",
    series: "Advent: Waiting in Wonder",
    seriesId: "advent-2024",
    speaker: "Rev. Sarah Johnson",
    date: new Date("2024-12-01"),
    description: "In times of uncertainty, God offers us the gift of hope that anchors our souls and lights our path forward.",
    thumbnail: "/sermons/advent-hope.jpg",
    duration: "28 min",
    videoUrl: "/sermons/hope-video.mp4",
    audioUrl: "/sermons/hope-audio.mp3",
    scripture: "Romans 15:13",
    tags: ["Hope", "Advent", "Faith"],
    downloads: 156,
    views: 342
  },
  {
    id: "2", 
    title: "Love Made Manifest",
    series: "The Heart of Christmas",
    seriesId: "heart-of-christmas",
    speaker: "Rev. Michael Chen",
    date: new Date("2024-11-24"),
    description: "Exploring how God's love became flesh and dwelt among us, transforming everything we thought we knew about divine love.",
    thumbnail: "/sermons/christmas-love.jpg",
    duration: "32 min",
    videoUrl: "/sermons/love-video.mp4",
    audioUrl: "/sermons/love-audio.mp3",
    scripture: "John 1:14",
    tags: ["Love", "Christmas", "Incarnation"],
    downloads: 203,
    views: 487
  },
  {
    id: "3",
    title: "Gratitude as a Way of Life",
    series: "Thanksgiving Reflections",
    seriesId: "thanksgiving-reflections",
    speaker: "Rev. Sarah Johnson",
    date: new Date("2024-11-17"),
    description: "Discovering how a grateful heart transforms not just our perspective, but our entire way of being in the world.",
    thumbnail: "/sermons/gratitude.jpg",
    duration: "26 min",
    videoUrl: "/sermons/gratitude-video.mp4",
    audioUrl: "/sermons/gratitude-audio.mp3",
    scripture: "1 Thessalonians 5:18",
    tags: ["Gratitude", "Thanksgiving", "Lifestyle"],
    downloads: 178,
    views: 298
  },
  {
    id: "4",
    title: "Peace in the Storm",
    series: "Advent: Waiting in Wonder",
    seriesId: "advent-2024",
    speaker: "Rev. Michael Chen",
    date: new Date("2024-12-08"),
    description: "Finding God's peace that surpasses understanding even in life's most turbulent moments.",
    thumbnail: "/sermons/advent-peace.jpg",
    duration: "30 min",
    videoUrl: "/sermons/peace-video.mp4",
    audioUrl: "/sermons/peace-audio.mp3",
    scripture: "Philippians 4:6-7",
    tags: ["Peace", "Advent", "Trust"],
    downloads: 134,
    views: 267
  },
  {
    id: "5",
    title: "Counting Our Blessings",
    series: "Thanksgiving Reflections",
    seriesId: "thanksgiving-reflections",
    speaker: "Rev. Sarah Johnson",
    date: new Date("2024-11-10"),
    description: "Learning to recognize and celebrate God's blessings both in abundance and in scarcity.",
    thumbnail: "/sermons/counting-blessings.jpg",
    duration: "27 min",
    videoUrl: "/sermons/blessings-video.mp4",
    audioUrl: "/sermons/blessings-audio.mp3",
    scripture: "Psalm 103:1-5",
    tags: ["Blessings", "Gratitude", "Recognition"],
    downloads: 145,
    views: 221
  },
  {
    id: "6",
    title: "The Wonder of Emmanuel",
    series: "The Heart of Christmas",
    seriesId: "heart-of-christmas",
    speaker: "Rev. Michael Chen",
    date: new Date("2024-11-17"),
    description: "Exploring the profound meaning of 'God with us' and what it means for our daily lives.",
    thumbnail: "/sermons/emmanuel.jpg",
    duration: "29 min",
    videoUrl: "/sermons/emmanuel-video.mp4",
    audioUrl: "/sermons/emmanuel-audio.mp3",
    scripture: "Matthew 1:23",
    tags: ["Emmanuel", "Christmas", "Presence"],
    downloads: 189,
    views: 356
  }
]

const speakers = ["All Speakers", "Rev. Sarah Johnson", "Rev. Michael Chen"]
const sortOptions = [
  { value: "date-desc", label: "Most Recent" },
  { value: "date-asc", label: "Oldest First" },
  { value: "title-asc", label: "Title A-Z" },
  { value: "views-desc", label: "Most Viewed" },
  { value: "downloads-desc", label: "Most Downloaded" }
]

export function SermonsPage() {
  const [activeTab, setActiveTab] = useState("all-sermons")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSeries, setSelectedSeries] = useState("All Series")
  const [selectedSpeaker, setSelectedSpeaker] = useState("All Speakers")
  const [sortBy, setSortBy] = useState("date-desc")

  const seriesOptions = ["All Series", ...sermonSeries.map(s => s.title)]

  const filteredAndSortedSermons = useMemo(() => {
    let filtered = allSermons.filter((sermon) => {
      const matchesSearch = sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sermon.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sermon.scripture.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sermon.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesSeries = selectedSeries === "All Series" || sermon.series === selectedSeries
      const matchesSpeaker = selectedSpeaker === "All Speakers" || sermon.speaker === selectedSpeaker

      return matchesSearch && matchesSeries && matchesSpeaker
    })

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date-desc":
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case "date-asc":
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case "title-asc":
          return a.title.localeCompare(b.title)
        case "views-desc":
          return (b.views || 0) - (a.views || 0)
        case "downloads-desc":
          return (b.downloads || 0) - (a.downloads || 0)
        default:
          return 0
      }
    })

    return filtered
  }, [searchTerm, selectedSeries, selectedSpeaker, sortBy])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 to-primary/5 py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Sermons & Messages
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Be encouraged and equipped through God's Word. Listen to recent messages 
              and explore our sermon series.
            </p>
            
            {/* Live Stream CTA */}
            <Card className="max-w-md mx-auto bg-primary/5 border-primary/20">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold mb-2">Join Us Live</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Sundays at 8:30 AM & 11:00 AM EST
                </p>
                <Button asChild>
                  <Link href="/live">
                    <Play className="h-4 w-4 mr-2" />
                    Watch Live Stream
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="container py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="all-sermons">All Sermons</TabsTrigger>
            <TabsTrigger value="series">Sermon Series</TabsTrigger>
          </TabsList>

          {/* All Sermons Tab */}
          <TabsContent value="all-sermons" className="space-y-6">
            {/* Filters */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search sermons..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Series Filter */}
              <Select value={selectedSeries} onValueChange={setSelectedSeries}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {seriesOptions.map((series) => (
                    <SelectItem key={series} value={series}>
                      {series}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Speaker Filter */}
              <Select value={selectedSpeaker} onValueChange={setSelectedSpeaker}>
                <SelectTrigger>
                  <User className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {speakers.map((speaker) => (
                    <SelectItem key={speaker} value={speaker}>
                      {speaker}
                    </SelectItem>
                  ))}
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

            {/* Results Count */}
            <div className="text-sm text-muted-foreground">
              Showing {filteredAndSortedSermons.length} of {allSermons.length} sermons
            </div>

            {/* Sermons List */}
            <div className="space-y-6">
              {filteredAndSortedSermons.map((sermon) => (
                <Card key={sermon.id} className="group hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      {/* Thumbnail */}
                      <div className="relative md:w-64 h-48 md:h-auto overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 group-hover:scale-105 transition-transform duration-200" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="icon" variant="secondary" className="rounded-full">
                            <Play className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {sermon.duration}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-6">
                        <div className="flex flex-col h-full">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="text-xs">
                                {sermon.series}
                              </Badge>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span>{sermon.views} views</span>
                                <span>{sermon.downloads} downloads</span>
                              </div>
                            </div>
                            
                            <h3 className="font-semibold text-xl mb-2 group-hover:text-primary transition-colors">
                              {sermon.title}
                            </h3>
                            
                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                              {sermon.description}
                            </p>

                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                              <div className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                <span>{sermon.speaker}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>{format(sermon.date, "MMM d, yyyy")}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <BookOpen className="h-3 w-3" />
                                <span>{sermon.scripture}</span>
                              </div>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1 mb-4">
                              {sermon.tags.slice(0, 3).map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-2">
                            <Button size="sm" asChild>
                              <Link href={`/sermons/${sermon.id}`}>
                                <Play className="h-3 w-3 mr-1" />
                                Watch
                              </Link>
                            </Button>
                            <Button size="sm" variant="outline" asChild>
                              <Link href={sermon.audioUrl} download>
                                <Download className="h-3 w-3 mr-1" />
                                Audio
                              </Link>
                            </Button>
                            <Button size="sm" variant="ghost" asChild>
                              <Link href={`/sermons/series/${sermon.seriesId}`}>
                                View Series
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Sermon Series Tab */}
          <TabsContent value="series" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sermonSeries.map((series) => (
                <Card key={series.id} className="group hover:shadow-lg transition-all duration-200 overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-amber-100 via-orange-50 to-red-100 dark:from-amber-900 dark:via-orange-900 dark:to-red-900 group-hover:scale-105 transition-transform duration-200" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge className={series.status === "current" ? "bg-green-600" : "bg-blue-600"}>
                        {series.status === "current" ? "Current Series" : "Completed"}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-bold text-lg mb-1">{series.title}</h3>
                      <p className="text-sm opacity-90">
                        {series.sermonCount} messages • {format(series.startDate, "MMM yyyy")}
                      </p>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        {series.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {format(series.startDate, "MMM d")} - {format(series.endDate, "MMM d, yyyy")}
                          </span>
                        </div>
                      </div>

                      <Button asChild className="w-full">
                        <Link href={`/sermons/series/${series.id}`}>
                          View Series
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}