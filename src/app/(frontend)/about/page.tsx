import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  fallbackPageContent,
  fallbackSiteSettings,
  fallbackTeamMembers,
  fallbackTimeline,
  fallbackValues,
} from "@/lib/fallback-data";
import {
  getMediaUrl,
  getPublishedPageBySlug,
  getSiteSettings,
} from "@/lib/frontend-cms";

export const metadata: Metadata = {
  title: "About Us - Kebun Kumara",
  description:
    "Sekelompok anak kota yang mewujudkan budaya perkotaan sehat dan berkelanjutan melalui kebiasaan hijau dan lanskap regeneratif sejak 2016.",
  openGraph: {
    title: "About Us - Kebun Kumara",
    description:
      "Sekelompok anak kota yang mewujudkan budaya perkotaan sehat dan berkelanjutan sejak 2016.",
    url: "https://kebunkumara.id/about",
    siteName: "Kebun Kumara",
    type: "website",
    locale: "id_ID",
  },
};

type TeamMember = {
  name: string;
  role: string;
  photo?: string | null;
};

export default async function AboutPage() {
  const [aboutPage, siteSettings] = await Promise.all([
    getPublishedPageBySlug("about", "About"),
    getSiteSettings("About"),
  ]);

  const timeline = fallbackTimeline;
  const values = fallbackValues;
  const teamMembers = fallbackTeamMembers as TeamMember[];
  const heroHeading =
    aboutPage?.hero?.heading ?? fallbackPageContent.about.heading;
  const heroSubtitle =
    aboutPage?.hero?.subheading ?? fallbackPageContent.about.subheading;
  const heroImage =
    getMediaUrl(aboutPage?.hero?.backgroundImage) ??
    fallbackPageContent.about.backgroundImage;
  const whatsappNumber =
    siteSettings?.whatsappNumber ?? fallbackSiteSettings.whatsappNumber;
  const ctaButtonLabel =
    aboutPage?.hero?.buttonText ?? fallbackPageContent.about.buttonText;
  const ctaButtonLink =
    aboutPage?.hero?.buttonLink ??
    fallbackPageContent.about.buttonLink ??
    `https://wa.me/${whatsappNumber}`;
  const heroLines = heroHeading.split("\n");
  const valueCardImages = [
    "/images/generated/urban-garden-hero.png",
    "/images/generated/landscaping-project.png",
    "/images/generated/garden-tools-soil.png",
    "/images/generated/tropical-plant.png",
  ];

  return (
    <main>
      <section className="relative flex h-[60vh] min-h-[400px] items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt="About Kebun Kumara"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-4 pt-20 text-center text-white sm:px-6">
          <h1 className="mb-6 text-4xl font-display font-bold leading-tight sm:text-5xl lg:text-6xl">
            {heroLines.map((line, index) => (
              <span
                key={`${line}-${index}`}
                className={`block ${index === heroLines.length - 1 ? "italic text-[#90A955]" : ""}`}
              >
                {line}
              </span>
            ))}
          </h1>
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-gray-200">
            {heroSubtitle}
          </p>
        </div>
      </section>

      <section className="bg-[#F7F5EF] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div className="relative">
              <div className="group overflow-hidden rounded-3xl shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop"
                  alt="Kebun Kumara origins"
                  width={800}
                  height={600}
                  className="h-[500px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            <div>
              <span className="mb-3 block text-sm font-medium uppercase tracking-wider text-[#4F772D]">
                Cerita Kami
              </span>
              <h2 className="mb-6 text-3xl font-display font-bold leading-tight text-gray-900 sm:text-4xl">
                Dari Benih yang Gagal,{" "}
                <span className="italic text-[#4F772D]">Tumbuh Kesadaran</span>
              </h2>
              <p className="mb-6 text-lg leading-relaxed text-gray-600">
                Kami adalah sekelompok anak kota yang haus akan pengetahuan
                holistik untuk membantu kami menjalani kehidupan yang lebih baik
                dan bermakna.
              </p>
              <p className="mb-6 leading-relaxed text-gray-600">
                Pada tahun 2016 kami mengenal permaculture dan mulai belajar
                menanam makanan sendiri. Kami gagal menanam banyak benih,
                membunuh bibit yang tak terhitung dan melukai terlalu banyak
                cacing.
              </p>
              <p className="mb-6 leading-relaxed text-gray-600">
                Tapi proses ini mengajarkan kami apa yang bertahun-tahun
                pendidikan tidak bisa capai - bahwa menyesuaikan alam kita
                dengan Alam melahirkan kesadaran yang tiada duanya.
              </p>
              <p className="font-medium leading-relaxed text-gray-600">
                Saat itulah kami memutuskan untuk membagikan proses belajar ini
                kepada orang-orang di sekitar kami, dengan harapan menumbuhkan
                budaya perkotaan yang lebih sehat dan berkelanjutan.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="mb-3 block text-sm font-medium uppercase tracking-wider text-[#4F772D]">
              Nilai-Nilai Kami
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <div
                key={index}
                className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-stone-200 ring-1 ring-black/10 shadow-sm transition-all duration-500 hover:shadow-xl"
              >
                <Image
                  src={valueCardImages[index % valueCardImages.length]}
                  alt={value.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="scale-[1.02] object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/20" />
                <div className="absolute inset-0 flex flex-col justify-between p-6">
                  <h3 className="font-display text-2xl font-bold leading-tight text-white sm:text-3xl">
                    {value.title}
                  </h3>
                  <p className="max-w-[34ch] text-sm leading-relaxed text-white/90">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1A1C18] py-24 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="mb-3 block text-sm font-medium uppercase tracking-wider text-[#90A955]">
              Perjalanan Kami
            </span>
            <h2 className="text-3xl font-display font-bold sm:text-4xl">
              Dari 2016 Hingga Sekarang
            </h2>
          </div>

          <div className="relative">
            <div className="absolute bottom-0 left-8 top-0 w-px -translate-x-1/2 bg-[#4F772D]/40 md:left-1/2" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`relative flex items-start gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="absolute left-8 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-[#1A1C18] bg-[#4F772D] shadow-lg md:left-1/2" />

                  <div
                    className={`flex-1 pl-20 md:pl-0 ${
                      index % 2 === 0
                        ? "md:pr-16 md:text-right"
                        : "md:pl-16"
                    }`}
                  >
                    <span className="mb-3 inline-block rounded-full bg-[#4F772D] px-3 py-1 text-xs font-bold">
                      {item.year}
                    </span>
                    <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
                    <p className="leading-relaxed text-gray-400">
                      {item.description}
                    </p>
                  </div>

                  <div className="hidden flex-1 md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F7F5EF] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="mb-3 block text-sm font-medium uppercase tracking-wider text-[#4F772D]">
              Tim Kami
            </span>
            <h2 className="mb-4 text-3xl font-display font-bold text-gray-900 sm:text-4xl">
              14 Orang, Satu Misi
            </h2>
            <p className="mx-auto max-w-xl text-gray-600">
              Tim multidisiplin yang bersemangat tentang permaculture, edukasi,
              dan desain berkelanjutan.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="group rounded-2xl bg-white p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-3 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#4F772D]/20 to-[#90A955]/20 transition-all duration-500 group-hover:from-[#4F772D] group-hover:to-[#90A955] mx-auto">
                  {member.photo ? (
                    <Image
                      src={member.photo}
                      alt={member.name}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-xl font-bold text-[#4F772D] transition-colors duration-500 group-hover:text-white">
                      {member.name.charAt(0)}
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-semibold leading-tight text-gray-900">
                  {member.name}
                </h4>
                <p className="mt-1 text-xs text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#4F772D] py-24">
        <div className="mx-auto max-w-3xl px-4 text-center text-white sm:px-6">
          <h2 className="mb-6 text-3xl font-display font-bold sm:text-4xl">
            Ayo Berkolaborasi!
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-white/80">
            Apakah kamu memiliki proyek, event, atau ide yang ingin kami bantu
            wujudkan? Kami senang berkolaborasi dengan siapa saja yang memiliki
            semangat hijau.
          </p>
          <Link
            href={ctaButtonLink}
            target={ctaButtonLink.startsWith("http") ? "_blank" : undefined}
            rel={ctaButtonLink.startsWith("http") ? "noopener noreferrer" : undefined}
            className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-lg font-bold text-[#4F772D] transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {ctaButtonLabel}
          </Link>
        </div>
      </section>
    </main>
  );
}
