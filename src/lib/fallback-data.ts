/**
 * Fallback data — mirrors what is currently hardcoded in the frontend pages.
 * Used when Strapi is unreachable so the site still renders correctly.
 */

// ─── Homepage ───────────────────────────────────────────────

export const fallbackPartners = [
    { name: "BNI", style: "text-2xl font-bold font-serif text-orange-600" },
    { name: "DBS", style: "text-2xl font-bold text-red-600 tracking-tight" },
    { name: "DOMPET DHUAFA", style: "text-sm font-bold text-green-700" },
    { name: "BANK INDONESIA", style: "text-xs font-serif font-bold text-blue-900" },
    { name: "NIVEA", style: "text-xs font-bold text-white bg-blue-800 rounded-full px-4 py-3" },
    { name: "TaniHub", style: "text-xl font-bold text-teal-500" },
    { name: "FAO", style: "text-xs font-bold text-blue-500" },
    { name: "CROWDE", style: "text-xl font-bold text-gray-800" },
    { name: "Wardāh", style: "text-3xl font-light text-teal-600 tracking-widest font-serif" },
    { name: "Visinema", style: "text-xl font-serif tracking-widest uppercase text-gray-900 border-b-2 border-black pb-1" },
    {
        slug: "peruri",
        title: "Taman Kota Peruri",
        category: "Public Space",
        image: "/images/generated/urban-garden-hero.png",
    },
    {
        slug: "sqp",
        title: "Scientia Square Park",
        category: "Educational Farm",
        image: "https://images.unsplash.com/photo-1592419044706-39796d40f98c?q=80&w=2000&auto=format&fit=crop",
    },
    {
        slug: "gresk",
        title: "Community Greenspace",
        category: "Community",
        image: "https://images.unsplash.com/photo-1584473457406-6240486418e9?q=80&w=2000&auto=format&fit=crop",
    },
];

// ─── Programs Page ──────────────────────────────────────────

export const fallbackPrograms = [
    {
        slug: "public-workshops",
        icon: "yard",
        title: "Public Workshops",
        description:
            "Workshop kami membantu warga kota mendapatkan keterampilan yang mendukung perjalanan berkelanjutan dari rumah. Dari membuat kompos, berkebun di lahan sempit, hingga fermentasi makanan.",
        features: ["Kompor Roket", "Composting", "Home Gardening", "Fermentasi"],
        image:
            "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop",
    },
    {
        slug: "company-programs",
        icon: "corporate_fare",
        title: "Company Programs & Private Events",
        description:
            "Program dan acara perusahaan kami memperkuat kesadaran ekologi kolektif dan pengalaman keberlanjutan yang lebih mendalam. Cocok untuk team building, CSR, dan acara privat.",
        features: ["Team Building", "CSR Programs", "Private Events", "Corporate Workshops"],
        image:
            "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=600&h=400&fit=crop",
    },
    {
        slug: "nature-playschool",
        icon: "child_care",
        title: "Nature Playschool",
        description:
            "Kami mendukung orang tua dengan pembelajaran eksperiensial outdoor yang terinspirasi taman, dimulai dari usia 18 bulan. Anak-anak belajar melalui eksplorasi alam langsung.",
        features: ["Usia 18 bulan+", "Outdoor Learning", "Sensory Play", "Garden Activities"],
        image: "/images/programs-hero-child-garden.jpg",
    },
    {
        slug: "school-programs",
        icon: "school",
        title: "School Programs",
        description:
            "Sejak 2017, kami mendukung sekolah-sekolah dengan pembelajaran ekologi eksperiensial untuk siswa mereka — dari TK hingga SMA.",
        features: ["Field Trips", "Curriculum Integration", "Teacher Training", "Garden Setup"],
        image:
            "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop",
    },
    {
        slug: "holiday",
        icon: "holiday_village",
        title: "Holiday Program",
        description:
            "Our seasonal programs designed to reconnect children with nature. Through hands-on activities, kids learn the magic of growing food and the importance of caring for our planet.",
        features: ["Seasonal", "Hands-on", "Kids", "Nature"],
        image:
            "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=2000&auto=format&fit=crop",
    },
];

