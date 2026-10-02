import { PROYECTOS } from "../config.js";
import { tiempoRelativo } from "../utils/fechas.js";
import { EnlaceExterno } from "./EnlaceExterno.jsx";
import { IconoEstrella, IconoFlecha } from "./Iconos.jsx";

export function TarjetaProyecto({ repo, idioma, t }) {
  const tp = t.proyectos;
  const clase = `proyecto${repo.destacado ? " proyecto--destacado" : ""}`;

  return (
    <article className={clase}>
      <div className="proyecto__cabecera">
        <div>
          {repo.destacado && <p className="etiqueta proyecto__distintivo">{tp.destacado}</p>}
          <h3 className="proyecto__titulo">{repo.titulo}</h3>
        </div>
        <EnlaceExterno
          className="boton-flecha"
          href={repo.url}
          aviso={t.pestanaNueva}
          etiqueta={tp.verCodigo(repo.titulo)}
        >
          <IconoFlecha />
        </EnlaceExterno>
      </div>

      <p className={repo.descripcion ? "proyecto__desc" : "proyecto__desc proyecto__desc--vacia"}>
        {repo.descripcion || tp.sinDescripcion}
      </p>

      <ul className="proyecto__meta">
        {repo.lenguaje && <li>{repo.lenguaje}</li>}
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

      {repo.demo && (
        <EnlaceExterno className="enlace-fantasma" href={repo.demo} aviso={t.pestanaNueva}>
          {tp.verDemo}
          <span className="solo-lector">: {repo.titulo}</span>
          <IconoFlecha />
        </EnlaceExterno>
      )}
    </article>
  );
}
