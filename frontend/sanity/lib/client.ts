import {createClient} from 'next-sanity'
import { draftMode } from 'next/headers'

import {apiVersion, dataset, projectId, studioUrl} from '@/sanity/lib/api'
import {token} from './token'

function createSanityClient() {
  try {
    // Check if we're in draft mode (this will be null during build time)
    let isDraftMode = false
    try {
      const draft = draftMode()
      isDraftMode = draft.isEnabled
    } catch {
      // Safe to ignore - draftMode() throws during build time
      isDraftMode = false
    }

    // Basic configuration
    const config: any = {
      projectId,
      dataset,
      apiVersion,
      useCdn: !isDraftMode, // Disable CDN for draft mode to get fresh content
      perspective: isDraftMode ? 'previewDrafts' : 'published',
      ...(token && { token }), // Only add token if it exists
    }

    // Add stega for visual editing in development or when in draft mode
    const isProduction = process.env.NODE_ENV === 'production'
    if ((!isProduction || isDraftMode) && studioUrl) {
      config.stega = {
        studioUrl,
        filter: (props: any) => {
          if (props.sourcePath.at(-1) === 'title') {
            return true
          }
          return props.filterDefault(props)
        },
      }
    }

    return createClient(config)
  } catch (error) {
    console.warn('Failed to create Sanity client:', error)
    // Return a mock client for build-time failures
    return {
      fetch: () => Promise.resolve(null),
      listen: () => ({ unsubscribe: () => {} }),
    } as any
  }
}

export const client = createSanityClient()
