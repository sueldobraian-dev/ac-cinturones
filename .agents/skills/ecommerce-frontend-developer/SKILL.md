---
name: ecommerce-frontend-developer
description: "Guías de arquitectura, diseño mobile-first, optimización de conversión y reglas para el desarrollo de un e-commerce mayorista B2B (cinturones) usando Next.js, TypeScript, Tailwind CSS y Cloudinary."
---
# Skill: E-commerce Frontend Developer (Mayorista B2B)

Esta skill contiene las directrices, reglas de diseño, arquitectura de carpetas y lineamientos de negocio para el desarrollo de un catálogo e-commerce mayorista premium, donde la venta y entrega se pactan directamente vía WhatsApp o Correo Electrónico.

---

## 1. Stack Tecnológico Principal

*   **Framework Principal:** React LTS & Next.js LTS (App Router) en modo de salida `standalone` (optimizado para Docker).
*   **Lenguaje:** TypeScript para un tipado robusto de productos, cotizaciones y configuraciones.
*   **Estilos:** Tailwind CSS con enfoque mobile-first y diseño responsive.
*   **Alojamiento Multimedia:** Cloudinary API para imágenes y galerías optimizadas con transformaciones en tiempo real.

---

## 2. Organización del Directorio y Arquitectura

El proyecto adopta un patrón **Jamstack / SPA** impulsado por Next.js App Router:

*   **`src/app/`**: Rutas y páginas de la aplicación.
    *   `layout.tsx`: Layout base, cabecera con acceso rápido al contacto y carrito de cotización, widgets de WhatsApp.
    *   `page.tsx`: Catálogo principal e información de venta mayorista.
*   **`src/components/`**: Componentes visuales (tarjetas de producto con selector de cantidad mayorista, resumen de presupuesto, botones de acción).
*   **`src/lib/`**: Clientes de servicios externos y utilidades de formato (ej. generadores de mensajes).

---

## 3. Filosofía Mobile-First y Diseño Mayorista Premium

Los compradores mayoristas suelen armar y revisar pedidos desde sus dispositivos móviles durante su jornada laboral.

### Reglas de Tailwind CSS y Maquetación
1.  **Mobile-First:** Clases base directas sin prefijo para móvil (ej. `w-full`, `grid-cols-1`, `p-4`). Breakpoints (`md:`, `lg:`) reservados para escritorio.
2.  **Contenedores de Escritorio:** Evitar la fatiga visual limitando el ancho en pantallas grandes:
    ```tsx
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Contenido */}
    </div>
    ```
3.  **Selector de Cantidades Optimizado:** En e-commerce mayorista, los usuarios compran por curva de talles o cantidades grandes. El selector de cantidades debe ser fácil de operar en pantallas táctiles (botones de +/- grandes y entrada numérica directa).

### Identidad Visual y Estética (Cinturones & Marroquinería)
*   **Concepto:** Estética premium, artesanal, texturas orgánicas y confiabilidad B2B.
*   **Colores:** Fondos piedra y arena (`bg-stone-50`, `bg-white`), textos oscuros y suaves (`text-stone-800`), acentos en tonos cuero/tierra (`text-amber-800`, `bg-amber-700`, o verdes secos `text-emerald-800`).

---

## 4. Fórmulas de Conversión Mayorista (Above-the-Fold & CTAs)

En el modelo B2B, el objetivo principal no es la transacción con tarjeta, sino **iniciar la conversación de venta con un pedido pre-armado**.

```
┌────────────────────────────────────────────────────────┐
│  [Logo]                 [Mínimo de Compra]   [Presupuesto]│
│                                                        │
│   Titular Directo (ej. Cinturones de Cuero al por Mayor)│
│   ───────────────────────────────────────────────────  │
│   Subtítulo: Compra mínima $XX. Envío a todo el país.  │
│                                           [Foto de     │
│   [Armar Pedido Mayorista]                 Catálogo    │
│   "Explorar Catálogo"                      Premium]    │
│                                                        │
│   Prueba social: "Fabricantes directos. Más de 100 locales"│
└────────────────────────────────────────────────────────┘
```

