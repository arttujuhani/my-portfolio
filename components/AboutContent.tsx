"use client";

import { motion } from "framer-motion";

export default function AboutContent() {
  return (
    <>
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-heading font-bold mb-6 text-[color:var(--color-primary)]"
      >
        About Me
      </motion.h1>

      {/* Intro Paragraph */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-[color:var(--color-light)] leading-relaxed mb-6 font-body"
      >
        I'm an <span className="text-[color:var(--color-primary)] font-semibold">Energy Systems & GIS Specialist</span> 
        with experience in <span className="text-[color:var(--color-accent)] font-semibold">renewable energy modeling</span>, 
        <span className="text-[color:var(--color-accent)] font-semibold"> GIS automation</span>, and 
        <span className="text-[color:var(--color-accent)] font-semibold"> 3D visualization</span>.
      </motion.p>

      {/* Emoji / Icons Highlights */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="space-y-3 mb-6"
      >
        <p>💡 Optimizing energy systems with Python & Oemof</p>
        <p>🗺️ Automating GIS workflows in ArcGIS Pro & QGIS</p>
        <p>🎨 Creating 3D visualizations in Blender</p>
      </motion.div>

      {/* Callout Boxes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="space-y-4 mb-8"
      >
        <div className="bg-[color:var(--color-dark)] border-l-4 border-[color:var(--color-primary)] p-4 rounded-md">
          <p className="font-body text-[color:var(--color-light)]">
            I integrate <span className="text-[color:var(--color-primary)] font-semibold">energy system modeling</span> with GIS workflows to help renewable projects reach optimal performance.
          </p>
        </div>
        <div className="bg-[color:var(--color-dark)] border-l-4 border-[color:var(--color-primary)] p-4 rounded-md">
          <p className="font-body text-[color:var(--color-light)]">
            I build <span className="text-[color:var(--color-accent)] font-semibold">Python tools and simulations</span> to optimize energy systems and provide actionable insights.
          </p>
        </div>
        <div className="bg-[color:var(--color-dark)] border-l-4 border-[color:var(--color-primary)] p-4 rounded-md">
          <p className="font-body text-[color:var(--color-light)]">
            I visualize projects using <span className="text-[color:var(--color-accent)] font-semibold">3D modeling</span> for clearer presentations and planning.
          </p>
        </div>
      </motion.div>

      {/* Inline Links */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="text-[color:var(--color-light)] leading-relaxed font-body"
      >
        Check out my <a href="/projects" className="text-[color:var(--color-accent)] hover:text-[color:var(--color-primary)] font-semibold transition-colors">projects</a> 
        to see my work, or <a href="/contact" className="text-[color:var(--color-accent)] hover:text-[color:var(--color-primary)] font-semibold transition-colors">get in touch</a>!
      </motion.p>
    </>
  );
}
