# Nido Mini · Catálogos Digitales Express

Plantilla React + TypeScript + Vite. Instalación independiente por negocio, sin SaaS ni multiempresa.

## Estado por etapas

- 1 y 2: negocio e identidad aprobados (Nido Mini, ropa general, WhatsApp 51907279299).
- 3: catálogo público, búsqueda, categorías, tallas, bolsa persistente y enlace de pedido por WhatsApp.
- 4: panel `/admin`, sesión firmada HttpOnly de ocho horas, credenciales en servidor, CRUD y subida de imágenes. [Configuración y uso](docs/ADMINISTRACION.md).
- Supabase conectado localmente: tablas y bucket comprobados, acceso administrativo verificado. CRUD completo y fotografías pendientes de comprobación en el dominio final.
- Configuración de Vercel preparada. [Pasos para desplegar](docs/VERCEL.md).

## Ejecutar

Requiere Node.js 22.19+ y npm.

```sh
npm ci
npm run dev
npm run typecheck
npm test
npm run build
```

Abre la URL local que imprime Vite. `npm run preview` sirve el build para revisión local.

## Personalizar

- `src/store.config.ts`: identidad, WhatsApp, colores, contacto, imagen hero y textos. No guardar secretos en este archivo.
- `public/catalog.json`: categorías, productos y variantes de talla de demostración.
- `public/logo.svg`: logo original, editable.
- `public/images/`: recursos locales. Las ilustraciones SVG son originales y reemplazables por fotografías reales.
- `src/cart.ts`: cálculo en céntimos, saneamiento de bolsa y generación del mensaje.

Los precios se expresan en soles (PEN). `visible: false` oculta un producto; `available: false` impide agregarlo. La bolsa guarda referencias y tallas, y recalcula los precios desde el catálogo al cargar; no guarda precios como fuente de verdad. Máximo 20 unidades por producto/talla. Si el almacenamiento está bloqueado, funciona en memoria y muestra un aviso en la bolsa.

No se realizan pagos ni se envían mensajes automáticamente: el cliente revisa y envía el mensaje en WhatsApp. La disponibilidad y entrega se confirman con el negocio. En modo demo, cada mensaje de pedido lleva un aviso de prueba.

Antes de uso comercial real: reemplazar productos/fotografías/precios, quitar `demo` solo cuando sean reales y completar las etapas de servidor, base de datos y verificación. No publicar una administración sin protección.

## Recursos

Foto hero: [Cute Kid Wearing Beige Sweater · Pexels](https://www.pexels.com/photo/cute-kid-wearing-beige-sweater-7671057/). Descargada el 19/11/2026 bajo [licencia Pexels](https://www.pexels.com/license/), que permite uso comercial sujeto a sus restricciones. Se utiliza como inspiración, no como fotografía de un producto real ni como testimonio del menor.

Tipografías: DM Sans y Manrope desde Google Fonts; fallback sans-serif si no hay conexión. Logo e ilustraciones creados para esta plantilla. `node scripts/create-demo-assets.mjs` regenera únicamente las ilustraciones demo.

Al solicitar **NUEVA TIENDA**, conservar el software y comenzar el descubrimiento del nuevo negocio por etapas.

## Adaptación a ropa general

Categorías Mujer, Hombre y Unisex, tres prendas demo e imágenes referenciales generadas con IA. Se conserva la identidad y las funciones existentes. [Recursos y briefs](docs/IMAGENES-MODA.md). El producto existente en Supabase se conservó al añadir las referencias.
