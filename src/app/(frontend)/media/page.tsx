import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

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

const mediaCardImages = [
    "/images/generated/landscaping-team.png",
    "/images/generated/urban-garden-hero.png",
    "/images/generated/landscaping-project.png",
    "/images/generated/garden-tools-soil.png",
];

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
                    {mediaItems.map((item, index) => {
                        const portal =
                            item.url ? new URL(item.url).hostname.replace(/^www\./, "") : null;
                        return (
                        <article
                            key={index}
                            className="group bg-[#E9E5DA] border border-[#2D3A26]/10 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-[420px_1fr] gap-8 md:gap-12 p-6 md:p-10 items-start">
                                <div>
                                    <div className="relative w-full aspect-[4/3] bg-stone-200 overflow-hidden">
                                        <Image
                                            src={mediaCardImages[index % mediaCardImages.length]}
                                            alt={item.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 420px"
                                            className="object-cover"
                                            priority={index === 0}
                                        />
                                    </div>
                                    <time className="mt-3 block text-sm italic text-gray-600">
                                        {item.date}
                                    </time>
                                </div>

                                <div className="text-gray-900">
                                    <h2 className="font-serif text-2xl md:text-3xl font-bold tracking-tight mb-5">
                                        {item.title}
                                    </h2>
                                    <div className="space-y-5 text-gray-800 leading-relaxed">
                                        <p>{item.excerpt}</p>
                                    </div>
                                    {item.url && (
                                        <div className="pt-6">
                                            <Link
                                                href={item.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-sm font-semibold text-[#2D3A26] underline decoration-[#2D3A26]/30 underline-offset-4 hover:decoration-[#2D3A26]"
                                                aria-label={`Open ${portal ?? "news portal"} in a new tab`}
                                            >
                                                {portal ?? "Open article"}
                                                <span className="material-symbols-outlined text-base leading-none">
                                                    open_in_new
                                                </span>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </article>
                    )})}
                </div>
            </section>
        </main>
    );
}
