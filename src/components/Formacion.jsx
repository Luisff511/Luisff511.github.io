import { FORMACION, HABILIDADES } from "../data/cv.js";
import { traducir } from "../data/textos.js";
import { hayCoincidencias } from "../utils/repos.js";
import { IconoFlecha } from "./Iconos.jsx";
import "../styles/formacion.css";

export function Formacion({ t, idioma, repos, onElegirHabilidad }) {
  const tf = t.formacion;

  return (
    <section id="formacion" className="seccion" aria-labelledby="formacion-titulo">
      <div className="contenedor">
        <header className="seccion__cabecera">
          <p className="etiqueta">{tf.etiqueta}</p>
          <h2 id="formacion-titulo">{tf.titulo}</h2>
        </header>

        <div className="formacion__columnas">
          <div>
            <h3 className="subtitulo">{tf.estudios}</h3>
            <ul className="estudios">
              {FORMACION.map((item) => (
                <li key={item.titulo.es} className="estudio">
                  <span className="estudio__titulo">{item.titulo[idioma]}</span>
                  <span className="estudio__centro">{item.centro}</span>
                  <span className="estudio__periodo">{item.periodo[idioma]}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="subtitulo">{tf.habilidades}</h3>
            <p className="ayuda">{tf.ayudaHabilidades}</p>
            {HABILIDADES.map((grupo) => (
              <div key={grupo.grupo.es} className="habilidades__grupo">
                <h4>{grupo.grupo[idioma]}</h4>
                <ul className="habilidades">
                  {grupo.items.map((item) => {
                    const texto = traducir(item.texto, idioma);
                    const enlaza = hayCoincidencias(repos, item.accion);
                    return (
                      <li key={texto}>
                        {enlaza ? (
                          <button
                            type="button"
                            className="habilidad habilidad--enlace"
                            onClick={() => onElegirHabilidad(item.accion)}
                            title={tf.verProyectosDe(texto)}
                          >
                            {texto}
                            <IconoFlecha width={14} height={14} />
                            <span className="solo-lector">. {tf.verProyectosDe(texto)}</span>
                          </button>
                        ) : (
                          <span className="habilidad">{texto}</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
