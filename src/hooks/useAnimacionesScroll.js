import { useEffect } from "react";

const limitar = (valor) => Math.min(1, Math.max(0, valor));

// Progreso (0 a 1) de un elemento según su modo:
// - "fijo": sección alta con una escena sticky dentro; 0 al llegar arriba, 1 al soltarse.
// - "paso": recorrido completo por la pantalla, de entrar por abajo a salir por arriba.
// - "entrada": de asomar por abajo a estar entero en pantalla.
function progreso(elemento, alto) {
  const caja = elemento.getBoundingClientRect();
  const modo = elemento.dataset.progreso;
  if (modo === "fijo") return limitar(-caja.top / Math.max(1, caja.height - alto));
  if (modo === "entrada") return limitar((alto - caja.top) / Math.max(1, Math.min(caja.height, alto)));
  return limitar((alto - caja.top) / (alto + caja.height));
}

/**
 * Motor de las animaciones de scroll de toda la página, en un solo sitio:
 * - [data-revelar] aparece (recibe data-visto) al entrar en pantalla, también si se añade después.
 * - [data-progreso] recibe --p con su progreso, en un único bucle por frame.
 * - <html> recibe --scroll (progreso de la página) y data-cabecera (arriba, bajando o subiendo).
 * - Las tarjetas reciben --mx/--my con la posición del puntero para el foco de luz.
 * Solo actúa si index.html marcó <html class="anima"> (hay movimiento permitido).
 */
export function useAnimacionesScroll() {
  useEffect(() => {
    const raiz = document.documentElement;
    if (!raiz.classList.contains("anima")) return undefined;

    const observadorVista = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting) continue;
          entrada.target.dataset.visto = "";
          observadorVista.unobserve(entrada.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );

    const observarNuevos = (base) => {
      if (!(base instanceof Element)) return;
      if (base.matches("[data-revelar]:not([data-visto])")) observadorVista.observe(base);
      base.querySelectorAll("[data-revelar]:not([data-visto])").forEach((el) => observadorVista.observe(el));
    };
    observarNuevos(document.body);

    // Los proyectos llegan más tarde desde GitHub: se vigilan los nodos nuevos.
    const observadorCambios = new MutationObserver((cambios) => {
      for (const cambio of cambios) cambio.addedNodes.forEach(observarNuevos);
    });
    observadorCambios.observe(document.body, { childList: true, subtree: true });

    let idFrame = 0;
    let ultimoScroll = window.scrollY;

    const actualizar = () => {
      idFrame = 0;
      const alto = window.innerHeight;
      const y = window.scrollY;
      const total = Math.max(1, raiz.scrollHeight - alto);
      raiz.style.setProperty("--scroll", (y / total).toFixed(4));

      if (y < 80) raiz.dataset.cabecera = "arriba";
      else if (Math.abs(y - ultimoScroll) > 6) raiz.dataset.cabecera = y > ultimoScroll ? "bajando" : "subiendo";
      if (Math.abs(y - ultimoScroll) > 6 || y < 80) ultimoScroll = y;

      document.querySelectorAll("[data-progreso]").forEach((el) => {
        el.style.setProperty("--p", progreso(el, alto).toFixed(4));
      });
    };

    const pedirFrame = () => {
      if (!idFrame) idFrame = requestAnimationFrame(actualizar);
    };

    const alMoverPuntero = (evento) => {
      const tarjeta = evento.target instanceof Element && evento.target.closest(".proyecto, .canal");
      if (!tarjeta) return;
      const caja = tarjeta.getBoundingClientRect();
      tarjeta.style.setProperty("--mx", `${evento.clientX - caja.left}px`);
      tarjeta.style.setProperty("--my", `${evento.clientY - caja.top}px`);
    };

    actualizar();
    window.addEventListener("scroll", pedirFrame, { passive: true });
    window.addEventListener("resize", pedirFrame);
    window.addEventListener("pointermove", alMoverPuntero, { passive: true });

    return () => {
      cancelAnimationFrame(idFrame);
      observadorVista.disconnect();
      observadorCambios.disconnect();
      window.removeEventListener("scroll", pedirFrame);
      window.removeEventListener("resize", pedirFrame);
      window.removeEventListener("pointermove", alMoverPuntero);
    };
  }, []);
}
