"use client";

import React, { useState, useMemo } from "react";
import { mockProducts } from "@/data/mockProducts";
import ProductCard from "./ProductCard";
import { Sparkles } from "lucide-react";

export default function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState<string>("Todos");

  const categories = useMemo(() => {
    const list = new Set(mockProducts.map((p) => p.category));
    return ["Todos", ...Array.from(list)];
  }, []);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "Todos") return mockProducts;
    return mockProducts.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200 pb-6 mb-8">
        <div>
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
            Catálogo Mayorista
          </h2>
          <p className="mt-2 text-stone-500 max-w-lg text-sm sm:text-base">
            Diseños clásicos y modernos fabricados en cuero genuino seleccionados. Seleccioná talle y cantidades por docena o media docena.
          </p>
        </div>

        {/* Categorías */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-5 py-2 text-xs font-semibold tracking-wide transition ${
                activeCategory === category
                  ? "bg-amber-800 text-stone-100 shadow-sm"
                  : "bg-white text-stone-600 border border-stone-200 hover:border-stone-400"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Banner de descuentos por volumen */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/40 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-800 text-white rounded-xl">
            <Sparkles size={18} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-amber-900 font-sans">Descuentos por Volumen de Compra</h4>
            <p className="text-xs text-amber-800/80 font-medium">A mayor cantidad de unidades en tu lista de consulta, mejoramos tu presupuesto final.</p>
          </div>
        </div>
        <div className="bg-amber-800/5 px-4 py-2 rounded-xl border border-amber-800/10 text-center sm:text-right">
          <span className="text-xs font-bold text-amber-850">Consultá descuentos especiales por cantidad</span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
