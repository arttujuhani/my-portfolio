"use client";

import AboutContent, { ImageComponent } from "./aboutcontent"; 
import { motion } from "framer-motion"; // Retained for whileInView animation
import { useRef } from "react";

export default function AboutPage() {
  const sectionRef = useRef(null);

  // The scroll-triggered layout animation has been removed.
  // The layout is now a static 60% (Text) / 40% (Image) on desktop.

  return (
    <section 
      ref={sectionRef}
      // Set standard min-h-screen for regular section scrolling
      className="relative w-full min-h-screen flex flex-col md:flex-row overflow-hidden border-t border-b border-cyan-400/10"
      id="about" 
    >
      
      {/* LEFT SIDE — TEXT (Fixed 60% Width, Glassmorphism Effect) */}
      <div 
        // Static width: 100% on mobile, 60% on desktop (md:w-3/5)
        className="relative z-20 w-full md:w-3/5 flex-shrink-0 h-full p-6 md:p-12 order-2 md:order-1 flex items-center justify-center"
      >
        {/* Glassmorphism Container with Entrance Animation */}
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
            // Apply Glassmorphism styles here: semi-transparent, blur, rounded, border
            className="w-full h-full p-8 md:p-10 rounded-3xl border border-white/20 shadow-2xl backdrop-blur-md bg-white/5"
        >
            <AboutContent />
        </motion.div>
      </div>

      {/* RIGHT SIDE — IMAGE (Fixed 40% Width) */}
      <div 
        // Static width: 100% on mobile, 40% on desktop (md:w-2/5)
        className="relative flex-shrink-0 w-full md:w-2/5 md:h-screen order-1 md:order-2 bg-white flex items-center justify-center p-4 md:p-0"
      >
        <ImageComponent /> 
      </div>
    </section>
  );
}