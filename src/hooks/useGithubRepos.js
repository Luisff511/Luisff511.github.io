import { useCallback, useEffect, useState } from "react";
import { PROYECTOS } from "../config.js";
import { normalizarRepos } from "../utils/repos.js";

const ESTADO_INICIAL = { fase: "cargando", repos: [], error: null, desdeCache: false, fecha: null };

function leerCache(clave) {
  try {
    return JSON.parse(localStorage.getItem(clave));
  } catch {
    return null;
  }
}

function guardarCache(clave, valor) {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
  } catch {
    // Sin almacenamiento disponible: simplemente no se guarda copia.
  }
}

async function errorDeRespuesta(respuesta) {
  const sinCuota = respuesta.headers.get("x-ratelimit-remaining") === "0";
  if ((respuesta.status === 403 || respuesta.status === 429) && sinCuota) {
    const reinicio = Number(respuesta.headers.get("x-ratelimit-reset")) * 1000 || null;
    return { tipo: "limite", reinicio };
  }
  return { tipo: "respuesta", codigo: respuesta.status };
}

/**
 * Pide a la API pública de GitHub los repositorios del usuario.
 * - Guarda la respuesta en localStorage durante PROYECTOS.minutosCache.
 * - Si GitHub falla y hay copia guardada, la muestra y avisa.
 * - recargar() fuerza una consulta nueva.
 */
export function useGithubRepos(usuario) {
  const [estado, setEstado] = useState(ESTADO_INICIAL);
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    const clave = `cv:repos:${usuario.toLowerCase()}`;
    const cache = leerCache(clave);
    const vigente = cache && Date.now() - cache.fecha < PROYECTOS.minutosCache * 60_000;

    if (vigente && intento === 0) {
      setEstado({ fase: "listo", repos: cache.repos, error: null, desdeCache: false, fecha: cache.fecha });
      return;
    }

    const control = new AbortController();
    setEstado((previo) => ({ ...previo, fase: "cargando", error: null }));

    (async () => {
      try {
        const url = `https://api.github.com/users/${encodeURIComponent(usuario)}/repos?per_page=100&sort=pushed`;
        const respuesta = await fetch(url, {
          headers: { Accept: "application/vnd.github+json" },
          signal: control.signal,
        });
        if (!respuesta.ok) throw await errorDeRespuesta(respuesta);

        const repos = normalizarRepos(await respuesta.json(), usuario, PROYECTOS);
        const fecha = Date.now();
        guardarCache(clave, { fecha, repos });
        setEstado({ fase: "listo", repos, error: null, desdeCache: false, fecha });
      } catch (fallo) {
        if (fallo?.name === "AbortError") return;
        const error = fallo?.tipo ? fallo : { tipo: "red" };
        if (cache) {
          setEstado({ fase: "listo", repos: cache.repos, error, desdeCache: true, fecha: cache.fecha });
        } else {
          setEstado({ fase: "error", repos: [], error, desdeCache: false, fecha: null });
        }
      }
    })();

    return () => control.abort();
  }, [usuario, intento]);

  const recargar = useCallback(() => setIntento((n) => n + 1), []);
  return { ...estado, recargar };
}
