"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Phone, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { WHATSAPP_CONTACT_NUMBER } from "@/data/mockProducts";

interface HeaderProps {
  onOpenCart: () => void;
}

export default function Header({ onOpenCart }: HeaderProps) {
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState("");

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleHashAndScroll = () => {
      setActiveHash(window.location.hash || "");
    };

    handleHashAndScroll();
    window.addEventListener("scroll", handleHashAndScroll);
    window.addEventListener("hashchange", handleHashAndScroll);
    return () => {
      window.removeEventListener("scroll", handleHashAndScroll);
      window.removeEventListener("hashchange", handleHashAndScroll);
    };
  }, [pathname]);

  const getLinkClass = (href: string) => {
    let isActive = false;

    if (href === "/catalogo") {
      isActive = pathname === "/catalogo";
    } else if (href === "/materia-prima") {
      isActive = pathname === "/materia-prima";
    } else if (href === "/#nosotros") {
      isActive = pathname === "/" && activeHash === "#nosotros";
    } else if (href === "/#faq") {
      isActive = pathname === "/" && activeHash === "#faq";
    }

    return isActive
      ? "text-amber-800 font-extrabold"
      : "text-stone-600 hover:text-amber-850 transition";
  };

  return (
    <header className="sticky top-0 z-45 w-full border-b border-stone-100 bg-white/90 backdrop-blur-md">
      {/* Top Banner (Info mayorista) */}
      <div className="bg-stone-900 px-4 py-2 text-center text-xs font-semibold tracking-wider text-stone-100 uppercase">
        VENTA MAYORISTA • ENVÍOS A TODO EL PAÍS
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          
          {/* Logo - Elegant Text/SVG logo representing AC Cinturones */}
          <Link href="/" onClick={closeMenu} className="flex items-center gap-1.5 focus:outline-none">
            <span className="font-serif text-2xl font-extrabold tracking-wider text-amber-800">AC</span>
            <span className="font-sans text-lg font-light tracking-widest text-stone-750 uppercase">Cinturones</span>
          </Link>

          {/* Menú de navegación principal (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-wider">
            <Link href="/catalogo" className={getLinkClass("/catalogo")}>
              Catálogo
            </Link>
            <Link href="/#nosotros" className={getLinkClass("/#nosotros")}>
              Quiénes Somos
            </Link>
            <Link href="/#faq" className={getLinkClass("/#faq")}>
              Preguntas Frecuentes
            </Link>
            <Link href="/materia-prima" className={getLinkClass("/materia-prima")}>
              Nuestra Materia Prima
            </Link>
          </nav>

          {/* Acciones (Desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`https://wa.me/${WHATSAPP_CONTACT_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-800 hover:bg-emerald-100 transition"
            >
              <Phone size={14} />
              <span>WhatsApp Ventas</span>
            </a>

            <button
              onClick={onOpenCart}
              className="group relative flex items-center gap-2 rounded-full border border-stone-200 bg-white p-2.5 px-4 text-stone-700 shadow-sm transition hover:border-amber-700 hover:text-amber-800 focus:outline-none"
            >
              <ShoppingBag size={18} className="text-stone-500 group-hover:text-amber-800" />
              <span className="text-xs font-semibold">Mi Pedido</span>
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-amber-700 text-[10px] font-bold text-white ring-2 ring-white">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Botón de Menú Hamburguesa (Mobile) */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={toggleMenu}
              className="rounded-xl border border-stone-200 bg-white p-2.5 text-stone-700 hover:border-stone-400 transition focus:outline-none"
              aria-label="Abrir Menú"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú Desplegable (Mobile Drawer) */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-stone-200 shadow-lg py-6 px-6 space-y-6 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-4 text-sm font-bold uppercase tracking-wider">
            <Link href="/catalogo" onClick={closeMenu} className={`${getLinkClass("/catalogo")} py-2 border-b border-stone-50 block`}>
              Catálogo
            </Link>
            <Link href="/#nosotros" onClick={closeMenu} className={`${getLinkClass("/#nosotros")} py-2 border-b border-stone-50 block`}>
              Quiénes Somos
            </Link>
            <Link href="/#faq" onClick={closeMenu} className={`${getLinkClass("/#faq")} py-2 border-b border-stone-50 block`}>
              Preguntas Frecuentes
            </Link>
            <Link href="/materia-prima" onClick={closeMenu} className={`${getLinkClass("/materia-prima")} py-2 block`}>
              Nuestra Materia Prima
            </Link>
          </nav>

          <div className="flex flex-col gap-3 pt-2">
            {/* Carrito de Consulta (Mi Pedido) en mobile dentro del menú */}
            <button
              onClick={() => {
                closeMenu();
                onOpenCart();
              }}
              className="w-full flex items-center justify-center gap-2.5 rounded-xl border border-stone-250 bg-stone-50 p-3 text-stone-800 font-bold text-xs hover:bg-stone-100 transition"
            >
              <ShoppingBag size={18} className="text-stone-600" />
              <span>Mi Pedido ({totalItems})</span>
            </button>

            {/* WhatsApp en mobile dentro del menú */}
            <a
              href={`https://wa.me/${WHATSAPP_CONTACT_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-emerald-700 p-3 text-white font-bold text-xs hover:bg-emerald-800 transition"
            >
              <Phone size={14} />
              <span>WhatsApp Ventas</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
