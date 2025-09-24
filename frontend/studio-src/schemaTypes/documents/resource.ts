import {defineType, defineField} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

/**
 * Resource schema for downloadable materials, documents, and educational content
 * Supports various file types and categorization
 */
export const resource = defineType({
  name: 'resource',
  title: 'Resource',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Resource Title',
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
      name: 'resourceType',
      title: 'Resource Type',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          {title: 'Bible Study Guide', value: 'bible-study'},
          {title: 'Sermon Notes', value: 'sermon-notes'},
          {title: 'Bulletin/Newsletter', value: 'bulletin'},
          {title: 'Form/Application', value: 'form'},
          {title: 'Educational Material', value: 'educational'},
          {title: 'Devotional', value: 'devotional'},
          {title: 'Music/Hymns', value: 'music'},
          {title: 'Policy/Procedure', value: 'policy'},
          {title: 'Report', value: 'report'},
          {title: 'Presentation', value: 'presentation'},
          {title: 'Book/E-book', value: 'book'},
          {title: 'Video', value: 'video'},
          {title: 'Audio', value: 'audio'},
          {title: 'Other', value: 'other'},
        ],
      },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          {title: 'Worship', value: 'worship'},
          {title: 'Education', value: 'education'},
          {title: 'Youth', value: 'youth'},
          {title: 'Children', value: 'children'},
          {title: 'Administration', value: 'administration'},
          {title: 'Outreach', value: 'outreach'},
          {title: 'Small Groups', value: 'small-groups'},
          {title: 'Leadership', value: 'leadership'},
          {title: 'Spiritual Growth', value: 'spiritual-growth'},
          {title: 'Family', value: 'family'},
          {title: 'General', value: 'general'},
        ],
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(500),
    }),
    defineField({
      name: 'content',
      title: 'Additional Information',
      type: 'blockContent',
      description: 'Detailed information or instructions about this resource',
    }),
    defineField({
      name: 'file',
      title: 'Resource File',
      type: 'file',
      validation: (Rule) => Rule.required(),
      options: {
        storeOriginalFilename: true,
      },
      fields: [
        {
          name: 'description',
          type: 'string',
          title: 'File Description',
        },
      ],
    }),
    defineField({
      name: 'additionalFiles',
      title: 'Additional Files',
      type: 'array',
      of: [
        {
          type: 'file',
          options: {
            storeOriginalFilename: true,
          },
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'File Title',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              type: 'string',
              title: 'File Description',
            },
          ],
        },
      ],
      description: 'Supporting documents or alternative formats',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail/Preview Image',
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
      name: 'author',
      title: 'Author/Creator',
      type: 'reference',
      to: [{type: 'person'}],
    }),
    defineField({
      name: 'externalAuthor',
      title: 'External Author',
      type: 'string',
      description: 'If author is not in the system',
      hidden: ({document}) => document?.author,
    }),
    defineField({
      name: 'publishDate',
      title: 'Publish Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString().split('T')[0],
    }),
    defineField({
      name: 'expirationDate',
      title: 'Expiration Date',
      type: 'date',
      description: 'When should this resource be removed or archived?',
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      initialValue: 'en',
      options: {
        list: [
          {title: 'English', value: 'en'},
          {title: 'Spanish', value: 'es'},
          {title: 'French', value: 'fr'},
          {title: 'Portuguese', value: 'pt'},
          {title: 'Other', value: 'other'},
        ],
      },
    }),
    defineField({
      name: 'targetAudience',
      title: 'Target Audience',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Children', value: 'children'},
          {title: 'Youth', value: 'youth'},
          {title: 'Young Adults', value: 'young-adults'},
          {title: 'Adults', value: 'adults'},
          {title: 'Seniors', value: 'seniors'},
          {title: 'Parents', value: 'parents'},
          {title: 'Leaders', value: 'leaders'},
          {title: 'Volunteers', value: 'volunteers'},
          {title: 'New Members', value: 'new-members'},
          {title: 'General', value: 'general'},
        ],
      },
    }),
    defineField({
      name: 'relatedMinistries',
      title: 'Related Ministries',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'ministry'}]}],
    }),
    defineField({
      name: 'relatedSermons',
      title: 'Related Sermons',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'sermon'}]}],
    }),
    defineField({
      name: 'relatedEvents',
      title: 'Related Events',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'event'}]}],
    }),
    defineField({
      name: 'accessLevel',
      title: 'Access Level',
      type: 'string',
      initialValue: 'public',
      options: {
        list: [
          {title: 'Public', value: 'public'},
          {title: 'Members Only', value: 'members'},
          {title: 'Leaders Only', value: 'leaders'},
          {title: 'Staff Only', value: 'staff'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'downloadCount',
      title: 'Download Count',
      type: 'number',
      readOnly: true,
      initialValue: 0,
      description: 'Number of times this resource has been downloaded',
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
      title: 'Featured Resource?',
      type: 'boolean',
      initialValue: false,
      description: 'Display prominently in resource listings',
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright Information',
      type: 'text',
      rows: 2,
      description: 'Copyright notice or usage restrictions',
    }),
    defineField({
      name: 'source',
      title: 'Source/Attribution',
      type: 'string',
      description: 'Original source if not created internally',
    }),
    defineField({
      name: 'version',
      title: 'Version',
      type: 'string',
      description: 'Version number or revision date',
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
      type: 'resourceType',
      category: 'category',
      media: 'thumbnail',
      featured: 'isFeatured',
      access: 'accessLevel',
    },
    prepare({title, type, category, media, featured, access}) {
      const types = {
        'bible-study': 'Bible Study',
        'sermon-notes': 'Sermon Notes',
        bulletin: 'Bulletin',
        form: 'Form',
        educational: 'Educational',
        devotional: 'Devotional',
        music: 'Music',
        policy: 'Policy',
        report: 'Report',
        presentation: 'Presentation',
        book: 'Book',
        video: 'Video',
        audio: 'Audio',
        other: 'Other',
      }
      
      const featuredStr = featured ? ' [FEATURED]' : ''
      const accessStr = access !== 'public' ? ` (${access})` : ''
      
      return {
        title: `${title}${featuredStr}`,
        subtitle: `${types[type] || type} - ${category}${accessStr}`,
        media: media || DocumentTextIcon,
      }
    },
  },
  orderings: [
    {
      title: 'Date, New',
      name: 'dateDesc',
      by: [{field: 'publishDate', direction: 'desc'}],
    },
    {
      title: 'Date, Old',
      name: 'dateAsc',
      by: [{field: 'publishDate', direction: 'asc'}],
    },
    {
      title: 'Title, A-Z',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}],
    },
    {
      title: 'Most Downloaded',
      name: 'downloads',
      by: [{field: 'downloadCount', direction: 'desc'}],
    },
  ],
})