"use client";

export default function ContactButton() {
  return (
    <button
      className="rounded-full bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      onClick={() => alert("Contact button clicked!")}
    >
      Contact Us
    </button>
  );
}