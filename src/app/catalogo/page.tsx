"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/catalog/ProductGrid";
import QuoteDrawer from "@/components/catalog/QuoteDrawer";

export default function CatalogoPage() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 flex flex-col font-sans">
      <Header onOpenCart={() => setIsCartOpen(true)} />

      <main className="flex-grow py-8">
        <ProductGrid />
      </main>

      {/* FOOTER */}
      <Footer />

      {/* Cart Drawer */}
      <QuoteDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
