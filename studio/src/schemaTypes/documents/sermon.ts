import {defineType, defineField} from 'sanity'
import {PlayIcon} from '@sanity/icons'

/**
 * Sermon schema for managing sermon content including video, audio, and transcripts
 * Supports sermon series and multimedia content
 */
export const sermon = defineType({
  name: 'sermon',
  title: 'Sermon',
  type: 'document',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Sermon Title',
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
      name: 'date',
      title: 'Sermon Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
      },
    }),
    defineField({
      name: 'speaker',
      title: 'Speaker',
      type: 'reference',
      to: [{type: 'person'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'additionalSpeakers',
      title: 'Additional Speakers',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'person'}]}],
    }),
    defineField({
      name: 'series',
      title: 'Sermon Series',
      type: 'reference',
      to: [{type: 'sermonSeries'}],
      description: 'Is this sermon part of a series?',
    }),
    defineField({
      name: 'seriesOrder',
      title: 'Order in Series',
      type: 'number',
      hidden: ({document}) => !document?.series,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.document?.series && !value) {
            return 'Please specify the order in the series'
          }
          return true
        }).min(1),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(300),
      description: 'Brief summary for listings and social media',
    }),
    defineField({
      name: 'scriptureReferences',
      title: 'Scripture References',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'book',
              title: 'Book',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'chapter',
              title: 'Chapter',
              type: 'number',
              validation: (Rule) => Rule.required().min(1),
            }),
            defineField({
              name: 'verseStart',
              title: 'Verse Start',
              type: 'number',
              validation: (Rule) => Rule.min(1),
            }),
            defineField({
              name: 'verseEnd',
              title: 'Verse End',
              type: 'number',
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const start = (context.parent as any)?.verseStart
                  if (value && start && value < start) {
                    return 'End verse must be after start verse'
                  }
                  return true
                }),
            }),
            defineField({
              name: 'isPrimary',
              title: 'Primary Scripture?',
              type: 'boolean',
              initialValue: false,
              description: 'Is this the main scripture for this sermon?',
            }),
          ],
          preview: {
            select: {
              book: 'book',
              chapter: 'chapter',
              verseStart: 'verseStart',
              verseEnd: 'verseEnd',
              isPrimary: 'isPrimary',
            },
            prepare({book, chapter, verseStart, verseEnd, isPrimary}) {
              let reference = `${book} ${chapter}`
              if (verseStart) {
                reference += `:${verseStart}`
                if (verseEnd) {
                  reference += `-${verseEnd}`
                }
              }
              return {
                title: reference,
                subtitle: isPrimary ? 'Primary Scripture' : '',
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'media',
      title: 'Media',
      type: 'object',
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'videoUrl',
          title: 'Video URL',
          type: 'url',
          description: 'YouTube, Vimeo, or direct video URL',
          validation: (Rule) => Rule.uri({scheme: ['http', 'https']}),
        }),
        defineField({
          name: 'videoFile',
          title: 'Video File',
          type: 'file',
          options: {
            accept: 'video/*',
          },
        }),
        defineField({
          name: 'audioUrl',
          title: 'Audio URL',
          type: 'url',
          description: 'Podcast or audio streaming URL',
          validation: (Rule) => Rule.uri({scheme: ['http', 'https']}),
        }),
        defineField({
          name: 'audioFile',
          title: 'Audio File',
          type: 'file',
          options: {
            accept: 'audio/*',
          },
        }),
        defineField({
          name: 'duration',
          title: 'Duration (minutes)',
          type: 'number',
          validation: (Rule) => Rule.min(1),
        }),
      ],
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
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
      name: 'transcript',
      title: 'Transcript',
      type: 'blockContent',
      description: 'Full text transcript of the sermon',
    }),
    defineField({
      name: 'notes',
      title: 'Sermon Notes',
      type: 'file',
      description: 'Downloadable sermon notes or outline (PDF)',
      options: {
        accept: '.pdf,.doc,.docx',
      },
    }),
    defineField({
      name: 'discussionQuestions',
      title: 'Discussion Questions',
      type: 'array',
      of: [{type: 'text', rows: 2}],
      description: 'Questions for small groups or personal reflection',
    }),
    defineField({
      name: 'keyPoints',
      title: 'Key Points',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Main takeaways from the sermon',
    }),
    defineField({
      name: 'topics',
      title: 'Topics',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      description: 'Topics covered in this sermon for categorization',
    }),
    defineField({
      name: 'relatedResources',
      title: 'Related Resources',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'resource'}]}],
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'reference',
      to: [{type: 'location'}],
      description: 'Where was this sermon delivered?',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Sermon?',
      type: 'boolean',
      initialValue: false,
      description: 'Display prominently on the website',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
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
      speaker: 'speaker.name',
      date: 'date',
      series: 'series.title',
      media: 'thumbnail',
    },
    prepare({title, speaker, date, series, media}) {
      const dateStr = date ? new Date(date).toLocaleDateString() : 'No date'
      const subtitle = series 
        ? `${series} - ${speaker} (${dateStr})`
        : `${speaker} (${dateStr})`
      
      return {
        title,
        subtitle,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Date, New',
      name: 'dateDesc',
      by: [{field: 'date', direction: 'desc'}],
    },
    {
      title: 'Date, Old',
      name: 'dateAsc',
      by: [{field: 'date', direction: 'asc'}],
    },
  ],
})