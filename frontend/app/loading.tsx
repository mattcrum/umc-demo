import { Card, CardContent } from '@/components/ui/card'
import { Loader2, Church } from 'lucide-react'

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <Church className="h-12 w-12 text-primary mx-auto mb-4" />
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <span className="text-lg font-medium">Loading...</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Please wait while we prepare your content
          </p>
        </CardContent>
      </Card>
    </div>
  )
}