export const fallbackProducts = [
    {
        slug: "kandang-kumaruyuk",
        title: "Kandang Kumaruyuk",
        tagline: "The Urban Chicken Coop, Reimagined.",
        description: "A sustainable chicken coop design for urban farming enthusiasts.",
        longDescription: "Born from years of experimenting with backyard poultry in dense Jakarta neighborhoods, the Kandang Kumaruyuk is our answer to the question: how do you keep chickens in the city without the chaos? Each unit is handcrafted from sustainably sourced Indonesian hardwood, designed for easy daily cleaning, and compact enough for a balcony or small garden. It's not just a coop — it's a statement that sustainable living can be beautiful.",
        image: "/images/generated/chicken-coop.png",
        gallery: [
            "/images/generated/chicken-coop.png",
            "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800&auto=format&fit=crop",
            "/images/generated/chicken-coop.png",
        ],
        features: ["Sustainable Wood", "Easy Cleaning", "Compact Design"],
        specs: [
            { label: "Material", value: "Sustainably sourced Indonesian hardwood" },
            { label: "Dimensions", value: "120 × 80 × 100 cm" },
            { label: "Capacity", value: "3–5 hens" },
            { label: "Weight", value: "~25 kg" },
            { label: "Assembly", value: "Pre-assembled, ready to use" },
        ],
        whyChoose: [
            { icon: "eco", title: "Sustainably Crafted", text: "Each coop is built from certified sustainably sourced wood, reducing environmental impact." },
            { icon: "cleaning_services", title: "Effortless Maintenance", text: "Slide-out trays and smooth surfaces make daily cleaning a breeze — even for beginners." },
            { icon: "home", title: "Urban-Friendly Size", text: "Compact enough for balconies, rooftops, and small gardens without sacrificing comfort for your flock." },
            { icon: "pets", title: "Happy, Healthy Chickens", text: "Proper ventilation and predator-proof design keep your hens safe, healthy, and productive." },
        ],
        faq: [
            { q: "How many chickens can the coop hold?", a: "The Kandang Kumaruyuk is designed for 3–5 bantam or standard-sized hens." },
            { q: "Is assembly required?", a: "No! Each unit comes pre-assembled and ready to place in your garden or balcony." },
            { q: "Can it be kept on a balcony?", a: "Absolutely. The compact footprint and easy-clean design make it perfect for urban balconies." },
        ],
    },
    {
        slug: "seedling",
        title: "Organic Seedlings",
        tagline: "Every Garden Starts with a Single Seed.",
        description: "High-quality organic seedlings ready to plant in your garden.",
        longDescription: "Our seedlings are lovingly raised in the Kebun Kumara nursery at Scientia Square Park using organic methods — no synthetic pesticides, no chemical fertilizers, just healthy soil, clean water, and patient hands. From culinary herbs like basil and lemongrass to tropical greens like kangkung and bayam, each seedling arrives hardened and ready for transplant. Whether you're starting your first pot or filling a raised bed, these are the roots of something meaningful.",
        image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600&h=400&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&auto=format&fit=crop",
        ],
        features: ["Organic", "Various Varieties", "Healthy Roots"],
        specs: [
            { label: "Growing Method", value: "100% organic, pesticide-free" },
            { label: "Varieties", value: "20+ seasonal varieties" },
            { label: "Pot Size", value: "Polybag 10 × 15 cm" },
            { label: "Age", value: "4–6 weeks from germination" },
            { label: "Origin", value: "Kebun Kumara Nursery, Gading Serpong" },
        ],
        whyChoose: [
            { icon: "spa", title: "Truly Organic", text: "Grown without synthetic chemicals. What goes into the soil goes onto your plate — so we keep it clean." },
            { icon: "local_florist", title: "20+ Varieties", text: "From herbs like basil and mint to leafy greens like kangkung — there's something for every kitchen garden." },
            { icon: "favorite", title: "Nursery-Hardened", text: "Each seedling is gradually acclimated to outdoor conditions before sale, so transplant shock is minimal." },
            { icon: "volunteer_activism", title: "Supporting Local", text: "Every purchase supports the Kebun Kumara community and our mission of urban food sovereignty." },
        ],
        faq: [
            { q: "What varieties are available?", a: "We rotate varieties seasonally. Common options include basil, kangkung, bayam, lemongrass, chili, tomato, and various herbs. Check our social media for current availability." },
            { q: "Can beginners grow these?", a: "Absolutely! Each seedling comes with a simple care card. Our varieties are selected specifically for ease of growing in tropical urban environments." },
            { q: "How do I order?", a: "Send us a WhatsApp message and we'll arrange pickup from our location at Scientia Square Park or delivery within the Jabodetabek area." },
        ],
    },
    {
        slug: "planting-media",
        title: "Planting Media",
        tagline: "Better Soil, Better Food, Better Life.",
        description: "Nutrient-rich soil mix perfect for pots and garden beds.",
        longDescription: "This isn't ordinary dirt. Our planting media is a carefully formulated blend of composted organic waste, cocopeat, rice husk charcoal, and mycorrhizal fungi — developed through years of trial at Kebun Kumara. It's designed for tropical container gardening: lightweight enough for pots and rooftop beds, yet rich in the nutrients your vegetables and herbs need to thrive. Think of it as the foundation of your food forest in a bag.",
        image: "/images/generated/garden-tools-soil.png",
        gallery: [
            "/images/generated/garden-tools-soil.png",
            "/images/generated/garden-tools-soil.png",
            "https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?w=800&auto=format&fit=crop",
        ],
        features: ["Nutrient Rich", "Well Draining", "Ready to Use"],
        specs: [
            { label: "Composition", value: "Compost, cocopeat, rice husk charcoal, mycorrhiza" },
            { label: "pH Range", value: "6.0 – 7.0 (ideal for most vegetables)" },
            { label: "Weight", value: "Available in 5 kg and 10 kg bags" },
            { label: "Best For", value: "Container gardening, raised beds, repotting" },
            { label: "Shelf Life", value: "6 months (store in cool, dry place)" },
        ],
        whyChoose: [
            { icon: "compost", title: "Closed-Loop Compost", text: "Made from organic waste composted at our own facility — turning Jakarta's food scraps into fertile soil." },
            { icon: "water_drop", title: "Perfect Drainage", text: "The cocopeat and charcoal blend retains moisture while preventing waterlogging — ideal for tropical climates." },
            { icon: "psychiatry", title: "Living Soil", text: "Enriched with beneficial mycorrhizal fungi that help roots absorb nutrients more efficiently." },
            { icon: "potted_plant", title: "Ready to Plant", text: "No mixing, no guessing. Open the bag, fill your pot, and start planting right away." },
        ],
        faq: [
            { q: "What sizes are available?", a: "We offer 5 kg bags for small projects and 10 kg bags for larger beds. Bulk orders for community gardens or schools are also available." },
            { q: "Can I use this for indoor plants?", a: "Yes! The blend works well for both edible and ornamental plants. Its excellent drainage properties are great for houseplants too." },
            { q: "How long does it last?", a: "For container gardens, we recommend refreshing the top layer every 3–4 months and doing a full media change annually for best results." },
        ],
    },
];

export const fallbackMovements = [
    {
        title: "Kompos Kolektif",
        description: "Join our community composting initiative to reduce waste.",
        image: "https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?w=600&h=400&fit=crop",
    },
    {
        title: "Urban Farming Workshop",
        description: "Regular workshops to spread the knowledge of urban farming.",
        image: "/images/generated/garden-tools-soil.png",
    },
];

// ─── About Page ─────────────────────────────────────────────

export const fallbackTimeline = [
    {
        year: "2016",
        title: "Pertemuan dengan Permaculture",
        description:
            "Sekelompok anak kota mulai belajar permaculture dan menanam makanan sendiri — banyak benih gagal, banyak bibit mati, tapi proses ini mengajarkan kesadaran yang tiada duanya.",
    },
    {
        year: "2017",
        title: "Mulai Mengajar",
        description:
            "Kami mulai membagikan apa yang kami pelajari melalui workshop dan program sekolah, membantu orang lain menemukan koneksi dengan alam.",
    },
    {
        year: "2019",
        title: "Design & Build",
        description:
            "Berangkat dari pengalaman berkebun, kami mulai mendesain dan membangun lanskap regeneratif untuk klien — dari taman kecil hingga proyek besar.",
    },
    {
        year: "2024",
        title: "HQ Baru",
        description:
            "Semua kegiatan berpusat di Scientia Square Park, Gading Serpong — dengan kebun sayur, food forest, dan area Nature Play.",
    },
];

export const fallbackTeamMembers = [
    { name: "Siti Soraya Cassandra", role: "Co-Founder" },
    { name: "Dhira Narayana", role: "Co-Founder" },
    { name: "Ade", role: "Program Lead" },
    { name: "Rizky", role: "Garden Manager" },
    { name: "Dian", role: "Design Lead" },
    { name: "Fajar", role: "Education" },
    { name: "Andi", role: "Operations" },
    { name: "Nisa", role: "Communications" },
    { name: "Budi", role: "Landscaping" },
    { name: "Putri", role: "Nature Playschool" },
    { name: "Reza", role: "Workshop" },
    { name: "Sari", role: "Community" },
    { name: "Toni", role: "Maintenance" },
    { name: "Wulan", role: "Admin" },
];

