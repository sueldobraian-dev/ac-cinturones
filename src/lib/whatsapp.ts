import { CartItem } from "@/context/CartContext";
import { WHATSAPP_CONTACT_NUMBER } from "@/data/mockProducts";

export interface CustomerData {
  name: string;
  city: string;
  phone: string;
}

export function getWhatsAppDispatchUrl(cart: CartItem[], customer: CustomerData): string {
  const list = cart
    .map((item) => `- *${item.quantity}* unidades de *${item.product.name}* (Talle: ${item.size}, Ref: ${item.product.code})`)
    .join("\n");
  const text = `Hola, quiero enviar mi lista de pedido mayorista para cotizar:\n\n${list}\n\n*Datos de Contacto:*\n- Razón Social: ${customer.name}\n- Localidad: ${customer.city}\n- Teléfono: ${customer.phone}`;
  return `https://wa.me/${WHATSAPP_CONTACT_NUMBER}?text=${encodeURIComponent(text)}`;
}
