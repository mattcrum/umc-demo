import {MinistriesPage} from '@/components/pages/ministries-page'
import type {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Ministries',
  description: 'Discover ways to connect, serve, and grow in faith through our various ministry programs for all ages.',
}

export default function Ministries() {
  return <MinistriesPage />
}