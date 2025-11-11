import ParticleName from "../components/ParticleName";

export default function HomePage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      <div className="absolute inset-0">
        <ParticleName />
      </div>

      <div className="relative z-10 text-center">
        <h2 className="text-lg md:text-2xl text-gray-400 mt-8">
          Energy Systems & GIS Specialist
        </h2>
      </div>
    </main>
  );
}
