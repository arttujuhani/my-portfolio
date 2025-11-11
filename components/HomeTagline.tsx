"use client";

import { motion } from "framer-motion";

export default function HomeTagline() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="absolute top-[65%] left-0 w-full flex items-center text-center justify-center z-10 pointer-events-none"
    >
      <motion.p
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="text-[#46caae] text-2xl md:text-4xl font-semibold tracking-wide 
                   drop-shadow-[0_0_15px_rgba(70,202,174,0.4)] select-none 
                   font-[Poppins,sans-serif]"
      >
        Energy Systems &amp; GIS Specialist
      </motion.p>
    </motion.div>
  );
}
