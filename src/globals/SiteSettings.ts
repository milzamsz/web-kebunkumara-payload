import type { GlobalConfig } from 'payload'
import { authenticated } from '../access/authenticated'

export const SiteSettings: GlobalConfig = {
  slug: 'siteSettings',
  label: 'Site Settings',
  access: {
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      name: 'siteName',
      label: 'Site Name',
      type: 'text',
      defaultValue: 'Kebun Kumara',
    },
    {
      name: 'siteDescription',
      label: 'Site Description',
      type: 'textarea',
    },
    {
      name: 'whatsappNumber',
      label: 'WhatsApp Number',
      type: 'text',
      admin: {
        description: 'Phone number with country code, e.g. 6281510986060',
      },
    },
    {
      name: 'email',
      label: 'Contact Email',
      type: 'text',
    },
    {
      name: 'address',
      label: 'Address',
      type: 'textarea',
    },
    {
      name: 'mapsEmbedUrl',
      label: 'Google Maps Embed URL',
      type: 'text',
    },
    {
      name: 'analyticsId',
      label: 'Analytics Tracking ID',
      type: 'text',
      admin: {
        description: 'Umami analytics tracking ID',
      },
    },
    {
      name: 'socialMedia',
      label: 'Social Media Links',
      type: 'group',
      fields: [
        {
          name: 'instagram',
          label: 'Instagram URL',
          type: 'text',
        },
        {
          name: 'facebook',
          label: 'Facebook URL',
          type: 'text',
        },
        {
          name: 'youtube',
          label: 'YouTube URL',
          type: 'text',
        },
        {
          name: 'tiktok',
          label: 'TikTok URL',
          type: 'text',
        },
        {
          name: 'linkedin',
          label: 'LinkedIn URL',
          type: 'text',
        },
      ],
    },
  ],
}
