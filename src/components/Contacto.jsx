import { useEffect, useState } from "react";
import { PERFIL } from "../config.js";
import { Molecula } from "./Molecula.jsx";
import { IconoCopiar, IconoDescarga, IconoFlecha, IconoHecho } from "./Iconos.jsx";
import "../styles/contacto.css";

const BASE = import.meta.env.BASE_URL;

// Cada canal es una fila entera pulsable (el enlace del título se extiende
// a toda la fila) con la flecha de "ir a" a la derecha.
function Canal({ titulo, detalle, enlace, icono = <IconoFlecha />, extra, orden = 0 }) {
  return (
    <li className="canal" data-revelar="" style={{ "--i": orden }}>
      <div className="canal__texto">
        <h3 className="canal__titulo">{enlace(titulo)}</h3>
        <p className="canal__detalle">{detalle}</p>
      </div>
      {extra}
      <span className="boton-flecha" aria-hidden="true">
        {icono}
      </span>
    </li>
  );
}

export function Contacto({ t }) {
  const tc = t.contacto;
  const { canales } = tc;
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    if (!copiado) return undefined;
    const temporizador = setTimeout(() => setCopiado(false), 2500);
    return () => clearTimeout(temporizador);
  }, [copiado]);

  const copiarEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERFIL.email);
      setCopiado(true);
    } catch {
      // Sin permiso de portapapeles: el enlace mailto sigue disponible.
    }
  };

  const externo = (href) => (titulo) => (
    <a className="canal__enlace" href={href} target="_blank" rel="noopener noreferrer">
      {titulo}
      <span className="solo-lector"> {t.pestanaNueva}</span>
    </a>
  );

  return (
    <section id="contacto" className="seccion" aria-labelledby="contacto-titulo">
      <div className="contenedor contacto__rejilla">
        <div>
          <header className="seccion__cabecera" data-revelar="cabecera">
            <p className="etiqueta">{tc.etiqueta}</p>
            <h2 id="contacto-titulo">{tc.titulo}</h2>
            <p>{tc.intro}</p>
          </header>

          <ul className="canales">
            <Canal
              orden={0}
              titulo={canales.email.titulo}
              detalle={PERFIL.email}
              enlace={(titulo) => (
                <a className="canal__enlace" href={`mailto:${PERFIL.email}`}>
                  {titulo}
                </a>
              )}
              extra={
                <button type="button" className="boton-copiar" onClick={copiarEmail} aria-label={tc.copiarEtiqueta}>
                  {copiado ? <IconoHecho /> : <IconoCopiar />}
                  <span aria-hidden="true">{copiado ? tc.copiado : tc.copiar}</span>
                  <span className="solo-lector" role="status">
                    {copiado ? tc.copiado : ""}
                  </span>
                </button>
              }
            />
            <Canal orden={1} titulo={canales.linkedin.titulo} detalle={canales.linkedin.texto} enlace={externo(PERFIL.linkedinUrl)} />
            <Canal orden={2} titulo={canales.github.titulo} detalle={canales.github.texto} enlace={externo(PERFIL.githubUrl)} />
            <Canal
              orden={3}
              titulo={canales.cv.titulo}
              detalle={canales.cv.texto}
              icono={<IconoDescarga />}
              enlace={(titulo) => (
                <a className="canal__enlace" href={`${BASE}${PERFIL.cvPdf}`} download>
                  {titulo}
                </a>
              )}
            />
          </ul>
        </div>

        <Molecula className="contacto__molecula" data-revelar="" />
      </div>
    </section>
  );
}
