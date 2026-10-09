import { useCallback, useEffect, useState } from "react";
import { PERFIL } from "./config.js";
import { TEXTOS } from "./data/textos.js";
import { useGithubRepos } from "./hooks/useGithubRepos.js";
import { usePreferencia } from "./hooks/usePreferencia.js";
import { useConsultaMedia } from "./hooks/useConsultaMedia.js";
import { useAnimacionesScroll } from "./hooks/useAnimacionesScroll.js";
import { Cabecera } from "./components/Cabecera.jsx";
import { Hero } from "./components/Hero.jsx";
import { Manifiesto } from "./components/Manifiesto.jsx";
import { Cifras } from "./components/Cifras.jsx";
import { Proyectos } from "./components/Proyectos.jsx";
import { Trayectoria } from "./components/Trayectoria.jsx";
import { Cinta } from "./components/Cinta.jsx";
import { Formacion } from "./components/Formacion.jsx";
import { Contacto } from "./components/Contacto.jsx";

const idiomaDelNavegador = () => (navigator.language?.toLowerCase().startsWith("es") ? "es" : "en");

export default function App() {
  const [idioma, setIdioma] = usePreferencia("idioma", idiomaDelNavegador);
  const menosMovimiento = useConsultaMedia("(prefers-reduced-motion: reduce)");
  const t = TEXTOS[idioma] ?? TEXTOS.es;
  useAnimacionesScroll();

  // Los repos se piden aquí (y no en Proyectos) porque también los usan
  // Cifras (el total) y Formación (qué habilidades enlazan con proyectos).
  const github = useGithubRepos(PERFIL.githubUsuario);
  const [filtros, setFiltros] = useState({ busqueda: "", lenguaje: null, orden: "recientes" });
  const cambiarFiltros = useCallback((cambios) => setFiltros((previos) => ({ ...previos, ...cambios })), []);

  useEffect(() => {
    document.documentElement.lang = idioma;
    document.title = t.tituloPagina;
  }, [idioma, t]);

  const elegirHabilidad = (accion) => {
    setFiltros((previos) => ({ ...previos, busqueda: accion.busqueda ?? "", lenguaje: accion.lenguaje ?? null }));
    const titulo = document.getElementById("proyectos-titulo");
    titulo?.scrollIntoView({ behavior: menosMovimiento ? "auto" : "smooth", block: "start" });
    titulo?.focus({ preventScroll: true });
  };

  return (
    <>
      <div className="progreso-pagina" aria-hidden="true" />
      <a className="saltar" href="#contenido">
        {t.saltar}
      </a>
      <Cabecera t={t} idioma={idioma} onCambiarIdioma={() => setIdioma(idioma === "es" ? "en" : "es")} />
      <main id="contenido">
        <Hero t={t} idioma={idioma} />
        <Manifiesto t={t} />
        <Cifras t={t} github={github} />
        <Proyectos github={github} filtros={filtros} onCambiarFiltros={cambiarFiltros} idioma={idioma} t={t} />
        <Trayectoria t={t} idioma={idioma} />
        <Cinta idioma={idioma} />
        <Formacion t={t} idioma={idioma} repos={github.repos} onElegirHabilidad={elegirHabilidad} />
        <Contacto t={t} />
      </main>
      <footer className="pie" data-progreso="entrada">
        <div className="contenedor">
          <p className="pie__texto">
            © {new Date().getFullYear()} {PERFIL.nombre}. {t.pie}
          </p>
          {/* Cada letra sube desde el borde inferior al llegar al final */}
          <p className="pie__gigante" aria-hidden="true">
            {[...PERFIL.nombreCorto].map((letra, i) => (
              <span key={i} style={{ "--i": i }}>
                {letra === " " ? "\u00a0" : letra}
              </span>
            ))}
          </p>
        </div>
      </footer>
    </>
  );
}
