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
  Download, 
  Search, 
  Filter,
  BookOpen,
  FileText,
  Headphones,
  Video,
  Image as ImageIcon,
  Calendar,
  Eye,
  ArrowUpDown,
  Star,
  ExternalLink
} from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { toast } from "sonner"

// Mock data - in a real app, this would come from Sanity
const resources = [
  {
    id: "1",
    title: "Advent Devotional 2024",
    description: "A 25-day devotional journey through the season of Advent, preparing our hearts for Christmas with daily reflections and prayers.",
    type: "devotional",
    format: "pdf",
    size: "2.4 MB",
    pages: 32,
    author: "Rev. Sarah Johnson",
    publishDate: new Date("2024-11-15"),
    downloads: 1247,
    views: 2156,
    featured: true,
    tags: ["Advent", "Christmas", "Prayer", "Devotional"],
    thumbnail: "/resources/advent-devotional.jpg",
    downloadUrl: "/downloads/advent-devotional-2024.pdf",
    previewUrl: "/resources/advent-devotional/preview"
  },
  {
    id: "2",
    title: "Gospel of John Study Guide",
    description: "Comprehensive 12-week Bible study guide exploring the Gospel of John with discussion questions and practical applications.",
    type: "study-guide",
    format: "pdf",
    size: "1.8 MB",
    pages: 48,
    author: "Rev. Michael Chen",
    publishDate: new Date("2024-10-22"),
    downloads: 892,
    views: 1543,
    featured: true,
    tags: ["Bible Study", "Gospel of John", "Small Groups"],
    thumbnail: "/resources/john-study-guide.jpg",
    downloadUrl: "/downloads/john-study-guide.pdf",
    previewUrl: "/resources/john-study-guide/preview"
  },
  {
    id: "3",
    title: "Children's Christmas Activity Book",
    description: "Fun activities, coloring pages, and games for children to learn about the Christmas story and celebrate Jesus' birth.",
    type: "activity",
    format: "pdf",
    size: "3.2 MB",
    pages: 16,
    author: "Children's Ministry Team",
    publishDate: new Date("2024-12-01"),
    downloads: 654,
    views: 987,
    featured: false,
    tags: ["Children", "Christmas", "Activities", "Coloring"],
    thumbnail: "/resources/christmas-activity-book.jpg",
    downloadUrl: "/downloads/christmas-activity-book.pdf"
  },
  {
    id: "4",
    title: "Prayer & Fasting Guide",
    description: "Practical guide to incorporating prayer and fasting into your spiritual discipline, with biblical foundations and practical tips.",
    type: "guide",
    format: "pdf", 
    size: "1.2 MB",
    pages: 20,
    author: "Spiritual Formation Team",
    publishDate: new Date("2024-09-30"),
    downloads: 423,
    views: 756,
    featured: false,
    tags: ["Prayer", "Fasting", "Spiritual Disciplines"],
    thumbnail: "/resources/prayer-fasting-guide.jpg",
    downloadUrl: "/downloads/prayer-fasting-guide.pdf"
  },
  {
    id: "5",
    title: "Baptism Class Materials",
    description: "Information packet for those interested in baptism, including the meaning of baptism and preparation materials.",
    type: "info-packet",
    format: "pdf",
    size: "0.9 MB", 
    pages: 12,
    author: "Pastoral Team",
    publishDate: new Date("2024-08-15"),
    downloads: 234,
    views: 445,
    featured: false,
    tags: ["Baptism", "New Members", "Sacraments"],
    thumbnail: "/resources/baptism-materials.jpg",
    downloadUrl: "/downloads/baptism-materials.pdf"
  },
  {
    id: "6",
    title: "Youth Confirmation Workbook",
    description: "Comprehensive workbook for youth confirmation classes covering United Methodist beliefs, practices, and commitments.",
    type: "workbook",
    format: "pdf",
    size: "2.7 MB",
    pages: 64,
    author: "Youth Ministry Team", 
    publishDate: new Date("2024-07-20"),
    downloads: 156,
    views: 298,
    featured: false,
    tags: ["Youth", "Confirmation", "United Methodist", "Workbook"],
    thumbnail: "/resources/confirmation-workbook.jpg",
    downloadUrl: "/downloads/confirmation-workbook.pdf"
  },
  {
    id: "7",
    title: "Sermon Notes Template",
    description: "Printable template for taking notes during sermons, with space for scripture, main points, and personal reflections.",
    type: "template",
    format: "pdf",
    size: "0.3 MB",
    pages: 2,
    author: "Worship Team",
    publishDate: new Date("2024-06-10"),
    downloads: 789,
    views: 1234,
    featured: false,
    tags: ["Sermon Notes", "Worship", "Template"],
    thumbnail: "/resources/sermon-notes-template.jpg",
    downloadUrl: "/downloads/sermon-notes-template.pdf"
  },
  {
    id: "8",
    title: "Small Group Leader Handbook",
    description: "Essential guide for small group leaders covering group dynamics, facilitation skills, and spiritual leadership principles.",
    type: "handbook",
    format: "pdf",
    size: "1.6 MB",
    pages: 28,
    author: "Small Groups Team",
    publishDate: new Date("2024-05-18"),
    downloads: 345,
    views: 567,
    featured: false,
    tags: ["Small Groups", "Leadership", "Handbook"],
    thumbnail: "/resources/small-group-handbook.jpg",
    downloadUrl: "/downloads/small-group-handbook.pdf"
  }
]

