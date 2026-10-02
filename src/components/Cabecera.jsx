import { PERFIL } from "../config.js";
import "../styles/cabecera.css";

const SECCIONES = ["proyectos", "trayectoria", "formacion", "contacto"];
const BASE = import.meta.env.BASE_URL;

export function Cabecera({ t, idioma, onCambiarIdioma }) {
  const otroIdioma = idioma === "es" ? "en" : "es";

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
            className="boton-idioma"
            onClick={onCambiarIdioma}
            aria-label={t.cambiarIdioma}
            title={t.cambiarIdioma}
            lang={otroIdioma}
          >
            {t.etiquetaIdioma}
          </button>
          <a className="boton boton--compacto" href={`${BASE}${PERFIL.cvPdf}`} download>
            {t.descargarCv}
          </a>
        </div>
      </div>
    </header>
  );
}
