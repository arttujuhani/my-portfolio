"use client";

import React from "react";

export default function ContactButton() {
  const handleClick = () => {
    window.location.href =
      "mailto:your.email@example.com?subject=Contact%20from%20Portfolio";
  };

  return (
    <button
      onClick={handleClick}
      className="bg-[color:var(--color-primary)] hover:bg-[color:var(--color-accent)] text-[color:var(--color-dark)] font-heading font-medium py-3 px-8 rounded-full transition-transform transform hover:scale-105"
    >
      Contact Me
    </button>
  );
}
