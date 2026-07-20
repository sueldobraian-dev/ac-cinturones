"use client";

import React, { useState, useMemo } from "react";
import { mockProducts } from "@/data/mockProducts";
import ProductCard from "./ProductCard";

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

      {/* Grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
