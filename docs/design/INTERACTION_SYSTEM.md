# Sistema de interacción — Home V2

## Principio

La interacción orienta, descubre o confirma. Las animaciones decorativas, autoplay y scroll-jacking quedan fuera.

| Patrón | Problema UX | Decisión | Coste / accesibilidad / mobile |
| --- | --- | --- | --- |
| Motion for React | Dar continuidad a apertura, hover, foco y reveal sin listeners manuales. | Adoptar para componentes interactivos aislados. | Dependencia única, tree-shakeable. `MotionConfig` y CSS respetan reduced-motion; hover nunca es la única vía. |
| Carril de familias nativo | Descubrir seis familias en poco espacio con mouse, touch y trackpad. | Adaptar, no usar Embla. | Scroll nativo, snap, botones y teclado; menos JS y mejor soporte móvil. |
| Mega menú de Productos | Reducir un clic y mostrar la taxonomía al explorar. | Adaptar con botón/disclosure propio. | HTML `nav`, botones y Escape; no justifica Radix completo aún. Mobile conserva panel independiente. |
| Búsqueda comercial tipo palette | Encontrar familia, marca o línea sin recorrer el home. | Adoptar como diálogo propio, no Command de shadcn. | Datos locales; foco, Escape y flechas. Sin backend ni historial persistente. |
| shadcn/ui Command / Dialog | Primitives accesibles disponibles. | Descartar por ahora. | Requiere Tailwind y dependencias/base UI que duplicarían el sistema actual para una única búsqueda. |
| Radix Navigation Menu / Dialog | Keyboard/focus complejos para menús superpuestos. | Descartar por ahora; reevaluar al crecer la navegación. | Su semántica no es necesaria para el alcance actual; se preserva navegación HTML convencional. |
| Embla Carousel | Drag, snap y controles de carrusel. | Descartar. | El carril nativo ya resuelve touch, trackpad y teclado con menor bundle. |
| Aceternity / 21st.dev | Explorar lenguaje de interacción contemporáneo. | Usar sólo como inspiración: profundidad, reveal y composición. | No se copia código ni estética SaaS/crypto; no se añaden dependencias. |

## Tokens de motion

- `--motion-fast`: 160ms, feedback de botón, flecha y foco.
- `--motion-base`: 300ms, menú, tarjeta y cambios de estado.
- `--motion-enter`: 560ms, reveal de bloque; sólo una vez y con desplazamiento corto.
- Easing: salida editorial `cubic-bezier(.22,1,.36,1)`; resortes sólo para drag.
- Con `prefers-reduced-motion`, se elimina desplazamiento/escala y se conserva feedback de opacidad/color.
