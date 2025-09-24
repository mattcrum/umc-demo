/**
 * This config is used to configure your Sanity Studio.
 * Learn more: https://www.sanity.io/docs/configuration
 */

import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './src/schemaTypes'
import {structure} from './src/structure'
import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash'
import {
  presentationTool,
  defineDocuments,
  defineLocations,
  type DocumentLocation,
} from 'sanity/presentation'
import {assist} from '@sanity/assist'

// Environment variables for project configuration
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'your-projectID'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

// URL for preview functionality, defaults to localhost:3000 if not set
const SANITY_STUDIO_PREVIEW_URL = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'

// Define the home location for the presentation tool
const homeLocation = {
  title: 'Home',
  href: '/',
} satisfies DocumentLocation

// resolveHref() is a convenience function that resolves the URL
// path for different document types and used in the presentation tool.
function resolveHref(documentType?: string, slug?: string): string | undefined {
  switch (documentType) {
    case 'post':
      return slug ? `/posts/${slug}` : undefined
    case 'page':
      return slug ? `/${slug}` : undefined
    case 'event':
      return slug ? `/events/${slug}` : undefined
    case 'sermon':
      return slug ? `/sermons/${slug}` : undefined
    case 'sermonSeries':
      return slug ? `/sermon-series/${slug}` : undefined
    case 'ministry':
      return slug ? `/ministries/${slug}` : undefined
    case 'location':
      return slug ? `/locations/${slug}` : undefined
    case 'resource':
      return slug ? `/resources/${slug}` : undefined
    default:
      console.warn('Invalid document type:', documentType)
      return undefined
  }
}

// Main Sanity configuration
export default defineConfig({
  name: 'default',
  title: 'Sanity + Next.js Starter Template',

  projectId,
  dataset,

  plugins: [
    // Presentation tool configuration for Visual Editing
    presentationTool({
      previewUrl: {
        origin: SANITY_STUDIO_PREVIEW_URL,
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
      resolve: {
        // The Main Document Resolver API provides a method of resolving a main document from a given route or route pattern. https://www.sanity.io/docs/presentation-resolver-api#57720a5678d9
        mainDocuments: defineDocuments([
          {
            route: '/',
            filter: `_type == "settings" && _id == "siteSettings"`,
          },
          {
            route: '/:slug',
            filter: `_type == "page" && slug.current == $slug || _id == $slug`,
          },
          {
            route: '/posts/:slug',
            filter: `_type == "post" && slug.current == $slug || _id == $slug`,
          },
          {
            route: '/events/:slug',
            filter: `_type == "event" && slug.current == $slug || _id == $slug`,
          },
          {
            route: '/sermons/:slug',
            filter: `_type == "sermon" && slug.current == $slug || _id == $slug`,
          },
          {
            route: '/sermon-series/:slug',
            filter: `_type == "sermonSeries" && slug.current == $slug || _id == $slug`,
          },
          {
            route: '/ministries/:slug',
            filter: `_type == "ministry" && slug.current == $slug || _id == $slug`,
          },
          {
            route: '/locations/:slug',
            filter: `_type == "location" && slug.current == $slug || _id == $slug`,
          },
          {
            route: '/resources/:slug',
            filter: `_type == "resource" && slug.current == $slug || _id == $slug`,
          },
        ]),
        // Locations Resolver API allows you to define where data is being used in your application. https://www.sanity.io/docs/presentation-resolver-api#8d8bca7bfcd7
        locations: {
          settings: defineLocations({
            locations: [homeLocation],
            message: 'This document is used on all pages',
            tone: 'positive',
          }),
          page: defineLocations({
            select: {
              name: 'name',
              slug: 'slug.current',
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.name || 'Untitled',
                  href: resolveHref('page', doc?.slug)!,
                },
              ],
            }),
          }),
          post: defineLocations({
            select: {
              title: 'title',
              slug: 'slug.current',
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title || 'Untitled',
                  href: resolveHref('post', doc?.slug)!,
                },
                {
                  title: 'Home',
                  href: '/',
                } satisfies DocumentLocation,
              ].filter(Boolean) as DocumentLocation[],
            }),
          }),
          event: defineLocations({
            select: {
              title: 'title',
              slug: 'slug.current',
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title || 'Untitled Event',
                  href: resolveHref('event', doc?.slug)!,
                },
                {
                  title: 'Events',
                  href: '/events',
                },
                {
                  title: 'Home',
                  href: '/',
                },
              ].filter(Boolean) as DocumentLocation[],
            }),
          }),
          sermon: defineLocations({
            select: {
              title: 'title',
              slug: 'slug.current',
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title || 'Untitled Sermon',
                  href: resolveHref('sermon', doc?.slug)!,
                },
                {
                  title: 'Sermons',
                  href: '/sermons',
                },
                {
                  title: 'Home',
                  href: '/',
                },
              ].filter(Boolean) as DocumentLocation[],
            }),
          }),
          sermonSeries: defineLocations({
            select: {
              title: 'title',
              slug: 'slug.current',
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title || 'Untitled Series',
                  href: resolveHref('sermonSeries', doc?.slug)!,
                },
                {
                  title: 'Sermon Series',
                  href: '/sermon-series',
                },
                {
                  title: 'Home',
                  href: '/',
                },
              ].filter(Boolean) as DocumentLocation[],
            }),
          }),
          ministry: defineLocations({
            select: {
              name: 'name',
              slug: 'slug.current',
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.name || 'Untitled Ministry',
                  href: resolveHref('ministry', doc?.slug)!,
                },
                {
                  title: 'Ministries',
                  href: '/ministries',
                },
                {
                  title: 'Home',
                  href: '/',
                },
              ].filter(Boolean) as DocumentLocation[],
            }),
          }),
          location: defineLocations({
            select: {
              name: 'name',
              slug: 'slug.current',
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.name || 'Untitled Location',
                  href: resolveHref('location', doc?.slug)!,
                },
                {
                  title: 'Locations',
                  href: '/locations',
                },
                {
                  title: 'Home',
                  href: '/',
                },
              ].filter(Boolean) as DocumentLocation[],
            }),
          }),
          resource: defineLocations({
            select: {
              title: 'title',
              slug: 'slug.current',
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title || 'Untitled Resource',
                  href: resolveHref('resource', doc?.slug)!,
                },
                {
                  title: 'Resources',
                  href: '/resources',
                },
                {
                  title: 'Home',
                  href: '/',
                },
              ].filter(Boolean) as DocumentLocation[],
            }),
          }),
        },
      },
    }),
    structureTool({
      structure, // Custom studio structure configuration, imported from ./src/structure.ts
    }),
    // Additional plugins for enhanced functionality
    unsplashImageAsset(),
    assist(),
    visionTool(),
  ],

  // Schema configuration, imported from ./src/schemaTypes/index.ts
  schema: {
    types: schemaTypes,
  },
})
