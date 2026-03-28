/**
 * Payload CMS Seed Script
 * Migrates all hardcoded content from fallback-data.ts into Payload collections and globals.
 *
 * Run with: npx payload seed
 * or: npx tsx src/seed.ts
 */
import type { Payload } from 'payload'
import { getPayload } from 'payload'
import config from './payload.config'
import type { Service } from './payload-types'

type LexicalTextNode = {
  type: 'text'
  text: string
  format: number
  style: string
  mode: 'normal'
  detail: number
  version: number
}

type LexicalBlockNode = {
  type: 'paragraph' | 'heading'
  children: LexicalTextNode[]
  direction: 'ltr'
  format: ''
  indent: number
  version: number
  tag?: string
  textFormat?: number
}

type LexicalDocument = {
  root: {
    type: 'root'
    children: LexicalBlockNode[]
    direction: 'ltr'
    format: ''
    indent: number
    version: number
  }
}

// ─── Lexical Helpers ────────────────────────────────────────────────────────

function lexicalText(text: string): LexicalTextNode {
  return { type: 'text', text, format: 0, style: '', mode: 'normal', detail: 0, version: 1 }
}

function lexicalParagraph(text: string): LexicalBlockNode {
  return {
    type: 'paragraph',
    children: [lexicalText(text)],
    direction: 'ltr',
    format: '',
    indent: 0,
    textFormat: 0,
    version: 1,
  }
}

function lexicalHeading(text: string, tag = 'h2'): LexicalBlockNode {
  return {
    type: 'heading',
    tag,
    children: [lexicalText(text)],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  }
}

