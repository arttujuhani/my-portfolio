import ContactButton from "./button";

export default function ContactPage() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-20 text-center">
      <h1 className="text-4xl font-heading font-bold mb-6 text-[color:var(--color-primary)]">
        Get in Touch
      </h1>
      <p className="text-[color:var(--color-light)] mb-10 font-body text-lg md:text-base leading-relaxed">
        I’m always happy to connect about renewable energy modeling, GIS automation, or 3D visualization projects.
        Feel free to reach out — I’ll get back to you as soon as possible.
      </p>

      {/* Client-side button component */}
      <ContactButton />
    </section>
  );
}
