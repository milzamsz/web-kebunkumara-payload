import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { GardenSlider } from "@/components/GardenSlider";

import { WhyGardenSection } from "@/components/sections/WhyGardenSection";

export default function HomePage() {
  const hero = {
    title: "Growing Gardens <br />for Human‑Nature <br />Connection",
    subtitle: "Established in 2016, we aim to realize healthy, sustainable urban culture through greener habits and regenerative landscapes.",
  };

  const aboutExcerpt = {
    title: "We are a group of city kids thirsty for knowledge.",
    content: `
      <p>We help us lead better, meaningful lives. In 2016 we became
      familiar with permaculture and started learning to grow our own
      food. We failed many seeds, killed countless seedlings and
      injured too many worms.</p>
      <p>But this process taught us what years of our education could not
      achieve — that matching our nature with Nature births a sense of
      mindfulness like no other.</p>
    `,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCB2uuG1PEDv-hiZHVZ-_dZXVA_Ta3xrt1oHURcxC1nrZmXhlxCOaQOF5kakZ0zapz1Q-URFcOYtfZh697eRmxfiBVv3qQbxiOD3kl9De-DqmC6pKO1wTEnuW6ZsxoHKoaIkSWa6_nLFSGgA9nOMV8CxGbGUzggwqwyDSYreonbLQOwcIzkQg_tjBer8mZBvgHIW2KLiYb1VR254HOu2ZkNH9RqTCGn2M2Qj92fX18e9yjsboPPgOsEarn5qEJyADoZ_1Ab-FuiBY0p"
  };

  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.059293880467!2d106.61567107592928!3d-6.255918761249764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fb56b2161e11%3A0x2d1746618585970!2sScientia%20Square%20Park!5e0!3m2!1sen!2sid!4v1715421234567!5m2!1sen!2sid";
  return (
    <main>
      {/* ─── 1. HERO ────────────────────────────────────── */}
      <header className="relative h-[92svh] min-h-[640px] md:h-screen flex items-center justify-center overflow-hidden">
        {/* Video background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1920&auto=format&fit=crop"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="/videos/5692315-hd_1920_1080_30fps.mp4"
            type="video/mp4"
          />
        </video>

        {/* Fallback image (when video can't load) */}
        <Image
          src="https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1920&auto=format&fit=crop"
          alt="Indonesian Forest background"
          fill
          className="absolute inset-0 object-cover -z-10"
          priority
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />

        {/* Content */}
        <div className="relative z-10 text-center px-6 pt-20 max-w-4xl mx-auto">

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white leading-[1.1] mb-8 drop-shadow-lg">
            Growing Gardens <br />
            <span className="font-light italic font-display">for</span>{" "}
            Human‑Nature <br />
            Connection
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-4 font-light leading-relaxed drop-shadow-md font-sans">
            {hero?.subtitle ??
              "Established in 2016, we aim to realize healthy, sustainable urban culture through greener habits and regenerative landscapes."}
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </header>

      {/* ─── 2. WHY WE GARDEN (Interactive Section) ──── */}
      <WhyGardenSection />

      {/* ─── 2. ABOUT EXCERPT ───────────────────────────── */}
      <section className="py-20 md:py-32 relative overflow-hidden bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-16">
            {/* Image with decorative frame */}
            <div className="w-full md:w-1/2 relative">
              <div className="absolute -top-10 -left-10 w-20 h-20 bg-[var(--secondary)]/20 rounded-full blur-xl" />
              <Image
                src={aboutExcerpt.image}
                alt="Team gardening"
                width={800}
                height={600}
                className="rounded-[5px] shadow-2xl relative z-10 object-cover w-full h-[500px]"
              />
            </div>

            {/* Text */}
            <div className="w-full md:w-1/2 space-y-6">
              <h4 className="text-[var(--primary)] font-bold uppercase tracking-widest text-sm font-sans">
                About Us
              </h4>
              <h2 className="text-4xl md:text-5xl font-serif text-[var(--foreground)] leading-tight">
                {aboutExcerpt?.title ?? "We are a group of city kids thirsty for knowledge."}
              </h2>
              {aboutExcerpt?.content ? (
                <div className="text-[var(--muted-foreground)] text-lg leading-relaxed font-sans" dangerouslySetInnerHTML={{ __html: aboutExcerpt.content }} />
              ) : (
                <>
                  <p className="text-[var(--muted-foreground)] text-lg leading-relaxed font-sans">
                    We help us lead better, meaningful lives. In 2016 we became
                    familiar with permaculture and started learning to grow our own
                    food. We failed many seeds, killed countless seedlings and
                    injured too many worms.
                  </p>
                  <p className="text-[var(--muted-foreground)] text-lg leading-relaxed font-sans">
                    But this process taught us what years of our education could not
                    achieve — that matching our nature with Nature births a sense of
                    mindfulness like no other.
                  </p>
                </>
              )}
              <div className="pt-4">
                <Button variant="link" asChild className="p-0 h-auto text-[var(--primary)] font-bold text-base hover:no-underline group">
                  <Link href="/about">
                    Read Our Full Story
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 7. VISIT OUR GARDEN ────────────────────────── */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[#4F772D] font-medium tracking-wider uppercase text-sm mb-2 block font-sans">
            Connect with Nature
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            Visit Our Garden!
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-sans">
            Step into our sanctuary at Kebun Kumara SQP. Experience the
            regenerative landscape and reconnect with the earth in the heart of
            the city.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[35fr_65fr] gap-8 lg:gap-12 items-start">
          {/* Map */}
          <div className="w-full h-full min-h-[400px] lg:min-h-[500px] bg-white rounded-2xl shadow-xl overflow-hidden relative border border-gray-100">
            <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-[#4F772D]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span className="text-xs font-bold text-gray-800 font-sans">
                  Scientia Square Park
                </span>
              </div>
            </div>
            <iframe
              src={mapEmbedUrl ?? "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.059293880467!2d106.61567107592928!3d-6.255918761249764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fb56b2161e11%3A0x2d1746618585970!2sScientia%20Square%20Park!5e0!3m2!1sen!2sid!4v1715421234567!5m2!1sen!2sid"}
              className="w-full h-full absolute inset-0 grayscale-[0.2] hover:grayscale-0 transition-all duration-500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Kebun Kumara Location"
            />
          </div>

          {/* Gallery */}
          <div className="h-full">
            <GardenSlider />
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────── */}
      <section className="py-24 px-6 relative overflow-hidden group bg-[#355748]">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="font-serif text-5xl md:text-7xl text-white leading-tight mb-12">
            Ready to start <br />your <span className="italic text-[#A3B18A]">green journey?</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild size="lg" className="bg-[#A3B18A] hover:bg-white hover:text-[#344E41] text-white font-bold rounded-full px-12 py-6 h-auto tracking-widest uppercase text-sm">
              <Link href="/contact">
                Get in Touch
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border border-white/30 hover:bg-white/10 text-white font-bold rounded-full px-12 py-6 h-auto tracking-widest uppercase text-sm">
              <Link href="/services/educational-program">
                See Programs
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main >
  );
}