export const fallbackValues = [
    {
        icon: "eco",
        title: "Regeneratif",
        description: "Setiap tindakan kami bertujuan memulihkan, bukan sekadar menjaga.",
    },
    {
        icon: "diversity_3",
        title: "Komunitas",
        description: "Kami percaya perubahan dimulai dari komunitas yang saling mendukung.",
    },
    {
        icon: "psychology",
        title: "Kesadaran",
        description:
            "Berkebun mengajarkan kesadaran yang tidak bisa dicapai lewat pendidikan formal.",
    },
    {
        icon: "volunteer_activism",
        title: "Berbagi",
        description: "Pengetahuan hanya bermakna jika dibagikan dan dipraktikkan bersama.",
    },
];

// ─── Contact Page ───────────────────────────────────────────

export const fallbackContactServiceOptions = [
    { value: "consultancy", label: "Landscaping Consultancy" },
    { value: "installation", label: "Edible Garden Installation" },
    { value: "workshop", label: "Urban Farming Workshops" },
    { value: "waste", label: "Waste Management Solutions" },
    { value: "other", label: "Other Inquiry" },
];

export const fallbackContactDetails = {
    email: "hello@kebunkumara.id",
    phone: "+62 815 1098 6060",
    whatsappNumber: "6281510986060",
    address: "Scientia Square Park, Gading Serpong, Tangerang",
};

// ─── Projects Page ──────────────────────────────────────────

export const fallbackProjects = [
    {
        slug: "menteng-glass-house",
        title: "Menteng Glass House",
        category: "Residential",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsYtINOTN6aIl6zB9n4MfExfYhWA9XLPDf8KAf_I0JYpZS5c-9ytf2c55BlC39D3ntc69I_vb8G82GbCeRDYZgZDV4EhHDMn9jU_qrkWZhMW1z1khJLcty5PP2GRYXZKZ0-e4Zzr1zb3qYTOIFwCawUOObEsHmLiXML10EGrz_OSCgcfhgqVORucj8CRMCk2oW9xtcKCUv5Q4NThxo7zASmQOUJtdjymhM1QLtj-TgIj5lv0q_l5rwP5annin7bTM-7HYHuNLghcdn",
    },
    {
        slug: "kemang-rooftop-oasis",
        title: "Kemang Rooftop Oasis",
        category: "Commercial",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbPNGOwroKqFV99bELhFs9Hc52T_N8ZWxB56sEKVNiqkrwHjp0lq0V5mqtQxI4zmvPDQ8j6up-lZs2zB4MM8bKllRGvcK6mzbdRXamc102h4ZXWwfkSpVRxgL5meQgIEOFNTXieNSHijtTuX1NwmSFT05S98z8b_Ksq09KQTrodPVXGe6YJ4S_ymjVFHLK5cKOPyvKNhFSD0xiXIqywyXWFPfRDO-CqmKmbKboO74iufwrdCZk8WmzkyoDl4zPfX0BdBaunnwXhiCv",
    },
    {
        slug: "native-flora-study",
        title: "Native Flora Study",
        category: "Detailing",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjJ5t5H2IIOr8v84OO-7l4vQuD79KB-TTcgtChAKGm-aunajD-lnODjHCH_6wRwE0CSl7-nX-awbbjnKdoPTDEVtUkG8eDURQncnnodH9N7ShRoKNdPJh9Vs-PkMu6yBgZE3yhScZpZ8YSs5g8zIwDVm8lYiFZZkd08jqr-YtypAqroaG2u7amKfXd01fl16KvtSTMFsih4HAU5hE5AuE3iFMeLyd6IPGr-zE3_2DqidarWbX6A1fSf5wRc7Y5ahEf0Rp608Pp2DqG",
    },
    {
        slug: "cilandak-zen-garden",
        title: "Cilandak Zen Garden",
        category: "Residential",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAapx4_yliDtRJziWKg5ZsTaR2An0GFKoCWMMeibPUXhx6RUM3I-pgIZN0dPlfHzrvnFGi0oj8wpUl8m-oeD0kpeL1jDHXUD8d-B8KVn3pBqSeOlH5gAHIvsdB6NDx5YEysu1-oJzUNMgtcSThHq4CGKUWK4v4Cj1YZQOZX6mGz7ZegLH8Pl7cHgHA8qbEPuWslRKv9F3FXLR34jSLfvMhtGRCOI8mFMHwOwb_F5DK_KHa8EW6LhFiSz_SfAnjFeTDdyhvAAQIvoDF0",
    },
    {
        slug: "school-learning-farm",
        title: "School Learning Farm",
        category: "Community",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgt0yjri8SVi1PApTGeweVaudyEY9TJK3uFPIBY9n0RQwheckj3SAm9rq_4dPluayoqPYN7TYnYT7G6rc63QuZoJ1hKe9VbWlyOFYaNqxYN4Lv_n-rCgUZQDaV6IflDSURjZZmQ4-9dzb2ZSnzy-eEJAkyY6GRTaEvOglrVzSSyCx1mw7eno5fOiaipAqg7TUJ9c1VovQw_B-jwJrQbX4LY9lTPRsf4lKI8TpIu1Jz45q94kxyfd0qbO97fNOd0ZlyiFWWXPpe3CKI",
    },
    {
        slug: "bintaro-office-park",
        title: "Bintaro Office Park",
        category: "Commercial",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAnrBlG1LDwMHucJwo4xeTfB8egtV9oHwefD_CsM3sSHKa6Hfwemq26_BWeV8UJOBrMnaOwOQFKDRgZgL-AqIc4W5_tX3iYNz9oRCmO6gmLC8IbSK7jBokRIXz2Il_342RCRuo5XqVNagCZAtqKwFRtTs3UJgsvIOZ_dVCxi6TUHJXZSUhb_Avx7BUcbOlNLWRzu24fBiGN1A_h0YwqmaWx9GTmuNZIVohBc3Iu6tHJuC_w-w1vbBu3PtGwfUhObP38jvBsmAxo52-B",
    },
    {
        slug: "sustainable-kitchen-garden",
        title: "Sustainable Kitchen Garden",
        category: "Edible",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtXEv-klcY2RGfZxNXrXumwC6zMu-XFYo531bLro71tMBw1HQ2Uk49qZvw2UiNntriWtL4Rp4h59g_KhxHvf9CU18aRotCYBefUe2IUJDUT0gbxxCeMjeU3vZqXvMXXM0dLQfogbcGUoor4ilLSKHUwB9PlZt3VtC9uZ2CNySywWxafQmHVza5Yo79LA_qTk4wCzh9myNZQkUvhiAsjmUxW7Fnx_nTCTiDt5WVIbeuvoruBpGE2yXXiyHJrfoFxkkZfOmFnnCoYmaW",
    },
];

