# Imágenes referenciales de moda

Generadas con la herramienta integrada image_gen, el 20/11/2026. Son referencias de demostración, no fotografías de inventario real.

Archivos finales en `public/images/`:

- `hero-moda.png`: fotografía editorial de dos modelos adultos latinoamericanos, camisa de lino crema, pantalón terracota, sobrecamisa salvia y chinos beige. Luz natural, pared cálida, encuadre horizontal, sin marcas ni texto.
- `camisa-lino.png`: fotografía de catálogo de una camisa adulta unisex de lino crema, maniquí invisible, vista frontal, fondo cálido gris, luz suave, sin texto ni marcas.
- `pantalon-terracota.png`: fotografía de catálogo de pantalón adulto de mujer, corte amplio terracota, maniquí invisible, vista frontal, fondo cálido gris, luz suave, sin texto ni marcas.
- `sobrecamisa-salvia.png`: fotografía de catálogo de sobrecamisa adulta unisex verde salvia con bolsillos, maniquí invisible, vista frontal, fondo cálido gris, luz suave, sin texto ni marcas.

Estos briefs resumen el conjunto de prompts usado. Las imágenes infantiles anteriores se conservan en el historial y los archivos, pero ya no se referencian desde el catálogo ni el hero.

`node --env-file=.env scripts/seed-demo.mjs` añade las tres prendas demo a Supabase sin borrar ni editar registros existentes. Evita duplicados por ruta de imagen y condición demo.

## Cuatro referencias adicionales — ALMA Estudio

Generadas con image_gen integrado. Archivos en `public/images/`: `vestido-arena.png`, `polo-negro.png`, `jean-azul.png` y `chompa-crema.png`.

Prompt utilizado para cada archivo:

“Use case: product-mockup. Premium ecommerce photograph of a single [SUBJECT] on invisible mannequin, front view, complete garment centered with generous margins. Realistic fabric textures, soft warm gray studio backdrop and subtle grounded shadow, consistent diffuse daylight, portrait 4:5 composition. No people, text, logos or watermark. Referential adult fashion product photograph.”

Subjects, en el mismo orden: “adult women’s sand beige midi dress, short sleeves, belted waist”; “adult unisex black crew neck cotton t-shirt”; “adult straight leg blue denim jeans”; “adult unisex cream knit crewneck sweater”.
