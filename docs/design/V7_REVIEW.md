# Districe V7 — dirección editorial y revisión

## Decisiones

- Marcas: se compararon tres columnas/dos filas y dos columnas/tres filas en navegador a 1440 px. Se eligieron tres columnas para el hub: todas las marcas aparecen cerca del primer viewport. Home usa dos columnas junto a una introducción sticky. Tablet: dos columnas; mobile: una.
- `BrandCards` comparte composición, tamaños ópticos y accesibilidad. El nombre se conserva como encabezado accesible; se retiró la duplicación grande junto al logo. Las filas de familia siguen el mismo criterio.
- Home: titular centrado en Districe, menos vacío vertical, fotografía más amplia, fondo navy sin cuadrícula, fundido de 900 ms y caption estable. Pausa explícita, pausa por foco/hover y selección manual; se detienen los temporizadores con la pestaña oculta. El texto inicial permanece visible sin JavaScript.
- Marcas: introducción clara compacta y grilla inmediatamente después.
- Empresa: entrada asimétrica con imagen de preparación, historia en tres capítulos y un índice sticky con estado por intersección. El año no tiene conteo ficticio. En mobile y reduced motion, el índice deja de ser sticky.
- Contacto: los canales pasan al primer viewport desktop; email y teléfonos son enlaces directos. El cierre de orientación se centra y simplifica.
- Productos: apertura fotográfica y grilla de formatos amplios/compactos. Familias con marcas: cabecera dividida; familias con poco contenido: foto panorámica con overlay y consulta directa. No se agregaron productos ni marcas.
- Marca individual: logo y líneas abren la página, sin otro hero azul ni H1 visual redundante. Jarama ahora usa el master rojo sobre superficie clara; el blanco queda disponible en el sistema para fondos oscuros.

## Motion y accesibilidad

- Se conserva Motion for React. No se agregan librerías, videos ni dependencias.
- Entrada de página: desplazamiento de 8 px, 450 ms. Titulares: máscara leve y desplazamiento de 12 px, 700 ms. El contenido está en el DOM desde el servidor y no arranca con opacidad cero.
- Los dos recursos sticky son el índice de Empresa y la introducción de marcas en Home. No hay scroll-jacking, parallax ni listeners de scroll que recalculen una animación por frame.
- Reduced motion desactiva rotación, avance automático, entrada de titulares y transiciones de imágenes. Los selectores manuales siguen funcionando.
- Familias: botones anterior/siguiente, scroll nativo táctil, pausa por hover/foco y pausa persistente al iniciar un gesto táctil.
- Menú mobile: foco contenido mientras está abierto, Escape devuelve foco al disparador. La búsqueda vuelve al botón de menú cuando el disparador desktop está oculto.

## Cifras y textos

- `1987`: año de inicio, sin animar un contador desde cero.
- Familias: `productFamilies.length`, no métrica inventada.
- `72 hs`: junto al texto exacto de `company.logistics`: “Envíos a todo el país dentro de las 72 hs de recibido el pedido.” No se transforma en garantía de entrega a domicilio.
- Se retiraron de páginas, Home, footer y metadata frases internas sobre confirmaciones, fuentes públicas, taxonomía y validación comercial. Las restricciones de catálogo siguen en los datos y en `validate:content`.

## Imágenes

Se reutilizan las seis escenas editoriales y las dos imágenes de operación existentes. Los originales WebP pesan aproximadamente 76–136 KB. Las nuevas composiciones cambian encuadre y overlay, no inventan instalaciones ni productos. No se generaron imágenes nuevas en V7. El origen GENERATED permanece en `ASSET_PROVENANCE.md`.

Se descartó video: estas escenas estáticas ya aportan contexto y admiten transiciones leves sin descarga continua, autoplay ni un fallback adicional.

## QA

- Revisión visual en 1440, 1024, 768 y 390 px: Home, Marcas, Empresa, Contacto, Productos, Estética, Cintas y films y Jarama. Aditivos y Bioepecuén también revisados en escritorio.
- Sin overflow horizontal ni imágenes rotas; un H1 por página. Capturas generadas e inspeccionadas en `/tmp/districe-v7/before/` y `/tmp/districe-v7/after/`.
- Comparaciones representativas: Home, Marcas, Empresa y Contacto en desktop; Marcas y Contacto también tienen captura anterior mobile.
- Axe WCAG 2 A/AA y 2.1 AA: 0 infracciones en ocho rutas × dos tamaños (1440/390), tanto en desarrollo como en build local. No equivale a una auditoría manual completa de lector de pantalla.
- Build de producción local, Chromium sin throttling: CLS 0 en las 16 cargas observadas; LCP entre 28 y 976 ms. Son medidas de laboratorio local con reutilización de caché, no Core Web Vitals de usuarios reales.
- Sin runtime errors ni respuestas HTTP >=400 en el recorrido automatizado. Probados rotación y pausa del hero, avance y pausa de familias, índice de Empresa, menú mobile, búsqueda LOCX, Escape, PDF Bioepecuén, reduced motion y contenido inicial sin JavaScript.
- Se corrigió un exceso de padding heredado en Home. La prueba de cierre de búsqueda se ajustó para esperar su transición de salida de 200 ms antes de verificar que el diálogo fue desmontado.
- La prueba con gestos táctiles reales de Chromium detectó una regla heredada que ocultaba los controles del carril en mobile: se hicieron visibles, con botones de al menos 44 px y reanudación explícita después de deslizar.

## Límites pendientes

Las fotos editoriales siguen siendo representativas: fotos propias verificadas del cliente podrían dar mayor singularidad. Los logos se mantienen sin reconstruir sus artes. Las métricas públicas deben evaluarse con tráfico real; no se declara un score Lighthouse ni una certificación de accesibilidad.
