import { useMemo } from "react";
import { PERFIL } from "../config.js";
import { filtrarRepos, lenguajesDisponibles, ordenarRepos } from "../utils/repos.js";
import { tiempoRelativo } from "../utils/fechas.js";
import { TarjetaProyecto } from "./TarjetaProyecto.jsx";
import { IconoGithub } from "./Iconos.jsx";
import "../styles/proyectos.css";

function mensajeError(error, tp, idioma) {
  if (error.tipo === "limite") {
    const cuando = error.reinicio ? tiempoRelativo(error.reinicio, idioma) : tiempoRelativo(Date.now() + 3_600_000, idioma);
    return tp.errorLimite(cuando);
  }
  if (error.tipo === "respuesta") return tp.errorRespuesta(error.codigo);
  return tp.errorRed;
}

function Esqueleto({ tp }) {
  return (
    <>
      <p className="solo-lector" role="status">
        {tp.cargando}
      </p>
      <ul className="proyectos__lista" aria-hidden="true">
        {[0, 1, 2].map((n) => (
          <li key={n} className="proyecto proyecto--esqueleto">
            <span className="esqueleto esqueleto--titulo" />
            <span className="esqueleto" />
            <span className="esqueleto esqueleto--corta" />
          </li>
        ))}
      </ul>
    </>
  );
}

export function Proyectos({ github, filtros, onCambiarFiltros, idioma, t }) {
  const tp = t.proyectos;
  const { fase, repos, error, desdeCache, fecha, recargar } = github;

  const lenguajes = useMemo(() => lenguajesDisponibles(repos), [repos]);
  const visibles = useMemo(
    () => ordenarRepos(filtrarRepos(repos, filtros), filtros.orden),
    [repos, filtros]
  );
  const hayFiltros = Boolean(filtros.busqueda || filtros.lenguaje);
  const quitarFiltros = () => onCambiarFiltros({ busqueda: "", lenguaje: null });

  return (
    <section id="proyectos" className="seccion" aria-labelledby="proyectos-titulo">
      <div className="contenedor">
        <header className="seccion__cabecera">
          <h2 id="proyectos-titulo" tabIndex={-1}>
            {tp.titulo}
          </h2>
          <p>{tp.intro}</p>
        </header>

        {fase === "cargando" && <Esqueleto tp={tp} />}

        {fase === "error" && (
          <div className="aviso" role="alert">
            <p>{mensajeError(error, tp, idioma)}</p>
            <div className="acciones">
              <button type="button" className="boton boton--principal" onClick={recargar}>
                {tp.reintentar}
              </button>
              <a className="boton" href={`${PERFIL.githubUrl}?tab=repositories`} target="_blank" rel="noopener noreferrer">
                <IconoGithub />
                {tp.abrirGithub}
              </a>
            </div>
          </div>
        )}

        {fase === "listo" && repos.length === 0 && (
          <div className="aviso">
            <p>{tp.sinRepos}</p>
          </div>
        )}

        {fase === "listo" && repos.length > 0 && (
          <>
            {desdeCache && (
              <div className="aviso aviso--suave" role="status">
                <p>{tp.copiaGuardada(tiempoRelativo(fecha, idioma))}</p>
                <button type="button" className="boton" onClick={recargar}>
                  {tp.reintentar}
                </button>
              </div>
            )}

            <div className="herramientas">
              <div className="campo">
                <label htmlFor="buscar-proyectos">{tp.buscar}</label>
                <input
                  id="buscar-proyectos"
                  type="search"
                  placeholder={tp.buscarPista}
                  value={filtros.busqueda}
                  onChange={(e) => onCambiarFiltros({ busqueda: e.target.value })}
                  autoComplete="off"
                />
              </div>

              <div className="campo campo--orden">
                <label htmlFor="ordenar-proyectos">{tp.ordenar}</label>
                <select
                  id="ordenar-proyectos"
                  value={filtros.orden}
                  onChange={(e) => onCambiarFiltros({ orden: e.target.value })}
                >
                  {Object.entries(tp.orden).map(([valor, etiqueta]) => (
                    <option key={valor} value={valor}>
                      {etiqueta}
                    </option>
                  ))}
                </select>
              </div>

              {lenguajes.length > 1 && (
                <div className="filtro-lenguajes" role="group" aria-label={tp.lenguajes}>
                  <button
                    type="button"
                    className="chip"
                    aria-pressed={!filtros.lenguaje}
                    onClick={() => onCambiarFiltros({ lenguaje: null })}
                  >
                    {tp.todos}
                  </button>
                  {lenguajes.map(({ lenguaje, total }) => (
                    <button
                      key={lenguaje}
                      type="button"
                      className="chip"
                      aria-pressed={filtros.lenguaje === lenguaje}
                      onClick={() => onCambiarFiltros({ lenguaje: filtros.lenguaje === lenguaje ? null : lenguaje })}
                    >
                      {lenguaje}
                      <span className="chip__total">{total}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <p className="contador" role="status" aria-live="polite">
              {tp.contador(visibles.length, repos.length)}
            </p>

            {visibles.length > 0 ? (
              <ul className="proyectos__lista">
                {visibles.map((repo) => (
                  <li key={repo.id} className={repo.destacado ? "proyectos__item--destacado" : undefined}>
                    <TarjetaProyecto repo={repo} idioma={idioma} tp={tp} />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="aviso">
                <p>{tp.vacioFiltro}</p>
                {hayFiltros && (
                  <button type="button" className="boton" onClick={quitarFiltros}>
                    {tp.quitarFiltros}
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
