import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, act } from "@testing-library/react";
import ProductGrid from "./ProductGrid";
import { CartProvider } from "@/context/CartContext";

describe("ProductGrid UI component", () => {
  it("renders catalog heading and category filter buttons", () => {
    render(
      <CartProvider>
        <ProductGrid />
      </CartProvider>
    );

    expect(screen.getByText("Catálogo Mayorista")).toBeDefined();
    expect(screen.getByText("Todos")).toBeDefined();
  });

  it("filters product cards when clicking on a category button", () => {
    render(
      <CartProvider>
        <ProductGrid />
      </CartProvider>
    );

    // Get a category button e.g. "Rústicos" or "Premium"
    const rusticoBtn = screen.getByRole("button", { name: "Rústicos" });
    
    act(() => {
      rusticoBtn.click();
    });
    // Check active style matches
    expect(rusticoBtn.className).toContain("bg-amber-800");
  });
});
