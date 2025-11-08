import HomeHero from "../components/HomeHero";

export default function Home() {
  return (
    <main className="relative flex items-center justify-center h-screen w-full overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[color:var(--color-dark)]/50" />

      {/* Animated Hero Section */}
      <HomeHero />
    </main>
  );
}