const resourceTypes = [
  "All Types",
  "devotional",
  "study-guide", 
  "activity",
  "guide",
  "info-packet",
  "workbook",
  "template",
  "handbook"
]

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "title-asc", label: "Title A-Z" },
  { value: "downloads-desc", label: "Most Downloaded" },
  { value: "views-desc", label: "Most Viewed" }
]

const typeIcons = {
  "devotional": BookOpen,
  "study-guide": FileText,
  "activity": ImageIcon,
  "guide": BookOpen,
  "info-packet": FileText,
  "workbook": BookOpen,
  "template": FileText,
  "handbook": BookOpen
}

const typeLabels = {
  "devotional": "Devotional",
  "study-guide": "Study Guide",
  "activity": "Activity Book",
  "guide": "Guide",
  "info-packet": "Info Packet", 
  "workbook": "Workbook",
  "template": "Template",
  "handbook": "Handbook"
}

export function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("All Types")
  const [sortBy, setSortBy] = useState("newest")

  const handleDownload = async (resource: typeof resources[0]) => {
    // Simulate download tracking
    try {
      // In a real app, you would:
      // 1. Track the download in your database
      // 2. Increment the download counter
      // 3. Possibly track user who downloaded
      console.log(`Downloading: ${resource.title}`)
      
      // Create a temporary link and trigger download
      const link = document.createElement('a')
      link.href = resource.downloadUrl
      link.download = resource.title
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      toast.success(`Downloaded: ${resource.title}`)
    } catch (error) {
      toast.error("Failed to download resource")
    }
  }

  const filteredAndSortedResources = useMemo(() => {
    let filtered = resources.filter((resource) => {
      const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesType = selectedType === "All Types" || resource.type === selectedType

      return matchesSearch && matchesType
    })

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
        case "oldest":
          return new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime()
        case "title-asc":
          return a.title.localeCompare(b.title)
        case "downloads-desc":
          return b.downloads - a.downloads
        case "views-desc":
          return b.views - a.views
        default:
          return 0
      }
    })

    return filtered
  }, [searchTerm, selectedType, sortBy])

  const featuredResources = resources.filter(r => r.featured)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 to-primary/5 py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Resource Library
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Access study guides, devotionals, activity books, and other helpful resources 
              to support your faith journey and spiritual growth.
            </p>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                <span>{resources.reduce((sum, r) => sum + r.downloads, 0).toLocaleString()} Downloads</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>{resources.length} Resources Available</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                <span>Free to Download</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-12">
        {/* Featured Resources */}
        {featuredResources.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Star className="h-5 w-5 text-yellow-500" />
              <h2 className="text-2xl font-bold">Featured Resources</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredResources.map((resource) => {
                const TypeIcon = typeIcons[resource.type as keyof typeof typeIcons] || BookOpen
                return (
                  <Card key={resource.id} className="group hover:shadow-lg transition-all duration-200 overflow-hidden border-primary/20 bg-primary/5">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <TypeIcon className="h-4 w-4 text-primary" />
                            </div>
                            <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                              Featured
                            </Badge>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                            {resource.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-3">
                            {resource.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>by {resource.author}</span>
                          <span>{resource.size}</span>
                        </div>

                        <Button 
                          className="w-full" 
                          onClick={() => handleDownload(resource)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download Free
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="mb-8">
          <div className="grid gap-4 md:grid-cols-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Type Filter */}
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {resourceTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type === "All Types" ? type : typeLabels[type as keyof typeof typeLabels] || type}
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
        </div>

        {/* Results */}
        <div className="mb-6 text-sm text-muted-foreground">
          Showing {filteredAndSortedResources.length} of {resources.length} resources
        </div>

        {/* Resources Grid */}
        {filteredAndSortedResources.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No resources found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or filters.
            </p>
            <Button onClick={() => {
              setSearchTerm("")
              setSelectedType("All Types")
              setSortBy("newest")
            }}>
              Clear All Filters
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredAndSortedResources.map((resource) => {
              const TypeIcon = typeIcons[resource.type as keyof typeof typeIcons] || BookOpen
              return (
                <Card key={resource.id} className="group hover:shadow-lg transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-muted rounded-lg group-hover:bg-primary/10 transition-colors">
                            <TypeIcon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                          <Badge variant="secondary">
                            {typeLabels[resource.type as keyof typeof typeLabels] || resource.type}
                          </Badge>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                          {resource.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {resource.description}
                        </p>
                      </div>

                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center justify-between">
                          <span>by {resource.author}</span>
                          <span>{resource.pages} pages</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{format(resource.publishDate, "MMM yyyy")}</span>
                          </div>
                          <span>{resource.size}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <Download className="h-3 w-3" />
                              <span>{resource.downloads}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              <span>{resource.views}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {resource.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button 
                          className="flex-1" 
                          onClick={() => handleDownload(resource)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        {resource.previewUrl && (
                          <Button variant="outline" size="icon" asChild>
                            <Link href={resource.previewUrl}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {/* Help Section */}
        <div className="mt-16">
          <Card className="bg-muted/50">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Need Help or Have Suggestions?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Can't find what you're looking for? Have ideas for new resources? 
                We'd love to hear from you and help you find what you need for your spiritual journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" asChild>
                  <Link href="/contact">
                    Contact Us
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/resources/request">
                    Request a Resource
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}