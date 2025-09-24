import {SermonsPage} from '@/components/pages/sermons-page'
import type {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Sermons',
  description: 'Listen to recent sermons and explore our sermon series. Be encouraged and equipped through God\'s Word.',
}

export default function Sermons() {
  return <SermonsPage />
}