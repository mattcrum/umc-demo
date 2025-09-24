import {defineType, defineField} from 'sanity'

/**
 * Contact information object for people, ministries, and locations
 */
export const contactInfo = defineType({
  name: 'contactInfo',
  title: 'Contact Information',
  type: 'object',
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      validation: (Rule) =>
        Rule.regex(/^[\d\s()+-]+$/, {
          name: 'phone',
          invert: false,
        }).error('Please enter a valid phone number'),
    }),
    defineField({
      name: 'phoneExtension',
      title: 'Phone Extension',
      type: 'string',
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
      validation: (Rule) => Rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media',
      type: 'object',
      fields: [
        defineField({
          name: 'facebook',
          title: 'Facebook',
          type: 'url',
          validation: (Rule) => Rule.uri({scheme: ['http', 'https']}),
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
          validation: (Rule) => Rule.uri({scheme: ['http', 'https']}),
        }),
        defineField({
          name: 'twitter',
          title: 'Twitter/X',
          type: 'url',
          validation: (Rule) => Rule.uri({scheme: ['http', 'https']}),
        }),
        defineField({
          name: 'youtube',
          title: 'YouTube',
          type: 'url',
          validation: (Rule) => Rule.uri({scheme: ['http', 'https']}),
        }),
      ],
    }),
  ],
})