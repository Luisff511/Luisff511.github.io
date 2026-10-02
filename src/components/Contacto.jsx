import { useEffect, useState } from "react";
import { PERFIL } from "../config.js";
import { IconoCopiar, IconoDescarga, IconoGithub, IconoLinkedin } from "./Iconos.jsx";
import "../styles/contacto.css";

const BASE = import.meta.env.BASE_URL;

export function Contacto({ t }) {
  const tc = t.contacto;
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
      // Sin permiso de portapapeles: queda el enlace mailto como alternativa.
    }
  };

  return (
    <section id="contacto" className="seccion contacto" aria-labelledby="contacto-titulo">
      <div className="contenedor">
        <header className="seccion__cabecera">
          <h2 id="contacto-titulo">{tc.titulo}</h2>
          <p>{tc.intro}</p>
        </header>

        <div className="contacto__email">
          <a href={`mailto:${PERFIL.email}`} className="contacto__direccion">
            {PERFIL.email}
          </a>
          <button type="button" className="boton" onClick={copiarEmail}>
            <IconoCopiar />
            {copiado ? tc.copiado : tc.copiar}
          </button>
          <span className="solo-lector" role="status">
            {copiado ? tc.copiado : ""}
          </span>
        </div>

        <div className="acciones">
          <a className="boton boton--principal" href={PERFIL.linkedinUrl} target="_blank" rel="noopener noreferrer">
            <IconoLinkedin />
            LinkedIn
          </a>
          <a className="boton" href={PERFIL.githubUrl} target="_blank" rel="noopener noreferrer">
            <IconoGithub />
            GitHub
          </a>
          <a className="boton boton--discreto" href={`${BASE}${PERFIL.cvPdf}`} download>
            <IconoDescarga />
            {t.hero.descargarCv}
          </a>
        </div>
      </div>
    </section>
  );
}
