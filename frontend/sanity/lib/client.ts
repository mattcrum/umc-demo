import {createClient} from 'next-sanity'

import {apiVersion, dataset, projectId, studioUrl} from '@/sanity/lib/api'
import {token} from './token'

function createSanityClient() {
  try {
    // Basic configuration without stega for build compatibility
    const config: any = {
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: 'published' as const,
      ...(token && { token }), // Only add token if it exists
    }

    // Only add stega in development or when specifically needed
    const isProduction = process.env.NODE_ENV === 'production'
    if (!isProduction && studioUrl) {
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
