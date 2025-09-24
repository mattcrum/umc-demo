import {defineArrayMember, defineType, defineField} from 'sanity'

/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 *
 * Learn more: https://www.sanity.io/docs/block-content
 */
export const blockContent = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      marks: {
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              defineField({
                name: 'linkType',
                title: 'Link Type',
                type: 'string',
                initialValue: 'href',
                options: {
                  list: [
                    {title: 'URL', value: 'href'},
                    {title: 'Page', value: 'page'},
                    {title: 'Post', value: 'post'},
                    {title: 'Event', value: 'event'},
                    {title: 'Sermon', value: 'sermon'},
                    {title: 'Ministry', value: 'ministry'},
                    {title: 'Location', value: 'location'},
                    {title: 'Resource', value: 'resource'},
                  ],
                  layout: 'radio',
                },
              }),
              defineField({
                name: 'href',
                title: 'URL',
                type: 'url',
                hidden: ({parent}) => parent?.linkType !== 'href' && parent?.linkType != null,
                validation: (Rule) =>
                  Rule.custom((value, context: any) => {
                    if (context.parent?.linkType === 'href' && !value) {
                      return 'URL is required when Link Type is URL'
                    }
                    return true
                  }),
              }),
              defineField({
                name: 'page',
                title: 'Page',
                type: 'reference',
                to: [{type: 'page'}],
                hidden: ({parent}) => parent?.linkType !== 'page',
                validation: (Rule) =>
                  Rule.custom((value, context: any) => {
                    if (context.parent?.linkType === 'page' && !value) {
                      return 'Page reference is required when Link Type is Page'
                    }
                    return true
                  }),
              }),
              defineField({
                name: 'post',
                title: 'Post',
                type: 'reference',
                to: [{type: 'post'}],
                hidden: ({parent}) => parent?.linkType !== 'post',
                validation: (Rule) =>
                  Rule.custom((value, context: any) => {
                    if (context.parent?.linkType === 'post' && !value) {
                      return 'Post reference is required when Link Type is Post'
                    }
                    return true
                  }),
              }),
              defineField({
                name: 'event',
                title: 'Event',
                type: 'reference',
                to: [{type: 'event'}],
                hidden: ({parent}) => parent?.linkType !== 'event',
                validation: (Rule) =>
                  Rule.custom((value, context: any) => {
                    if (context.parent?.linkType === 'event' && !value) {
                      return 'Event reference is required when Link Type is Event'
                    }
                    return true
                  }),
              }),
              defineField({
                name: 'sermon',
                title: 'Sermon',
                type: 'reference',
                to: [{type: 'sermon'}],
                hidden: ({parent}) => parent?.linkType !== 'sermon',
                validation: (Rule) =>
                  Rule.custom((value, context: any) => {
                    if (context.parent?.linkType === 'sermon' && !value) {
                      return 'Sermon reference is required when Link Type is Sermon'
                    }
                    return true
                  }),
              }),
              defineField({
                name: 'ministry',
                title: 'Ministry',
                type: 'reference',
                to: [{type: 'ministry'}],
                hidden: ({parent}) => parent?.linkType !== 'ministry',
                validation: (Rule) =>
                  Rule.custom((value, context: any) => {
                    if (context.parent?.linkType === 'ministry' && !value) {
                      return 'Ministry reference is required when Link Type is Ministry'
                    }
                    return true
                  }),
              }),
              defineField({
                name: 'location',
                title: 'Location',
                type: 'reference',
                to: [{type: 'location'}],
                hidden: ({parent}) => parent?.linkType !== 'location',
                validation: (Rule) =>
                  Rule.custom((value, context: any) => {
                    if (context.parent?.linkType === 'location' && !value) {
                      return 'Location reference is required when Link Type is Location'
                    }
                    return true
                  }),
              }),
              defineField({
                name: 'resource',
                title: 'Resource',
                type: 'reference',
                to: [{type: 'resource'}],
                hidden: ({parent}) => parent?.linkType !== 'resource',
                validation: (Rule) =>
                  Rule.custom((value, context: any) => {
                    if (context.parent?.linkType === 'resource' && !value) {
                      return 'Resource reference is required when Link Type is Resource'
                    }
                    return true
                  }),
              }),
              defineField({
                name: 'openInNewTab',
                title: 'Open in new tab',
                type: 'boolean',
                initialValue: false,
              }),
            ],
          },
        ],
      },
    }),
  ],
})
