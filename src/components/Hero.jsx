import { PERFIL } from "../config.js";
import { RESUMEN } from "../data/cv.js";
import { IconoDescarga, IconoGithub, IconoLinkedin } from "./Iconos.jsx";
import "../styles/hero.css";

const BASE = import.meta.env.BASE_URL;

export function Hero({ t, idioma }) {
  // "Luis Fernando" / "Franco Morales": el nombre en dos líneas equilibradas.
  const partes = PERFIL.nombre.split(" ");
  const mitad = Math.ceil(partes.length / 2);
  const primeraLinea = partes.slice(0, mitad).join(" ");
  const segundaLinea = partes.slice(mitad).join(" ");

  return (
    <section id="inicio" className="hero" aria-labelledby="hero-nombre">
      <div className="contenedor hero__rejilla">
        <div className="hero__texto">
          <h1 id="hero-nombre" className="hero__nombre">
            <span>{primeraLinea}</span>
            {segundaLinea && <span>{segundaLinea}</span>}
          </h1>
          <div className="hero__carretera" aria-hidden="true" />
          <p className="hero__rol">{t.hero.rol}</p>
          <p className="hero__intro">{RESUMEN[idioma]}</p>

          <div className="acciones">
            <a className="boton boton--principal" href="#proyectos">
              {t.hero.verProyectos}
            </a>
            <a className="boton" href={PERFIL.linkedinUrl} target="_blank" rel="noopener noreferrer">
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

        <img
          className="hero__foto"
          src={`${BASE}${PERFIL.foto}`}
          alt={t.hero.altFoto}
          width="139"
          height="196"
        />
      </div>
    </section>
  );
}
