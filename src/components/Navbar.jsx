import React from "react";
import { useState } from "react";

const links = ["Home", "Technologies", "Projects", "About", "Contact"];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <button
          className="md:hidden text-2xl text-gray-700"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <div className="flex items-center gap-2 font-extrabold text-lg">
          <span className="w-8 h-8 rounded-lg gradient-brand text-white flex items-center justify-center text-sm">
            DS
          </span>
          <span>
            Dev<span className="gradient-brand-text">Stack</span>
          </span>
        </div>

        <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          {links.map((link, i) => (
            <li
              key={link}
              className={
                i === 0
                  ? "text-brand-pink font-semibold cursor-pointer"
                  : "hover:text-gray-900 cursor-pointer"
              }
            >
              {link}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button className="text-sm font-medium text-gray-700 hover:text-gray-900">
            Sign In
          </button>
          <button className="text-sm font-semibold text-white gradient-brand px-5 py-2 rounded-full hover:opacity-90 transition">
            Sign Up
          </button>
        </div>
      </nav>

      {menuOpen && (
        <ul className="md:hidden flex flex-col gap-1 px-6 pb-4 text-sm font-medium text-gray-600">
          {links.map((link, i) => (
            <li
              key={link}
              className={
                i === 0
                  ? "text-brand-pink font-semibold py-2 cursor-pointer"
                  : "py-2 hover:text-gray-900 cursor-pointer"
              }
              onClick={() => setMenuOpen(false)}
            >
              {link}
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}