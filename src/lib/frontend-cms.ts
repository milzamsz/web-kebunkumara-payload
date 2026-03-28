import config from '@payload-config'
import type { Media, Page, Service, SiteSetting } from '@/payload-types'
import { getPayload } from 'payload'

type MediaRelation = number | Media | null | undefined
type ServiceCategory = Service['serviceCategory']

export type FrontendPageDoc = Pick<Page, 'hero'> | null
export type FrontendSiteSettingsDoc = SiteSetting | null
export type FrontendServiceDoc = Pick<
  Service,
  'slug' | 'name' | 'shortDescription' | 'coverImage' | 'displayOrder'
> | null

export function getMediaUrl(media: MediaRelation): string | null {
  return typeof media === 'object' && media !== null && 'url' in media
    ? ((media as Media).url ?? null)
    : null
}

export async function getPublishedPageBySlug(
  slug: string,
  logLabel: string,
): Promise<FrontendPageDoc> {
  const phase = process.env.NEXT_PHASE

  if (phase === 'phase-production-build') {
    return null
  }

  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'pages',
      where: {
        and: [
          { slug: { equals: slug } },
          { _status: { equals: 'published' } },
        ],
      },
      depth: 1,
      limit: 1,
    })

    return (result.docs[0] as FrontendPageDoc | undefined) ?? null
  } catch (err) {
    console.error(`[${logLabel}] Failed to fetch page "${slug}" from CMS:`, err)
    return null
  }
}

export async function getSiteSettings(
  logLabel: string,
): Promise<FrontendSiteSettingsDoc> {
  const phase = process.env.NEXT_PHASE

  if (phase === 'phase-production-build') {
    return null
  }

  try {
    const payload = await getPayload({ config })
    return (await payload.findGlobal({
      slug: 'siteSettings',
      depth: 1,
    })) as FrontendSiteSettingsDoc
  } catch (err) {
    console.error(`[${logLabel}] Failed to fetch site settings from CMS:`, err)
    return null
  }
}

export async function getPublishedServicesByCategory(
  serviceCategory: ServiceCategory,
  logLabel: string,
): Promise<FrontendServiceDoc[]> {
  const phase = process.env.NEXT_PHASE

  if (phase === 'phase-production-build') {
    return []
  }

  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'services',
      where: {
        and: [
          { serviceCategory: { equals: serviceCategory } },
          { _status: { equals: 'published' } },
        ],
      },
      sort: 'displayOrder',
      depth: 1,
      limit: 50,
    })

    return result.docs as FrontendServiceDoc[]
  } catch (err) {
    console.error(
      `[${logLabel}] Failed to fetch services for category "${serviceCategory}" from CMS:`,
      err,
    )
    return []
  }
}
