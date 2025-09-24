import {defineType, defineField} from 'sanity'

/**
 * Address object for location-based content
 * Includes structured data for better maps integration
 */
export const address = defineType({
  name: 'address',
  title: 'Address',
  type: 'object',
  fields: [
    defineField({
      name: 'street',
      title: 'Street Address',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'street2',
      title: 'Street Address Line 2',
      type: 'string',
      description: 'Apartment, suite, unit, building, floor, etc.',
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'state',
      title: 'State/Province',
      type: 'string',
      validation: (Rule) => Rule.required().max(2).uppercase(),
      description: 'Two-letter state code (e.g., TX, CA)',
    }),
    defineField({
      name: 'zipCode',
      title: 'ZIP/Postal Code',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      initialValue: 'USA',
      options: {
        list: [
          {title: 'United States', value: 'USA'},
          {title: 'Canada', value: 'CAN'},
          {title: 'Mexico', value: 'MEX'},
        ],
      },
    }),
  ],
  preview: {
    select: {
      street: 'street',
      city: 'city',
      state: 'state',
    },
    prepare({street, city, state}) {
      return {
        title: street || 'No street address',
        subtitle: `${city || ''}, ${state || ''}`.trim() || 'No city/state',
      }
    },
  },
})