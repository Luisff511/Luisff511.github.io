import { colorLenguaje } from "../utils/repos.js";
import { tiempoRelativo } from "../utils/fechas.js";
import { PROYECTOS } from "../config.js";
import { IconoEstrella } from "./Iconos.jsx";

export function TarjetaProyecto({ repo, idioma, tp }) {
  const clase = `proyecto${repo.destacado ? " proyecto--destacado" : ""}`;

  return (
    <article className={clase}>
      {repo.destacado && <p className="proyecto__distintivo">{tp.destacado}</p>}
      <h3 className="proyecto__titulo">{repo.titulo}</h3>

      <p className={repo.descripcion ? "proyecto__desc" : "proyecto__desc proyecto__desc--vacia"}>
        {repo.descripcion || tp.sinDescripcion}
      </p>

      <ul className="proyecto__meta">
        {repo.lenguaje && (
          <li>
            <span className="punto-lenguaje" style={{ "--color": colorLenguaje(repo.lenguaje) }} aria-hidden="true" />
            {repo.lenguaje}
          </li>
        )}
        {repo.estrellas > 0 && (
          <li>
            <IconoEstrella />
            {tp.estrellas(repo.estrellas)}
          </li>
        )}
        <li>
          <time dateTime={repo.actualizado}>{tp.actualizado(tiempoRelativo(repo.actualizado, idioma))}</time>
        </li>
      </ul>

      {repo.temas.length > 0 && (
        <ul className="proyecto__temas" aria-label={tp.temas}>
          {repo.temas.slice(0, PROYECTOS.temasVisibles).map((tema) => (
            <li key={tema}>{tema}</li>
          ))}
        </ul>
      )}

      <div className="proyecto__enlaces">
        <a href={repo.url} target="_blank" rel="noopener noreferrer">
          {tp.verCodigo}
          <span className="solo-lector">: {repo.titulo}</span>
        </a>
        {repo.demo && (
          <a href={repo.demo} target="_blank" rel="noopener noreferrer">
            {tp.verDemo}
            <span className="solo-lector">: {repo.titulo}</span>
          </a>
        )}
      </div>
    </article>
  );
}
