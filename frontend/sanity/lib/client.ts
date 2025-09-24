import {createClient} from 'next-sanity'

import {apiVersion, dataset, projectId, studioUrl} from '@/sanity/lib/api'
import {token} from './token'

function createSanityClient() {
  try {
    return createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: 'published',
      token, // Required if you have a private dataset
      stega: {
        studioUrl,
        // Set logger to 'console' for more verbose logging
        // logger: console,
        filter: (props) => {
          if (props.sourcePath.at(-1) === 'title') {
            return true
          }

          return props.filterDefault(props)
        },
      },
    })
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