export const fallbackProjectFilterTabs = ["All", "Residential", "Commercial", "Edible Gardens"];

export const fallbackClientLogos = [
    { icon: "apartment", name: "URBAN CORP" },
    { icon: "school", name: "GREEN SCHOOL" },
    { icon: "storefront", name: "ORGANIC MRKT" },
    { icon: "deck", name: "VILLA BALI" },
    { icon: "forest", name: "ECO RESORT" },
];

// ─── Blog Page ──────────────────────────────────────────────

export const fallbackBlogCategories = [
    "All Posts", "Tutorials", "Events", "Reflections", "Recipes",
    "Ecosystem", "Urban Farming", "Lifestyle", "Sustainability",
];

export const fallbackBlogPosts = [
    {
        title: "5 Common Mistakes When Watering Your Plants",
        excerpt: "Watering seems simple, but it\u2019s where most new plant parents struggle. Learn the signs of overwatering versus underwatering and how to find the perfect balance for your green friends.",
        category: "Tutorials",
        slug: "common-watering-mistakes",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5Phzf4oDsVmCUCWfSEEjaJ77fmoqTMJB5mVi09IAiocBCR3SLaTUJLMI3PQRQaZ-AzSQg9UfC7VoNrLV52N26SNVPk89pGEvxRabyDWUtHJ9RJ9-8ta9mtI2cgOsWUsWg0VQ08CrQmdPPkvsyBckCNqyLOnXLcTa10k-Nwt-5ZGHZKalSKrnSEhbzc33gw8M7S2tipLQw1CjcYZK2QTGOQ5ptn_hBp5WvmM8PTxiP54DVuwtRiehWmAGMphcoqqWHDjZ9g6HQlOYL",
        date: "October 12, 2023",
    },
    {
        title: "3 Ways Planting Sunflowers Strengthens Your Ecosystem",
        excerpt: "Beyond their beauty, sunflowers act as powerful attractors for pollinators, improve soil health through deep roots, and can even help detoxify the ground they grow in.",
        category: "Ecosystem",
        slug: "sunflowers-ecosystem",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCiF4OpezFcvXLEXL-V6-b-bX1gS-LEPZ7bCZUdTuDLX5UGUwjEKHJXEmyf2pQ8G39Dx_ci9cH3Sijm3p08mqtX4zxsjvi07dQMdiz_AJZQbxoNureTGvuDWXs7kmd16vALJdvqSHg9AbxpKb6xfYj8ptzoU81rNKwqGtWh-ugmPIBPFfyyViU0ULQAbo8dgz3gQfaTGCK_H9l3jyZVTSR1oAO5r-DVorX7rJ4ZIWLDgiCSguskCPciuBOkTWcFWnpJAH-iCmbCRyV4",
        date: "September 28, 2023",
    },
    {
        title: "3 Tips for Successful Potted Spice Gardens in The Kitchen",
        excerpt: "Don\u2019t have a backyard? No problem. Discover how to cultivate a thriving spice garden right on your kitchen counter, ensuring fresh flavors are always within reach.",
        category: "Urban Farming",
        slug: "potted-spice-gardens",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqR7A1DFFU2vjeVJ7Q7JMvGJV3X4Z01aKv6nQIKDPBw-sX2tX4GSM9A6v8i9eTF2TSFfczBfbLCOEK2CRSDS6kL5_sVZmpyG3hHJFgRjOifhWIkNqdstlVjduC8AIegmS0U32nvV6vxdYMK5vkeoj51AdfayQcqPd-04Akh17fTPMXZbAvW_Xj0DLwYlu6GolQ6r-a0jtJn2FgI_79dojOLDIS9lp79oBFlJyxmM5lFrGo34hWcZvJ6ee4lpSu7H44CWS1x0boLQvy",
        date: "September 15, 2023",
    },
    {
        title: "Why We Failed: Lessons from Our First Harvest",
        excerpt: "Farming is a journey of trial and error. We share our humbling beginnings, the crops that didn\u2019t make it, and the invaluable wisdom nature taught us through failure.",
        category: "Reflections",
        slug: "lessons-first-harvest",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDEE_k8Rrm-oWY2FUmJgWTFSS15yxegPdVIqgeOsiUCoqSrlW1fpBFEqREafdJllt9isJwLkc9aTXjBoqx5gmoJFfLM8XvBJoELItdIBCTHB5ZrZEoAtSWLTmS7gOd8ET_CtoToBoVZH0LyeO948UyR9WBVZ6_gtyxLvP4mGnsp_YRr_h6ooIDL-_Z2bJq9eWfmby-8udKRADc4gjSb2SvKfPjmf9cDKo1wE1oUJUjS5bWUamAYUKT3OAks0DJe-VZ3rqSSnV8prKAU",
        date: "August 30, 2023",
    },
    {
        title: "Independent Food Sources: 1 Month Without Buying Vegetables!",
        excerpt: "Is it possible to live solely off what you grow in the city? We took the challenge. Here is our diary of a month consuming only self-harvested greens.",
        category: "Lifestyle",
        slug: "month-without-buying-vegetables",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAibN801Ierdsy0uYguZ1Yqb3GU2R7bLjrdis8b28dKvs1h7QwWVvUtRoZyxdgWf1m9D1HB98kciXJgp5o1xJ8K2JptBXelm2ME3luDjjjZXg-_QqY9hE-7zqIGGf5geV6fDLjWX5xVS7zs53ycA7p42bf0BHmZYD3q0Z_3fcZGZNgYy5zzEwzfH__cG6G7PjQWeXLrO_q-TygI11bIcmy3l6i6BUt1xw5bKozRlxbIkn95W7fzoV3WC1u4_YRrQ6nlrDbcw77RaDiB",
        date: "August 12, 2023",
    },
    {
        title: "Composting 101: Turning Kitchen Scraps into Gold",
        excerpt: "Stop throwing away your food waste. Learn the basics of home composting and how you can reduce landfill waste while creating nutrient-rich soil for your plants.",
        category: "Sustainability",
        slug: "composting-101",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMw1xKzJhiV5MJwVO1BHnkNyOLBDPvohXtopQoEo6uLuIoytBZbCSaekHrWuyO2XIf72gN9rTUwvfAMikjHjaVlyUrmeFKKL806NZV0YW410R0OmfuMtvwAzDwU_bwP_ODb8VZEPAza3FrJSqaj-vy5QhDagemSF6fLNu3E3tL3nuJ3zAi3sxvgIvr62Nc6giedS-UxNrJWpb0BOMRbLnjqPmev67GNZAK8dqHmg_tLyaa7beahrFRc9oPBbJCxYLzLReWX_KMw6Om",
        date: "July 25, 2023",
    },
];

