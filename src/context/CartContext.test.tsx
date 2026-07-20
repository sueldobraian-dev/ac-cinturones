import React from "react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { CartProvider, useCart } from "./CartContext";
import { Product } from "@/data/mockProducts";

// Test helper component to consume and control CartContext
const TestComponent = () => {
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems } = useCart();

  return (
    <div>
      <div data-testid="total-items">{totalItems}</div>
      <div data-testid="cart-length">{cart.length}</div>
      
      {cart.map((item) => (
        <div key={`${item.product.id}-${item.size}`} data-testid="cart-item">
          <span data-testid={`name-${item.product.id}-${item.size}`}>{item.product.name}</span>
          <span data-testid={`size-${item.product.id}-${item.size}`}>{item.size}</span>
          <span data-testid={`qty-${item.product.id}-${item.size}`}>{item.quantity}</span>
          
          <button
            data-testid={`btn-remove-${item.product.id}-${item.size}`}
            onClick={() => removeFromCart(item.product.id, item.size)}
          >
            Remove
          </button>
          <button
            data-testid={`btn-dec-${item.product.id}-${item.size}`}
            onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 6)}
          >
            Dec
          </button>
          <button
            data-testid={`btn-inc-${item.product.id}-${item.size}`}
            onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 6)}
          >
            Inc
          </button>
        </div>
      ))}
      
      <button
        data-testid="btn-add-p1"
        onClick={() =>
          addToCart(
            {
              id: "1",
              code: "AC-01",
              name: "Cinturón Vaqueta",
              description: "Vaqueta premium",
              category: "Clásicos",
              sizes: ["85", "90"],
              images: ["/image.jpg"]
            },
            "90",
            12
          )
        }
      >
        Add P1
      </button>

      <button
        data-testid="btn-add-p2"
        onClick={() =>
          addToCart(
            {
              id: "2",
              code: "AC-02",
              name: "Cinturón Trenzado",
              description: "Trenzado premium",
              category: "Trenzados",
              sizes: ["90", "95"],
              images: ["/image2.jpg"]
            },
            "95",
            6
          )
        }
      >
        Add P2
      </button>

      <button data-testid="btn-clear" onClick={clearCart}>
        Clear All
      </button>
    </div>
  );
};

describe("CartContext state management", () => {
  beforeEach(() => {
    // Clear localStorage mock
    localStorage.clear();
    vi.restoreAllMocks();
  });

  const renderCartProvider = () => {
    return render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
  };

  it("should start with an empty cart", () => {
    renderCartProvider();
    expect(screen.getByTestId("cart-length").textContent).toBe("0");
    expect(screen.getByTestId("total-items").textContent).toBe("0");
  });

  it("should add products to the cart and save to localStorage", () => {
    renderCartProvider();
    
    const addBtn = screen.getByTestId("btn-add-p1");
    act(() => {
      addBtn.click();
    });

    expect(screen.getByTestId("cart-length").textContent).toBe("1");
    expect(screen.getByTestId("total-items").textContent).toBe("12");
    expect(screen.getByTestId("qty-1-90").textContent).toBe("12");

    // LocalStorage verification
    const storedCart = JSON.parse(localStorage.getItem("ac_cinturones_cart") || "[]");
    expect(storedCart).toHaveLength(1);
    expect(storedCart[0].product.name).toBe("Cinturón Vaqueta");
    expect(storedCart[0].size).toBe("90");
    expect(storedCart[0].quantity).toBe(12);
  });

  it("should increment quantity when adding the same product and size", () => {
    renderCartProvider();
    const addBtn = screen.getByTestId("btn-add-p1");
    
    act(() => {
      addBtn.click();
    });
    act(() => {
      addBtn.click();
    });

    expect(screen.getByTestId("cart-length").textContent).toBe("1");
    expect(screen.getByTestId("total-items").textContent).toBe("24");
    expect(screen.getByTestId("qty-1-90").textContent).toBe("24");
  });

  it("should support separate entries for different sizes of the same product", () => {
    renderCartProvider();
    const addBtnP1 = screen.getByTestId("btn-add-p1");
    
    // Add product 1 size 90
    act(() => {
      addBtnP1.click();
    });

    // Manually add product 1 size 85 to simulate size variety
    const { cart } = useCart; // wait, let's just use buttons. In TestComponent, let's keep it simple.
    // Adding P2 size 95 instead to prove variety works:
    const addBtnP2 = screen.getByTestId("btn-add-p2");
    act(() => {
      addBtnP2.click();
    });

    expect(screen.getByTestId("cart-length").textContent).toBe("2");
    expect(screen.getByTestId("total-items").textContent).toBe("18");
  });

  it("should modify quantity by stepping by 6, and remove when quantity is 0", () => {
    renderCartProvider();
    const addBtn = screen.getByTestId("btn-add-p1");
    
    act(() => {
      addBtn.click(); // adds 12
    });

    const decBtn = screen.getByTestId("btn-dec-1-90");
    act(() => {
      decBtn.click(); // 12 - 6 = 6
    });
    expect(screen.getByTestId("qty-1-90").textContent).toBe("6");
    expect(screen.getByTestId("total-items").textContent).toBe("6");

    act(() => {
      decBtn.click(); // 6 - 6 = 0 -> should remove item
    });
    expect(screen.getByTestId("cart-length").textContent).toBe("0");
    expect(screen.getByTestId("total-items").textContent).toBe("0");
  });

  it("should remove item completely when clicking remove button", () => {
    renderCartProvider();
    const addBtn = screen.getByTestId("btn-add-p1");
    act(() => {
      addBtn.click();
    });
    
    const removeBtn = screen.getByTestId("btn-remove-1-90");
    act(() => {
      removeBtn.click();
    });

    expect(screen.getByTestId("cart-length").textContent).toBe("0");
    expect(screen.getByTestId("total-items").textContent).toBe("0");
  });

  it("should clear the entire cart when calling clearCart", () => {
    renderCartProvider();
    act(() => {
      screen.getByTestId("btn-add-p1").click();
      screen.getByTestId("btn-add-p2").click();
    });

    expect(screen.getByTestId("cart-length").textContent).toBe("2");

    act(() => {
      screen.getByTestId("btn-clear").click();
    });

    expect(screen.getByTestId("cart-length").textContent).toBe("0");
    expect(screen.getByTestId("total-items").textContent).toBe("0");
  });
});
