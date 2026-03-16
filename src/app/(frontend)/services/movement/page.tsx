
import Image from "next/image";
import Link from "next/link";
import { fallbackMovements } from "@/lib/fallback-data";

export default function MovementsPage() {
  const movements = fallbackMovements;

  return (
    <main>
      {/* ─── Hero ─────────────────────────────────────────── */}
      <section className="relative h-[55vh] min-h-[380px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?w=2000&auto=format&fit=crop"
            alt="Community composting"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
        <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-4 sm:px-6 pt-20">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
            Our Movements
          </h1>
          <p className="text-lg text-gray-200 max-w-xl mx-auto leading-relaxed">
            Join us in creating a more sustainable future through collective action.
          </p>
        </div>
      </section>

      {/* ─── Movements List ───────────────────────────────── */}
      <section className="py-24 bg-[#F7F5EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {movements.map((movement, i) => (
            <div
              key={i}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                i % 2 === 1 ? "lg:direction-rtl" : ""
              }`}
            >
              <div className={`${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="overflow-hidden rounded-3xl shadow-xl group">
                  {movement.image && (
                    <Image
                      src={movement.image}
                      alt={movement.title}
                      width={600}
                      height={400}
                      className="w-full h-[350px] object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  )}
                </div>
              </div>

              <div className={`${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
                  {movement.title}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                  {movement.description}
                </p>
                <a
                  href={`https://wa.me/6281510986060?text=I'm interested in joining the ${movement.title} movement.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#4F772D] font-semibold hover:gap-3 transition-all duration-300"
                >
                  Join the Movement
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA ───────────────────────────────────────────── */}
      <section className="py-24 bg-[#4F772D]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center text-white">
          <span className="material-symbols-outlined text-5xl text-white/60 mb-6 block">
            volunteer_activism
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6">
            Start Your Own Movement?
          </h2>
          <p className="text-lg text-white/90 mb-8 leading-relaxed">
            We can help you set up community gardens, composting systems, or educational programs in your neighborhood.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center bg-white text-[#4F772D] px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}
