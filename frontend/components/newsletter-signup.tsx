"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, CheckCircle, AlertCircle } from "lucide-react"
import { toast } from "sonner"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address")
      return
    }

    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // In a real app, you would send this to your newsletter service
      console.log("Newsletter signup:", email)
      
      setIsSubscribed(true)
      toast.success("Successfully subscribed to our newsletter!")
      setEmail("")
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubscribed) {
    return (
      <Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-green-800 dark:text-green-200">
            Thank You for Subscribing!
          </h3>
          <p className="text-green-700 dark:text-green-300 mb-4">
            You'll receive our weekly newsletter with updates on events, sermons, and church news.
          </p>
          <Button 
            variant="outline" 
            className="border-green-300 text-green-800 hover:bg-green-100 dark:border-green-700 dark:text-green-200"
            onClick={() => setIsSubscribed(false)}
          >
            Subscribe Another Email
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <section className="py-16 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
      <div className="container max-w-4xl">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2">
              {/* Content Side */}
              <div className="p-8 md:p-12">
                <div className="flex items-center gap-2 mb-4">
                  <Mail className="h-6 w-6 text-primary" />
                  <span className="font-semibold text-primary">Stay Connected</span>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Never Miss What's Happening
                </h2>
                
                <p className="text-muted-foreground mb-6">
                  Get weekly updates on upcoming events, new sermons, ministry opportunities, 
                  and inspiring stories from our church community delivered right to your inbox.
                </p>

                <div className="space-y-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Weekly church newsletter</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Event announcements and reminders</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Sermon series and study materials</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Prayer requests and testimonies</span>
                  </div>
                </div>
              </div>

              {/* Form Side */}
              <div className="bg-muted/50 p-8 md:p-12 flex flex-col justify-center">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="newsletter-email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <Input
                      id="newsletter-email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                      className="mt-2"
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isLoading || !email}
                    className="w-full"
                  >
                    {isLoading ? "Subscribing..." : "Subscribe to Newsletter"}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </form>

                {/* Trust Indicators */}
                <div className="mt-6 pt-6 border-t">
                  <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      <span>No spam</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      <span>Weekly emails only</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      <span>Easy unsubscribe</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}