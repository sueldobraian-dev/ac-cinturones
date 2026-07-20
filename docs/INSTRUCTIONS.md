# Instrucciones de Configuración y Uso

Este documento detalla la configuración y procedimientos para gestionar los datos y variables de entorno del e-commerce.

## Configuración del Entorno (.env)

La aplicación requiere configurar la variable de entorno de WhatsApp para redirigir los pedidos de los clientes correctamente.

1. Cree una copia del archivo `.env.example` en la raíz del proyecto y renombre la copia a `.env` (para desarrollo local) o `.env.local` (excluido del control de versiones):
   ```bash
   cp .env.example .env
   ```
2. Configure la siguiente variable de entorno:
   * **`NEXT_PUBLIC_WHATSAPP_CONTACT_NUMBER`**: Número telefónico de WhatsApp de la empresa (con código de país, sin el signo `+` ni espacios ni guiones). Ejemplo: `5491123456789`.

## Gestión de Datos (Catálogo de Productos)

Los productos visibles en la sección `/catalogo` se cargan de forma dinámica desde un archivo JSON:

1. **Archivo de Datos**: El listado de productos se administra en [products.json](file:///d:/Repositories/dani/ac-cinturones/src/data/products.json).
2. **Imágenes**: Suba las imágenes del cinturón a [public/images/cintos/](file:///d:/Repositories/dani/ac-cinturones/public/images/cintos/) y asocie el nombre exacto de la foto en la propiedad `"image"` del JSON.
3. **Estructura del Producto**:
   * `"name"`: Nombre del cinturón.
   * `"article"`: Código del artículo (ej. `AC-569`).
   * `"image"`: Ruta relativa a la imagen (ej. `/images/cintos/569.jpg`).
   * `"style"`: Categoría de filtrado (ej. `Premium`, `Trenzados`, `Rústicos`, `Combinados`, `Clásicos`, `Reversibles`).
   * `"description"`: Detalle del producto visible para el cliente.

## Gestión de Datos (Carrusel de Materias Primas)

Las materias primas y materiales visibles en la sección `/materia-prima` se configuran en el carrusel interactivo:

1. **Archivo de Datos**: El listado se administra en [materials.json](file:///d:/Repositories/dani/ac-cinturones/src/data/materials.json).
2. **Imágenes**: Suba las fotos a [public/images/carrousel-materials/](file:///d:/Repositories/dani/ac-cinturones/public/images/carrousel-materials/) y asocie la foto en la propiedad `"image"` del JSON.
3. **Estructura**:
   * `"article"`: Código de artículo de la materia prima (ej. `AC-219`).
   * `"name"`: Nombre de la variante o cuero.
   * `"description"`: Breve descripción técnica.
   * `"image"`: Ruta a la foto (ej. `/images/carrousel-materials/219.jpg`).
   * `"properties"`: Array de atributos clave visibles para el cliente (ej. `["35 mm", "Bordado Artesanal", "Marrón"]`).
