"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { Play, Calendar, MapPin, Clock } from "lucide-react"

interface HeroSectionProps {
  title?: string
  subtitle?: string
  description?: string
  backgroundImage?: string
  backgroundVideo?: string
  ctaButtons?: Array<{
    text: string
    href: string
    variant?: "default" | "outline" | "secondary"
  }>
  announcement?: {
    text: string
    href: string
  }
  serviceInfo?: {
    times: string[]
    location: string
  }
}

export function HeroSection({
  title = "Welcome Home",
  subtitle = "First United Methodist Church",
  description = "A welcoming community where faith, hope, and love come together. Join us as we worship, grow, and serve together in Christ's name.",
  backgroundImage = "/hero-bg.jpg",
  backgroundVideo,
  ctaButtons = [
    { text: "Plan Your Visit", href: "/visit", variant: "default" },
    { text: "Watch Online", href: "/sermons", variant: "outline" }
  ],
  announcement,
  serviceInfo = {
    times: ["8:30 AM", "11:00 AM"],
    location: "Main Sanctuary"
  }
}: HeroSectionProps) {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        {backgroundVideo ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        ) : backgroundImage ? (
          <Image
            src={backgroundImage}
            alt="Church background"
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800" />
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container max-w-4xl text-center text-white">
        {/* Announcement Banner */}
        {announcement && (
          <div className="mb-6">
            <Badge variant="secondary" className="px-4 py-2">
              <Link href={announcement.href} className="flex items-center gap-2 hover:underline">
                <Calendar className="h-4 w-4" />
                {announcement.text}
              </Link>
            </Badge>
          </div>
        )}

        {/* Main Content */}
        <div className="space-y-6">
          <div>
            <h2 className="text-lg md:text-xl font-medium mb-2 opacity-90">
              {subtitle}
            </h2>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              {title}
            </h1>
          </div>

          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90 leading-relaxed">
            {description}
          </p>

          {/* Service Information */}
          {serviceInfo && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm opacity-90">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Sundays: {serviceInfo.times.join(" & ")}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{serviceInfo.location}</span>
              </div>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            {ctaButtons.map((button, index) => (
              <Button
                key={index}
                size="lg"
                variant={button.variant || "default"}
                asChild
                className="min-w-[160px]"
              >
                <Link href={button.href}>
                  {button.text === "Watch Online" && <Play className="mr-2 h-4 w-4" />}
                  {button.text}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}