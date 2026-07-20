"use client";

import React, { useState } from "react";
import { X, Trash2, MessageSquare, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { getWhatsAppDispatchUrl } from "@/lib/whatsapp";

interface QuoteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuoteDrawer({ isOpen, onClose }: QuoteDrawerProps) {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    totalItems,
  } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    city: "",
    phone: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.city || !formData.phone) {
      alert("Por favor completá todos los campos de contacto.");
      return;
    }

    const url = getWhatsAppDispatchUrl(cart, formData);
    window.open(url, "_blank");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      {/* Background backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-stone-900/50 backdrop-blur-sm transition-opacity"
      ></div>

      <div className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full">
          {/* Header */}
          <div className="px-6 py-5 bg-stone-900 text-stone-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} className="text-amber-500" />
              <h2 className="font-serif text-lg font-semibold">Mi Lista de Consulta</h2>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 hover:bg-stone-800 transition text-stone-300 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center text-stone-400">
                <ShoppingBag size={48} className="stroke-1 mb-4" />
                <p className="font-medium text-sm">Tu lista de consulta está vacía</p>
                <p className="text-xs mt-1">Navegá por el catálogo y agregá artículos.</p>
              </div>
            ) : (
              <>
                {/* List items */}
                <div className="space-y-4 divide-y divide-stone-100">
                  {cart.map((item, index) => (
                    <div key={`${item.product.id}-${item.size}`} className={`flex gap-4 ${index > 0 ? "pt-4" : ""}`}>
                      <div className="h-16 w-14 relative rounded-lg overflow-hidden bg-stone-50 flex-shrink-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="object-cover h-full w-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="text-xs font-semibold text-stone-800 line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.size)}
                            className="text-stone-400 hover:text-red-600 transition"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <p className="text-[10px] text-stone-400 font-medium mt-0.5">
                          Talle: <span className="text-stone-700 font-bold">{item.size}</span> • Art: {item.product.code}
                        </p>
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center gap-1 rounded-lg bg-stone-50 p-0.5 border border-stone-100">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 6)}
                              className="h-6 w-6 flex items-center justify-center rounded hover:bg-white text-stone-600 font-bold text-xs"
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-xs font-bold text-stone-700">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 6)}
                              className="h-6 w-6 flex items-center justify-center rounded hover:bg-white text-stone-600 font-bold text-xs"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-xs font-bold text-stone-500">
                            {item.quantity} unidades
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Info Mayorista Info Panel */}
                <div className="bg-stone-50 rounded-xl p-4 text-[11px] leading-relaxed text-stone-600 border border-stone-100">
                  <p className="font-semibold text-stone-800 mb-1">¿Cómo funciona mi pedido?</p>
                  Una vez que envíes tu lista con tus datos de contacto, nos comunicaremos por WhatsApp para pasarte el presupuesto formalizado, definir el medio de envío y la forma de pago conveniente.
                </div>

                {/* Formulario de Contacto Mayorista */}
                <form onSubmit={handleSubmit} className="space-y-4 border-t border-stone-100 pt-6">
                  <h3 className="font-serif text-sm font-semibold text-stone-800">
                    Completá tus datos de contacto
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label htmlFor="name" className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                        Nombre / Razón Social
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Ej. Comercio o Nombre Personal"
                        className="w-full rounded-xl border border-stone-200 p-2.5 text-xs focus:border-amber-700 focus:outline-none bg-stone-50/50"
                      />
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                        Localidad y Provincia
                      </label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Ej. Río Cuarto, Córdoba"
                        className="w-full rounded-xl border border-stone-200 p-2.5 text-xs focus:border-amber-700 focus:outline-none bg-stone-50/50"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                        Teléfono / Celular
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Ej. 351 555 5555"
                        className="w-full rounded-xl border border-stone-200 p-2.5 text-xs focus:border-amber-700 focus:outline-none bg-stone-50/50"
                      />
                    </div>
                  </div>

                  {/* Acciones de Despacho */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full flex h-11 items-center justify-center gap-2 rounded-xl text-xs font-bold tracking-wide transition shadow-sm bg-emerald-700 text-white hover:bg-emerald-800"
                    >
                      <MessageSquare size={16} />
                      <span>Consultar Pedido por WhatsApp</span>
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
