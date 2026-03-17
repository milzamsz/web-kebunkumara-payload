import type { Metadata } from "next";
import Image from "next/image";
import {
    fallbackTimeline,
    fallbackTeamMembers,
    fallbackValues,
} from "@/lib/fallback-data";

export const metadata: Metadata = {
    title: "About Us — Kebun Kumara",
    description: "Sekelompok anak kota yang mewujudkan budaya perkotaan sehat dan berkelanjutan melalui kebiasaan hijau dan lanskap regeneratif sejak 2016.",
    openGraph: {
        title: "About Us — Kebun Kumara",
        description: "Sekelompok anak kota yang mewujudkan budaya perkotaan sehat dan berkelanjutan sejak 2016.",
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

export default function AboutPage() {
    const timeline = fallbackTimeline;
    const values = fallbackValues;
    const teamMembers = fallbackTeamMembers as TeamMember[];
    const valueCardImages = [
        "/images/generated/urban-garden-hero.png",
        "/images/generated/landscaping-project.png",
        "/images/generated/garden-tools-soil.png",
        "/images/generated/tropical-plant.png",
    ];

    const hero = {
        title: "Sekelompok Anak Kota Haus Pengetahuan",
        subtitle: "Mewujudkan budaya perkotaan yang sehat dan berkelanjutan melalui kebiasaan hijau dan lanskap regeneratif, sejak 2016."
    };

    const cta = {
        title: "Ayo Berkolaborasi!",
        description: "Apakah kamu memiliki proyek, event, atau ide yang ingin kami bantu wujudkan? Kami senang berkolaborasi dengan siapa saja yang memiliki semangat hijau."
    };
    return (
        <main>
            {/* ─── Hero ─────────────────────────────────────────── */}
            <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1920&h=800&fit=crop"
                        alt="About Kebun Kumara"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
                </div>
                <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-4 sm:px-6 pt-20">

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
                        {hero?.title ? (
                            <span dangerouslySetInnerHTML={{ __html: hero.title.replace(/\n/g, '<br />') }} />
                        ) : (
                            <>Sekelompok Anak Kota{" "}
                                <span className="italic text-[#90A955]">Haus Pengetahuan</span></>
                        )}
                    </h1>
                    <p className="text-lg text-gray-200 max-w-xl mx-auto leading-relaxed">
                        {hero?.subtitle ?? "Mewujudkan budaya perkotaan yang sehat dan berkelanjutan melalui kebiasaan hijau dan lanskap regeneratif, sejak 2016."}
                    </p>
                </div>
            </section>

            {/* ─── Story ─────────────────────────────────────────── */}
            <section className="py-24 bg-[#F7F5EF]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <div className="overflow-hidden rounded-3xl shadow-2xl group">
                                <Image
                                    src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop"
                                    alt="Kebun Kumara origins"
                                    width={800}
                                    height={600}
                                    className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </div>

                        <div>
                            <span className="text-[#4F772D] font-medium tracking-wider uppercase text-sm mb-3 block">
                                Cerita Kami
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-6 leading-tight">
                                Dari Benih yang Gagal,{" "}
                                <span className="text-[#4F772D] italic">Tumbuh Kesadaran</span>
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                                Kami adalah sekelompok anak kota yang haus akan pengetahuan holistik
                                untuk membantu kami menjalani kehidupan yang lebih baik dan bermakna.
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Pada tahun 2016 kami mengenal permaculture dan mulai belajar menanam
                                makanan sendiri. Kami gagal menanam banyak benih, membunuh bibit yang
                                tak terhitung dan melukai terlalu banyak cacing.
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Tapi proses ini mengajarkan kami apa yang bertahun-tahun pendidikan tidak
                                bisa capai — bahwa menyesuaikan alam kita dengan Alam melahirkan kesadaran
                                yang tiada duanya.
                            </p>
                            <p className="text-gray-600 leading-relaxed font-medium">
                                Saat itulah kami memutuskan untuk membagikan proses belajar ini kepada
                                orang-orang di sekitar kami, dengan harapan menumbuhkan budaya perkotaan
                                yang lebih sehat dan berkelanjutan.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Values ────────────────────────────────────────── */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-[#4F772D] font-medium tracking-wider uppercase text-sm mb-3 block">
                            Nilai-Nilai Kami
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, i) => (
                            <div
                                key={i}
                                className="group relative overflow-hidden rounded-2xl bg-stone-200 aspect-[3/4] ring-1 ring-black/10 shadow-sm hover:shadow-xl transition-all duration-500"
                            >
                                <Image
                                    src={valueCardImages[i % valueCardImages.length]}
                                    alt={value.title}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    className="object-cover scale-[1.02] group-hover:scale-[1.06] transition-transform duration-700"
                                    priority={i === 0}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/20" />
                                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
                                        {value.title}
                                    </h3>
                                    <p className="text-white/90 text-sm leading-relaxed max-w-[34ch]">
                                        {value.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Timeline ──────────────────────────────────────── */}
            <section className="py-24 bg-[#1A1C18] text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-[#90A955] font-medium tracking-wider uppercase text-sm mb-3 block">
                            Perjalanan Kami
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-display font-bold">
                            Dari 2016 Hingga Sekarang
                        </h2>
                    </div>

                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-[#4F772D]/40 -translate-x-1/2" />

                        <div className="space-y-12">
                            {timeline.map((item, i) => (
                                <div
                                    key={i}
                                    className={`relative flex items-start gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                        }`}
                                >
                                    {/* Timeline dot */}
                                    <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#4F772D] border-4 border-[#1A1C18] shadow-lg z-10" />

                                    <div className={`flex-1 pl-20 md:pl-0 ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                                        <span className="inline-block px-3 py-1 text-xs font-bold bg-[#4F772D] rounded-full mb-3">
                                            {item.year}
                                        </span>
                                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                        <p className="text-gray-400 leading-relaxed">{item.description}</p>
                                    </div>

                                    <div className="flex-1 hidden md:block" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Team ──────────────────────────────────────────── */}
            <section className="py-24 bg-[#F7F5EF]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-[#4F772D] font-medium tracking-wider uppercase text-sm mb-3 block">
                            Tim Kami
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">
                            14 Orang, Satu Misi
                        </h2>
                        <p className="text-gray-600 max-w-xl mx-auto">
                            Tim multidisiplin yang bersemangat tentang permaculture, edukasi, dan desain berkelanjutan.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                        {teamMembers.map((member, i) => (
                            <div
                                key={i}
                                className="group text-center p-4 bg-white rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#4F772D]/20 to-[#90A955]/20 flex items-center justify-center mb-3 group-hover:from-[#4F772D] group-hover:to-[#90A955] transition-all duration-500 overflow-hidden">
                                    {member.photo ? (
                                        <Image src={member.photo} alt={member.name} width={64} height={64} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-xl font-bold text-[#4F772D] group-hover:text-white transition-colors duration-500">
                                            {member.name.charAt(0)}
                                        </span>
                                    )}
                                </div>
                                <h4 className="text-sm font-semibold text-gray-900 leading-tight">{member.name}</h4>
                                <p className="text-xs text-gray-500 mt-1">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── CTA ───────────────────────────────────────────── */}
            <section className="py-24 bg-[#4F772D]">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center text-white">
                    <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6">
                        {cta?.title ?? "Ayo Berkolaborasi!"}
                    </h2>
                    <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                        {cta?.description ?? "Apakah kamu memiliki proyek, event, atau ide yang ingin kami bantu wujudkan? Kami senang berkolaborasi dengan siapa saja yang memiliki semangat hijau."}
                    </p>
                    <a
                        href="https://wa.me/6281510986060"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-[#4F772D] font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Hubungi Kami
                    </a>
                </div>
            </section>
        </main>
    );
}
