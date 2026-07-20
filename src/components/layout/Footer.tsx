"use client";

import React from "react";
import Link from "next/link";
import { WHATSAPP_CONTACT_NUMBER } from "@/data/mockProducts";

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-500 py-12 border-t border-stone-900 mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-stone-900 pb-8">
          <div className="flex items-center gap-1.5 focus:outline-none">
            <span className="font-serif text-2xl font-extrabold tracking-wider text-amber-700">AC</span>
            <span className="font-sans text-lg font-light tracking-widest text-stone-400 uppercase">Cinturones</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold uppercase tracking-wider text-stone-400">
            <Link href="/catalogo" className="hover:text-white transition">Catálogo</Link>
            <a
              href={`https://wa.me/${WHATSAPP_CONTACT_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              Contacto
            </a>
          </div>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} AC Cinturones. Todos los derechos reservados. Industria Argentina.</p>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-stone-400">
            <span>Venta Mayorista B2B Directa de Fábrica.</span>
            <span>
              Designed by{' '}
              <a
                href="https://www.linkedin.com/in/braian-sueldo/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-300 hover:text-emerald-400 transition-colors duration-300 underline underline-offset-4 decoration-stone-700 hover:decoration-emerald-400"
              >
                Braian Sueldo
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