### Los 5 Elementos Clave de Conversión B2B:
1.  **Headline (Titular):** Debe indicar claramente el tipo de producto y el carácter mayorista (ej. *"Cinturones de Cuero Legítimo para Venta Mayorista"*).
2.  **Subheadline (Subtítulo):** Debe responder de inmediato las reglas de juego: **Monto mínimo de compra** y **zonas de envío**.
3.  **Hero Image:** Mostrar variedad, stock o el producto en su packaging de presentación mayorista.
4.  **CTA Principal:** Orientado a la acción de compra o exploración (ej. *"Armar Pedido"*, *"Ver Catálogo Mayorista"*).
5.  **Prueba Social / Confianza:** Datos duros de confianza (ej. *"Fabricantes Directos"*, *"Envíos Garantizados"* o *"Atención Personalizada"*).

---

## 5. El Flujo de Pedido Mayorista (WhatsApp Dispatcher)

El flujo de consulta sigue estos pasos:
1.  El usuario navega por el catálogo y agrega productos (con talles/cantidades) a su **Bolsa de Pedidos**.
2.  Al finalizar, el usuario completa sus datos mínimos de contacto (Razón Social, Localidad, Teléfono).
3.  El sistema procesa la solicitud:
    *   **Paso A:** Mantiene la persistencia del borrador de pedido localmente usando `localStorage`.
    *   **Paso B:** Abre una ventana de WhatsApp con la lista de productos y datos del cliente formateados.

### Patrón Strategy para la Generación de Mensajes
Para estructurar los formatos de mensaje para WhatsApp de forma limpia y declarativa:

```typescript
interface CartItem {
  name: string;
  size: string;
  quantity: number;
}

interface CustomerData {
  name: string;
  city: string;
  phone: string;
}

export function getWhatsAppDispatchUrl(items: CartItem[], customer: CustomerData): string {
  const list = items.map(i => `- ${i.quantity}x ${i.name} (Talle: ${i.size})`).join('\n');
  const text = `Hola, quiero enviar mi lista de pedido mayorista para cotizar:\n\n${list}\n\n*Datos de Contacto:*\n- Razón Social: ${customer.name}\n- Localidad: ${customer.city}\n- Teléfono: ${customer.phone}`;
  return `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
```
---

## 6. Manejo de Imágenes y Optimización Multimedia (Cloudinary)

*   Utilizar transformaciones automáticas (`f_auto,q_auto`) para no sobrecargar los datos móviles del usuario.
*   Cargar las imágenes en contenedores con proporción de aspecto fija (`aspect-square` o `aspect-[4/3]`) y usar la propiedad `fill` junto a `object-cover` para evitar distorsiones.

---

## 7. Estrategia y Directrices de Testing Unitario

Para asegurar la robustez de la aplicación y prevenir fallas críticas en producción:

### Reglas Obligatorias:
1.  **Cobertura Lógica Completa:** No se permite escribir código de lógica core (como helpers de formato, utilidades de carrito, custom hooks o flujos de cotización) sin sus respectivos tests unitarios.
2.  **Casos de Uso del Mundo Real:** Los tests no deben ser redundantes ni limitarse a verificar tipos; deben modelar comportamientos reales del usuario (ej. agregar cantidades de a 6, vaciar la bolsa, validar talle seleccionado).
3.  **Prevención de Brechas (Gaps):** Probar exhaustivamente caminos alternativos y excepciones (ej. inputs numéricos negativos, datos de contacto vacíos o desconexiones locales).

### Aspectos Adicionales a Contemplar:
*   **Sincronización con LocalStorage:** Probar que el estado del carrito persista correctamente tras operaciones de guardado y se recupere intacto al iniciar la app.
*   **Mocks de Next.js:** Mockear utilidades nativas de navegación (`usePathname`, `useRouter`, `<Image />`, `<Link />`) para aislar los tests de integración del framework.
*   **Validación de URLs de Despacho:** Asegurar que la URL generada para WhatsApp contenga los parámetros codificados correspondientes y respete el formato de texto plano sin alterar los artículos.
