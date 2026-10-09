import { PERFIL } from "../config.js";
import { RESUMEN } from "../data/cv.js";
import { EsferaParticulas } from "./EsferaParticulas.jsx";
import { EnlaceExterno } from "./EnlaceExterno.jsx";
import { IconoFlecha } from "./Iconos.jsx";
import "../styles/hero.css";

const BASE = import.meta.env.BASE_URL;

// La sección es más alta que la pantalla y la escena va fija dentro: al
// bajar, el texto se aleja y la cámara se acerca a la esfera (--p).
export function Hero({ t, idioma }) {
  // "Luis Fernando" / "Franco Morales": el nombre en dos líneas equilibradas.
  const partes = PERFIL.nombre.split(" ");
  const mitad = Math.ceil(partes.length / 2);
  const lineas = [partes.slice(0, mitad).join(" "), partes.slice(mitad).join(" ")];

  return (
    <section id="inicio" className="hero" data-progreso="fijo" aria-labelledby="hero-nombre">
      <div className="hero__escena">
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
          <p className="etiqueta hero__entra" style={{ "--d": 0 }}>
            {t.hero.etiqueta}
          </p>
          <h1 id="hero-nombre" className="hero__nombre">
            {lineas.map((linea, i) => (
              <span key={linea} className="hero__linea">
                <span style={{ "--d": i + 1 }}>{linea}</span>{" "}
              </span>
            ))}
          </h1>
          <p className="hero__intro hero__entra" style={{ "--d": 3 }}>
            {RESUMEN[idioma]}
          </p>

          <div className="acciones acciones--centro hero__entra" style={{ "--d": 4 }}>
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

        <p className="hero__desliza" aria-hidden="true">
          {t.hero.desliza}
          <span className="hero__desliza-linea" />
        </p>
      </div>
    </section>
  );
}
