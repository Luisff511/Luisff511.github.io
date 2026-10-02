// Funciones puras para transformar, filtrar y ordenar los repositorios
// que devuelve la API de GitHub. Sin React: se pueden testear con node --test.

/** "nichos-malaga-2026" -> "Nichos malaga 2026" */
export function tituloLegible(nombre) {
  const texto = nombre.replace(/[-_]+/g, " ").trim();
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

/** Minúsculas y sin tildes, para que "malaga" encuentre "Málaga". */
export function normalizarTexto(texto = "") {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

/** Enlace a la demo: la web del repo, o su GitHub Pages si lo tiene activado. */
export function urlDemo(repo, usuario) {
  if (repo.homepage && /^https?:\/\//.test(repo.homepage)) return repo.homepage;
  if (repo.has_pages) return `https://${usuario.toLowerCase()}.github.io/${repo.name}/`;
  return null;
}

/** Convierte la respuesta cruda de la API en los datos que usa la web. */
export function normalizarRepos(datos, usuario, opciones) {
  const excluir = new Set(opciones.excluir.map((n) => n.toLowerCase()));
  const ocultos = new Set(opciones.temasOcultos);
  const destacados = new Set(opciones.temasDestacado);
  const temasInternos = new Set([...ocultos, ...destacados]);

  return datos
    .filter((repo) => opciones.incluirForks || !repo.fork)
    .filter((repo) => !excluir.has(repo.name.toLowerCase()))
    .filter((repo) => !(repo.topics ?? []).some((t) => ocultos.has(t)))
    .map((repo) => {
      const temas = repo.topics ?? [];
      return {
        id: repo.id,
        nombre: repo.name,
        titulo: tituloLegible(repo.name),
        descripcion: repo.description ?? "",
        url: repo.html_url,
        demo: urlDemo(repo, usuario),
        lenguaje: repo.language ?? null,
        temas: temas.filter((t) => !temasInternos.has(t)),
        estrellas: repo.stargazers_count ?? 0,
        actualizado: repo.pushed_at ?? repo.updated_at,
        destacado: temas.some((t) => destacados.has(t)),
      };
    });
}

/** Filtra por lenguaje exacto y por texto en nombre, descripción, temas y lenguaje. */
export function filtrarRepos(repos, { busqueda = "", lenguaje = null } = {}) {
  const consulta = normalizarTexto(busqueda.trim());
  return repos.filter((repo) => {
    if (lenguaje && repo.lenguaje !== lenguaje) return false;
    if (!consulta) return true;
    const pajar = normalizarTexto(
      [repo.nombre, repo.titulo, repo.descripcion, repo.lenguaje ?? "", ...repo.temas].join(" ")
    );
    return pajar.includes(consulta);
  });
}

const COMPARADORES = {
  recientes: (a, b) => new Date(b.actualizado) - new Date(a.actualizado),
  estrellas: (a, b) => b.estrellas - a.estrellas || new Date(b.actualizado) - new Date(a.actualizado),
  nombre: (a, b) => a.titulo.localeCompare(b.titulo, "es", { sensitivity: "base" }),
};

/** Ordena sin mutar; los destacados siempre van primero. */
export function ordenarRepos(repos, criterio = "recientes") {
  const comparar = COMPARADORES[criterio] ?? COMPARADORES.recientes;
  return [...repos].sort((a, b) => Number(b.destacado) - Number(a.destacado) || comparar(a, b));
}

/** Lenguajes presentes, del más usado al menos usado. */
export function lenguajesDisponibles(repos) {
  const cuenta = new Map();
  for (const repo of repos) {
    if (repo.lenguaje) cuenta.set(repo.lenguaje, (cuenta.get(repo.lenguaje) ?? 0) + 1);
  }
  return [...cuenta.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([lenguaje, total]) => ({ lenguaje, total }));
}

/** ¿Pulsar esta habilidad mostraría algún repositorio? */
export function hayCoincidencias(repos, accion) {
  if (!accion) return false;
  return filtrarRepos(repos, accion).length > 0;
}
