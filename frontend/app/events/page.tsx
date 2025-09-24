import {EventsPage} from '@/components/pages/events-page'
import type {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Events',
  description: 'Join us for upcoming events, fellowship, and community activities at our church.',
}

export default function Events() {
  return <EventsPage />
}