function lexicalDoc(nodes: LexicalBlockNode[]): LexicalDocument {
  return {
    root: {
      type: 'root',
      children: nodes,
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

// ─── Data ────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  'Tutorials',
  'Events',
  'Reflections',
  'Recipes',
  'Ecosystem',
  'Urban Farming',
  'Lifestyle',
  'Sustainability',
]

const PLANT_CATEGORIES = [
  { name: 'Ornamental', slug: 'ornamental' },
  { name: 'Edible', slug: 'edible' },
  { name: 'Shade-loving', slug: 'shade-loving' },
]

const SERVICES_PROGRAMS: Array<{
  slug: string
  name: string
  serviceCategory: Service['serviceCategory']
  shortDescription: string
  displayOrder: number
}> = [
  {
    slug: 'public-workshops',
    name: 'Public Workshops',
    serviceCategory: 'educational-program',
    shortDescription:
      'Workshop kami membantu warga kota mendapatkan keterampilan yang mendukung perjalanan berkelanjutan dari rumah. Dari membuat kompos, berkebun di lahan sempit, hingga fermentasi makanan.',
    displayOrder: 1,
  },
  {
    slug: 'company-programs',
    name: 'Company Programs & Private Events',
    serviceCategory: 'educational-program',
    shortDescription:
      'Program dan acara perusahaan kami memperkuat kesadaran ekologi kolektif dan pengalaman keberlanjutan yang lebih mendalam. Cocok untuk team building, CSR, dan acara privat.',
    displayOrder: 2,
  },
  {
    slug: 'nature-playschool',
    name: 'Nature Playschool',
    serviceCategory: 'educational-program',
    shortDescription:
      'Kami mendukung orang tua dengan pembelajaran eksperiensial outdoor yang terinspirasi taman, dimulai dari usia 18 bulan. Anak-anak belajar melalui eksplorasi alam langsung.',
    displayOrder: 3,
  },
  {
    slug: 'school-programs',
    name: 'School Programs',
    serviceCategory: 'educational-program',
    shortDescription:
      'Sejak 2017, kami mendukung sekolah-sekolah dengan pembelajaran ekologi eksperiensial untuk siswa mereka — dari TK hingga SMA.',
    displayOrder: 4,
  },
  {
    slug: 'holiday-program',
    name: 'Holiday Program',
    serviceCategory: 'educational-program',
    shortDescription:
      'Our seasonal programs designed to reconnect children with nature. Through hands-on activities, kids learn the magic of growing food and the importance of caring for our planet.',
    displayOrder: 5,
  },
  {
    slug: 'kandang-kumaruyuk',
    name: 'Kandang Kumaruyuk',
    serviceCategory: 'garden-product',
    shortDescription:
      'Born from years of experimenting with backyard poultry in dense Jakarta neighborhoods, the Kandang Kumaruyuk is our answer to the question: how do you keep chickens in the city without the chaos? Each unit is handcrafted from sustainably sourced Indonesian hardwood.',
    displayOrder: 6,
  },
  {
    slug: 'organic-seedlings',
    name: 'Organic Seedlings',
    serviceCategory: 'garden-product',
    shortDescription:
      'Our seedlings are lovingly raised in the Kebun Kumara nursery at Scientia Square Park using organic methods — no synthetic pesticides, no chemical fertilizers, just healthy soil, clean water, and patient hands.',
    displayOrder: 7,
  },
  {
    slug: 'planting-media',
    name: 'Planting Media',
    serviceCategory: 'garden-product',
    shortDescription:
      'This isn\'t ordinary dirt. Our planting media is a carefully formulated blend of composted organic waste, cocopeat, rice husk charcoal, and mycorrhizal fungi — developed through years of trial at Kebun Kumara.',
    displayOrder: 8,
  },
  {
    slug: 'kompos-kolektif',
    name: 'Kompos Kolektif',
    serviceCategory: 'movement',
    shortDescription: 'Join our community composting initiative to reduce waste.',
    displayOrder: 9,
  },
  {
    slug: 'urban-farming-workshop',
    name: 'Urban Farming Workshop',
    serviceCategory: 'movement',
    shortDescription: 'Regular workshops to spread the knowledge of urban farming.',
    displayOrder: 10,
  },
]

const PORTFOLIOS = [
  { slug: 'menteng-glass-house', projectName: 'Menteng Glass House', location: 'Menteng, Jakarta', clientName: 'Private Residence' },
  { slug: 'kemang-rooftop-oasis', projectName: 'Kemang Rooftop Oasis', location: 'Kemang, Jakarta', clientName: 'Commercial' },
  { slug: 'native-flora-study', projectName: 'Native Flora Study', location: 'Jakarta', clientName: 'Research' },
  { slug: 'cilandak-zen-garden', projectName: 'Cilandak Zen Garden', location: 'Cilandak, Jakarta', clientName: 'Private Residence' },
  { slug: 'school-learning-farm', projectName: 'School Learning Farm', location: 'Jakarta', clientName: 'Education' },
  { slug: 'bintaro-office-park', projectName: 'Bintaro Office Park', location: 'Bintaro, Tangerang', clientName: 'Commercial' },
  { slug: 'sustainable-kitchen-garden', projectName: 'Sustainable Kitchen Garden', location: 'Jakarta', clientName: 'Private Residence' },
]

const PLANTS_DATA = [
  {
    commonName: 'Swiss Cheese Plant',
    scientificName: 'Monstera deliciosa',
    slug: 'monstera-deliciosa',
    plantFamily: 'Araceae',
    origin: 'Tropical Americas',
    careGuide: { sunlight: 'Bright, indirect sunlight', watering: 'Water weekly, allow soil to dry', humidity: 'High humidity preferred' },
    designersNote: {
      quote: 'We selected the Monstera for the Menteng Glass House primarily for its architectural leaves. Placed in the shaded atrium, its fenestrations create beautiful shadow play against the raw concrete walls, softening the industrial aesthetic.',
      author: 'Kebun Kumara Design Team',
    },
    plantCategorySlug: 'ornamental',
  },
  {
    commonName: 'Prayer Plant',
    scientificName: 'Calathea orbifolia',
    slug: 'calathea-orbifolia',
    plantFamily: 'Marantaceae',
    origin: 'Understory Rainforests',
    careGuide: { sunlight: 'Low to medium light', watering: 'Keep moist, do not overwater', humidity: 'Requires high humidity' },
    plantCategorySlug: 'shade-loving',
  },
  {
    commonName: 'Fiddle Leaf Fig',
    scientificName: 'Ficus lyrata',
    slug: 'ficus-lyrata',
    plantFamily: 'Moraceae',
    origin: 'West Africa',
    careGuide: { sunlight: 'Bright indirect light', watering: 'Moderate watering, avoid moist roots', humidity: 'Average household humidity' },
    plantCategorySlug: 'ornamental',
  },
  {
    commonName: 'Sweet Basil',
    scientificName: 'Ocimum basilicum',
    slug: 'ocimum-basilicum',
    plantFamily: 'Lamiaceae',
    origin: 'Mediterranean / India',
    careGuide: { sunlight: 'Full sun or bright light', watering: 'Regular watering, moist soil', humidity: 'Moderate humidity' },
    plantCategorySlug: 'edible',
  },
  {
    commonName: 'Heartleaf Philodendron',
    scientificName: 'Philodendron hederaceum',
    slug: 'philodendron-hederaceum',
    plantFamily: 'Araceae',
    origin: 'Tropical Americas',
    careGuide: { sunlight: 'Low to bright indirect light', watering: 'Water when top soil dries', humidity: 'Average to high humidity' },
    plantCategorySlug: 'shade-loving',
  },
  {
    commonName: 'Snake Plant',
    scientificName: 'Sansevieria trifasciata',
    slug: 'sansevieria-trifasciata',
    plantFamily: 'Asparagaceae',
    origin: 'West Africa',
    careGuide: { sunlight: 'Any light condition', watering: 'Very low water needs', humidity: 'Tolerates low humidity' },
    plantCategorySlug: 'ornamental',
  },
  {
    commonName: 'Elephant Ear',
    scientificName: 'Alocasia macrorrhizos',
    slug: 'alocasia-macrorrhizos',
    plantFamily: 'Araceae',
    origin: 'Southeast Asia',
    careGuide: { sunlight: 'Bright indirect light', watering: 'Regular watering, humid conditions', humidity: 'High humidity' },
    plantCategorySlug: 'ornamental',
  },
  {
    commonName: "Bird's Eye Chili",
    scientificName: 'Capsicum frutescens',
    slug: 'capsicum-frutescens',
    plantFamily: 'Solanaceae',
    origin: 'Southeast Asia',
    careGuide: { sunlight: 'Full sun exposure', watering: 'Regular watering', humidity: 'Moderate humidity' },
    plantCategorySlug: 'edible',
  },
  {
    commonName: 'Rubber Fig',
    scientificName: 'Ficus elastica',
    slug: 'ficus-elastica',
    plantFamily: 'Moraceae',
    origin: 'Southeast Asia',
    careGuide: { sunlight: 'Bright indirect light', watering: 'Let top soil dry between waterings', humidity: 'Average household humidity' },
    plantCategorySlug: 'ornamental',
  },
  {
    commonName: 'Golden Pothos',
    scientificName: 'Epipremnum aureum',
    slug: 'epipremnum-aureum',
    plantFamily: 'Araceae',
    origin: 'Southeast Asia',
    careGuide: { sunlight: 'Tolerates low light', watering: 'Water when soil is dry', humidity: 'Average humidity' },
    plantCategorySlug: 'shade-loving',
  },
  {
    commonName: 'Chili Pepper',
    scientificName: 'Capsicum annuum',
    slug: 'capsicum-annuum',
    plantFamily: 'Solanaceae',
    origin: 'Americas',
    careGuide: { sunlight: 'Full sun (6-8 hours)', watering: 'Consistent moisture', humidity: 'Moderate humidity' },
    plantCategorySlug: 'edible',
  },
]

const BLOG_POSTS = [
  {
    title: '5 Common Mistakes When Watering Your Plants',
    slug: 'common-watering-mistakes',
    excerpt:
      "Watering seems simple, but it's where most new plant parents struggle. Learn the signs of overwatering versus underwatering and how to find the perfect balance for your green friends.",
    categoryName: 'Tutorials',
    date: '2023-10-12',
    readingTime: 6,
    content: lexicalDoc([
      lexicalParagraph(
        'Taking care of plants is rewarding, but even the most well-intentioned plant parent can make mistakes. This guide is designed to help you avoid the most common pitfalls, especially when it comes to the single most critical caregiving task: watering.'
      ),
      lexicalHeading('1. Overwatering: The Silent Killer'),
      lexicalParagraph(
        "The most common mistake people make is drowning their plants with love — literally. Overwatering leads to root rot, a condition where the roots suffocate and begin to decay because they can't access the oxygen they need in waterlogged soil."
      ),
      lexicalParagraph(
        "The key is to check the soil moisture before watering. Stick your finger about an inch into the soil. If it feels damp, wait another day or two. Different plants have very different water needs, so avoid a one-size-fits-all watering schedule."
      ),
      lexicalHeading('2. Watering at the Wrong Time'),
      lexicalParagraph(
        'Timing matters more than most people think. Watering in the heat of the midday sun causes water to evaporate before the roots can absorb it. On the other hand, watering late in the evening can leave foliage wet overnight, creating a breeding ground for fungal diseases.'
      ),
      lexicalHeading('3. Not Adjusting for the Seasons'),
      lexicalParagraph(
        "Your plants' water needs change dramatically with the seasons. In the tropics, the rainy season provides natural irrigation, so you'll need to cut back significantly. During the dry season, more frequent watering is essential. Always observe your plants — they're the best indicators of what they need."
      ),
      lexicalHeading('4. Using the Wrong Watering Technique'),
      lexicalParagraph(
        'Many people make the mistake of lightly sprinkling their plants. This only wets the surface and encourages shallow root growth. Instead, water deeply and thoroughly at the base of the plant. This encourages roots to grow downward, making the plant more resilient and drought-tolerant.'
      ),
      lexicalHeading('5. Ignoring Drainage'),
      lexicalParagraph(
        'Even with perfect watering habits, poor drainage will undo all your efforts. Always use pots with drainage holes. For garden beds, amend the soil with organic matter like compost to improve its structure and water-holding capacity without causing waterlogging.'
      ),
      lexicalParagraph(
        "Remember, the goal isn't to follow a rigid watering schedule but to understand your plants and their environment. Pay attention, be patient, and your garden will reward you tenfold."
      ),
    ]),
  },
  {
    title: '3 Ways Planting Sunflowers Strengthens Your Ecosystem',
    slug: 'sunflowers-ecosystem',
    excerpt:
      'Beyond their beauty, sunflowers act as powerful attractors for pollinators, improve soil health through deep roots, and can even help detoxify the ground they grow in.',
    categoryName: 'Ecosystem',
    date: '2023-09-28',
    readingTime: 5,
    content: lexicalDoc([
      lexicalParagraph(
        'Sunflowers are more than just beautiful — they are powerful allies for any garden ecosystem. Here are three key ways they contribute to a healthier environment.'
      ),
      lexicalHeading('1. Pollinator Magnets'),
      lexicalParagraph(
        'Sunflowers attract bees, butterflies, and other beneficial insects with their large, nectar-rich blooms. This increased pollinator activity benefits not just the sunflowers, but every plant in your garden.'
      ),
      lexicalHeading('2. Deep Root Soil Improvement'),
      lexicalParagraph(
        'Sunflower roots grow deep, breaking up compacted soil and creating channels for water and air to penetrate. As the roots decompose, they add organic matter and improve soil structure.'
      ),
      lexicalHeading('3. Phytoremediation'),
      lexicalParagraph(
        'Sunflowers have been used in phytoremediation projects — including at Chernobyl — to absorb heavy metals and contaminants from soil. They are natural soil detoxifiers.'
      ),
    ]),
  },
  {
    title: '3 Tips for Successful Potted Spice Gardens in The Kitchen',
    slug: 'potted-spice-gardens',
    excerpt:
      "Don't have a backyard? No problem. Discover how to cultivate a thriving spice garden right on your kitchen counter, ensuring fresh flavors are always within reach.",
    categoryName: 'Urban Farming',
    date: '2023-09-15',
    readingTime: 4,
    content: lexicalDoc([
      lexicalParagraph(
        "Living in a city apartment doesn't mean you can't grow your own herbs and spices. With these three tips, you'll have a productive kitchen spice garden in no time."
      ),
      lexicalHeading('Tip 1: Choose the Right Containers'),
      lexicalParagraph(
        'Small to medium pots with drainage holes work best for most herbs. Terracotta pots are great because they breathe, preventing overwatering. Group herbs with similar water needs together.'
      ),
      lexicalHeading('Tip 2: Maximize Light'),
      lexicalParagraph(
        'Most herbs need 6-8 hours of sunlight per day. Place your pots on a south-facing windowsill if possible. If natural light is limited, a simple LED grow light can make a huge difference.'
      ),
      lexicalHeading('Tip 3: Harvest Regularly'),
      lexicalParagraph(
        'Regular harvesting actually encourages more growth. Never take more than one-third of the plant at once. Pinch off flower buds as they appear on basil and mint to keep the plant producing flavorful leaves.'
      ),
    ]),
  },
  {
    title: 'Why We Failed: Lessons from Our First Harvest',
    slug: 'lessons-first-harvest',
    excerpt:
      "Farming is a journey of trial and error. We share our humbling beginnings, the crops that didn't make it, and the invaluable wisdom nature taught us through failure.",
    categoryName: 'Reflections',
    date: '2023-08-30',
    readingTime: 7,
    content: lexicalDoc([
      lexicalParagraph(
        "When we started Kebun Kumara in 2016, we thought we knew what we were doing. We had read the books, watched the videos, and were full of enthusiasm. We were wrong — and that was the best thing that could have happened to us."
      ),
      lexicalHeading('The First Seeds'),
      lexicalParagraph(
        'We planted tomatoes, chilies, and kangkung in a small plot in South Jakarta. Most of the tomatoes died within two weeks. The kangkung survived, but barely. The chilies struggled with pests we had never encountered before.'
      ),
      lexicalHeading('What We Learned'),
      lexicalParagraph(
        'Failure taught us that plants are not passive — they communicate. Yellowing leaves mean overwatering. Stunted growth often signals poor soil nutrition. Pest infestations are usually a symptom of plant stress, not just bad luck.'
      ),
      lexicalHeading('The Gift of Failure'),
      lexicalParagraph(
        'That first failed harvest taught us more about patience, observation, and humility than any textbook could. It gave us the understanding that real knowledge comes from the soil, not from screens. And it gave us the stories that became the foundation of everything we teach today.'
      ),
    ]),
  },
  {
    title: 'Independent Food Sources: 1 Month Without Buying Vegetables!',
    slug: 'month-without-buying-vegetables',
    excerpt:
      'Is it possible to live solely off what you grow in the city? We took the challenge. Here is our diary of a month consuming only self-harvested greens.',
    categoryName: 'Lifestyle',
    date: '2023-08-12',
    readingTime: 8,
    content: lexicalDoc([
      lexicalParagraph(
        "What started as a bet became one of the most transformative experiences of our lives: could we feed ourselves from our urban garden for an entire month? Here's what happened."
      ),
      lexicalHeading('Week 1: The Abundance'),
      lexicalParagraph(
        'The first week was easier than expected. Our kangkung, bayam, and herbs were producing well. We ate stir-fries, salads, and fresh sambals. We felt proud and a little smug.'
      ),
      lexicalHeading('Week 2: The Reality Check'),
      lexicalParagraph(
        'By week two, we had eaten through most of the ready-to-harvest crops. We had to get creative with young leaves, flowers, and parts of plants we had never eaten before. We learned that different parts of the same plant can taste completely different.'
      ),
      lexicalHeading('Week 3-4: A New Relationship with Food'),
      lexicalParagraph(
        'By the final weeks, our relationship with food had fundamentally changed. We wasted nothing. Every leaf felt precious. We understood, in our bodies, why food security matters — and why growing your own food is a radical act of self-determination.'
      ),
    ]),
  },
  {
    title: 'Composting 101: Turning Kitchen Scraps into Gold',
    slug: 'composting-101',
    excerpt:
      'Stop throwing away your food waste. Learn the basics of home composting and how you can reduce landfill waste while creating nutrient-rich soil for your plants.',
    categoryName: 'Sustainability',
    date: '2023-07-25',
    readingTime: 5,
    content: lexicalDoc([
      lexicalParagraph(
        'Composting is one of the most powerful things you can do for your garden and for the planet. It turns food waste into a nutrient-rich soil amendment that plants love — and keeps organic material out of landfills where it produces methane.'
      ),
      lexicalHeading('What Can You Compost?'),
      lexicalParagraph(
        'You can compost most food scraps: vegetable peels, fruit rinds, coffee grounds, tea bags, eggshells, and cooked rice. Avoid meat, dairy, and oily foods in a basic home compost system, as they can attract pests and create odors.'
      ),
      lexicalHeading('The Basic Layering System'),
      lexicalParagraph(
        "Layer 'greens' (nitrogen-rich materials like food scraps, fresh grass clippings) with 'browns' (carbon-rich materials like dried leaves, cardboard, paper). Aim for roughly equal parts by volume. Keep it moist but not soggy, and turn it every few weeks."
      ),
      lexicalHeading('When Is It Ready?'),
      lexicalParagraph(
        'Compost is ready when it looks dark, crumbly, and smells like earth. In a tropical climate, this can happen in as little as 4-6 weeks. Use it to top-dress garden beds, mix into potting soil, or make compost tea for your plants.'
      ),
    ]),
  },
]

// ─── Seed Function ───────────────────────────────────────────────────────────

async function seed(payload: Payload) {
  console.log('🌱 Starting Kebun Kumara content seed...\n')

  // ── 1. Admin User ──────────────────────────────────────────────────────────
  console.log('👤 Creating admin user...')
  let adminUser
  try {
    const existingAdmins = await payload.find({
      collection: 'users',
      where: { email: { equals: 'admin@kebunkumara.id' } },
    })
    if (existingAdmins.docs.length > 0) {
      adminUser = existingAdmins.docs[0]
      console.log('   Admin user already exists, skipping.')
    } else {
      adminUser = await payload.create({
        collection: 'users',
        data: {
          email: 'admin@kebunkumara.id',
          password: 'Kebun2025!',
          fullName: 'Admin Kebun Kumara',
          role: 'admin',
        },
      })
      console.log('   ✅ Admin user created: admin@kebunkumara.id / Kebun2025!')
    }
  } catch (err) {
    console.error('   ❌ Error creating admin user:', err)
    throw err
  }

  // ── 2. Blog Categories ────────────────────────────────────────────────────
  console.log('\n📂 Creating blog categories...')
  const categoryMap: Record<string, number> = {}
  for (const name of CATEGORIES) {
    const slug = name.toLowerCase().replace(/\s+/g, '-')
    try {
      const existing = await payload.find({
        collection: 'categories',
        where: { slug: { equals: slug } },
      })
      if (existing.docs.length > 0) {
        categoryMap[name] = existing.docs[0].id
        console.log(`   ↩️  Category "${name}" already exists`)
        continue
      }
      const cat = await payload.create({
        collection: 'categories',
        data: { name, slug },
      })
      categoryMap[name] = cat.id
      console.log(`   ✅ ${name}`)
    } catch (err) {
      console.error(`   ❌ Error creating category "${name}":`, err)
    }
  }

  // ── 3. Plant Categories ───────────────────────────────────────────────────
  console.log('\n🌿 Creating plant categories...')
  const plantCategoryMap: Record<string, number> = {}
  for (const pc of PLANT_CATEGORIES) {
    try {
      const existing = await payload.find({
        collection: 'plantCategories',
        where: { slug: { equals: pc.slug } },
      })
      if (existing.docs.length > 0) {
        plantCategoryMap[pc.slug] = existing.docs[0].id
        console.log(`   ↩️  Plant category "${pc.name}" already exists`)
        continue
      }
      const created = await payload.create({
        collection: 'plantCategories',
        data: { name: pc.name, slug: pc.slug },
      })
      plantCategoryMap[pc.slug] = created.id
      console.log(`   ✅ ${pc.name}`)
    } catch (err) {
      console.error(`   ❌ Error creating plant category "${pc.name}":`, err)
    }
  }

  // ── 4. Blog Posts ─────────────────────────────────────────────────────────
  console.log('\n📝 Creating blog posts...')
  for (const post of BLOG_POSTS) {
    try {
      const existing = await payload.find({
        collection: 'posts',
        where: { slug: { equals: post.slug } },
      })
      if (existing.docs.length > 0) {
        console.log(`   ↩️  Post "${post.title}" already exists`)
        continue
      }

      const catId = categoryMap[post.categoryName]
      await payload.create({
        collection: 'posts',
        data: {
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          categories: catId ? [catId] : [],
          author: adminUser.id,
          publishedAt: new Date(post.date).toISOString(),
          readingTime: post.readingTime,
          _status: 'published',
        },
      })
      console.log(`   ✅ ${post.title}`)
    } catch (err) {
      console.error(`   ❌ Error creating post "${post.title}":`, err)
    }
  }

  // ── 5. Services ───────────────────────────────────────────────────────────
  console.log('\n⚙️  Creating services...')
  for (const svc of SERVICES_PROGRAMS) {
    try {
      const existing = await payload.find({
        collection: 'services',
        where: { slug: { equals: svc.slug } },
      })
      if (existing.docs.length > 0) {
        console.log(`   ↩️  Service "${svc.name}" already exists`)
        continue
      }
      await payload.create({
        collection: 'services',
        data: {
          name: svc.name,
          slug: svc.slug,
          serviceCategory: svc.serviceCategory,
          shortDescription: svc.shortDescription,
          displayOrder: svc.displayOrder,
          _status: 'published',
        },
      })
      console.log(`   ✅ ${svc.name}`)
    } catch (err) {
      console.error(`   ❌ Error creating service "${svc.name}":`, err)
    }
  }

  // ── 6. Portfolios ─────────────────────────────────────────────────────────
  console.log('\n🏗️  Creating portfolios...')
  for (const proj of PORTFOLIOS) {
    try {
      const existing = await payload.find({
        collection: 'portfolios',
        where: { slug: { equals: proj.slug } },
      })
      if (existing.docs.length > 0) {
        console.log(`   ↩️  Portfolio "${proj.projectName}" already exists`)
        continue
      }
      await payload.create({
        collection: 'portfolios',
        data: {
          projectName: proj.projectName,
          slug: proj.slug,
          location: proj.location,
          clientName: proj.clientName,
          description: lexicalDoc([lexicalParagraph(`Kebun Kumara landscaping project: ${proj.projectName}`)]),
          _status: 'published',
        },
      })
      console.log(`   ✅ ${proj.projectName}`)
    } catch (err) {
      // coverImage is required — skip if it fails and note it
      const message = err instanceof Error ? err.message : undefined
      if (message?.includes('coverImage')) {
        await payload.create({
          collection: 'portfolios',
          data: {
            projectName: proj.projectName,
            slug: proj.slug,
            location: proj.location,
            clientName: proj.clientName,
            _status: 'published',
          },
        }).catch(() => {})
        console.log(`   ⚠️  ${proj.projectName} (no cover image — add via admin)`)
      } else {
        console.error(`   ❌ Error creating portfolio "${proj.projectName}":`, err)
      }
    }
  }

  // ── 7. Plants ─────────────────────────────────────────────────────────────
  console.log('\n🌱 Creating plants...')
  for (const plant of PLANTS_DATA) {
    try {
      const existing = await payload.find({
        collection: 'plants',
        where: { slug: { equals: plant.slug } },
      })
      if (existing.docs.length > 0) {
        console.log(`   ↩️  Plant "${plant.commonName}" already exists`)
        continue
      }
      const pcId = plantCategoryMap[plant.plantCategorySlug]
      const designersNote = (
        plant as { designersNote?: { quote: string; author: string } }
      ).designersNote
      await payload.create({
        collection: 'plants',
        data: {
          commonName: plant.commonName,
          scientificName: plant.scientificName,
          slug: plant.slug,
          plantFamily: plant.plantFamily,
          origin: plant.origin,
          careGuide: plant.careGuide,
          designersNote,
          plantType: pcId ? [pcId] : [],
          ecologicalRole: lexicalDoc([lexicalParagraph(`${plant.commonName} (${plant.scientificName}) — ${plant.careGuide.sunlight ?? ''}`)]),
          _status: 'published',
        },
      })
      console.log(`   ✅ ${plant.commonName}`)
    } catch (err) {
      // mainPhoto is required — log and continue
      const message = err instanceof Error ? err.message : undefined
      console.warn(
        `   ⚠️  Plant "${plant.commonName}" skipped (missing required mainPhoto — add via admin):`,
        message?.slice(0, 80),
      )
    }
  }

  // ── 8. Globals ────────────────────────────────────────────────────────────
  console.log('\n🌐 Updating globals...')

  // SiteSettings
  try {
    await payload.updateGlobal({
      slug: 'siteSettings',
      data: {
        siteName: 'Kebun Kumara',
        siteDescription:
          'Established in 2016, we aim to realize healthy, sustainable urban culture through greener habits and regenerative landscapes.',
        whatsappNumber: '6281510986060',
        email: 'kebunkumara@gmail.com',
        address: 'Scientia Square Park, Gading Serpong, Tangerang',
        mapsEmbedUrl:
          'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.059293880467!2d106.61567107592928!3d-6.255918761249764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fb56b2161e11%3A0x2d1746618585970!2sScientia%20Square%20Park!5e0!3m2!1sen!2sid!4v1715421234567!5m2!1sen!2sid',
        socialMedia: {
          instagram: 'https://www.instagram.com/kebunkumara/',
          facebook: 'https://www.facebook.com/kebunkumara/',
          youtube: 'https://www.youtube.com/c/kebunkumara',
        },
      },
    })
    console.log('   ✅ SiteSettings updated')
  } catch (err) {
    console.error('   ❌ Error updating SiteSettings:', err)
  }

  // Header
  try {
    await payload.updateGlobal({
      slug: 'header',
      data: {
        navLinks: [
          { label: 'Why Garden?', url: '/why-garden', subLinks: [] },
          {
            label: 'Services',
            url: '#',
            subLinks: [
              { label: 'Educational Program', url: '/services/educational-program' },
              { label: 'Landscaping Consultancy', url: '/services/landscaping-consultancy' },
              { label: 'Garden Product', url: '/services/garden-product' },
              { label: 'Movements', url: '/services/movement' },
            ],
          },
          { label: 'About Us', url: '/about', subLinks: [] },
          { label: 'Kumara Plant Story', url: '/kumara-plant-story', subLinks: [] },
          { label: 'Blog', url: '/blog', subLinks: [] },
        ],
        ctaButton: {
          label: 'Contact Us',
          url: '/contact',
        },
      },
    })
    console.log('   ✅ Header updated')
  } catch (err) {
    console.error('   ❌ Error updating Header:', err)
  }

  // Footer
  try {
    await payload.updateGlobal({
      slug: 'footer',
      data: {
        tagline: 'Find Us Around The Web!',
        columns: [
          {
            title: 'Navigate',
            links: [
              { label: 'About Us', url: '/about' },
              { label: 'Blog', url: '/blog' },
              { label: 'Contact Us', url: '/contact' },
              { label: 'In The Media', url: '/media' },
            ],
          },
        ],
        socialLinks: [
          { platform: 'Instagram', url: 'https://www.instagram.com/kebunkumara/' },
          { platform: 'Facebook', url: 'https://www.facebook.com/kebunkumara/' },
          { platform: 'YouTube', url: 'https://www.youtube.com/c/kebunkumara' },
        ],
        copyrightText: '© 2026 Kebun Kumara. All rights reserved.',
        showNewsletter: false,
      },
    })
    console.log('   ✅ Footer updated')
  } catch (err) {
    console.error('   ❌ Error updating Footer:', err)
  }

  // ── 9. Pages ──────────────────────────────────────────────────────────────
  console.log('\n📄 Upserting pages...')
  const pagesData = [
    {
      title: 'Home',
      slug: 'home',
      hero: {
        heading: 'Growing Gardens\nfor Human-Nature\nConnection',
        subheading:
          'Established in 2016, we aim to realize healthy, sustainable urban culture through greener habits and regenerative landscapes.',
        backgroundVideo: '/videos/5692315-hd_1920_1080_30fps.mp4',
        buttonText: 'Explore Our Services',
        buttonLink: '/services/educational-program',
      },
    },
    {
      title: 'About Us',
      slug: 'about',
      hero: {
        heading: 'Sekelompok Anak Kota\nHaus Pengetahuan',
        subheading:
          'Mewujudkan budaya perkotaan yang sehat dan berkelanjutan melalui kebiasaan hijau dan lanskap regeneratif, sejak 2016.',
        buttonText: 'Hubungi Kami',
        buttonLink: 'https://wa.me/6281510986060',
      },
    },
    {
      title: 'Contact',
      slug: 'contact',
      hero: {
        heading: 'Contact',
        subheading:
          'We are here to help you reconnect with nature. Reach out for collaborations, inquiries, or just to say hello.',
      },
    },
    {
      title: 'Why Garden?',
      slug: 'why-garden',
      hero: {
        heading: 'Why Garden?',
        subheading:
          'Gardening reminds us that we are part of a cycle. Explore why nature changes everything.',
      },
    },
    {
      title: 'In The Media',
      slug: 'media',
      hero: {
        heading: 'In The Media',
        subheading:
          'Features, stories, and conversations about our journey in urban farming.',
      },
    },
    {
      title: 'Movements',
      slug: 'movement',
      hero: {
        heading: 'Our Movements',
        subheading:
          'Join us in creating a more sustainable future through collective action.',
        buttonText: 'Contact Us',
        buttonLink: '/contact',
      },
    },
  ]

  for (const page of pagesData) {
    try {
      const existing = await payload.find({
        collection: 'pages',
        where: { slug: { equals: page.slug } },
      })
      if (existing.docs.length > 0) {
        await payload.update({
          collection: 'pages',
          id: existing.docs[0].id,
          data: {
            title: page.title,
            slug: page.slug,
            hero: page.hero,
            _status: 'published',
          },
        })
        console.log(`   🔄 ${page.title}`)
        continue
      }
      await payload.create({
        collection: 'pages',
        data: {
          title: page.title,
          slug: page.slug,
          hero: page.hero,
          _status: 'published',
        },
      })
      console.log(`   ✅ ${page.title}`)
    } catch (err) {
      console.error(`   ❌ Error upserting page "${page.title}":`, err)
    }
  }

  console.log('\n✨ Seed complete!\n')
  console.log('📌 Notes:')
  console.log('   • Admin login: admin@kebunkumara.id / Kebun2025!')
  console.log('   • Plants require a mainPhoto — add images via the admin panel at /admin')
  console.log('   • Portfolios require a coverImage — add via the admin panel')
  console.log('   • Upload logos and media files via the Media collection')
}

// ─── Entry Point ─────────────────────────────────────────────────────────────

const run = async () => {
  const payload = await getPayload({ config })
  try {
    await seed(payload)
    process.exit(0)
  } catch (err) {
    console.error('Seed failed:', err)
    process.exit(1)
  }
}

run()
