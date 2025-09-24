import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Calendar, User, Download } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"

// Mock data - in a real app, this would come from Sanity
const latestSermons = [
  {
    id: "1",
    title: "The Gift of Hope",
    series: "Advent: Waiting in Wonder",
    speaker: "Rev. Sarah Johnson",
    date: new Date("2024-12-01"),
    description: "In times of uncertainty, God offers us the gift of hope that anchors our souls and lights our path forward.",
    thumbnail: "/sermons/advent-hope.jpg",
    duration: "28 min",
    videoUrl: "/sermons/hope-video.mp4",
    audioUrl: "/sermons/hope-audio.mp3",
    scripture: "Romans 15:13",
    tags: ["Hope", "Advent", "Faith"]
  },
  {
    id: "2", 
    title: "Love Made Manifest",
    series: "The Heart of Christmas",
    speaker: "Rev. Michael Chen",
    date: new Date("2024-11-24"),
    description: "Exploring how God's love became flesh and dwelt among us, transforming everything we thought we knew about divine love.",
    thumbnail: "/sermons/christmas-love.jpg",
    duration: "32 min",
    videoUrl: "/sermons/love-video.mp4",
    audioUrl: "/sermons/love-audio.mp3",
    scripture: "John 1:14",
    tags: ["Love", "Christmas", "Incarnation"]
  },
  {
    id: "3",
    title: "Gratitude as a Way of Life",
    series: "Thanksgiving Reflections",
    speaker: "Rev. Sarah Johnson",
    date: new Date("2024-11-17"),
    description: "Discovering how a grateful heart transforms not just our perspective, but our entire way of being in the world.",
    thumbnail: "/sermons/gratitude.jpg",
    duration: "26 min",
    videoUrl: "/sermons/gratitude-video.mp4",
    audioUrl: "/sermons/gratitude-audio.mp3",
    scripture: "1 Thessalonians 5:18",
    tags: ["Gratitude", "Thanksgiving", "Lifestyle"]
  }
]

const currentSeries = {
  title: "Advent: Waiting in Wonder",
  description: "A four-week journey exploring hope, peace, joy, and love as we prepare for Christmas.",
  sermonCount: 4,
  image: "/series/advent-2024.jpg"
}

export function SermonsSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Latest Sermons
            </h2>
            <p className="text-muted-foreground text-lg">
              Be encouraged and equipped through God's Word.
            </p>
          </div>
          <Button variant="outline" asChild className="hidden md:flex">
            <Link href="/sermons">All Sermons</Link>
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Featured Current Series */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <div className="relative overflow-hidden rounded-t-lg">
                <div className="w-full h-48 bg-gradient-to-br from-amber-100 via-orange-50 to-red-100 dark:from-amber-900 dark:via-orange-900 dark:to-red-900" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <Badge className="mb-2 bg-primary">Current Series</Badge>
                  <h3 className="font-bold text-lg">{currentSeries.title}</h3>
                  <p className="text-sm opacity-90">
                    {currentSeries.sermonCount} messages
                  </p>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">
                  {currentSeries.description}
                </p>
                <Button asChild className="w-full">
                  <Link href="/sermons/series/advent-2024">View Series</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Sermons List */}
          <div className="lg:col-span-2 space-y-4">
            {latestSermons.map((sermon) => (
              <Card key={sermon.id} className="group hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    {/* Thumbnail */}
                    <div className="relative md:w-48 h-48 md:h-auto overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 group-hover:scale-105 transition-transform duration-200" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="icon" variant="secondary" className="rounded-full">
                          <Play className="h-4 w-4 ml-1" />
                        </Button>
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
                            <span className="text-xs text-muted-foreground">
                              {sermon.duration}
                            </span>
                          </div>
                          
                          <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                            {sermon.title}
                          </h3>
                          
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {sermon.description}
                          </p>

                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              <span>{sermon.speaker}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>{format(sermon.date, "MMM d, yyyy")}</span>
                            </div>
                          </div>

                          <div className="text-xs text-muted-foreground mb-4">
                            Scripture: {sermon.scripture}
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
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Mobile View All Button */}
        <div className="flex justify-center mt-8 md:hidden">
          <Button variant="outline" asChild>
            <Link href="/sermons">All Sermons</Link>
          </Button>
        </div>

        {/* Live Stream CTA */}
        <Card className="mt-12 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Join Us Live Online</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Can't make it to church this Sunday? Watch our live stream and participate in worship from wherever you are.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="text-sm text-muted-foreground">
                Sundays at 8:30 AM & 11:00 AM EST
              </div>
              <Button asChild>
                <Link href="/live">
                  <Play className="h-4 w-4 mr-2" />
                  Watch Live
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}