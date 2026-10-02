import { PERFIL } from "../config.js";
import { IconoLuna, IconoSol } from "./Iconos.jsx";
import "../styles/cabecera.css";

const SECCIONES = ["proyectos", "trayectoria", "formacion", "contacto"];

export function Cabecera({ t, idioma, onCambiarIdioma, tema, onCambiarTema }) {
  const otroIdioma = idioma === "es" ? "en" : "es";
  const oscuro = tema === "oscuro";

  return (
    <header className="cabecera">
      <div className="contenedor cabecera__fila">
        <a className="cabecera__marca" href="#inicio">
          {PERFIL.nombreCorto}
        </a>

        <nav className="cabecera__nav" aria-label={t.navEtiqueta}>
          <ul>
            {SECCIONES.map((id) => (
              <li key={id}>
                <a href={`#${id}`}>{t.nav[id]}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="cabecera__acciones">
          <button
            type="button"
            className="boton-icono boton-icono--texto"
            onClick={onCambiarIdioma}
            aria-label={t.cambiarIdioma}
            title={t.cambiarIdioma}
            lang={otroIdioma}
          >
            {t.etiquetaIdioma}
          </button>
          <button
            type="button"
            className="boton-icono"
            onClick={onCambiarTema}
            aria-label={oscuro ? t.activarClaro : t.activarOscuro}
            title={oscuro ? t.activarClaro : t.activarOscuro}
          >
            {oscuro ? <IconoSol /> : <IconoLuna />}
          </button>
        </div>
      </div>
    </header>
  );
}
