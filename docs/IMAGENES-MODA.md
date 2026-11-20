# Imágenes referenciales de moda

Generadas con la herramienta integrada image_gen, el 20/11/2026. Son referencias de demostración, no fotografías de inventario real.

Archivos finales en `public/images/`:

- `hero-moda.png`: fotografía editorial de dos modelos adultos latinoamericanos, camisa de lino crema, pantalón terracota, sobrecamisa salvia y chinos beige. Luz natural, pared cálida, encuadre horizontal, sin marcas ni texto.
- `camisa-lino.png`: fotografía de catálogo de una camisa adulta unisex de lino crema, maniquí invisible, vista frontal, fondo cálido gris, luz suave, sin texto ni marcas.
- `pantalon-terracota.png`: fotografía de catálogo de pantalón adulto de mujer, corte amplio terracota, maniquí invisible, vista frontal, fondo cálido gris, luz suave, sin texto ni marcas.
- `sobrecamisa-salvia.png`: fotografía de catálogo de sobrecamisa adulta unisex verde salvia con bolsillos, maniquí invisible, vista frontal, fondo cálido gris, luz suave, sin texto ni marcas.

Estos briefs resumen el conjunto de prompts usado. Las imágenes infantiles anteriores se conservan en el historial y los archivos, pero ya no se referencian desde el catálogo ni el hero.

`node --env-file=.env scripts/seed-demo.mjs` añade las tres prendas demo a Supabase sin borrar ni editar registros existentes. Evita duplicados por ruta de imagen y condición demo.
