import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { GardenSlider } from "@/components/GardenSlider";
import { WhyGardenSection } from "@/components/sections/WhyGardenSection";
import { fallbackPageContent, fallbackSiteSettings } from "@/lib/fallback-data";
import {
  getMediaUrl,
  getPublishedPageBySlug,
  getSiteSettings,
} from "@/lib/frontend-cms";

export default async function HomePage() {
  const [homePage, siteSettings] = await Promise.all([
    getPublishedPageBySlug("home", "Home"),
    getSiteSettings("Home"),
  ]);

  const hero = {
    heading: homePage?.hero?.heading ?? fallbackPageContent.home.heading,
    subheading: homePage?.hero?.subheading ?? fallbackPageContent.home.subheading,
    backgroundImage:
      getMediaUrl(homePage?.hero?.backgroundImage) ??
      fallbackPageContent.home.backgroundImage,
    backgroundVideo:
      homePage?.hero?.backgroundVideo ?? fallbackPageContent.home.backgroundVideo,
  };

  const heroLines = hero.heading.split("\n");
  const mapEmbedUrl =
    siteSettings?.mapsEmbedUrl ?? fallbackSiteSettings.mapsEmbedUrl;

  const aboutExcerpt = {
    title: "We are a group of city kids thirsty for knowledge.",
    content: `
      <p>We help us lead better, meaningful lives. In 2016 we became
      familiar with permaculture and started learning to grow our own
      food. We failed many seeds, killed countless seedlings and
      injured too many worms.</p>
      <p>But this process taught us what years of our education could not
      achieve - that matching our nature with Nature births a sense of
      mindfulness like no other.</p>
    `,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCB2uuG1PEDv-hiZHVZ-_dZXVA_Ta3xrt1oHURcxC1nrZmXhlxCOaQOF5kakZ0zapz1Q-URFcOYtfZh697eRmxfiBVv3qQbxiOD3kl9De-DqmC6pKO1wTEnuW6ZsxoHKoaIkSWa6_nLFSGgA9nOMV8CxGbGUzggwqwyDSYreonbLQOwcIzkQg_tjBer8mZBvgHIW2KLiYb1VR254HOu2ZkNH9RqTCGn2M2Qj92fX18e9yjsboPPgOsEarn5qEJyADoZ_1Ab-FuiBY0p",
  };

  return (
    <main>
      <header className="relative flex h-[92svh] min-h-[640px] items-center justify-center overflow-hidden md:h-screen">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={hero.backgroundImage}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={hero.backgroundVideo} type="video/mp4" />
        </video>

        <Image
          src={hero.backgroundImage}
          alt="Indonesian Forest background"
          fill
          className="absolute inset-0 -z-10 object-cover"
          priority
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 pt-20 text-center">
          <h1 className="mb-8 text-5xl font-serif font-bold leading-[1.1] text-white drop-shadow-lg md:text-7xl lg:text-8xl">
            {heroLines.map((line, index) => (
              <span
                key={`${line}-${index}`}
                className={`block ${
                  index === 1 ? "font-display font-light italic" : ""
                }`}
              >
                {line}
              </span>
            ))}
          </h1>
          <p className="mx-auto mb-4 max-w-2xl font-sans text-lg font-light leading-relaxed text-white/90 drop-shadow-md md:text-xl">
            {hero.subheading}
          </p>
        </div>

        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
          <svg
            className="h-5 w-5 text-white/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </header>

      <WhyGardenSection />

      <section className="relative overflow-hidden bg-[var(--background)] py-20 md:py-32">
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center gap-16 md:flex-row">
            <div className="relative w-full md:w-1/2">
              <div className="absolute -left-10 -top-10 h-20 w-20 rounded-full bg-[var(--secondary)]/20 blur-xl" />
              <Image
                src={aboutExcerpt.image}
                alt="Team gardening"
                width={800}
                height={600}
                className="relative z-10 h-[500px] w-full rounded-[5px] object-cover shadow-2xl"
              />
            </div>

            <div className="w-full space-y-6 md:w-1/2">
              <h4 className="font-sans text-sm font-bold uppercase tracking-widest text-[var(--primary)]">
                About Us
              </h4>
              <h2 className="text-4xl font-serif leading-tight text-[var(--foreground)] md:text-5xl">
                {aboutExcerpt.title}
              </h2>
              <div
                className="font-sans text-lg leading-relaxed text-[var(--muted-foreground)]"
                dangerouslySetInnerHTML={{ __html: aboutExcerpt.content }}
              />
              <div className="pt-4">
                <Button
                  variant="link"
                  asChild
                  className="group h-auto p-0 text-base font-bold text-[var(--primary)] hover:no-underline"
                >
                  <Link href="/about">
                    Read Our Full Story
                    <span className="ml-2 transition-transform group-hover:translate-x-1">
                      {"->"}
                    </span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mb-12 text-center">
          <span className="mb-2 block font-sans text-sm font-medium uppercase tracking-wider text-[#4F772D]">
            Connect with Nature
          </span>
          <h2 className="mb-4 text-4xl font-serif font-bold text-gray-900 md:text-5xl">
            Visit Our Garden!
          </h2>
          <p className="mx-auto max-w-2xl font-sans text-lg text-gray-600">
            Step into our sanctuary at Kebun Kumara SQP. Experience the
            regenerative landscape and reconnect with the earth in the heart of
            the city.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[35fr_65fr] lg:gap-12">
          <div className="relative h-full min-h-[400px] w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl lg:min-h-[500px]">
            <div className="absolute left-4 top-4 z-10 rounded-full bg-white/90 px-4 py-2 shadow-sm backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <svg
                  className="h-4 w-4 text-[#4F772D]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span className="font-sans text-xs font-bold text-gray-800">
                  Scientia Square Park
                </span>
              </div>
            </div>
            <iframe
              src={mapEmbedUrl}
              className="absolute inset-0 h-full w-full grayscale-[0.2] transition-all duration-500 hover:grayscale-0"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Kebun Kumara Location"
            />
          </div>

          <div className="h-full">
            <GardenSlider />
          </div>
        </div>
      </section>

      <section className="group relative overflow-hidden bg-[#355748] px-6 py-24">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/5 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h2 className="mb-12 font-serif text-5xl leading-tight text-white md:text-7xl">
            Ready to start <br />
            your <span className="italic text-[#A3B18A]">green journey?</span>
          </h2>
          <div className="flex flex-col justify-center gap-6 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-auto rounded-full bg-[#A3B18A] px-12 py-6 text-sm font-bold uppercase tracking-widest text-white hover:bg-white hover:text-[#344E41]"
            >
              <Link href="/contact">Get in Touch</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-auto rounded-full border border-white/30 bg-transparent px-12 py-6 text-sm font-bold uppercase tracking-widest text-white hover:bg-white/10"
            >
              <Link href="/services/educational-program">See Programs</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
