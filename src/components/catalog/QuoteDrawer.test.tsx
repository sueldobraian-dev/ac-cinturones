import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act, fireEvent } from "@testing-library/react";
import QuoteDrawer from "./QuoteDrawer";
import { CartProvider } from "@/context/CartContext";

const mockCartItem = {
  product: {
    id: "1",
    code: "AC-01",
    name: "Cinturón de Vaqueta",
    description: "Premium",
    category: "Clásicos",
    sizes: ["90"],
    images: ["/image.jpg"]
  },
  size: "90",
  quantity: 12
};

describe("QuoteDrawer UI component", () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem("ac_cinturones_cart", JSON.stringify([mockCartItem]));
    vi.stubGlobal("open", vi.fn());
    vi.stubGlobal("alert", vi.fn());
  });

  it("does not render when isOpen is false", () => {
    // Clear localStorage for this test so it is empty
    localStorage.clear();
    const { container } = render(
      <CartProvider>
        <QuoteDrawer isOpen={false} onClose={() => {}} />
      </CartProvider>
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders cart items and contact form when open with items", () => {
    render(
      <CartProvider>
        <QuoteDrawer isOpen={true} onClose={() => {}} />
      </CartProvider>
    );

    expect(screen.getByText("Mi Lista de Consulta")).toBeDefined();
    expect(screen.getByText("Cinturón de Vaqueta")).toBeDefined();
    expect(screen.getByText("12 unidades")).toBeDefined();
    expect(screen.getByLabelText("Nombre / Razón Social")).toBeDefined();
  });

  it("submits contact form and redirects to WhatsApp", () => {
    render(
      <CartProvider>
        <QuoteDrawer isOpen={true} onClose={() => {}} />
      </CartProvider>
    );

    const nameInput = screen.getByLabelText("Nombre / Razón Social");
    const cityInput = screen.getByLabelText("Localidad y Provincia");
    const phoneInput = screen.getByLabelText("Teléfono / Celular");
    const submitBtn = screen.getByText("Consultar Pedido por WhatsApp");

    fireEvent.change(nameInput, { target: { value: "Test S.A." } });
    fireEvent.change(cityInput, { target: { value: "Mendoza" } });
    fireEvent.change(phoneInput, { target: { value: "261555555" } });

    act(() => {
      submitBtn.click();
    });

    expect(window.open).toHaveBeenCalled();
    const callUrl = vi.mocked(window.open).mock.calls[0][0] as string;
    expect(callUrl).toContain("wa.me");
    expect(decodeURIComponent(callUrl)).toContain("Test S.A.");
    expect(decodeURIComponent(callUrl)).toContain("Mendoza");
  });
});

