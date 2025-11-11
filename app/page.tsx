import ParticleName from "../components/ParticleName";
import HomeTagline from "../components/HomeTagline";

export default function HomePage() {
  return (
    <main className="relative w-full h-screen overflow-hidden">
      <ParticleName />
      <HomeTagline />

      {/* Accessible H1 for SEO */}
      <h1 className="sr-only">Arttu Virtanen — Energy Systems & GIS Specialist</h1>
    </main>
  );
}
