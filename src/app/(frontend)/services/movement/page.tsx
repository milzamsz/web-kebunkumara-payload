import Image from "next/image";
import Link from "next/link";
import {
  fallbackMovements,
  fallbackPageContent,
  fallbackSiteSettings,
} from "@/lib/fallback-data";
import {
  getMediaUrl,
  getPublishedPageBySlug,
  getPublishedServicesByCategory,
  getSiteSettings,
} from "@/lib/frontend-cms";

type MovementData = (typeof fallbackMovements)[number];

export default async function MovementsPage() {
  const [movementPage, movementServices, siteSettings] = await Promise.all([
    getPublishedPageBySlug("movement", "Movements"),
    getPublishedServicesByCategory("movement", "Movements"),
    getSiteSettings("Movements"),
  ]);

  const fallbackMovementMap = new Map(
    fallbackMovements.map((movement) => [movement.slug, movement]),
  );

  const movements: MovementData[] = movementServices.length
    ? movementServices.map((service, index) => {
        const fallbackMovement = service?.slug
          ? fallbackMovementMap.get(service.slug)
          : null;

        return {
          slug: service?.slug ?? fallbackMovement?.slug ?? `movement-${index}`,
          title: service?.name ?? fallbackMovement?.title ?? "Movement",
          description:
            service?.shortDescription ??
            fallbackMovement?.description ??
            "Join us in building healthier urban ecosystems together.",
          image:
            getMediaUrl(service?.coverImage) ??
            fallbackMovement?.image ??
            fallbackPageContent.movement.backgroundImage,
        };
      })
    : fallbackMovements;

  const heroTitle =
    movementPage?.hero?.heading ?? fallbackPageContent.movement.heading;
  const heroDescription =
    movementPage?.hero?.subheading ?? fallbackPageContent.movement.subheading;
  const heroImage =
    getMediaUrl(movementPage?.hero?.backgroundImage) ??
    fallbackPageContent.movement.backgroundImage;
  const whatsappNumber =
    siteSettings?.whatsappNumber ?? fallbackSiteSettings.whatsappNumber;
  const ctaLabel =
    movementPage?.hero?.buttonText ?? fallbackPageContent.movement.buttonText;
  const ctaLink =
    movementPage?.hero?.buttonLink ?? fallbackPageContent.movement.buttonLink;

  return (
    <main>
      <section className="relative flex h-[55vh] min-h-[380px] items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt="Community composting"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-4 pt-20 text-center text-white sm:px-6">
          <h1 className="mb-6 text-4xl font-display font-bold leading-tight sm:text-5xl lg:text-6xl">
            {heroTitle}
          </h1>
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-gray-200">
            {heroDescription}
          </p>
        </div>
      </section>

      <section className="bg-[#F7F5EF] py-24">
        <div className="mx-auto max-w-7xl space-y-20 px-4 sm:px-6 lg:px-8">
          {movements.map((movement, index) => (
            <div
              key={movement.slug}
              className={`grid grid-cols-1 items-center gap-12 lg:grid-cols-2 ${
                index % 2 === 1 ? "lg:direction-rtl" : ""
              }`}
            >
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="group overflow-hidden rounded-3xl shadow-xl">
                  <Image
                    src={movement.image}
                    alt={movement.title}
                    width={600}
                    height={400}
                    className="h-[350px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <h2 className="mb-4 text-3xl font-display font-bold text-gray-900">
                  {movement.title}
                </h2>
                <p className="mb-8 text-lg leading-relaxed text-gray-600">
                  {movement.description}
                </p>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                    `I'm interested in joining the ${movement.title} movement.`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-[#4F772D] transition-all duration-300 hover:gap-3"
                >
                  Join the Movement
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#4F772D] py-24">
        <div className="mx-auto max-w-3xl px-4 text-center text-white sm:px-6">
          <span className="material-symbols-outlined mb-6 block text-5xl text-white/60">
            volunteer_activism
          </span>
          <h2 className="mb-6 text-3xl font-display font-bold sm:text-4xl">
            Start Your Own Movement?
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-white/90">
            We can help you set up community gardens, composting systems, or
            educational programs in your neighborhood.
          </p>
          <Link
            href={ctaLink}
            className="inline-flex items-center rounded-full bg-white px-8 py-3 font-bold text-[#4F772D] shadow-lg transition-colors hover:bg-gray-100"
          >
            {ctaLabel}
          </Link>
        </div>
      </section>
    </main>
  );
}
