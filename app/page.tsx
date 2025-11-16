import ParticleName from "../components/ParticleName";
import HomeTagline from "../components/HomeTagline";
import AboutSection from "./about/page";
import ProjectsSection from "./projects/page";
import ContactSection from "./contact/page";

export default function HomePage() {
  return (
    // Removed pt-[64px] so the content starts at the very top of the viewport.
    <main className="w-full min-h-screen"> 
      
      {/* Hero / Landing Section 
        This section retains h-screen to fill the viewport and will now sit 
        behind the fixed, transparent navbar.
      */}
      <section
        id="home"
        className="relative h-screen w-full overflow-hidden" 
      >
        <div className="w-full h-full">
          {/* ParticleName only renders the PIXI canvas */}
          <ParticleName />
        </div>

        <HomeTagline />
      </section>

      {/* Other sections - The interior sections still have vertical padding (py-16) 
          to ensure their content is not hidden by the fixed navbar. 
      */}
      <section id="about" className="py-16 min-h-screen">
        <AboutSection />
      </section>

      <section id="projects" className="py-16 min-h-screen">
        <ProjectsSection />
      </section>

      <section id="contact" className="py-16 min-h-screen">
        <ContactSection />
      </section>
    </main>
  );
}