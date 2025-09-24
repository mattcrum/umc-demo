"use client"

import { useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <Card className="w-full max-w-lg">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <AlertTriangle className="h-16 w-16 text-destructive mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Oops! Something went wrong</h1>
            <p className="text-muted-foreground mb-4">
              We encountered an unexpected error. Our team has been notified 
              and we're working to fix this issue.
            </p>
            {process.env.NODE_ENV === 'development' && (
              <details className="text-left mb-4 p-4 bg-destructive/10 rounded-lg">
                <summary className="cursor-pointer font-semibold mb-2">
                  Error Details (Development)
                </summary>
                <pre className="text-xs text-muted-foreground overflow-auto whitespace-pre-wrap">
                  {error.message}
                  {error.digest && `\nDigest: ${error.digest}`}
                </pre>
              </details>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={reset} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
            <Button asChild>
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Link>
            </Button>
          </div>

          <div className="mt-6 pt-6 border-t">
            <p className="text-sm text-muted-foreground">
              Need help? Contact us at{' '}
              <Link 
                href="mailto:support@church.com" 
                className="underline hover:no-underline"
              >
                support@church.com
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}