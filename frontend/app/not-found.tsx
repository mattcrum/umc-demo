import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Search, Home } from 'lucide-react'
import Link from 'next/link'
import { Metadata } from 'next'
import { GoBackButton } from '@/components/go-back-button'

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for could not be found.',
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <Card className="w-full max-w-lg">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <div className="text-6xl font-bold text-muted-foreground mb-4">404</div>
            <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
            <p className="text-muted-foreground mb-6">
              We couldn't find the page you're looking for. 
              It might have been moved, deleted, or you may have mistyped the URL.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button asChild>
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Link>
            </Button>
            <GoBackButton />
          </div>

          <div className="space-y-4">
            <div className="text-sm font-semibold text-muted-foreground">
              Try these helpful links:
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <Link href="/events" className="hover:underline text-primary">
                Church Events
              </Link>
              <Link href="/sermons" className="hover:underline text-primary">
                Sermons
              </Link>
              <Link href="/ministries" className="hover:underline text-primary">
                Ministries
              </Link>
              <Link href="/resources" className="hover:underline text-primary">
                Resources
              </Link>
              <Link href="/visit" className="hover:underline text-primary">
                Plan Your Visit
              </Link>
              <Link href="/contact" className="hover:underline text-primary">
                Contact Us
              </Link>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <p className="text-sm text-muted-foreground mb-4">
              Looking for something specific?
            </p>
            <Button variant="outline" asChild className="w-full">
              <Link href="/search">
                <Search className="h-4 w-4 mr-2" />
                Search Our Site
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}