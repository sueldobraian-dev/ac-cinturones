import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import ProductCard from "./ProductCard";
import { CartProvider } from "@/context/CartContext";
import { Product } from "@/data/mockProducts";

const mockProduct: Product = {
  id: "1",
  code: "AC-01",
  name: "Cinturón de Vaqueta",
  description: "Cuero genuino",
  category: "Clásicos",
  sizes: ["85", "90", "95"],
  images: ["/images/cintos/431.jpg"]
};

describe("ProductCard UI component", () => {
  it("renders product name, code, category, sizes and default quantity", () => {
    render(
      <CartProvider>
        <ProductCard product={mockProduct} />
      </CartProvider>
    );

    expect(screen.getByText("Cinturón de Vaqueta")).toBeDefined();
    expect(screen.getByText("Art. AC-01")).toBeDefined();
    expect(screen.getByText("Clásicos")).toBeDefined();
    expect(screen.getByText("85")).toBeDefined();
    expect(screen.getByText("90")).toBeDefined();

    // Default quantity in wholesale is 12 (one dozen)
    expect(screen.getByText("12")).toBeDefined();
  });

  it("handles quantity increment and decrement in steps of 6", () => {
    render(
      <CartProvider>
        <ProductCard product={mockProduct} />
      </CartProvider>
    );

    const incBtn = screen.getByTestId("btn-increment");
    const decBtn = screen.getByTestId("btn-decrement");
    const qtyValue = screen.getByTestId("quantity-value");

    // Increment 12 + 6 = 18
    act(() => {
      incBtn.click();
    });
    expect(qtyValue.textContent).toBe("18");

    // Decrement 18 - 6 = 12
    act(() => {
      decBtn.click();
    });
    expect(qtyValue.textContent).toBe("12");

    // Decrement 12 - 6 = 6
    act(() => {
      decBtn.click();
    });
    expect(qtyValue.textContent).toBe("6");

    // Decrement below 6 should stay at 6
    act(() => {
      decBtn.click();
    });
    expect(qtyValue.textContent).toBe("6");
  });

  it("allows selecting a different size", () => {
    render(
      <CartProvider>
        <ProductCard product={mockProduct} />
      </CartProvider>
    );

    const size95Btn = screen.getByText("95");

    // Size 85 is selected by default, click 95
    act(() => {
      size95Btn.click();
    });

    // Check size button classes
    expect(size95Btn.className).toContain("bg-amber-800");
  });

  it("shows success feedback when adding to cart", () => {
    render(
      <CartProvider>
        <ProductCard product={mockProduct} />
      </CartProvider>
    );

    const addBtn = screen.getByText("Agregar a mi Lista");
    act(() => {
      addBtn.click();
    });

    expect(screen.getByText("¡Agregado a la Lista!")).toBeDefined();
  });
});
