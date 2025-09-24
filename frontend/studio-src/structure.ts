import type {StructureResolver} from 'sanity/structure'
import {
  CalendarIcon,
  PlayIcon,
  UsersIcon,
  PinIcon,
  DocumentTextIcon,
  FolderIcon,
  CogIcon,
  DocumentIcon,
  BookIcon,
  UserIcon,
} from '@sanity/icons'

/**
 * Custom structure configuration for the Sanity Studio
 * Organizes content types into logical groups for better UX
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Singletons group
      S.listItem()
        .title('Site Settings')
        .icon(CogIcon)
        .child(S.document().schemaType('settings').documentId('siteSettings')),

      S.divider(),

      // Content Pages group  
      S.listItem()
        .title('Pages')
        .icon(DocumentIcon)
        .child(S.documentTypeList('page').title('Pages')),

      S.listItem()
        .title('Posts')
        .icon(BookIcon)
        .child(
          S.documentTypeList('post')
            .title('Posts')
            .filter('_type == "post"')
            .child((documentId) =>
              S.document()
                .documentId(documentId)
                .schemaType('post')
            )
        ),

      S.divider(),

      // Church Content group
      S.listItem()
        .title('Church Content')
        .icon(CalendarIcon)
        .child(
          S.list()
            .title('Church Content')
            .items([
              S.listItem()
                .title('Events')
                .icon(CalendarIcon)
                .child(
                  S.documentTypeList('event')
                    .title('Events')
                    .filter('_type == "event"')
                    .defaultOrdering([{field: 'schedule.startDate', direction: 'desc'}])
                    .child((documentId) =>
                      S.document()
                        .documentId(documentId)
                        .schemaType('event')
                        .views([
                          S.view.form(),
                          S.view
                            .component(() => null) // Placeholder for calendar view
                            .title('Calendar'),
                        ])
                    )
                ),

              S.listItem()
                .title('Sermons')
                .icon(PlayIcon)
                .child(
                  S.list()
                    .title('Sermons & Series')
                    .items([
                      S.listItem()
                        .title('All Sermons')
                        .icon(PlayIcon)
                        .child(
                          S.documentTypeList('sermon')
                            .title('All Sermons')
                            .filter('_type == "sermon"')
                            .defaultOrdering([{field: 'date', direction: 'desc'}])
                        ),
                      
                      S.listItem()
                        .title('Sermon Series')
                        .icon(FolderIcon)
                        .child(
                          S.documentTypeList('sermonSeries')
                            .title('Sermon Series')
                            .filter('_type == "sermonSeries"')
                            .defaultOrdering([{field: 'startDate', direction: 'desc'}])
                        ),
                      
                      S.listItem()
                        .title('Recent Sermons')
                        .icon(PlayIcon)
                        .child(
                          S.documentTypeList('sermon')
                            .title('Recent Sermons (Last 30 days)')
                            .filter('_type == "sermon" && date > $thirtyDaysAgo')
                            .params({
                              thirtyDaysAgo: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
                            })
                            .defaultOrdering([{field: 'date', direction: 'desc'}])
                        ),
                    ])
                ),

              S.listItem()
                .title('Ministries')
                .icon(UsersIcon)
                .child(
                  S.list()
                    .title('Ministries')
                    .items([
                      S.listItem()
                        .title('All Ministries')
                        .icon(UsersIcon)
                        .child(
                          S.documentTypeList('ministry')
                            .title('All Ministries')
                            .filter('_type == "ministry"')
                            .defaultOrdering([{field: 'name', direction: 'asc'}])
                        ),
                      
                      S.listItem()
                        .title('Active Ministries')
                        .icon(UsersIcon)
                        .child(
                          S.documentTypeList('ministry')
                            .title('Active Ministries')
                            .filter('_type == "ministry" && isActive == true')
                            .defaultOrdering([{field: 'name', direction: 'asc'}])
                        ),

                      S.listItem()
                        .title('Featured Ministries')
                        .icon(UsersIcon)
                        .child(
                          S.documentTypeList('ministry')
                            .title('Featured Ministries')
                            .filter('_type == "ministry" && isFeatured == true')
                            .defaultOrdering([{field: 'name', direction: 'asc'}])
                        ),

                      S.divider(),

                      // Ministry types
                      S.listItem()
                        .title('Adult Ministries')
                        .child(
                          S.documentTypeList('ministry')
                            .title('Adult Ministries')
                            .filter('_type == "ministry" && ministryType == "adult"')
                            .defaultOrdering([{field: 'name', direction: 'asc'}])
                        ),

                      S.listItem()
                        .title('Youth Ministries')
                        .child(
                          S.documentTypeList('ministry')
                            .title('Youth Ministries')
                            .filter('_type == "ministry" && ministryType == "youth"')
                            .defaultOrdering([{field: 'name', direction: 'asc'}])
                        ),

                      S.listItem()
                        .title('Children\'s Ministries')
                        .child(
                          S.documentTypeList('ministry')
                            .title('Children\'s Ministries')
                            .filter('_type == "ministry" && ministryType == "children"')
                            .defaultOrdering([{field: 'name', direction: 'asc'}])
                        ),
                    ])
                ),

              S.listItem()
                .title('Locations')
                .icon(PinIcon)
                .child(
                  S.documentTypeList('location')
                    .title('Locations')
                    .filter('_type == "location"')
                    .defaultOrdering([{field: 'isPrimary', direction: 'desc'}, {field: 'name', direction: 'asc'}])
                ),

              S.listItem()
                .title('Resources')
                .icon(DocumentTextIcon)
                .child(
                  S.list()
                    .title('Resources')
                    .items([
                      S.listItem()
                        .title('All Resources')
                        .icon(DocumentTextIcon)
                        .child(
                          S.documentTypeList('resource')
                            .title('All Resources')
                            .filter('_type == "resource"')
                            .defaultOrdering([{field: 'publishDate', direction: 'desc'}])
                        ),

                      S.listItem()
                        .title('Featured Resources')
                        .icon(DocumentTextIcon)
                        .child(
                          S.documentTypeList('resource')
                            .title('Featured Resources')
                            .filter('_type == "resource" && isFeatured == true')
                            .defaultOrdering([{field: 'publishDate', direction: 'desc'}])
                        ),

                      S.divider(),

                      // Resource categories
                      S.listItem()
                        .title('Bible Study Guides')
                        .child(
                          S.documentTypeList('resource')
                            .title('Bible Study Guides')
                            .filter('_type == "resource" && resourceType == "bible-study"')
                            .defaultOrdering([{field: 'publishDate', direction: 'desc'}])
                        ),

                      S.listItem()
                        .title('Sermon Notes')
                        .child(
                          S.documentTypeList('resource')
                            .title('Sermon Notes')
                            .filter('_type == "resource" && resourceType == "sermon-notes"')
                            .defaultOrdering([{field: 'publishDate', direction: 'desc'}])
                        ),

                      S.listItem()
                        .title('Forms & Applications')
                        .child(
                          S.documentTypeList('resource')
                            .title('Forms & Applications')
                            .filter('_type == "resource" && resourceType == "form"')
                            .defaultOrdering([{field: 'publishDate', direction: 'desc'}])
                        ),

                      S.listItem()
                        .title('Educational Materials')
                        .child(
                          S.documentTypeList('resource')
                            .title('Educational Materials')
                            .filter('_type == "resource" && resourceType == "educational"')
                            .defaultOrdering([{field: 'publishDate', direction: 'desc'}])
                        ),
                    ])
                ),
            ])
        ),

      S.divider(),

      // People section
      S.listItem()
        .title('People')
        .icon(UserIcon)
        .child(
          S.documentTypeList('person')
            .title('People')
            .filter('_type == "person"')
            .defaultOrdering([{field: 'name', direction: 'asc'}])
        ),
    ])