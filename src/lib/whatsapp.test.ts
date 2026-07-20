import { describe, it, expect } from "vitest";
import { getWhatsAppDispatchUrl } from "./whatsapp";
import { CartItem } from "@/context/CartContext";
import { Product } from "@/data/mockProducts";

describe("whatsapp utility getWhatsAppDispatchUrl", () => {
  const mockProduct1: Product = {
    id: "1",
    code: "AC-01",
    name: "Cinturón Vaqueta",
    description: "Cinturón de vaqueta",
    category: "Clásicos",
    sizes: ["85", "90"],
    images: ["/image.jpg"],
    price: 22000,
    width: "35 mm"
  };

  const mockProduct2: Product = {
    id: "2",
    code: "AC-02",
    name: "Cinturón Trenzado",
    description: "Cinturón trenzado",
    category: "Trenzados",
    sizes: ["90", "95"],
    images: ["/image2.jpg"],
    price: 22000,
    width: "35 mm"
  };

  const mockCart: CartItem[] = [
    {
      product: mockProduct1,
      size: "90",
      quantity: 12
    },
    {
      product: mockProduct2,
      size: "95",
      quantity: 6
    }
  ];

  const mockCustomer = {
    name: "Test Comercio",
    city: "Córdoba",
    phone: "3515555555"
  };

  it("should generate correct WhatsApp redirect URL with escaped text", () => {
    const url = getWhatsAppDispatchUrl(mockCart, mockCustomer);
    
    // Check that it starts with the wa.me domain and contact phone
    expect(url).toContain("https://wa.me/");
    
    // Check that the text parameter is included
    expect(url).toContain("text=");

    // Decoded text verification
    const decodedUrl = decodeURIComponent(url);
    expect(decodedUrl).toContain("Test Comercio");
    expect(decodedUrl).toContain("Córdoba");
    expect(decodedUrl).toContain("- *12* u. de *Cinturón Vaqueta* (Talle: 90, Ref: AC-01) a $22.000/u.");
    expect(decodedUrl).toContain("- *6* u. de *Cinturón Trenzado* (Talle: 95, Ref: AC-02) a $22.000/u.");
    expect(decodedUrl).toContain("*Total Estimado:* $396.000");
  });
});