// ─── Blog Detail Page ──────────────────────────────────────

type FallbackContentBlock =
    | { type: "paragraph"; text: string }
    | { type: "heading"; text: string }
    | { type: "full-image"; src: string; alt: string; caption?: string }
    | { type: "callout"; title: string; text: string };

export interface FallbackBlogPostDetail {
    title: string;
    category: string;
    date: string;
    readTime: string;
    heroImage: string;
    author: { name: string; avatar: string };
    contentBlocks: FallbackContentBlock[];
    tags: string[];
    relatedPosts: {
        slug: string;
        title: string;
        image: string;
        category: string;
        excerpt: string;
    }[];
}

export const fallbackBlogPostsDetail: Record<string, FallbackBlogPostDetail> = {
    "common-watering-mistakes": {
        title: "5 Common Mistakes When Watering Your Plants",
        category: "Tutorials",
        date: "October 12, 2023",
        readTime: "6 min read",
        heroImage:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuA5Phzf4oDsVmCUCWfSEEjaJ77fmoqTMJB5mVi09IAiocBCR3SLaTUJLMI3PQRQaZ-AzSQg9UfC7VoNrLV52N26SNVPk89pGEvxRabyDWUtHJ9RJ9-8ta9mtI2cgOsWUsWg0VQ08CrQmdPPkvsyBckCNqyLOnXLcTa10k-Nwt-5ZGHZKalSKrnSEhbzc33gw8M7S2tipLQw1CjcYZK2QTGOQ5ptn_hBp5WvmM8PTxiP54DVuwtRiehWmAGMphcoqqWHDjZ9g6HQlOYL",
        author: {
            name: "Kebun Kumara Team",
            avatar:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuBB_vM7XHN8_FgfbzAWKCxTVMekclzKj2jnxm3MuxXZw28kkLQnQZipfOHSZ3_HoNBJbMJ4E0uLhPPOmHaLwE-RFXRN-cHFSRlLr9jJaVHGvbTcZ3O7A7M4qFU6d3pimIz6gH9dYoJbvFmkdFXN1qON4dWOWPSQyTnl_PoGRZxLa7w1BkwiqEG6hSV0kbr2P8zfM5ePJ5PJ5R6gqHQDlpFBn8WKfIYwBnbjGLyQoS6V_t17t7Th0LzP5bFV_IhnLY-7LKLS7TnqZ0",
        },
        contentBlocks: [
            {
                type: "paragraph",
                text: "Taking care of plants is rewarding, but even the most well-intentioned plant parent can make mistakes. This guide is designed to help you avoid the most common pitfalls, especially when it comes to the single most critical caregiving task: watering.",
            },
            { type: "heading", text: "1. Overwatering: The Silent Killer" },
            {
                type: "paragraph",
                text: "The most common mistake people make is drowning their plants with love \u2014 literally. Overwatering leads to root rot, a condition where the roots suffocate and begin to decay because they can\u2019t access the oxygen they need in waterlogged soil.",
            },
            {
                type: "paragraph",
                text: "The key is to check the soil moisture before watering. Stick your finger about an inch into the soil. If it feels damp, wait another day or two. Different plants have very different water needs, so avoid a one-size-fits-all watering schedule.",
            },
            {
                type: "full-image",
                src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCiF4OpezFcvXLEXL-V6-b-bX1gS-LEPZ7bCZUdTuDLX5UGUwjEKHJXEmyf2pQ8G39Dx_ci9cH3Sijm3p08mqtX4zxsjvi07dQMdiz_AJZQbxoNureTGvuDWXs7kmd16vALJdvqSHg9AbxpKb6xfYj8ptzoU81rNKwqGtWh-ugmPIBPFfyyViU0ULQAbo8dgz3gQfaTGCK_H9l3jyZVTSR1oAO5r-DVorX7rJ4ZIWLDgiCSguskCPciuBOkTWcFWnpJAH-iCmbCRyV4",
                alt: "Healthy plant roots vs. overwatered roots",
                caption: "Healthy roots (left) vs. overwatered, rotting roots (right).",
            },
            { type: "heading", text: "2. Watering at the Wrong Time" },
            {
                type: "paragraph",
                text: "Timing matters more than most people think. Watering in the heat of the midday sun causes water to evaporate before the roots can absorb it. On the other hand, watering late in the evening can leave foliage wet overnight, creating a breeding ground for fungal diseases.",
            },
            {
                type: "callout",
                title: "Pro Tip",
                text: "The best time to water your plants is early in the morning. This allows the water to reach the roots before the day heats up, and any moisture on the leaves has time to evaporate, preventing fungal issues.",
            },
            { type: "heading", text: "3. Not Adjusting for the Seasons" },
            {
                type: "paragraph",
                text: "Your plants\u2019 water needs change dramatically with the seasons. In the tropics, the rainy season provides natural irrigation, so you\u2019ll need to cut back significantly. During the dry season, more frequent watering is essential. Always observe your plants \u2014 they\u2019re the best indicators of what they need.",
            },
            { type: "heading", text: "4. Using the Wrong Watering Technique" },
            {
                type: "paragraph",
                text: "Many people make the mistake of lightly sprinkling their plants. This only wets the surface and encourages shallow root growth. Instead, water deeply and thoroughly at the base of the plant. This encourages roots to grow downward, making the plant more resilient and drought-tolerant.",
            },
            { type: "heading", text: "5. Ignoring Drainage" },
            {
                type: "paragraph",
                text: "Even with perfect watering habits, poor drainage will undo all your efforts. Always use pots with drainage holes. For garden beds, amend the soil with organic matter like compost to improve its structure and water-holding capacity without causing waterlogging.",
            },
            {
                type: "full-image",
                src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqR7A1DFFU2vjeVJ7Q7JMvGJV3X4Z01aKv6nQIKDPBw-sX2tX4GSM9A6v8i9eTF2TSFfczBfbLCOEK2CRSDS6kL5_sVZmpyG3hHJFgRjOifhWIkNqdstlVjduC8AIegmS0U32nvV6vxdYMK5vkeoj51AdfayQcqPd-04Akh17fTPMXZbAvW_Xj0DLwYlu6GolQ6r-a0jtJn2FgI_79dojOLDIS9lp79oBFlJyxmM5lFrGo34hWcZvJ6ee4lpSu7H44CWS1x0boLQvy",
                alt: "Proper deep watering technique",
                caption: "Water deeply at the base of the plant for healthy root development.",
            },
            {
                type: "paragraph",
                text: "Remember, the goal isn\u2019t to follow a rigid watering schedule but to understand your plants and their environment. Pay attention, be patient, and your garden will reward you tenfold.",
            },
        ],
        tags: ["Tutorials", "Plant Care", "Watering Tips", "Beginner Friendly"],
        relatedPosts: [
            {
                slug: "sunflowers-ecosystem",
                title: "3 Ways Planting Sunflowers Strengthens Your Ecosystem",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCiF4OpezFcvXLEXL-V6-b-bX1gS-LEPZ7bCZUdTuDLX5UGUwjEKHJXEmyf2pQ8G39Dx_ci9cH3Sijm3p08mqtX4zxsjvi07dQMdiz_AJZQbxoNureTGvuDWXs7kmd16vALJdvqSHg9AbxpKb6xfYj8ptzoU81rNKwqGtWh-ugmPIBPFfyyViU0ULQAbo8dgz3gQfaTGCK_H9l3jyZVTSR1oAO5r-DVorX7rJ4ZIWLDgiCSguskCPciuBOkTWcFWnpJAH-iCmbCRyV4",
                category: "Ecosystem",
                excerpt: "Beyond their beauty, sunflowers act as powerful attractors for pollinators.",
            },
            {
                slug: "potted-spice-gardens",
                title: "3 Tips for Successful Potted Spice Gardens in The Kitchen",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqR7A1DFFU2vjeVJ7Q7JMvGJV3X4Z01aKv6nQIKDPBw-sX2tX4GSM9A6v8i9eTF2TSFfczBfbLCOEK2CRSDS6kL5_sVZmpyG3hHJFgRjOifhWIkNqdstlVjduC8AIegmS0U32nvV6vxdYMK5vkeoj51AdfayQcqPd-04Akh17fTPMXZbAvW_Xj0DLwYlu6GolQ6r-a0jtJn2FgI_79dojOLDIS9lp79oBFlJyxmM5lFrGo34hWcZvJ6ee4lpSu7H44CWS1x0boLQvy",
                category: "Urban Farming",
                excerpt: "Don\u2019t have a backyard? No problem. Cultivate a thriving spice garden right on your kitchen counter.",
            },
            {
                slug: "lessons-first-harvest",
                title: "Why We Failed: Lessons from Our First Harvest",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDEE_k8Rrm-oWY2FUmJgWTFSS15yxegPdVIqgeOsiUCoqSrlW1fpBFEqREafdJllt9isJwLkc9aTXjBoqx5gmoJFfLM8XvBJoELItdIBCTHB5ZrZEoAtSWLTmS7gOd8ET_CtoToBoVZH0LyeO948UyR9WBVZ6_gtyxLvP4mGnsp_YRr_h6ooIDL-_Z2bJq9eWfmby-8udKRADc4gjSb2SvKfPjmf9cDKo1wE1oUJUjS5bWUamAYUKT3OAks0DJe-VZ3rqSSnV8prKAU",
                category: "Reflections",
                excerpt: "Farming is a journey of trial and error. We share our humbling beginnings.",
            },
        ],
    },
};

