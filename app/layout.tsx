import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Energy Systems & GIS Specialist",
  description:
    "Portfolio of an Energy Systems & GIS Specialist showcasing renewable energy modeling, GIS automation, and 3D visualization projects.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Added 'scroll-smooth' to enable CSS-based smooth scrolling
    <html lang="en" className={`${poppins.variable} ${inter.variable} scroll-smooth`}> 
      <body className="bg-black text-white font-sans">
        {/* 🔹 Navigation bar */}
        <nav className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link
              // Changed to link to the #home section ID
              href="#home" 
              className="text-xl font-bold tracking-wide hover:text-gray-300 font-heading"
            >
              My Portfolio
            </Link>
            <div className="space-x-6 text-sm md:text-base">
              <Link 
                // Changed href from /about to #about
                href="#about" 
                className="hover:text-gray-300 transition"
              >
                About
              </Link>
              <Link 
                // Changed href from /projects to #projects
                href="#projects" 
                className="hover:text-gray-300 transition"
              >
                Projects
              </Link>
              <Link 
                // Changed href from /contact to #contact
                href="#contact" 
                className="hover:text-gray-300 transition"
              >
                Contact
              </Link>
            </div>
          </div>
        </nav>

        <main className="relative min-h-screen">{children}</main>

        {/* Adjusted footer styling for a scrolling page layout */}
        <footer className="border-t border-white/10 w-full z-20 py-4 text-center text-sm text-gray-400 bg-black/30 backdrop-blur-md">
          © {new Date().getFullYear()} Arttu Virtanen. All rights reserved.
        </footer>

      </body>
    </html>
  );
}