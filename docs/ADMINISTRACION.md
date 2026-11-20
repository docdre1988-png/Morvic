# Administración — etapa 4

## Primer acceso

1. Copia `.env.example` a `.env` en tu equipo. Este archivo se ignora en Git.
2. Configura `ADMIN_USER` y `ADMIN_PASSWORD` con el usuario y la clave que prefieras, sin longitud mínima obligatoria.
3. La protección de sesión y la comprobación del dominio son automáticas.
4. En tu proyecto nuevo de Supabase ejecuta `setup.sql`. Introduce `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY` en `.env`, nunca en archivos de `src` ni variables `VITE_`.
5. Ejecuta `npm run dev -- --port 5174 --strictPort` y abre `/admin`.

En Vercel estas variables van en la configuración del proyecto. El servidor usa `api/admin.mjs`; el desarrollo local usa la misma función mediante middleware de Vite. `npm run preview` solo sirve archivos estáticos y no ejecuta la API. Producción requiere HTTPS para la cookie Secure. El despliegue y su modalidad comercial se revisarán en la etapa 7.

## Uso cotidiano

- Crea primero las categorías. Una categoría con productos no se puede eliminar.
- Crea una prenda, completa nombre, precio, categoría y tallas separadas por coma.
- Agrega fotos con Elegir una foto, Tomar foto (en celulares compatibles), o arrastrándolas al recuadro. Se reducen automáticamente antes de subirlas. Guarda el producto para publicarlas.
- Elige el color en la paleta; su nombre y muestra se ven en la ficha pública. Usa Vista previa para revisar foto, descripción, color y tallas antes de guardar.
- Desmarca Mostrar en catálogo para ocultar una prenda; desmarca Disponible para impedir que se agregue a la bolsa.
- Eliminar producto solicita confirmación. La eliminación es permanente.
- Quitar del producto retira la referencia al guardar. Los archivos anteriores se conservan para evitar borrar imágenes compartidas; no se muestra una herramienta de limpieza en el panel.
- Ver tienda abre el catálogo público. Al recargar, lee los productos visibles de Supabase. Sin conexión configurada se conserva el catálogo demo local.
- Cierra sesión al terminar. La sesión caduca a las ocho horas. Cambiar las credenciales administrativas invalida las sesiones cuando se utiliza la configuración automática.

La identidad comercial continúa en `src/store.config.ts`. No se ha añadido edición de esos datos desde el panel.

## Verificación pendiente

No se proporcionó un proyecto Supabase ni credenciales administrativas. CRUD, políticas SQL y subida real deben comprobarse al conectarlo, incluyendo una llamada anónima de escritura que debe fallar. No se han creado cuentas ni publicado el sitio.
