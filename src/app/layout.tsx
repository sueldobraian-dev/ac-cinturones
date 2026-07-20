import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cuero Vivo - Cinturones de Cuero Legítimo | Venta Mayorista",
  description: "Catálogo exclusivo de cinturones de cuero vacuno legítimo. Fabricantes directos. Envíos mayoristas a todo el país. Armá tu pedido y coordiná el pago por WhatsApp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-stone-50 text-stone-800">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
