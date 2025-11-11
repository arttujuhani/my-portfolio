import ParticleName from "../components/ParticleName";

export default function HomePage() {
  return (
    <main className="relative w-full h-screen overflow-hidden">
      <ParticleName />

      {/* overlay content: tagline only, keep z-index above canvas */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <p className="text-white text-sm md:text-lg opacity-90 pointer-events-none">
          Energy Systems & GIS Specialist
        </p>
      </div>

      {/* Accessible H1 for SEO, visually hidden so not duplicated */}
      <h1 className="sr-only">Arttu Virtanen — Energy Systems & GIS Specialist</h1>
    </main>
  );
}
