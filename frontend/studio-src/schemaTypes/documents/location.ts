import {defineType, defineField} from 'sanity'
import {PinIcon} from '@sanity/icons'

/**
 * Location schema for churches, facilities, and meeting places
 * Includes geolocation support for maps integration
 */
export const location = defineType({
  name: 'location',
  title: 'Location',
  type: 'document',
  icon: PinIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Location Name',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'locationType',
      title: 'Location Type',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          {title: 'Main Church', value: 'main-church'},
          {title: 'Satellite Campus', value: 'satellite'},
          {title: 'Ministry Center', value: 'ministry-center'},
          {title: 'Office', value: 'office'},
          {title: 'Community Center', value: 'community-center'},
          {title: 'Outdoor Venue', value: 'outdoor'},
          {title: 'Partner Location', value: 'partner'},
          {title: 'Other', value: 'other'},
        ],
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'address',
      title: 'Physical Address',
      type: 'address',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mailingAddress',
      title: 'Mailing Address',
      type: 'address',
      description: 'If different from physical address',
    }),
    defineField({
      name: 'geolocation',
      title: 'Geolocation',
      type: 'geopoint',
      description: 'Coordinates for map display',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Location Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'facilities',
      title: 'Facilities',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Facility Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'e.g., "Sanctuary", "Fellowship Hall", "Youth Room"',
            }),
            defineField({
              name: 'capacity',
              title: 'Capacity',
              type: 'number',
              validation: (Rule) => Rule.min(0),
            }),
            defineField({
              name: 'amenities',
              title: 'Amenities',
              type: 'array',
              of: [{type: 'string'}],
              options: {
                list: [
                  {title: 'Audio/Visual Equipment', value: 'av'},
                  {title: 'Kitchen', value: 'kitchen'},
                  {title: 'Restrooms', value: 'restrooms'},
                  {title: 'Parking', value: 'parking'},
                  {title: 'Wheelchair Accessible', value: 'accessible'},
                  {title: 'Children\'s Area', value: 'childrens'},
                  {title: 'WiFi', value: 'wifi'},
                  {title: 'Live Streaming', value: 'streaming'},
                  {title: 'Air Conditioning', value: 'ac'},
                  {title: 'Stage/Platform', value: 'stage'},
                ],
              },
            }),
            defineField({
              name: 'isRentable',
              title: 'Available for Rent?',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'rentalInfo',
              title: 'Rental Information',
              type: 'text',
              rows: 2,
              hidden: ({parent}) => !parent?.isRentable,
            }),
          ],
          preview: {
            select: {
              title: 'name',
              capacity: 'capacity',
              isRentable: 'isRentable',
            },
            prepare({title, capacity, isRentable}) {
              const rental = isRentable ? ' (Rentable)' : ''
              return {
                title: title || 'Unnamed Facility',
                subtitle: `Capacity: ${capacity || 'N/A'}${rental}`,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'hours',
      title: 'Hours of Operation',
      type: 'object',
      fields: [
        defineField({
          name: 'sunday',
          title: 'Sunday',
          type: 'string',
          placeholder: 'e.g., 8:00 AM - 1:00 PM',
        }),
        defineField({
          name: 'monday',
          title: 'Monday',
          type: 'string',
          placeholder: 'e.g., 9:00 AM - 5:00 PM',
        }),
        defineField({
          name: 'tuesday',
          title: 'Tuesday',
          type: 'string',
        }),
        defineField({
          name: 'wednesday',
          title: 'Wednesday',
          type: 'string',
        }),
        defineField({
          name: 'thursday',
          title: 'Thursday',
          type: 'string',
        }),
        defineField({
          name: 'friday',
          title: 'Friday',
          type: 'string',
        }),
        defineField({
          name: 'saturday',
          title: 'Saturday',
          type: 'string',
        }),
        defineField({
          name: 'notes',
          title: 'Additional Notes',
          type: 'text',
          rows: 2,
          description: 'Holiday hours, special closures, etc.',
        }),
      ],
    }),
    defineField({
      name: 'serviceTimes',
      title: 'Service Times',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Service Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'e.g., "Traditional Service", "Contemporary Service"',
            }),
            defineField({
              name: 'dayOfWeek',
              title: 'Day of Week',
              type: 'string',
              validation: (Rule) => Rule.required(),
              options: {
                list: [
                  {title: 'Sunday', value: 'sunday'},
                  {title: 'Monday', value: 'monday'},
                  {title: 'Tuesday', value: 'tuesday'},
                  {title: 'Wednesday', value: 'wednesday'},
                  {title: 'Thursday', value: 'thursday'},
                  {title: 'Friday', value: 'friday'},
                  {title: 'Saturday', value: 'saturday'},
                ],
              },
            }),
            defineField({
              name: 'time',
              title: 'Time',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'e.g., "9:00 AM", "10:30 AM"',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            }),
          ],
          preview: {
            select: {
              name: 'name',
              day: 'dayOfWeek',
              time: 'time',
            },
            prepare({name, day, time}) {
              const days = {
                sunday: 'Sunday',
                monday: 'Monday',
                tuesday: 'Tuesday',
                wednesday: 'Wednesday',
                thursday: 'Thursday',
                friday: 'Friday',
                saturday: 'Saturday',
              }
              return {
                title: name || 'Unnamed Service',
                subtitle: `${days[day] || day} at ${time}`,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'parkingInfo',
      title: 'Parking Information',
      type: 'text',
      rows: 3,
      description: 'Details about parking availability and instructions',
    }),
    defineField({
      name: 'accessibilityInfo',
      title: 'Accessibility Information',
      type: 'text',
      rows: 3,
      description: 'Information about wheelchair access, hearing assistance, etc.',
    }),
    defineField({
      name: 'transportationInfo',
      title: 'Transportation Information',
      type: 'text',
      rows: 3,
      description: 'Public transit, shuttle services, etc.',
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'contactInfo',
    }),
    defineField({
      name: 'pastor',
      title: 'Lead Pastor/Administrator',
      type: 'reference',
      to: [{type: 'person'}],
    }),
    defineField({
      name: 'staff',
      title: 'Staff Members',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'person'}]}],
    }),
    defineField({
      name: 'directions',
      title: 'Driving Directions',
      type: 'blockContent',
      description: 'Special instructions for finding the location',
    }),
    defineField({
      name: 'googleMapsUrl',
      title: 'Google Maps URL',
      type: 'url',
      validation: (Rule) => Rule.uri({scheme: ['http', 'https']}),
      description: 'Direct link to Google Maps for this location',
    }),
    defineField({
      name: 'isActive',
      title: 'Active Location?',
      type: 'boolean',
      initialValue: true,
      description: 'Is this location currently in use?',
    }),
    defineField({
      name: 'isPrimary',
      title: 'Primary Location?',
      type: 'boolean',
      initialValue: false,
      description: 'Is this the main church location?',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      type: 'locationType',
      city: 'address.city',
      state: 'address.state',
      media: 'images.0',
      isPrimary: 'isPrimary',
    },
    prepare({title, type, city, state, media, isPrimary}) {
      const types = {
        'main-church': 'Main Church',
        satellite: 'Satellite',
        'ministry-center': 'Ministry Center',
        office: 'Office',
        'community-center': 'Community Center',
        outdoor: 'Outdoor',
        partner: 'Partner',
        other: 'Other',
      }
      
      const primary = isPrimary ? ' [PRIMARY]' : ''
      const location = city && state ? ` - ${city}, ${state}` : ''
      
      return {
        title: `${title}${primary}`,
        subtitle: `${types[type] || type}${location}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Name, A-Z',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}],
    },
    {
      title: 'Type',
      name: 'type',
      by: [{field: 'locationType', direction: 'asc'}],
    },
  ],
})