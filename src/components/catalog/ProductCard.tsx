"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Minus, Check } from "lucide-react";
import { Product } from "@/data/mockProducts";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || "");
  const [quantity, setQuantity] = useState<number>(12); // Mayorista: sugerir 12 unidades por defecto
  const [added, setAdded] = useState(false);

  const handleIncrement = () => setQuantity((prev) => prev + 6); // Incrementos de media docena
  const handleDecrement = () => setQuantity((prev) => (prev > 6 ? prev - 6 : 6)); // Mínimo 6 unidades por producto

  const handleAdd = () => {
    addToCart(product, selectedSize, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-stone-100 bg-white shadow-sm transition hover:shadow-md">
      {/* Imagen */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-100">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 rounded-full bg-stone-900/85 px-3 py-1 text-[10px] font-bold tracking-wider text-stone-100 uppercase">
          Art. {product.code}
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs uppercase tracking-wider text-stone-400 font-semibold mb-1">
          {product.category}
        </span>
        <h3 className="font-serif text-lg font-medium text-stone-800 line-clamp-1 mb-2">
          {product.name}
        </h3>
        <p className="text-xs text-stone-500 line-clamp-2 mb-4 flex-1">
          {product.description}
        </p>

        {/* Info de Venta Mayorista sin precios ficticios */}
        <div className="mb-4 text-xs font-semibold text-amber-900 bg-amber-50/50 p-2.5 rounded-lg border border-amber-100/30 text-center">
          Venta exclusivamente por bulto/curva
        </div>

        {/* Selectores */}
        <div className="space-y-3 border-t border-stone-55 pt-4">
          {/* Talle */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-stone-500 font-sans">Talle:</span>
            <div className="flex flex-wrap gap-1">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold transition ${
                    selectedSize === size
                      ? "bg-amber-800 text-white"
                      : "bg-stone-50 text-stone-600 hover:bg-stone-100"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Cantidad */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-stone-500">Cantidad:</span>
              <span className="text-[10px] text-stone-400 font-medium">(Mínimo 6 u.)</span>
            </div>
            <div className="flex items-center gap-1 rounded-xl bg-stone-50 p-1">
              <button
                onClick={handleDecrement}
                data-testid="btn-decrement"
                className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white transition text-stone-600"
              >
                <Minus size={14} />
              </button>
              <span data-testid="quantity-value" className="w-10 text-center text-xs font-bold text-stone-800">
                {quantity}
              </span>
              <button
                onClick={handleIncrement}
                data-testid="btn-increment"
                className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white transition text-stone-600"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* Agregar al pedido button */}
          <button
            onClick={handleAdd}
            className={`w-full flex h-11 items-center justify-center gap-2 rounded-xl text-xs font-bold tracking-wide transition ${
              added
                ? "bg-emerald-800 text-white"
                : "bg-stone-900 text-stone-100 hover:bg-stone-800"
            }`}
          >
            {added ? (
              <>
                <Check size={16} />
                <span>¡Agregado a la Lista!</span>
              </>
            ) : (
              <span>Agregar a mi Lista</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
