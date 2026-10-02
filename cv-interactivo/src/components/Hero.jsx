import { PERFIL } from "../config.js";
import { RESUMEN } from "../data/cv.js";
import { EsferaParticulas } from "./EsferaParticulas.jsx";
import { EnlaceExterno } from "./EnlaceExterno.jsx";
import { IconoFlecha } from "./Iconos.jsx";
import "../styles/hero.css";

const BASE = import.meta.env.BASE_URL;

export function Hero({ t, idioma }) {
  // "Luis Fernando" / "Franco Morales": el nombre en dos líneas equilibradas.
  const partes = PERFIL.nombre.split(" ");
  const mitad = Math.ceil(partes.length / 2);

  return (
    <section id="inicio" className="hero" aria-labelledby="hero-nombre">
      <EsferaParticulas className="hero__esfera" />

      <div className="contenedor hero__contenido">
        {PERFIL.foto && (
          <img
            className="hero__foto"
            src={`${BASE}${PERFIL.foto}`}
            alt={t.hero.altFoto}
            width="120"
            height="120"
            onError={(evento) => {
              // Si el archivo no existe, se oculta en vez de mostrar una imagen rota.
              evento.currentTarget.hidden = true;
            }}
          />
        )}
        <p className="etiqueta">{t.hero.etiqueta}</p>
        <h1 id="hero-nombre" className="hero__nombre">
          <span>{partes.slice(0, mitad).join(" ")}</span> <span>{partes.slice(mitad).join(" ")}</span>
        </h1>
        <p className="hero__intro">{RESUMEN[idioma]}</p>

        <div className="acciones acciones--centro">
          <a className="boton boton--aurora" href="#proyectos">
            {t.hero.verProyectos}
          </a>
          <EnlaceExterno className="boton" href={PERFIL.linkedinUrl} aviso={t.pestanaNueva}>
            LinkedIn
            <IconoFlecha />
          </EnlaceExterno>
          <EnlaceExterno className="boton" href={PERFIL.githubUrl} aviso={t.pestanaNueva}>
            GitHub
            <IconoFlecha />
          </EnlaceExterno>
        </div>
      </div>
    </section>
  );
}
