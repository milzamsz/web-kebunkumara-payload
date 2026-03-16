import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { populatePublishedAt } from '../hooks/populatePublishedAt'
import { HeroBanner } from '../blocks/HeroBanner'
import { Content } from '../blocks/Content'
import { MediaBlock } from '../blocks/MediaBlock'
import { CallToAction } from '../blocks/CallToAction'
import { Gallery } from '../blocks/Gallery'
import { Testimonials } from '../blocks/Testimonials'
import { Stats } from '../blocks/Stats'
import { FAQ } from '../blocks/FAQ'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: 'Service',
    plural: 'Services',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'serviceCategory', 'status', 'displayOrder'],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
    },
    maxPerDoc: 50,
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
    readVersions: authenticated,
  },
  fields: [
    {
      name: 'name',
      label: 'Service Name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'URL Slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'serviceCategory',
      label: 'Service Category',
      type: 'select',
      required: true,
      options: [
        { label: 'Educational Program', value: 'educational-program' },
        { label: 'Landscaping Consultancy', value: 'landscaping-consultancy' },
        { label: 'Garden Product', value: 'garden-product' },
        { label: 'Movement', value: 'movement' },
      ],
    },
    {
      name: 'shortDescription',
      label: 'Short Description',
      type: 'textarea',
    },
    {
      name: 'coverImage',
      label: 'Cover Image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'layout',
      label: 'Page Content',
      type: 'blocks',
      blocks: [
        HeroBanner,
        Content,
        MediaBlock,
        CallToAction,
        Gallery,
        Testimonials,
        Stats,
        FAQ,
      ],
    },
    {
      name: 'publishedAt',
      label: 'Publish Date',
      type: 'date',
      hooks: {
        beforeChange: [populatePublishedAt],
      },
    },
    {
      name: 'displayOrder',
      label: 'Display Order',
      type: 'number',
      admin: {
        description: 'Controls the order on the services listing page',
      },
    },
  ],
}
