"use client"; // 🔹 This makes it a client component

import { motion } from "framer-motion";

export default function HomeHero() {
  return (
    <div className="relative z-10 text-center px-4">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-5xl md:text-6xl font-heading font-bold mb-4 text-[color:var(--color-primary)]"
      >
        Energy Systems & GIS Specialist
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        className="text-lg md:text-xl max-w-2xl mx-auto font-body text-[color:var(--color-light)]"
      >
        Renewable Energy Modeling | Python & GIS Automation | 3D Visualization
      </motion.p>
    </div>
  );
}
