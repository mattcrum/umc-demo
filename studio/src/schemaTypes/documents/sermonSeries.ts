import {defineType, defineField} from 'sanity'
import {FolderIcon} from '@sanity/icons'

/**
 * Sermon Series schema for grouping related sermons
 */
export const sermonSeries = defineType({
  name: 'sermonSeries',
  title: 'Sermon Series',
  type: 'document',
  icon: FolderIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Series Title',
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
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().max(500),
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      validation: (Rule) =>
        Rule.custom((endDate, context) => {
          const {startDate} = context.document as any
          if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
            return 'End date must be after start date'
          }
          return true
        }),
    }),
    defineField({
      name: 'image',
      title: 'Series Image',
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'primarySpeaker',
      title: 'Primary Speaker',
      type: 'reference',
      to: [{type: 'person'}],
    }),
    defineField({
      name: 'theme',
      title: 'Theme/Focus',
      type: 'string',
      description: 'Main theme or focus of this series',
    }),
    defineField({
      name: 'isActive',
      title: 'Currently Active?',
      type: 'boolean',
      initialValue: true,
      description: 'Is this series currently being preached?',
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
      startDate: 'startDate',
      endDate: 'endDate',
      media: 'image',
      isActive: 'isActive',
    },
    prepare({title, startDate, endDate, media, isActive}) {
      const start = startDate ? new Date(startDate).toLocaleDateString() : ''
      const end = endDate ? new Date(endDate).toLocaleDateString() : 'Ongoing'
      const status = isActive ? ' [ACTIVE]' : ''
      
      return {
        title: `${title}${status}`,
        subtitle: `${start} - ${end}`,
        media,
      }
    },
  },
})