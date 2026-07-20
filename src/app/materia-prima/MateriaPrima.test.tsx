import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import MateriaPrimaPage from "./page";
import { CartProvider } from "@/context/CartContext";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  usePathname: () => "/materia-prima"
}));

describe("MateriaPrimaPage UI component and carousel", () => {
  it("renders heading and default slide details", () => {
    render(
      <CartProvider>
        <MateriaPrimaPage />
      </CartProvider>
    );

    expect(screen.getByText("Nuestros Materiales")).toBeDefined();
    expect(screen.getByText("Cinto Trenzado France")).toBeDefined();
    expect(screen.getByText("35 mm")).toBeDefined();
  });

  it("advances to the next slide when clicking Next button", () => {
    render(
      <CartProvider>
        <MateriaPrimaPage />
      </CartProvider>
    );

    const nextSlide = screen.queryByText("Cinto Trenzado Trigo");
    expect(nextSlide).toBeNull(); // not loaded yet on slide 1

    const slide2Indicator = screen.getByLabelText("Ir a slide 2");
    act(() => {
      slide2Indicator.click();
    });

    expect(screen.getByText("Cinto Trenzado Trigo")).toBeDefined();
  });
});
