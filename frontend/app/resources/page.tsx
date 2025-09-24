import {ResourcesPage} from '@/components/pages/resources-page'
import type {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Resource Library',
  description: 'Access study guides, sermon notes, devotionals, and other helpful resources for your faith journey.',
}

export default function Resources() {
  return <ResourcesPage />
}