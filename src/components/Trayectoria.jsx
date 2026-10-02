import { useState } from "react";
import { EXPERIENCIA } from "../data/cv.js";
import { aAnioDecimal, anioDecimalActual, formatearPeriodo } from "../utils/fechas.js";
import "../styles/trayectoria.css";

const INICIO_EJE = 2015;

// Cada trabajo es un "carril" de carretera sobre un eje 2015 – hoy.
// Al pulsarlo se muestran sus logros debajo.
export function Trayectoria({ t, idioma }) {
  const tt = t.trayectoria;
  const [seleccion, setSeleccion] = useState(EXPERIENCIA[0].id);
  const hoy = anioDecimalActual();
  const posicion = (anio) => ((anio - INICIO_EJE) / (hoy - INICIO_EJE)) * 100;

  const marcas = [];
  for (let anio = INICIO_EJE; anio <= hoy - 1; anio += 2) marcas.push(anio);

  const activa = EXPERIENCIA.find((exp) => exp.id === seleccion);

  return (
    <section id="trayectoria" className="seccion" aria-labelledby="trayectoria-titulo">
      <div className="contenedor">
        <header className="seccion__cabecera">
          <h2 id="trayectoria-titulo">{tt.titulo}</h2>
          <p>{tt.intro}</p>
        </header>

        <div className="carretera">
          <ul className="carriles">
            {EXPERIENCIA.map((exp) => {
              const inicio = posicion(aAnioDecimal(exp.inicio));
              const fin = exp.fin ? posicion(aAnioDecimal(exp.fin, true)) : 100;
              const elegido = exp.id === seleccion;
              return (
                <li key={exp.id}>
                  <button
                    type="button"
                    className="carril"
                    aria-pressed={elegido}
                    aria-controls="detalle-experiencia"
                    onClick={() => setSeleccion(exp.id)}
                  >
                    <span className="carril__etiqueta">
                      <span className="carril__puesto">{exp.puesto[idioma]}</span>
                      <span className="carril__periodo">{formatearPeriodo(exp.inicio, exp.fin, tt.actualidad)}</span>
                    </span>
                    <span className="carril__via" aria-hidden="true">
                      <span
                        className="carril__tramo"
                        style={{ "--inicio": `${inicio}%`, "--ancho": `${fin - inicio}%` }}
                      />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="eje" aria-hidden="true">
            {marcas.map((anio, i) => (
              <span
                key={anio}
                className={i % 2 ? "eje__marca eje__marca--secundaria" : "eje__marca"}
                style={{ "--pos": `${posicion(anio)}%` }}
              >
                {anio}
              </span>
            ))}
            <span className="eje__marca eje__marca--hoy">{tt.hoy}</span>
          </div>
        </div>

        <article id="detalle-experiencia" className="detalle" aria-live="polite" key={activa.id}>
          <h3 className="detalle__puesto">{activa.puesto[idioma]}</h3>
          <p className="detalle__empresa">
            {activa.empresa[idioma]}, {activa.lugar[idioma]}. {formatearPeriodo(activa.inicio, activa.fin, tt.actualidad)}
          </p>
          <ul className="detalle__logros">
            {activa.logros[idioma].map((logro) => (
              <li key={logro}>{logro}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
