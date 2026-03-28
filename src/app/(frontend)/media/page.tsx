import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { fallbackPageContent } from "@/lib/fallback-data";
import { getPublishedPageBySlug } from "@/lib/frontend-cms";

export const metadata: Metadata = {
  title: "In The Media - Kebun Kumara",
  description:
    "Features, stories, and conversations about Kebun Kumara's journey in urban farming and sustainable gardening.",
  openGraph: {
    title: "In The Media - Kebun Kumara",
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
    excerpt:
      "Fenomena urban farming atau berkebun di ruang terbatas menjadi semakin meningkat akibat adanya wabah Covid-19 yang membatasi mobilitas masyarakat. Urban farming juga seakan menjadi pelipur lara warga Ibu Kota yang tidak dapat berlibur ke luar kota dan memanjakan mata.",
    source: "Media Coverage",
    url: "https://mediaindonesia.com/humaniora/347571/menjadikan-berkebun-sebuah-norma-bukan-tren",
  },
  {
    title: "Bertemu di Istana Bogor, Petani Wanita ini bikin Jokowi Senang",
    date: "Sabtu, 28 Oktober 2017",
    excerpt:
      "Pemuda-pemudi kreatif berkumpul di Istana Bogor dan berdialog dengan Presiden Jokowi. Salah seorang pemudi curhat kalau zaman sekarang jarang ditemui anak-anak yang bercita-cita menjadi petani.",
    source: "News",
    url: "https://makassar.tribunnews.com/2017/11/01/cantik-lulusan-luar-negeri-tapi-pekerjaan-wanita-cantik-dekat-jokowi-ini-tak-disangka",
  },
  {
    title: "Cerita Soraya Cassandra Merawat Alam Melalui Kebun Kumara",
    date: "Sabtu, 27 September 2020",
    excerpt:
      "Beberapa orang memanfaatkan masa pandemik untuk lebih dekat dengan dirinya. Agaknya, itu yang dilakukan untuk bertahan saat swakarantina mandiri. Mereka beralih mengeksplorasi berbagai hal dari rumah. Mulai dari dekorasi kamar, memasak, melukis, hingga hobi yang sekarang menjadi tren seperti berkebun.",
    source: "Interview",
    url: "https://www.idntimes.com/life/inspiration/fajar-laksmita-dewi-1/cerita-soraya-cassandra-merawat-alam",
  },
  {
    title:
      "Kebun Kumara, Misi Siti Soraya Cassandra Bantu Orang Kota Berinteraksi Dengan Alam",
    date: "Kamis, 10 Desember 2020",
    excerpt:
      "Berawal dari keresahan pribadi tentang isu lingkungan serta keinginan memiliki bisnis yang sesuai passion sekaligus memberi manfaat, Siti Soraya Cassandra alias Sandra akhirnya membuka Kebun Kumara, ruang hijau sarana belajar masyarakat sekaligus mendekatkan masyarakat kota dengan alam.",
    source: "Feature",
    url: "https://goodlife.id/kebun-kumara-misi-siti-soraya-cassandra-bantu-orang-kota-berinteraksi-dengan-alam/",
  },
  {
    title: "Atasi Keterbatasan Lahan dengan Teknik Herb Spiral",
    date: "Minggu, 6 Desember 2020",
    excerpt:
      "Kebun Kumara di Situ Gintung, Tangerang Selatan, Banten, ini berdiri sejak 2016. Kumara dapat diartikan anak atau generasi muda. Educational Program and Children Learning Manager Kebun Kumara Sarah Adipayanti menyebut Kebun Kumara sebagai kebun belajar.",
    source: "Tips & Tricks",
    url: "https://www.jawapos.com/hobi-kesenangan/01301717/atasi-keterbatasan-lahan-dengan-teknik-herb-spiral",
  },
];

export default async function MediaPage() {
  const mediaPage = await getPublishedPageBySlug("media", "Media");
  const heroTitle =
    mediaPage?.hero?.heading ?? fallbackPageContent.media.heading;
  const heroDescription =
    mediaPage?.hero?.subheading ?? fallbackPageContent.media.subheading;

  return (
    <main className="min-h-screen bg-[#FAF9F6] pt-20">
      <header className="relative overflow-hidden px-4 pt-12 pb-20 sm:px-6 md:pt-28 md:pb-32 lg:px-8">
        <div className="absolute right-0 top-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-[#4a6741]/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-80 w-80 rounded-full bg-[#4a6741]/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl text-center">
          <h1 className="mb-6 font-serif text-5xl font-bold tracking-tight text-gray-900 md:text-7xl">
            {heroTitle}
          </h1>
          <p className="mx-auto max-w-2xl text-lg font-light italic text-gray-500">
            {heroDescription}
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-4 pb-32 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {mediaItems.map((item, index) => {
            const portal = item.url
              ? new URL(item.url).hostname.replace(/^www\./, "")
              : null;

            return (
              <article
                key={index}
                className="group overflow-hidden rounded-lg border border-[#2D3A26]/10 bg-[#E9E5DA] shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <div className="grid grid-cols-1 items-start gap-8 p-6 md:grid-cols-[420px_1fr] md:gap-12 md:p-10">
                  <div>
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-200">
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
                    <h2 className="mb-5 font-serif text-2xl font-bold tracking-tight md:text-3xl">
                      {item.title}
                    </h2>
                    <div className="space-y-5 leading-relaxed text-gray-800">
                      <p>{item.excerpt}</p>
                    </div>
                    {item.url ? (
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
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
