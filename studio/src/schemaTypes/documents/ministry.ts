import {defineType, defineField} from 'sanity'
import {UsersIcon} from '@sanity/icons'

/**
 * Ministry schema for church ministries, programs, and groups
 * Supports various types of ministries with leaders, schedules, and resources
 */
export const ministry = defineType({
  name: 'ministry',
  title: 'Ministry',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Ministry Name',
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
      name: 'ministryType',
      title: 'Ministry Type',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          {title: 'Adult Ministry', value: 'adult'},
          {title: 'Youth Ministry', value: 'youth'},
          {title: 'Children\'s Ministry', value: 'children'},
          {title: 'Music & Worship', value: 'music'},
          {title: 'Outreach & Missions', value: 'outreach'},
          {title: 'Small Groups', value: 'small-groups'},
          {title: 'Prayer Ministry', value: 'prayer'},
          {title: 'Women\'s Ministry', value: 'womens'},
          {title: 'Men\'s Ministry', value: 'mens'},
          {title: 'Seniors Ministry', value: 'seniors'},
          {title: 'Support Groups', value: 'support'},
          {title: 'Education', value: 'education'},
          {title: 'Service Teams', value: 'service'},
          {title: 'Other', value: 'other'},
        ],
      },
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(300),
      description: 'Brief description for listings',
    }),
    defineField({
      name: 'mission',
      title: 'Mission Statement',
      type: 'text',
      rows: 4,
      description: 'The purpose and mission of this ministry',
    }),
    defineField({
      name: 'content',
      title: 'Full Description',
      type: 'blockContent',
      description: 'Detailed information about the ministry',
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
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Photo Gallery',
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
      name: 'leaders',
      title: 'Ministry Leaders',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'person',
              title: 'Person',
              type: 'reference',
              to: [{type: 'person'}],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'role',
              title: 'Role',
              type: 'string',
              validation: (Rule) => Rule.required(),
              options: {
                list: [
                  {title: 'Director', value: 'director'},
                  {title: 'Coordinator', value: 'coordinator'},
                  {title: 'Team Leader', value: 'team-leader'},
                  {title: 'Volunteer Leader', value: 'volunteer-leader'},
                  {title: 'Assistant', value: 'assistant'},
                  {title: 'Other', value: 'other'},
                ],
              },
            }),
            defineField({
              name: 'customRole',
              title: 'Custom Role Title',
              type: 'string',
              hidden: ({parent}) => parent?.role !== 'other',
            }),
          ],
          preview: {
            select: {
              person: 'person.name',
              role: 'role',
              customRole: 'customRole',
              media: 'person.image',
            },
            prepare({person, role, customRole, media}) {
              const roles = {
                director: 'Director',
                coordinator: 'Coordinator',
                'team-leader': 'Team Leader',
                'volunteer-leader': 'Volunteer Leader',
                assistant: 'Assistant',
                other: customRole || 'Team Member',
              }
              return {
                title: person || 'Unknown Person',
                subtitle: roles[role] || role,
                media,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'meetingSchedule',
      title: 'Regular Meeting Schedule',
      type: 'object',
      fields: [
        defineField({
          name: 'frequency',
          title: 'Meeting Frequency',
          type: 'string',
          options: {
            list: [
              {title: 'Weekly', value: 'weekly'},
              {title: 'Bi-weekly', value: 'biweekly'},
              {title: 'Monthly', value: 'monthly'},
              {title: 'Quarterly', value: 'quarterly'},
              {title: 'As Needed', value: 'as-needed'},
            ],
          },
        }),
        defineField({
          name: 'dayOfWeek',
          title: 'Day of Week',
          type: 'string',
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
          hidden: ({parent}) => parent?.frequency === 'as-needed',
        }),
        defineField({
          name: 'time',
          title: 'Meeting Time',
          type: 'string',
          description: 'e.g., "7:00 PM", "After Sunday Service"',
          hidden: ({parent}) => parent?.frequency === 'as-needed',
        }),
        defineField({
          name: 'additionalInfo',
          title: 'Additional Schedule Information',
          type: 'text',
          rows: 2,
        }),
      ],
    }),
    defineField({
      name: 'location',
      title: 'Primary Meeting Location',
      type: 'reference',
      to: [{type: 'location'}],
    }),
    defineField({
      name: 'ageGroups',
      title: 'Age Groups',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Preschool (0-5)', value: 'preschool'},
          {title: 'Elementary (6-11)', value: 'elementary'},
          {title: 'Middle School (12-14)', value: 'middle-school'},
          {title: 'High School (15-18)', value: 'high-school'},
          {title: 'College/Young Adults (18-25)', value: 'young-adults'},
          {title: 'Adults (26-64)', value: 'adults'},
          {title: 'Seniors (65+)', value: 'seniors'},
          {title: 'All Ages', value: 'all-ages'},
        ],
      },
    }),
    defineField({
      name: 'requirements',
      title: 'Requirements or Prerequisites',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Any requirements to join or participate',
    }),
    defineField({
      name: 'howToJoin',
      title: 'How to Join',
      type: 'blockContent',
      description: 'Instructions for getting involved',
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'contactInfo',
    }),
    defineField({
      name: 'resources',
      title: 'Ministry Resources',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'resource'}]}],
      description: 'Related downloadable resources or materials',
    }),
    defineField({
      name: 'relatedMinistries',
      title: 'Related Ministries',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'ministry'}]}],
    }),
    defineField({
      name: 'volunteerOpportunities',
      title: 'Volunteer Opportunities',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Opportunity Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            }),
            defineField({
              name: 'commitment',
              title: 'Time Commitment',
              type: 'string',
              description: 'e.g., "2 hours per week", "Monthly"',
            }),
            defineField({
              name: 'requirements',
              title: 'Requirements',
              type: 'array',
              of: [{type: 'string'}],
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'isActive',
      title: 'Active Ministry?',
      type: 'boolean',
      initialValue: true,
      description: 'Is this ministry currently active?',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Ministry?',
      type: 'boolean',
      initialValue: false,
      description: 'Display prominently on the website',
    }),
    defineField({
      name: 'registrationUrl',
      title: 'Registration/Sign-up URL',
      type: 'url',
      validation: (Rule) => Rule.uri({scheme: ['http', 'https']}),
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
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      type: 'ministryType',
      media: 'featuredImage',
      isActive: 'isActive',
    },
    prepare({title, type, media, isActive}) {
      const types = {
        adult: 'Adult',
        youth: 'Youth',
        children: 'Children',
        music: 'Music & Worship',
        outreach: 'Outreach',
        'small-groups': 'Small Groups',
        prayer: 'Prayer',
        womens: 'Women\'s',
        mens: 'Men\'s',
        seniors: 'Seniors',
        support: 'Support',
        education: 'Education',
        service: 'Service',
        other: 'Other',
      }
      
      const status = !isActive ? ' [INACTIVE]' : ''
      
      return {
        title: `${title}${status}`,
        subtitle: types[type] || type,
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
      by: [{field: 'ministryType', direction: 'asc'}],
    },
  ],
})