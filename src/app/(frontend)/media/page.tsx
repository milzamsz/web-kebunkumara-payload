import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "In The Media — Kebun Kumara",
    description: "Features, stories, and conversations about Kebun Kumara's journey in urban farming and sustainable gardening.",
    openGraph: {
        title: "In The Media — Kebun Kumara",
        description: "Features, stories, and conversations about Kebun Kumara.",
        url: "https://kebunkumara.id/media",
        siteName: "Kebun Kumara",
        type: "website",
        locale: "id_ID",
    },
};

interface MediaItem {
    title: string;
    date: string;
    excerpt: string;
    source?: string;
    url?: string;
}

const mediaItems: MediaItem[] = [
    {
        title: "Menjadikan Berkebun Sebuah Norma Bukan Tren",
        date: "Kamis, 24 September 2020",
        excerpt: "Fenomena urban farming atau berkebun di ruang terbatas menjadi semakin meningkat akibat adanya wabah Covid-19 yang membatasi mobilitas masyarakat. Urban farming juga seakan menjadi pelipur lara warga Ibu Kota yang tidak dapat berlibur ke luar kota dan memanjakan mata.",
        source: "Media Coverage",
        url: "https://mediaindonesia.com/humaniora/347571/menjadikan-berkebun-sebuah-norma-bukan-tren"
    },
    {
        title: "Bertemu di Istana Bogor, Petani Wanita ini bikin Jokowi Senang",
        date: "Sabtu, 28 Oktober 2017",
        excerpt: "Pemuda-pemudi kreatif berkumpul di Istana Bogor dan berdialog dengan Presiden Jokowi. Salah seorang pemudi curhat kalau zaman sekarang jarang ditemui anak-anak yang bercita-cita menjadi petani.",
        source: "News",
        url: "https://makassar.tribunnews.com/2017/11/01/cantik-lulusan-luar-negeri-tapi-pekerjaan-wanita-cantik-dekat-jokowi-ini-tak-disangka"
    },
    {
        title: "Cerita Soraya Cassandra Merawat Alam Melalui Kebun Kumara",
        date: "Sabtu, 27 September 2020",
        excerpt: "Beberapa orang memanfaatkan masa pandemik untuk lebih dekat dengan dirinya. Agaknya, itu yang dilakukan untuk bertahan saat swakarantina mandiri. Mereka beralih mengeksplorasi berbagai hal dari rumah. Mulai dari dekorasi kamar, memasak, melukis, hingga hobi yang sekarang menjadi tren seperti berkebun.",
        source: "Interview",
        url: "https://www.idntimes.com/life/inspiration/fajar-laksmita-dewi-1/cerita-soraya-cassandra-merawat-alam"
    },
    {
        title: "Kebun Kumara, Misi Siti Soraya Cassandra Bantu Orang Kota Berinteraksi Dengan Alam",
        date: "Kamis, 10 Desember 2020",
        excerpt: "Berawal dari keresahan pribadi tentang isu lingkungan serta keinginan memiliki bisnis yang sesuai passion sekaligus memberi manfaat, Siti Soraya Cassandra alias Sandra akhirnya membuka Kebun Kumara, ruang hijau sarana belajar masyarakat sekaligus mendekatkan masyarakat kota dengan alam.",
        source: "Feature",
        url: "https://goodlife.id/kebun-kumara-misi-siti-soraya-cassandra-bantu-orang-kota-berinteraksi-dengan-alam/"
    },
    {
        title: "Atasi Keterbatasan Lahan dengan Teknik Herb Spiral",
        date: "Minggu, 6 Desember 2020",
        excerpt: "Kebun Kumara di Situ Gintung, Tangerang Selatan, Banten, ini berdiri sejak 2016. Kumara dapat diartikan anak atau generasi muda. Educational Program and Children Learning Manager Kebun Kumara Sarah Adipayanti menyebut Kebun Kumara sebagai kebun belajar.",
        source: "Tips & Tricks",
        url: "https://www.jawapos.com/hobi-kesenangan/01301717/atasi-keterbatasan-lahan-dengan-teknik-herb-spiral"
    }
];

export default function MediaPage() {
    return (
        <main className="pt-20 bg-[#FAF9F6] min-h-screen">
            {/* ─── Hero ─────────────────────────────────────────── */}
            <header className="relative pt-12 pb-20 md:pt-28 md:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
                {/* decorative blurs */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#4a6741]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-[#4a6741]/5 rounded-full blur-3xl" />

                <div className="relative max-w-7xl mx-auto text-center">
                    <h1 className="font-serif text-5xl md:text-7xl font-bold text-gray-900 tracking-tight mb-6">
                        In The Media
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-gray-500 font-light italic">
                        Features, stories, and conversations about our journey in urban farming.
                    </p>
                </div>
            </header>

            {/* ─── Media List ───────────────────────────────────── */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
                <div className="space-y-12">
                    {mediaItems.map((item, index) => (
                        <article 
                            key={index} 
                            className="group relative bg-white border border-[#2D3A26]/10 p-8 md:p-10 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                        >
                            <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
                                {/* Date & Source (Left on desktop) */}
                                <div className="md:w-1/4 flex flex-col gap-2 shrink-0">
                                    <span className="text-xs font-bold uppercase tracking-widest text-[#4a6741]">
                                        {item.source}
                                    </span>
                                    <time className="text-sm text-gray-500 font-medium">
                                        {item.date}
                                    </time>
                                </div>

                                {/* Content (Right on desktop) */}
                                <div className="flex-grow">
                                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-[#4a6741] transition-colors">
                                        {item.title}
                                    </h2>
                                    <p className="text-gray-600 font-light leading-relaxed mb-6">
                                        {item.excerpt}
                                    </p>
                                    <span className="inline-flex items-center text-sm font-semibold text-[#4a6741] uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                                        Read Full Story
                                        <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                            
                            {/* Make whole card clickable if URL exists, otherwise just visual */}
                            {item.url && (
                                <Link 
                                    href={item.url} 
                                    className="absolute inset-0 z-10" 
                                    aria-label={`Read more about ${item.title}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                />
                            )}
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
}
