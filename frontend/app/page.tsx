import {HeroSection} from '@/components/hero-section'
import {QuickLinksGrid} from '@/components/quick-links-grid'
import {EventsCarousel} from '@/components/events-carousel'
import {SermonsSection} from '@/components/sermons-section'
import {MinistriesSection} from '@/components/ministries-section'
import {NewsletterSignup} from '@/components/newsletter-signup'
import {settingsQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'

export default async function Page() {
  const {data: settings} = await sanityFetch({
    query: settingsQuery,
  })

  return (
    <>
      <HeroSection 
        title={settings?.heroTitle || "Welcome Home"}
        subtitle={settings?.title || "First United Methodist Church"}
        description={settings?.heroDescription || "A welcoming community where faith, hope, and love come together. Join us as we worship, grow, and serve together in Christ's name."}
        backgroundImage={undefined}
        backgroundVideo={settings?.heroVideo || undefined}
        announcement={settings?.announcement ? {
          text: (settings.announcement as any)?.title || "Join us this Sunday",
          href: "/events"
        } : undefined}
        serviceInfo={{
          times: settings?.serviceInfo ? (settings.serviceInfo as any)?.times || ["8:30 AM", "11:00 AM"] : ["8:30 AM", "11:00 AM"],
          location: settings?.serviceInfo ? (settings.serviceInfo as any)?.location?.name || "Main Sanctuary" : "Main Sanctuary"
        }}
      />
      
      <QuickLinksGrid />
      
      <EventsCarousel />
      
      <SermonsSection />
      
      <MinistriesSection />
      
      <NewsletterSignup />
    </>
  )
}
