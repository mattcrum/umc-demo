import {defineType, defineField} from 'sanity'
import {CalendarIcon} from '@sanity/icons'

/**
 * Event schema for church events, activities, and gatherings
 * Supports one-time and recurring events with full scheduling capabilities
 */
export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eventType',
      title: 'Event Type',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          {title: 'Worship Service', value: 'worship'},
          {title: 'Bible Study', value: 'bible-study'},
          {title: 'Youth Event', value: 'youth'},
          {title: 'Community Outreach', value: 'outreach'},
          {title: 'Fellowship', value: 'fellowship'},
          {title: 'Special Service', value: 'special'},
          {title: 'Conference/Retreat', value: 'conference'},
          {title: 'Fundraiser', value: 'fundraiser'},
          {title: 'Other', value: 'other'},
        ],
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().max(500),
    }),
    defineField({
      name: 'content',
      title: 'Full Description',
      type: 'blockContent',
      description: 'Detailed information about the event',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'schedule',
      title: 'Schedule',
      type: 'schedule',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'reference',
      to: [{type: 'location'}],
      description: 'Where is this event taking place?',
    }),
    defineField({
      name: 'customLocation',
      title: 'Custom Location',
      type: 'object',
      description: 'Use this for one-time locations not in the system',
      fields: [
        defineField({
          name: 'name',
          title: 'Location Name',
          type: 'string',
        }),
        defineField({
          name: 'address',
          title: 'Address',
          type: 'address',
        }),
      ],
      hidden: ({document}) => document?.location,
    }),
    defineField({
      name: 'isOnline',
      title: 'Online Event?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'onlineDetails',
      title: 'Online Event Details',
      type: 'object',
      fields: [
        defineField({
          name: 'platform',
          title: 'Platform',
          type: 'string',
          options: {
            list: [
              {title: 'Zoom', value: 'zoom'},
              {title: 'YouTube Live', value: 'youtube'},
              {title: 'Facebook Live', value: 'facebook'},
              {title: 'Church Online Platform', value: 'church-online'},
              {title: 'Other', value: 'other'},
            ],
          },
        }),
        defineField({
          name: 'link',
          title: 'Meeting/Stream Link',
          type: 'url',
          validation: (Rule) => Rule.uri({scheme: ['http', 'https']}),
        }),
        defineField({
          name: 'meetingId',
          title: 'Meeting ID',
          type: 'string',
        }),
        defineField({
          name: 'password',
          title: 'Password',
          type: 'string',
          description: 'Only share if necessary',
        }),
      ],
      hidden: ({document}) => !document?.isOnline,
    }),
    defineField({
      name: 'ministries',
      title: 'Related Ministries',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'ministry'}]}],
      description: 'Which ministries are hosting or involved in this event?',
    }),
    defineField({
      name: 'organizer',
      title: 'Event Organizer',
      type: 'reference',
      to: [{type: 'person'}],
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'contactInfo',
      description: 'Contact details for questions about this event',
    }),
    defineField({
      name: 'registration',
      title: 'Registration',
      type: 'object',
      fields: [
        defineField({
          name: 'required',
          title: 'Registration Required?',
          type: 'boolean',
          initialValue: false,
        }),
        defineField({
          name: 'url',
          title: 'Registration URL',
          type: 'url',
          validation: (Rule) =>
            Rule.custom((value, context) => {
              const required = (context.parent as any)?.required
              if (required && !value) {
                return 'Registration URL is required when registration is required'
              }
              return true
            }),
        }),
        defineField({
          name: 'deadline',
          title: 'Registration Deadline',
          type: 'datetime',
        }),
        defineField({
          name: 'capacity',
          title: 'Event Capacity',
          type: 'number',
          validation: (Rule) => Rule.min(0),
        }),
        defineField({
          name: 'cost',
          title: 'Cost',
          type: 'string',
          description: 'e.g., "Free", "$10", "$25 per family"',
        }),
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Event?',
      type: 'boolean',
      initialValue: false,
      description: 'Show this event prominently on the homepage',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'scheduled',
      options: {
        list: [
          {title: 'Draft', value: 'draft'},
          {title: 'Scheduled', value: 'scheduled'},
          {title: 'Cancelled', value: 'cancelled'},
          {title: 'Postponed', value: 'postponed'},
          {title: 'Completed', value: 'completed'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'schedule.startDate',
      eventType: 'eventType',
      media: 'featuredImage',
      status: 'status',
    },
    prepare({title, date, eventType, media, status}) {
      const eventTypes = {
        worship: 'Worship',
        'bible-study': 'Bible Study',
        youth: 'Youth',
        outreach: 'Outreach',
        fellowship: 'Fellowship',
        special: 'Special',
        conference: 'Conference',
        fundraiser: 'Fundraiser',
        other: 'Other',
      }
      
      const dateStr = date ? new Date(date).toLocaleDateString() : 'No date'
      const statusStr = status !== 'scheduled' ? ` [${status.toUpperCase()}]` : ''
      
      return {
        title: `${title}${statusStr}`,
        subtitle: `${eventTypes[eventType] || eventType} - ${dateStr}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Event Date, New',
      name: 'dateDesc',
      by: [{field: 'schedule.startDate', direction: 'desc'}],
    },
    {
      title: 'Event Date, Old',
      name: 'dateAsc',
      by: [{field: 'schedule.startDate', direction: 'asc'}],
    },
  ],
})