export type FallbackPlantCategory = "Edible" | "Ornamental" | "Shade-loving";

export type FallbackIconText = {
    icon: string;
    text: string;
};

export type FallbackDesignersNote = {
    text: string;
    author: string;
    role: string;
    initials: string;
};

export type FallbackPlant = {
    id: string;
    name: string;
    latin: string;
    category: FallbackPlantCategory;
    image: string;
    family?: string;
    origin?: string;
    care?: FallbackIconText[];
    benefits?: FallbackIconText[];
    note?: string;
    gallery?: string[];
    designersNote?: FallbackDesignersNote;
};

export const fallbackProjectPlants: Record<string, { title: string; plants: FallbackPlant[] }> = {
    "menteng-glass-house": {
        title: "Menteng Glass House",
        plants: [
            {
                id: "monstera",
                name: "Swiss Cheese Plant",
                latin: "Monstera deliciosa",
                category: "Ornamental",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtXEv-klcY2RGfZxNXrXumwC6zMu-XFYo531bLro71tMBw1HQ2Uk49qZvw2UiNntriWtL4Rp4h59g_KhxHvf9CU18aRotCYBefUe2IUJDUT0gbxxCeMjeU3vZqXvMXXM0dLQfogbcGUoor4ilLSKHUwB9PlZt3VtC9uZ2CNySywWxafQmHVza5Yo79LA_qTk4wCzh9myNZQkUvhiAsjmUxW7Fnx_nTCTiDt5WVIbeuvoruBpGE2yXXiyHJrfoFxkkZfOmFnnCoYmaW",
                family: "Araceae",
                origin: "Tropical",
                care: [
                    { icon: "water_drop", text: "Water weekly, allow soil to dry" },
                    { icon: "light_mode", text: "Bright, indirect sunlight" },
                    { icon: "thermostat", text: "High humidity preferred" },
                ],
                benefits: [
                    { icon: "air", text: "Excellent air purifier" },
                    { icon: "psychology", text: "Stress reduction visual" },
                ],
                note: "A statement piece in the Menteng Glass House, used primarily in the shaded atrium to create depth and tropical texture against the concrete walls.",
                gallery: [
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuDgt0yjri8SVi1PApTGeweVaudyEY9TJK3uFPIBY9n0RQwheckj3SAm9rq_4dPluayoqPYN7TYnYT7G6rc63QuZoJ1hKe9VbWlyOFYaNqxYN4Lv_n-rCgUZQDaV6IflDSURjZZmQ4-9dzb2ZSnzy-eEJAkyY6GRTaEvOglrVzSSyCx1mw7eno5fOiaipAqg7TUJ9c1VovQw_B-jwJrQbX4LY9lTPRsf4lKI8TpIu1Jz45q94kxyfd0qbO97fNOd0ZlyiFWWXPpe3CKI",
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuAapx4_yliDtRJziWKg5ZsTaR2An0GFKoCWMMeibPUXhx6RUM3I-pgIZN0dPlfHzrvnFGi0oj8wpUl8m-oeD0kpeL1jDHXUD8d-B8KVn3pBqSeOlH5gAHIvsdB6NDx5YEysu1-oJzUNMgtcSThHq4CGKUWK4v4Cj1YZQOZX6mGz7ZegLH8Pl7cHgHA8qbEPuWslRKv9F3FXLR34jSLfvMhtGRCOI8mFMHwOwb_F5DK_KHa8EW6LhFiSz_SfAnjFeTDdyhvAAQIvoDF0",
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuCjJ5t5H2IIOr8v84OO-7l4vQuD79KB-TTcgtChAKGm-aunajD-lnODjHCH_6wRwE0CSl7-nX-awbbjnKdoPTDEVtUkG8eDURQncnnodH9N7ShRoKNdPJh9Vs-PkMu6yBgZE3yhScZpZ8YSs5g8zIwDVm8lYiFZZkd08jqr-YtypAqroaG2u7amKfXd01fl16KvtSTMFsih4HAU5hE5AuE3iFMeLyd6IPGr-zE3_2DqidarWbX6A1fSf5wRc7Y5ahEf0Rp608Pp2DqG",
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuCsYtINOTN6aIl6zB9n4MfExfYhWA9XLPDf8KAf_I0JYpZS5c-9ytf2c55BlC39D3ntc69I_vb8G82GbCeRDYZgZDV4EhHDMn9jU_qrkWZhMW1z1khJLcty5PP2GRYXZKZ0-e4Zzr1zb3qYTOIFwCawUOObEsHmLiXML10EGrz_OSCgcfhgqVORucj8CRMCk2oW9xtcKCUv5Q4NThxo7zASmQOUJtdjymhM1QLtj-TgIj5lv0q_l5rwP5annin7bTM-7HYHuNLghcdn"
                ],
                designersNote: {
                    text: "We selected the Monstera for the Menteng Glass House primarily for its architectural leaves. Placed in the shaded atrium, its fenestrations create beautiful shadow play against the raw concrete walls, softening the industrial aesthetic.",
                    author: "Kebun Kumara Design Team",
                    role: "",
                    initials: "KK"
                }
            },
            {
                id: "calathea",
                name: "Prayer Plant",
                latin: "Calathea orbifolia",
                category: "Shade-loving",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjJ5t5H2IIOr8v84OO-7l4vQuD79KB-TTcgtChAKGm-aunajD-lnODjHCH_6wRwE0CSl7-nX-awbbjnKdoPTDEVtUkG8eDURQncnnodH9N7ShRoKNdPJh9Vs-PkMu6yBgZE3yhScZpZ8YSs5g8zIwDVm8lYiFZZkd08jqr-YtypAqroaG2u7amKfXd01fl16KvtSTMFsih4HAU5hE5AuE3iFMeLyd6IPGr-zE3_2DqidarWbX6A1fSf5wRc7Y5ahEf0Rp608Pp2DqG",
                family: "Marantaceae",
                origin: "Understory",
                care: [
                    { icon: "water_drop", text: "Keep moist, do not overwater" },
                    { icon: "wb_twilight", text: "Low to medium light" },
                ],
                benefits: [
                    { icon: "local_florist", text: "Bio-indicator for humidity" },
                ],
            },
            {
                id: "ficus-lyrata",
                name: "Fiddle Leaf Fig",
                latin: "Ficus lyrata",
                category: "Ornamental",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAapx4_yliDtRJziWKg5ZsTaR2An0GFKoCWMMeibPUXhx6RUM3I-pgIZN0dPlfHzrvnFGi0oj8wpUl8m-oeD0kpeL1jDHXUD8d-B8KVn3pBqSeOlH5gAHIvsdB6NDx5YEysu1-oJzUNMgtcSThHq4CGKUWK4v4Cj1YZQOZX6mGz7ZegLH8Pl7cHgHA8qbEPuWslRKv9F3FXLR34jSLfvMhtGRCOI8mFMHwOwb_F5DK_KHa8EW6LhFiSz_SfAnjFeTDdyhvAAQIvoDF0",
                family: "Moraceae",
                origin: "Tropical",
                care: [
                    { icon: "water_drop", text: "Moderate watering, avoid moist roots" },
                    { icon: "light_mode", text: "Bright indirect light" },
                ],
                benefits: [
                    { icon: "air", text: "Good air purifier" },
                    { icon: "psychiatry", text: "Dramatic foliage accent" },
                ],
            },
            {
                id: "basil",
                name: "Sweet Basil",
                latin: "Ocimum basilicum",
                category: "Edible",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgt0yjri8SVi1PApTGeweVaudyEY9TJK3uFPIBY9n0RQwheckj3SAm9rq_4dPluayoqPYN7TYnYT7G6rc63QuZoJ1hKe9VbWlyOFYaNqxYN4Lv_n-rCgUZQDaV6IflDSURjZZmQ4-9dzb2ZSnzy-eEJAkyY6GRTaEvOglrVzSSyCx1mw7eno5fOiaipAqg7TUJ9c1VovQw_B-jwJrQbX4LY9lTPRsf4lKI8TpIu1Jz45q94kxyfd0qbO97fNOd0ZlyiFWWXPpe3CKI",
                family: "Lamiaceae",
                origin: "Mediterranean",
                care: [
                    { icon: "water_drop", text: "Regular watering, moist soil" },
                    { icon: "light_mode", text: "Full sun or bright light" },
                ],
                benefits: [
                    { icon: "restaurant", text: "Culinary herb" },
                    { icon: "pest_control", text: "Natural pest repellent" },
                ],
            },
            {
                id: "heartleaf-philo",
                name: "Heartleaf Philo",
                latin: "Philodendron hederaceum",
                category: "Shade-loving",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsYtINOTN6aIl6zB9n4MfExfYhWA9XLPDf8KAf_I0JYpZS5c-9ytf2c55BlC39D3ntc69I_vb8G82GbCeRDYZgZDV4EhHDMn9jU_qrkWZhMW1z1khJLcty5PP2GRYXZKZ0-e4Zzr1zb3qYTOIFwCawUOObEsHmLiXML10EGrz_OSCgcfhgqVORucj8CRMCk2oW9xtcKCUv5Q4NThxo7zASmQOUJtdjymhM1QLtj-TgIj5lv0q_l5rwP5annin7bTM-7HYHuNLghcdn",
                family: "Araceae",
                origin: "Tropical Americas",
                care: [
                    { icon: "water_drop", text: "Water when top soil dries" },
                    { icon: "wb_twilight", text: "Low to bright indirect light" },
                ],
                benefits: [
                    { icon: "air", text: "Removes formaldehyde" },
                    { icon: "local_florist", text: "Fast grower, easy propagation" },
                ],
            },
            {
                id: "snake-plant",
                name: "Snake Plant",
                latin: "Sansevieria trifasciata",
                category: "Ornamental",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAnrBlG1LDwMHucJwo4xeTfB8egtV9oHwefD_CsM3sSHKa6Hfwemq26_BWeV8UJOBrMnaOwOQFKDRgZgL-AqIc4W5_tX3iYNz9oRCmO6gmLC8IbSK7jBokRIXz2Il_342RCRuo5XqVNagCZAtqKwFRtTs3UJgsvIOZ_dVCxi6TUHJXZSUhb_Avx7BUcbOlNLWRzu24fBiGN1A_h0YwqmaWx9GTmuNZIVohBc3Iu6tHJuC_w-w1vbBu3PtGwfUhObP38jvBsmAxo52-B",
                family: "Asparagaceae",
                origin: "West Africa",
                care: [
                    { icon: "water_drop", text: "Very low water needs" },
                    { icon: "light_mode", text: "Any light condition" },
                ],
                benefits: [
                    { icon: "air", text: "Nighttime oxygen producer" },
                    { icon: "local_florist", text: "Nearly indestructible" },
                ],
            },
            {
                id: "elephant-ear",
                name: "Elephant Ear",
                latin: "Alocasia macrorrhizos",
                category: "Ornamental",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjJ5t5H2IIOr8v84OO-7l4vQuD79KB-TTcgtChAKGm-aunajD-lnODjHCH_6wRwE0CSl7-nX-awbbjnKdoPTDEVtUkG8eDURQncnnodH9N7ShRoKNdPJh9Vs-PkMu6yBgZE3yhScZpZ8YSs5g8zIwDVm8lYiFZZkd08jqr-YtypAqroaG2u7amKfXd01fl16KvtSTMFsih4HAU5hE5AuE3iFMeLyd6IPGr-zE3_2DqidarWbX6A1fSf5wRc7Y5ahEf0Rp608Pp2DqG",
                family: "Araceae",
                origin: "Southeast Asia",
                care: [
                    { icon: "water_drop", text: "Regular watering, humid conditions" },
                    { icon: "light_mode", text: "Bright indirect light" },
                ],
                benefits: [
                    { icon: "psychiatry", text: "Bold architectural foliage" },
                ],
            },
            {
                id: "chili",
                name: "Bird's Eye Chili",
                latin: "Capsicum frutescens",
                category: "Edible",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtXEv-klcY2RGfZxNXrXumwC6zMu-XFYo531bLro71tMBw1HQ2Uk49qZvw2UiNntriWtL4Rp4h59g_KhxHvf9CU18aRotCYBefUe2IUJDUT0gbxxCeMjeU3vZqXvMXXM0dLQfogbcGUoor4ilLSKHUwB9PlZt3VtC9uZ2CNySywWxafQmHVza5Yo79LA_qTk4wCzh9myNZQkUvhiAsjmUxW7Fnx_nTCTiDt5WVIbeuvoruBpGE2yXXiyHJrfoFxkkZfOmFnnCoYmaW",
                family: "Solanaceae",
                origin: "Southeast Asia",
                care: [
                    { icon: "light_mode", text: "Full sun exposure" },
                    { icon: "water_drop", text: "Regular watering" },
                ],
                benefits: [
                    { icon: "restaurant", text: "Essential kitchen ingredient" },
                    { icon: "pest_control", text: "Companion planting pest deterrent" },
                ],
            },
            {
                id: "rubber-fig",
                name: "Rubber Fig",
                latin: "Ficus elastica",
                category: "Ornamental",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgt0yjri8SVi1PApTGeweVaudyEY9TJK3uFPIBY9n0RQwheckj3SAm9rq_4dPluayoqPYN7TYnYT7G6rc63QuZoJ1hKe9VbWlyOFYaNqxYN4Lv_n-rCgUZQDaV6IflDSURjZZmQ4-9dzb2ZSnzy-eEJAkyY6GRTaEvOglrVzSSyCx1mw7eno5fOiaipAqg7TUJ9c1VovQw_B-jwJrQbX4LY9lTPRsf4lKI8TpIu1Jz45q94kxyfd0qbO97fNOd0ZlyiFWWXPpe3CKI",
                family: "Moraceae",
                origin: "Southeast Asia",
                care: [
                    { icon: "water_drop", text: "Let top soil dry between waterings" },
                    { icon: "light_mode", text: "Bright indirect light" },
                ],
                benefits: [
                    { icon: "air", text: "Effective air purifier" },
                ],
            },
            {
                id: "golden-pothos",
                name: "Golden Pothos",
                latin: "Epipremnum aureum",
                category: "Shade-loving",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAnrBlG1LDwMHucJwo4xeTfB8egtV9oHwefD_CsM3sSHKa6Hfwemq26_BWeV8UJOBrMnaOwOQFKDRgZgL-AqIc4W5_tX3iYNz9oRCmO6gmLC8IbSK7jBokRIXz2Il_342RCRuo5XqVNagCZAtqKwFRtTs3UJgsvIOZ_dVCxi6TUHJXZSUhb_Avx7BUcbOlNLWRzu24fBiGN1A_h0YwqmaWx9GTmuNZIVohBc3Iu6tHJuC_w-w1vbBu3PtGwfUhObP38jvBsmAxo52-B",
                family: "Araceae",
                origin: "Southeast Asia",
                care: [
                    { icon: "water_drop", text: "Water when soil is dry" },
                    { icon: "wb_twilight", text: "Tolerates low light" },
                ],
                benefits: [
                    { icon: "air", text: "Top air-purifying plant" },
                    { icon: "local_florist", text: "Beginner-friendly" },
                ],
            },
        ]
    },
    "kemang-rooftop-oasis": {
        title: "Kemang Rooftop Oasis",
        plants: [
            {
                id: "capsicum-annuum",
                name: "Chili Pepper",
                latin: "Capsicum Annuum",
                category: "Edible",
                image: "/images/generated/tropical-plant.png",
                family: "Solanaceae",
                origin: "Americas",
                care: [
                    { icon: "sunny", text: "Full sun (6-8 hours)" },
                    { icon: "water_drop", text: "Consistent moisture" }
                ],
                benefits: [
                    { icon: "restaurant", text: "Culinary use" },
                    { icon: "health_and_safety", text: "High in Vitamin C" }
                ],
                note: "Productive variety suited for tropical urban gardens."
            }
        ]
    }
};
