import './globals.css'

import {SpeedInsights} from '@vercel/speed-insights/next'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {draftMode} from 'next/headers'
import {VisualEditing, toPlainText} from 'next-sanity'
import {Toaster} from 'sonner'

import DraftModeToast from '@/app/components/DraftModeToast'
import Footer from '@/app/components/Footer'
import Header from '@/app/components/Header'
import {SiteHeader} from '@/components/site-header'
import {SiteFooter} from '@/components/site-footer'
import {ThemeProvider} from '@/components/theme-provider'
import * as demo from '@/sanity/lib/demo'
import {sanityFetch, SanityLive} from '@/sanity/lib/live'
import {settingsQuery} from '@/sanity/lib/queries'
import {resolveOpenGraphImage} from '@/sanity/lib/utils'
import {handleError} from './client-utils'

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(): Promise<Metadata> {
  const {data: settings} = await sanityFetch({
    query: settingsQuery,
    // Metadata should never contain stega
    stega: false,
  })
  const title = settings?.title || demo.title
  const description = settings?.description || demo.description

  const ogImage = resolveOpenGraphImage(settings?.ogImage)
  let metadataBase: URL | undefined = undefined
  try {
    metadataBase = settings?.ogImage?.metadataBase
      ? new URL(settings.ogImage.metadataBase)
      : undefined
  } catch {
    // ignore
  }
  return {
    metadataBase,
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: toPlainText(description),
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  }
}

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const {isEnabled: isDraftMode} = await draftMode()
  const {data: settings} = await sanityFetch({
    query: settingsQuery,
    stega: false,
  })

  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* The <Toaster> component is responsible for rendering toast notifications */}
          <Toaster />
          {isDraftMode && (
            <>
              <DraftModeToast />
              {/*  Enable Visual Editing, only to be rendered when Draft Mode is enabled */}
              <VisualEditing />
            </>
          )}
          {/* The <SanityLive> component is responsible for making all sanityFetch calls in your application live */}
          {/* Temporarily disabled to avoid CORS issues in demo mode */}
          {/* <SanityLive onError={handleError} /> */}
          
          <SiteHeader 
            churchName={settings?.title || demo.title}
            phone={settings?.contactInfo ? (settings.contactInfo as any)?.phone : undefined}
            address={settings?.contactInfo ? (settings.contactInfo as any)?.address?.street : undefined}
          />
          
          <main className="min-h-screen">
            {children}
          </main>
          
          <SiteFooter 
            churchName={settings?.title || demo.title}
            phone={settings?.contactInfo ? (settings.contactInfo as any)?.phone : null}
            email={settings?.contactInfo ? (settings.contactInfo as any)?.email : null}
            address={settings?.contactInfo ? (settings.contactInfo as any)?.address?.street : null}
            socialLinks={{
              facebook: settings?.socialLinks ? (settings.socialLinks as any)?.facebook : null,
              instagram: settings?.socialLinks ? (settings.socialLinks as any)?.instagram : null,
              youtube: settings?.socialLinks ? (settings.socialLinks as any)?.youtube : null,
            }}
          />
          
          {/* Legacy components for draft mode compatibility */}
          {isDraftMode && (
            <div className="hidden">
              <Header />
              <Footer />
            </div>
          )}
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  )
}
