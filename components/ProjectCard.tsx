"use client"; // 🔹 Required for Framer Motion

import Image from "next/image";
import { motion } from "framer-motion";

export type Project = {
  title: string;
  description: string;
  image: string;
  link?: string;
};

type Props = {
  project: Project;
  index: number;
};

export default function ProjectCard({ project, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
      className="bg-[color:var(--color-dark)] border border-[color:var(--color-light)] rounded-2xl overflow-hidden transform transition-all hover:scale-105 hover:shadow-lg"
    >
      <div className="relative w-full h-56">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-heading font-semibold mb-2 text-[color:var(--color-primary)]">
          {project.title}
        </h2>
        <p className="text-[color:var(--color-light)] text-sm mb-4 font-body">
          {project.description}
        </p>
        {project.link && (
          <a
            href={project.link}
            className="inline-block text-[color:var(--color-accent)] hover:text-[color:var(--color-primary)] text-sm font-heading font-medium transition-colors"
          >
            View Project →
          </a>
        )}
      </div>
    </motion.div>
  );
}
