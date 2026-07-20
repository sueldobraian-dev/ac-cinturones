"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  Truck,
  ShieldCheck,
  TrendingUp,
  Award,
  Phone,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import QuoteDrawer from "@/components/catalog/QuoteDrawer";
import { WHATSAPP_CONTACT_NUMBER } from "@/data/mockProducts";

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "¿Cómo hago para pasar mi pedido?",
      answer: "Agregá los cinturones que deseás consultar con sus respectivos talles y cantidades a tu lista virtual. Cuando finalices, completás tus datos y hacés clic en enviar. El sistema te abrirá una conversación en WhatsApp para enviarnos la lista pre-armada y así definir la entrega."
    },
    {
      question: "¿Cuentan con stock inmediato? ¿Cuánto demora la entrega?",
      answer: "No contamos con stock pre-fabricado. Al ser una producción familiar y artesanal, trabajamos exclusivamente a pedido. La confección del pedido puede demorar entre 7 y 14 días hábiles dependiendo de la cantidad y variedad de artículos solicitados."
    },
    {
      question: "¿Cómo se acuerda el pago y la entrega?",
      answer: "Una vez que coordinamos tu lista por WhatsApp, acordamos el pago (transferencia o depósito). Hacemos envíos por expreso o transporte a elección. Además, si querés conocer de cerca la calidad de nuestro cuero y hebillas en persona, ofrecemos la posibilidad de coordinar un encuentro para acercarnos con nuestro muestrario físico de productos."
    },
    {
      question: "¿Dónde están ubicados? ¿Se puede retirar en persona?",
      answer: "Somos de Quilmes Oeste, Gran Buenos Aires. Al ser fabricantes directos con taller propio, no contamos con un local comercial de atención al público general. Sin embargo, coordinamos entregas personalizadas y puntos de encuentro con comerciantes de la zona, además de realizar despachos a todo el país."
    },
    {
      question: "¿Hacen envíos a todo el país?",
      answer: "Sí, despachamos encomiendas a nivel nacional. La entrega y transporte se coordina de manera directa de acuerdo con el volumen de tu pedido y las agencias de transporte disponibles en tu zona."
    }
  ];

  // Scroll Spy to change URL hash on scroll without jumping
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observerOptions = {
      root: null,
      rootMargin: "-45% 0px -45% 0px", // Detects element when it occupies the middle part of viewport
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          if (id) {
            window.history.replaceState(null, "", `#${id}`);
          }
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 flex flex-col font-sans">
      <Header onOpenCart={() => setIsCartOpen(true)} />

      <main className="flex-grow">
        {/* HERO SECTION - Above the Fold */}
        <section id="inicio" className="relative bg-stone-900 text-stone-100 overflow-hidden min-h-[85vh] flex items-center">
          <div className="absolute inset-0 z-0 opacity-20 lg:opacity-40">
            <Image
              src="/images/info/season-26.png"
              alt="Colección AC Cinturones"
              fill
              priority
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-stone-950/80 lg:bg-gradient-to-r lg:from-stone-950 lg:via-stone-900/85 lg:to-transparent z-10" />

          <div className="relative z-20 w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:mx-0 lg:mr-auto lg:pl-12 xl:pl-20">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-505 ring-1 ring-inset ring-amber-500/20 mb-6">
                Fabricantes Directos
              </span>
              <h1 className="font-serif text-4xl font-semibold tracking-tight text-white sm:text-6xl leading-tight">
                Cinturones de Cuero Legítimo al por Mayor
              </h1>
              <p className="mt-6 text-sm sm:text-base leading-relaxed text-stone-300">
                Abastecé tu comercio con cinturones de vaqueta, trenzados y gamuzas de excelente calidad. Armá tu lista de consulta directamente online y finalizá el pedido por WhatsApp de forma personalizada.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/catalogo"
                  className="rounded-xl bg-amber-700 hover:bg-amber-600 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition focus:outline-none"
                >
                  Ver Catálogo Mayorista
                </Link>
                <a
                  href={`https://wa.me/${WHATSAPP_CONTACT_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-stone-650 bg-stone-900/60 backdrop-blur px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-stone-800 transition flex items-center gap-2"
                >
                  <Phone size={14} className="text-emerald-500" />
                  <span>Atención Personalizada</span>
                </a>
              </div>
            </div>
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden lg:block animate-bounce">
            <button onClick={() => scrollToSection("nosotros")} className="text-stone-400 hover:text-white transition">
              <ChevronDown size={24} />
            </button>
          </div>
        </section>

        {/* VALORES Y BENEFICIOS B2B */}
        <section className="bg-white border-b border-stone-250 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-800 shrink-0">
                  <Award size={24} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-stone-900 uppercase tracking-widest">Cuero Vacuno Legitimo</h3>
                  <p className="mt-1 text-xs text-stone-500 leading-relaxed">
                    Trabajamos exclusivamente con cueros de primera selección. Máxima durabilidad.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-800 shrink-0">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-stone-900 uppercase tracking-widest">Precios Mayoristas</h3>
                  <p className="mt-1 text-xs text-stone-500 leading-relaxed">
                    Al ser fabricantes directos, garantizamos la mejor relación calidad-precio del mercado.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-800 shrink-0">
                  <Truck size={24} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-stone-900 uppercase tracking-widest">Envíos Nacionales</h3>
                  <p className="mt-1 text-xs text-stone-500 leading-relaxed">
                    Despachamos tu pedido a través del transporte, expreso o correo que elijas para tu localidad.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-800 shrink-0">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-stone-900 uppercase tracking-widest">Trato Directo</h3>
                  <p className="mt-1 text-xs text-stone-500 leading-relaxed">
                    Coordinás las cantidades, talles y el despacho directamente con los dueños por WhatsApp.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* SECCIÓN SOBRE NOSOTROS */}
        <section id="nosotros" className="bg-stone-900 text-stone-100 py-20 scroll-mt-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Contenedor de Imagen a 60% (7/12 columnas) con contención para ver el diseño completo */}
              <div className="lg:col-span-7 relative aspect-video lg:aspect-[4/3] rounded-2xl overflow-hidden bg-stone-950">
                <Image
                  src="/images/info/cuero-argentino.png"
                  alt="AC Cinturones - 100% Cuero Argentino"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
              {/* Contenedor de Texto a 40% (5/12 columnas) */}
              <div className="lg:col-span-5 space-y-6">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-500">Quiénes Somos</span>
                <h2 className="font-serif text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  AC Cinturones: Tradición Familiar y Oficio Artesano
                </h2>
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                  Somos una <b>empresa familiar</b> dedicada a la fabricación artesanal de cinturones de cuero vacuno legítimo. Nos enfocamos en abastecer a locales, distribuidoras y revendedores de todo el país, elaborando cada producto de forma dedicada para garantizar una calidad homogénea y duradera.
                </p>
                <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
                  Como <b>fabricantes artesanos</b>, no trabajamos con producción industrial masiva ni stock inmediato precargado: elaboramos cada lote sobre pedido, seleccionando cuidadosamente hebillas resistentes y cueros curtidos al vegetal de primera calidad.
                </p>
                <div className="pt-4 flex flex-wrap gap-4">
                  <Link
                    href="/materia-prima"
                    className="inline-flex items-center gap-2 rounded-xl bg-amber-800 hover:bg-amber-700 px-6 py-3 text-xs font-bold text-white transition"
                  >
                    Ver Nuestra Materia Prima
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PREGUNTAS FRECUENTES (FAQ) */}
        <section id="faq" className="bg-white py-20 scroll-mt-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl font-semibold text-center text-stone-900 mb-12">
              Preguntas Frecuentes
            </h2>
            <div className="space-y-3 max-w-3xl mx-auto">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="overflow-hidden rounded-2xl bg-stone-50 border border-stone-100/80 transition-all duration-300"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="flex w-full items-center justify-between p-5 text-left font-semibold text-stone-900 text-sm sm:text-base focus:outline-none hover:bg-stone-100/50 transition-colors"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        size={18}
                        className={`text-amber-800 shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        isOpen ? "max-h-[300px] opacity-100 border-t border-stone-200/50" : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="p-5 text-xs sm:text-sm text-stone-600 leading-relaxed bg-white/40">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECCIÓN FINAL CTA */}
        <section className="bg-stone-900 text-stone-100 py-16 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto px-4">
            <h2 className="font-serif text-3xl font-bold sm:text-4xl text-white">
              Trabajá con Nosotros
            </h2>
            <p className="mt-4 text-stone-400 text-xs sm:text-sm max-w-xl mx-auto">
              Sumá cinturones de calidad premium a tu catálogo de productos. Contactanos para pactar un pedido a medida.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/catalogo"
                className="w-full sm:w-auto rounded-xl bg-amber-800 hover:bg-amber-700 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition flex items-center justify-center"
              >
                Comenzar Lista de Consulta
              </Link>
              <a
                href={`https://wa.me/${WHATSAPP_CONTACT_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto rounded-xl border border-stone-700 bg-stone-950/40 backdrop-blur px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-stone-950 transition flex items-center justify-center gap-2"
              >
                <Phone size={14} className="text-emerald-500" />
                <span>Contacto WhatsApp</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <Footer />

      {/* CARRITO DE COTIZACIÓN */}
      <QuoteDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
