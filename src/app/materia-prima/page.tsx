"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import QuoteDrawer from "@/components/catalog/QuoteDrawer";
import rawMaterials from "@/data/materials.json";

interface MaterialItem {
  article: string;
  image: string;
  name: string;
  description: string;
  properties: string[];
}

const materialsData: MaterialItem[] = rawMaterials as MaterialItem[];

export default function MateriaPrimaPage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? materialsData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === materialsData.length - 1 ? 0 : prev + 1));
  };

  const currentItem = materialsData[currentIndex];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 flex flex-col font-sans">
      <Header onOpenCart={() => setIsCartOpen(true)} />

      <main className="flex-grow flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        {/* Volver */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-850 hover:text-amber-750 transition"
          >
            <ArrowLeft size={14} />
            <span>Volver al Inicio</span>
          </Link>
        </div>

        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800">Materia Prima Premium</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-stone-900 mt-2">
            Nuestros Materiales
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-stone-500 leading-relaxed">
            Explorá en detalle la calidad de los cueros y terminaciones que utilizamos para fabricar cada uno de los cinturones de la línea mayorista de AC Cinturones.
          </p>
        </div>

        {/* CARRUSEL INTERACTIVO (Compacto max-w-4xl) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch bg-white p-5 sm:p-8 rounded-2xl border border-stone-200/80 shadow-sm relative overflow-hidden">

          {/* Columna Imagen */}
          <div className="md:col-span-6 relative aspect-square w-full rounded-xl overflow-hidden bg-stone-50 border border-stone-100">
            <Image
              src={currentItem.image}
              alt={currentItem.name}
              fill
              priority
              className="object-contain transition-all duration-700"
            />
            {/* Controles sobre imagen en móvil */}
            <div className="absolute inset-x-4 bottom-4 flex justify-between md:hidden z-20">
              <button
                onClick={handlePrev}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-stone-800 shadow-md hover:bg-stone-50 transition"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={handleNext}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-stone-800 shadow-md hover:bg-stone-50 transition"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Columna Detalles */}
          <div className="md:col-span-6 flex flex-col justify-between py-1 space-y-6">
            <div className="space-y-3">
              <span className="text-[10px] font-extrabold tracking-widest text-amber-800 uppercase">
                Art. {currentItem.article} • Imagen {currentIndex + 1} de {materialsData.length}
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-stone-900">
                {currentItem.name}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {currentItem.description}
              </p>
            </div>

            {/* Propiedades/Atributos */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-extrabold text-stone-400 uppercase tracking-widest">Atributos Clave</h4>
              <div className="flex flex-wrap gap-1.5">
                {currentItem.properties.map((prop, idx) => (
                  <span
                    key={idx}
                    className="rounded-lg bg-stone-50 border border-stone-200/60 px-2.5 py-1 text-xs font-semibold text-stone-600"
                  >
                    {prop}
                  </span>
                ))}
              </div>
            </div>

            {/* Controles Desktop */}
            <div className="hidden md:flex items-center gap-3 pt-4 border-t border-stone-100">
              <button
                onClick={handlePrev}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-stone-50 text-stone-600 hover:text-amber-800 border border-stone-200 hover:border-stone-300 transition"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={handleNext}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-stone-50 text-stone-600 hover:text-amber-800 border border-stone-200 hover:border-stone-300 transition"
              >
                <ChevronRight size={20} />
              </button>
              <div className="text-[10px] text-stone-400 font-medium ml-2">
                Navegá por la colección
              </div>
            </div>
          </div>
        </div>

        {/* Indicadores en barra inferior */}
        <div className="flex justify-center gap-1.5 mt-6">
          {materialsData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${currentIndex === idx ? "w-6 bg-amber-850" : "w-1.5 bg-stone-300 hover:bg-stone-400"
                }`}
              aria-label={`Ir a slide ${idx + 1}`}
            />
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <Footer />

      {/* Cart Drawer */}
      <QuoteDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
