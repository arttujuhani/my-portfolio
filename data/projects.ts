export type Project = {
  title: string;
  description: string;
  image: string;   // path relative to /public
  link?: string;   // optional external link
  category?: string; // optional, e.g., "GIS", "3D", "Python"
};

export const projects: Project[] = [
  {
    title: "Energy System Simulation Model",
    description:
      "Python-based Oemof simulation analyzing renewable energy dispatch and system performance.",
    image: "/projects/energy-model.jpg",
    link: "#",
    category: "Python",
  },
  {
    title: "GIS Automation for Solar Site Planning",
    description:
      "ArcGIS Pro workflow automating data import, clipping, and analysis using Python and ModelBuilder.",
    image: "/projects/gis-automation.jpg",
    link: "#",
    category: "GIS",
  },
  {
    title: "3D Solar Farm Visualization",
    description:
      "Blender-rendered 3D animation integrating drone imagery with modeled solar structures.",
    image: "/projects/3d-visualization.jpg",
    link: "#",
    category: "3D",
  },
];
