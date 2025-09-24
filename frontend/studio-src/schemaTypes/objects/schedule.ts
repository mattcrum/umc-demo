import {defineType, defineField} from 'sanity'

/**
 * Schedule object for recurring events and services
 * Supports various recurrence patterns
 */
export const schedule = defineType({
  name: 'schedule',
  title: 'Schedule',
  type: 'object',
  fields: [
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
      },
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
      },
      validation: (Rule) =>
        Rule.custom((endDate, context) => {
          const {startDate} = context.parent as any
          if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
            return 'End date must be after start date'
          }
          return true
        }),
    }),
    defineField({
      name: 'isRecurring',
      title: 'Is Recurring?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'recurrencePattern',
      title: 'Recurrence Pattern',
      type: 'string',
      options: {
        list: [
          {title: 'Daily', value: 'daily'},
          {title: 'Weekly', value: 'weekly'},
          {title: 'Bi-weekly', value: 'biweekly'},
          {title: 'Monthly', value: 'monthly'},
          {title: 'Custom', value: 'custom'},
        ],
      },
      hidden: ({parent}) => !parent?.isRecurring,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const {isRecurring} = context.parent as any
          if (isRecurring && !value) {
            return 'Recurrence pattern is required for recurring events'
          }
          return true
        }),
    }),
    defineField({
      name: 'daysOfWeek',
      title: 'Days of Week',
      type: 'array',
      of: [{type: 'string'}],
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
      hidden: ({parent}) => !parent?.isRecurring || parent?.recurrencePattern !== 'weekly',
    }),
    defineField({
      name: 'recurrenceEndDate',
      title: 'Recurrence End Date',
      type: 'date',
      description: 'When should the recurrence end? Leave empty for ongoing events',
      hidden: ({parent}) => !parent?.isRecurring,
    }),
    defineField({
      name: 'exceptions',
      title: 'Exception Dates',
      type: 'array',
      of: [{type: 'date'}],
      description: 'Dates when this recurring event will not occur',
      hidden: ({parent}) => !parent?.isRecurring,
    }),
  ],
})