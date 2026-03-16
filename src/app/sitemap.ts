import type { MetadataRoute } from 'next'
import { fallbackBlogPostsDetail, fallbackProjectPlants } from '@/lib/fallback-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://kebunkumara.id'

  const staticRoutes = [
    '',
    '/about',
    '/blog',
    '/contact',
    '/media',
    '/why-garden',
    '/kumara-plant-story',
    '/services/educational-program',
    '/services/landscaping-consultancy',
    '/services/garden-product',
    '/services/movement',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const blogRoutes = Object.keys(fallbackBlogPostsDetail).map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const seenPlants = new Set<string>()
  const plantRoutes: MetadataRoute.Sitemap = []
  Object.values(fallbackProjectPlants).forEach((project) => {
    project.plants.forEach((plant) => {
      if (!seenPlants.has(plant.id)) {
        seenPlants.add(plant.id)
        plantRoutes.push({
          url: `${baseUrl}/kumara-plant-story/${plant.id}`,
          lastModified: new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.5,
        })
      }
    })
  })

  return [...staticRoutes, ...blogRoutes, ...plantRoutes]
}
