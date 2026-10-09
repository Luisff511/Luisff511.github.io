import { useEffect, useRef, useState } from "react";

const DURACION = 1600;
const frenada = (x) => (x === 1 ? 1 : 1 - 2 ** (-10 * x));

// Cuenta desde 0 hasta la cifra cuando entra en pantalla ("30 %" cuenta el 30
// y conserva el resto). El lector de pantalla oye directamente el valor final.
export function Contador({ valor }) {
  const ref = useRef(null);
  const [, numero, resto] = /^(\d+)(.*)$/s.exec(valor) ?? [];
  const objetivo = numero === undefined ? null : Number(numero);
  const animado = objetivo !== null && document.documentElement.classList.contains("anima");
  const [actual, setActual] = useState(animado ? 0 : objetivo);

  useEffect(() => {
    if (!animado) return undefined;
    let idFrame = 0;
    const observador = new IntersectionObserver(([entrada]) => {
      if (!entrada.isIntersecting) return;
      observador.disconnect();
      const inicio = performance.now();
      const paso = (ahora) => {
        const x = Math.min(1, (ahora - inicio) / DURACION);
        setActual(Math.round(objetivo * frenada(x)));
        if (x < 1) idFrame = requestAnimationFrame(paso);
      };
      idFrame = requestAnimationFrame(paso);
    });
    observador.observe(ref.current);
    return () => {
      observador.disconnect();
      cancelAnimationFrame(idFrame);
    };
  }, [animado, objetivo]);

  if (objetivo === null) return valor;
  return (
    <span ref={ref}>
      <span aria-hidden="true">
        {actual}
        {resto}
      </span>
      <span className="solo-lector">{valor}</span>
    </span>
  );
}
