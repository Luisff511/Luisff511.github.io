import { HABILIDADES } from "../data/cv.js";
import { traducir } from "../data/textos.js";
import "../styles/cinta.css";

// Dos filas de habilidades que se deslizan en sentidos opuestos con el
// scroll. Decorativa: las habilidades reales están en Formación.
export function Cinta({ idioma }) {
  const textos = HABILIDADES.flatMap((grupo) => grupo.items.map((item) => traducir(item.texto, idioma)));
  const mitad = Math.ceil(textos.length / 2);
  const filas = [textos.slice(0, mitad), textos.slice(mitad)];

  return (
    <div className="cinta" data-progreso="paso" aria-hidden="true">
      {filas.map((fila, n) => (
        <div key={n} className={`cinta__fila cinta__fila--${n}`}>
          {[...fila, ...fila, ...fila].map((texto, i) => (
            <span key={i} className="cinta__item">
              {texto}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
