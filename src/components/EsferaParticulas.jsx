import { useEffect, useRef } from "react";
import { puntosFibonacci, rotarYProyectar } from "../utils/esfera.js";

// Colores a lo largo del degradado bioluminiscente (#00827c -> #cbfffc):
// las partículas del fondo son verde azulado y las de delante, agua clara.
const TEAL = [0, 130, 124];
const AGUA = [203, 255, 252];
const NIVELES = 8;
const COLORES = Array.from({ length: NIVELES }, (_, i) => {
  const t = i / (NIVELES - 1);
  const [r, g, b] = TEAL.map((valor, k) => Math.round(valor + (AGUA[k] - valor) * t));
  return `rgb(${r} ${g} ${b})`;
});
const ROSA = "rgb(250 209 255)";

/**
 * Esfera de partículas que gira en un <canvas>. Se inclina siguiendo el
 * puntero, se detiene cuando no está en pantalla o la pestaña está oculta
 * y se queda quieta si el sistema pide reducir el movimiento.
 */
export function EsferaParticulas({ className }) {
  const lienzoRef = useRef(null);

  useEffect(() => {
    const lienzo = lienzoRef.current;
    const ctx = lienzo?.getContext("2d");
    if (!ctx) return undefined;

    const sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const puntero = { x: 0, y: 0 };
    const giro = { x: 0, y: 0 };
    let ancho = 0;
    let alto = 0;
    let puntos = [];
    let tiempo = 0;
    let ultimo = 0;
    let idFrame = 0;
    let enPantalla = true;

    const dibujar = () => {
      ctx.clearRect(0, 0, ancho, alto);
      // En móvil la esfera desborda los lados: más grande y menos densa tras el texto.
      const radio = Math.min(ancho * 0.6, alto * 0.42);
      const centroX = ancho / 2;
      const centroY = alto / 2;
      const anguloY = tiempo * 0.00011 + giro.x * 0.5;
      const anguloX = -0.32 + giro.y * 0.35;

      for (const punto of puntos) {
        const p = rotarYProyectar(punto, anguloY, anguloX);
        const latido = 1 + 0.03 * Math.sin(tiempo * 0.0011 + punto.fase);
        const profundidad = (p.z + 1) / 2; // 0 = detrás, 1 = delante
        const borde = 1 - Math.abs(p.z); // 1 = en la silueta

        ctx.globalAlpha = 0.12 + 0.78 * profundidad ** 1.4;
        ctx.fillStyle =
          punto.rosa && borde > 0.82 ? ROSA : COLORES[Math.min(NIVELES - 1, Math.floor(profundidad * NIVELES))];
        ctx.beginPath();
        ctx.arc(
          centroX + p.x * radio * latido,
          centroY + p.y * radio * latido,
          0.5 + 1.5 * profundidad * p.escala,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const bucle = (ahora) => {
      const delta = ultimo ? Math.min(ahora - ultimo, 50) : 16;
      ultimo = ahora;
      tiempo += delta;
      giro.x += (puntero.x - giro.x) * 0.03;
      giro.y += (puntero.y - giro.y) * 0.03;
      dibujar();
      idFrame = requestAnimationFrame(bucle);
    };

    const arrancar = () => {
      if (sinMovimiento || idFrame || !enPantalla || document.hidden) return;
      ultimo = 0;
      idFrame = requestAnimationFrame(bucle);
    };

    const parar = () => {
      cancelAnimationFrame(idFrame);
      idFrame = 0;
    };

    const dimensionar = () => {
      // Tamaño de maquetación, sin el zoom que le aplica el scroll del inicio.
      const width = lienzo.clientWidth;
      const height = lienzo.clientHeight;
      const densidad = Math.min(window.devicePixelRatio || 1, 2);
      ancho = width;
      alto = height;
      lienzo.width = Math.round(width * densidad);
      lienzo.height = Math.round(height * densidad);
      ctx.setTransform(densidad, 0, 0, densidad, 0, 0);
      const cantidad = width < 640 ? 650 : 1100;
      if (puntos.length !== cantidad) puntos = puntosFibonacci(cantidad);
      dibujar();
    };

    const alMoverPuntero = (evento) => {
      puntero.x = (evento.clientX / window.innerWidth) * 2 - 1;
      puntero.y = (evento.clientY / window.innerHeight) * 2 - 1;
    };

    const alCambiarVisibilidad = () => {
      if (document.hidden) parar();
      else arrancar();
    };

    const observadorTamano = new ResizeObserver(dimensionar);
    observadorTamano.observe(lienzo);

    const observadorVista = new IntersectionObserver(([entrada]) => {
      enPantalla = entrada.isIntersecting;
      if (enPantalla) arrancar();
      else parar();
    });
    observadorVista.observe(lienzo);

    document.addEventListener("visibilitychange", alCambiarVisibilidad);
    if (!sinMovimiento) window.addEventListener("pointermove", alMoverPuntero, { passive: true });

    dimensionar();
    arrancar();

    return () => {
      parar();
      observadorTamano.disconnect();
      observadorVista.disconnect();
      document.removeEventListener("visibilitychange", alCambiarVisibilidad);
      window.removeEventListener("pointermove", alMoverPuntero);
    };
  }, []);

  return <canvas ref={lienzoRef} className={className} aria-hidden="true" />;
}
