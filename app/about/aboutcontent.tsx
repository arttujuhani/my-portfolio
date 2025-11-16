"use client";

// Import necessary hooks from framer-motion
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from 'react'; // Removed useState

// --- CONTENT VARIANTS (kept for AboutContent) ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger animation for paragraphs and skills
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5} },
};

const skillBadges = [
  "Renewable Energy Modeling", "Oemof/PyPSA", "GIS Automation (Python)", 
  "ArcGIS Pro/QGIS", "3D Visualization (Three.js)", "Data Analysis (Pandas)", 
  "React/Next.js"
];

// --- TEXT CONTENT COMPONENT (AboutContent) ---
export default function AboutContent() {
  return (
    // Use motion.div as the container for stagger effects
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      {/* Title */}
      <motion.h1
        variants={itemVariants}
        className="text-4xl sm:text-5xl font-extrabold mb-6 text-cyan-400 font-poppins tracking-tight"
      >
        About Me
      </motion.h1>

      {/* Paragraph 1 */}
      <motion.p
        variants={itemVariants}
        className="text-gray-300 text-lg leading-relaxed mb-6 font-inter"
      >
        I’m an **Energy Systems & GIS Specialist** focused on the
        integration of renewable energy modeling, spatial analytics, and visual
        communication. I bring complex, data-driven ideas into interactive, 
        clear digital formats.
      </motion.p>

      {/* Paragraph 2 */}
      <motion.p
        variants={itemVariants}
        className="text-gray-300 text-lg leading-relaxed mb-8 font-inter"
      >
        My expertise includes developing Python-based simulation models, automating spatial workflows in{" "}
        <strong>ArcGIS Pro</strong> and <strong>QGIS</strong>, and creating
        detailed 3D visualizations to support renewable energy planning and stakeholder communication.
      </motion.p>
      
      {/* Skill Badges Section */}
      <h3 className="text-xl font-semibold mb-4 text-white font-poppins mt-8">Core Expertise:</h3>
      <div className="flex flex-wrap gap-3">
        {skillBadges.map((skill) => (
          <motion.span
            key={skill}
            variants={itemVariants}
            // Use subtle neon glow and rounded chip style
            className="px-4 py-2 text-sm font-medium text-cyan-200 bg-gray-800 rounded-full border border-cyan-500/30 hover:bg-gray-700 transition duration-300 cursor-default shadow-md shadow-cyan-500/10"
          >
            {skill}
          </motion.span>
        ))}
      </div>
      
      {/* Call to Action */}
      <motion.p
        variants={itemVariants}
        className="text-gray-400 leading-relaxed font-inter mt-10 text-base"
      >
        See how I apply these skills on the{" "}
        <a
          href="#projects"
          className="text-orange-400 hover:text-orange-300 font-semibold transition-colors border-b border-orange-400/50 pb-0.5"
        >
          Projects
        </a>{" "}
        page.
      </motion.p>
    </motion.div>
  );
}

// --- IMAGE COMPONENT ---
/**
 * Utility component for the portrait image with a subtle scrolling animation.
 * The image source is set to PNG.
 */
export function ImageComponent() {
  const imageContainerRef = useRef(null);

  // Get scroll progress relative to the image container
  const { scrollYProgress } = useScroll({
    target: imageContainerRef,
    // Start tracking when the container enters the viewport, stop when it leaves
    offset: ["start end", "end start"]
  });

  // Map the scroll progress (0 to 1) to a vertical movement from -50px to 50px
  // This creates a subtle parallax-like effect
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    // Attach ref for scroll calculation
    <motion.div
      ref={imageContainerRef}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.0, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className="relative w-full h-full flex items-center justify-center p-4"
      // Removed all mouse event handlers
    >
      <motion.img
        src="/avatar.png" // Reverted to PNG
        alt="Portrait of Arttu Virtanen, Energy Systems & GIS Specialist"
        
        // Apply the subtle vertical motion transform
        style={{ y: y, 
          // Base drop shadow for definition on the white background
          filter: 'drop-shadow(0 0 10px rgba(0, 0, 0, 0.2))', 
        }}
        
        className="object-contain w-full h-full max-h-[80vh] transition-all duration-300 ease-in-out" 
      />
    </motion.div>
  );
}