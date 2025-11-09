"use client";

import { motion } from "framer-motion";

export default function AboutContent() {
  return (
    <>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-heading font-bold mb-6 text-[color:var(--color-light)]"
      >
        About Me
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-[color:var(--color-light)] leading-relaxed mb-6 font-body"
      >
        I’m an <strong>Energy Systems & GIS Specialist</strong> focused on the
        integration of renewable energy modeling, spatial analytics, and visual
        communication.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-[color:var(--color-light)] leading-relaxed mb-6 font-body"
      >
        My expertise includes developing Python-based simulation models using{" "}
        <strong>Oemof</strong>, automating spatial workflows in{" "}
        <strong>ArcGIS Pro</strong> and <strong>QGIS</strong>, and creating
        detailed 3D visualizations to support renewable energy planning.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-[color:var(--color-light)] leading-relaxed font-body"
      >
        You can explore examples of my recent work on the{" "}
        <a
          href="/projects"
          className="text-[color:var(--color-accent)] hover:text-[color:var(--color-primary)] font-semibold transition-colors"
        >
          Projects
        </a>{" "}
        page.
      </motion.p>
    </>
  );
}
