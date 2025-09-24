/**
 * As this file is reused in several other files, try to keep it lean and small.
 * Importing other npm packages here could lead to needlessly increasing the client bundle size, or end up in a server-only function that don't need it.
 */

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}

function validateProjectId(projectId: string): string {
  // Trim whitespace and newlines
  const trimmedProjectId = projectId?.trim()
  
  if (!trimmedProjectId) {
    // Use fallback for build time - will be overridden by environment variables
    console.warn('Using fallback project ID for build. Set NEXT_PUBLIC_SANITY_PROJECT_ID in production.')
    return 'fallback'
  }
  
  // Validate project ID format (only a-z, 0-9, and hyphens)
  if (!/^[a-z0-9-]+$/.test(trimmedProjectId)) {
    console.error(`Invalid NEXT_PUBLIC_SANITY_PROJECT_ID format: "${trimmedProjectId}". Project ID can only contain a-z, 0-9, and hyphens.`)
    return 'fallback'
  }
  
  return trimmedProjectId
}

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || 'production'

export const projectId = validateProjectId(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
)

/**
 * see https://www.sanity.io/docs/api-versioning for how versioning works
 */
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() || '2024-10-28'

/**
 * Used to configure edit intent links, for Presentation Mode, as well as to configure where the Studio is mounted in the router.
 */
export const studioUrl = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || 'http://localhost:3333'
