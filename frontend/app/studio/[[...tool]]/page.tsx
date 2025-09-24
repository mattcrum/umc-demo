'use client'

/**
 * This route is responsible for the interactive Sanity Studio that is mounted on the `/studio` route
 */

import {NextStudio} from 'next-sanity/studio'
import config from '../../../sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}