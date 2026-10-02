import { useCallback, useEffect, useState } from "react";
import { PERFIL } from "./config.js";
import { TEXTOS } from "./data/textos.js";
import { useGithubRepos } from "./hooks/useGithubRepos.js";
import { usePreferencia } from "./hooks/usePreferencia.js";
import { useConsultaMedia } from "./hooks/useConsultaMedia.js";
import { Cabecera } from "./components/Cabecera.jsx";
import { Hero } from "./components/Hero.jsx";
import { Proyectos } from "./components/Proyectos.jsx";
import { Trayectoria } from "./components/Trayectoria.jsx";
import { Formacion } from "./components/Formacion.jsx";
import { Contacto } from "./components/Contacto.jsx";

const idiomaDelNavegador = () => (navigator.language?.toLowerCase().startsWith("es") ? "es" : "en");

export default function App() {
  const [idioma, setIdioma] = usePreferencia("idioma", idiomaDelNavegador);
  const [preferenciaTema, setPreferenciaTema] = usePreferencia("tema", null);
  const sistemaOscuro = useConsultaMedia("(prefers-color-scheme: dark)");
  const menosMovimiento = useConsultaMedia("(prefers-reduced-motion: reduce)");
  const tema = preferenciaTema ?? (sistemaOscuro ? "oscuro" : "claro");
  const t = TEXTOS[idioma] ?? TEXTOS.es;

  // Los repos se piden aquí (y no en Proyectos) porque también los usa
  // Formación para saber qué habilidades enlazan con algún proyecto.
  const github = useGithubRepos(PERFIL.githubUsuario);
  const [filtros, setFiltros] = useState({ busqueda: "", lenguaje: null, orden: "recientes" });
  const cambiarFiltros = useCallback((cambios) => setFiltros((previos) => ({ ...previos, ...cambios })), []);

  useEffect(() => {
    document.documentElement.lang = idioma;
    document.title = t.tituloPagina;
  }, [idioma, t]);

  useEffect(() => {
    const raiz = document.documentElement;
    if (preferenciaTema) raiz.dataset.tema = preferenciaTema;
    else delete raiz.dataset.tema;
  }, [preferenciaTema]);

  const elegirHabilidad = (accion) => {
    setFiltros((previos) => ({ ...previos, busqueda: accion.busqueda ?? "", lenguaje: accion.lenguaje ?? null }));
    const titulo = document.getElementById("proyectos-titulo");
    titulo?.scrollIntoView({ behavior: menosMovimiento ? "auto" : "smooth", block: "start" });
    titulo?.focus({ preventScroll: true });
  };

  return (
    <>
      <a className="saltar" href="#contenido">
        {t.saltar}
      </a>
      <Cabecera
        t={t}
        idioma={idioma}
        onCambiarIdioma={() => setIdioma(idioma === "es" ? "en" : "es")}
        tema={tema}
        onCambiarTema={() => setPreferenciaTema(tema === "oscuro" ? "claro" : "oscuro")}
      />
      <main id="contenido">
        <Hero t={t} idioma={idioma} />
        <Proyectos github={github} filtros={filtros} onCambiarFiltros={cambiarFiltros} idioma={idioma} t={t} />
        <Trayectoria t={t} idioma={idioma} />
        <Formacion t={t} idioma={idioma} repos={github.repos} onElegirHabilidad={elegirHabilidad} />
        <Contacto t={t} />
      </main>
      <footer className="pie">
        <div className="contenedor">
          <p>
            © {new Date().getFullYear()} {PERFIL.nombre}. {t.pie}
          </p>
        </div>
      </footer>
    </>
  );
}
