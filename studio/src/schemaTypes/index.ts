import {person} from './documents/person'
import {page} from './documents/page'
import {post} from './documents/post'
import {event} from './documents/event'
import {sermon} from './documents/sermon'
import {sermonSeries} from './documents/sermonSeries'
import {ministry} from './documents/ministry'
import {location} from './documents/location'
import {resource} from './documents/resource'
import {callToAction} from './objects/callToAction'
import {infoSection} from './objects/infoSection'
import {settings} from './singletons/settings'
import {link} from './objects/link'
import {blockContent} from './objects/blockContent'
import {seo} from './objects/seo'
import {address} from './objects/address'
import {schedule} from './objects/schedule'
import {contactInfo} from './objects/contactInfo'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [
  // Singletons
  settings,
  // Documents
  page,
  post,
  person,
  event,
  sermon,
  sermonSeries,
  ministry,
  location,
  resource,
  // Objects
  blockContent,
  infoSection,
  callToAction,
  link,
  seo,
  address,
  schedule,
  contactInfo,
]
