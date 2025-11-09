import AboutContent from "./aboutcontent";

export default function AboutPage() {
  return (
    <section className="relative w-full min-h-screen flex flex-col md:flex-row items-center justify-between overflow-hidden bg-[color:var(--color-dark)]">
      {/* LEFT SIDE — TEXT (client-side animation inside AboutContent) */}
      <div className="relative z-10 flex-1 max-w-2xl px-6 md:px-12 py-20 md:py-32">
        <AboutContent />
      </div>

      {/* RIGHT SIDE — STATIC IMAGE */}
      <div className="relative flex-1 w-full h-[50vh] md:h-screen">
        <img
          src="/avatar.png" // replace with your actual image
          alt="Portrait"
          className="object-cover object-center md:object-right w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[color:var(--color-dark)]/90 via-[color:var(--color-dark)]/40 to-transparent" />
      </div>
    </section>
  );
}
