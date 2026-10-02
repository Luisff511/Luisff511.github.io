import { test } from "node:test";
import assert from "node:assert/strict";

import {
  filtrarRepos,
  hayCoincidencias,
  lenguajesDisponibles,
  normalizarRepos,
  ordenarRepos,
  tituloLegible,
  urlDemo,
} from "../src/utils/repos.js";
import { aAnioDecimal, formatearPeriodo } from "../src/utils/fechas.js";

const OPCIONES = {
  excluir: ["Luisff511.github.io", "luisff511"],
  temasDestacado: ["destacado", "featured"],
  temasOcultos: ["oculto", "hidden"],
  incluirForks: false,
};

const repoApi = (extra) => ({
  id: Math.random(),
  name: "repo",
  description: null,
  html_url: "https://github.com/Luisff511/repo",
  homepage: null,
  has_pages: false,
  language: "JavaScript",
  topics: [],
  stargazers_count: 0,
  pushed_at: "2026-09-01T10:00:00Z",
  fork: false,
  ...extra,
});

const API = [
  repoApi({ name: "nichos-malaga-2026", description: "Análisis de nichos en Málaga", language: "Python", topics: ["destacado", "pandas"], pushed_at: "2026-09-20T10:00:00Z" }),
  repoApi({ name: "route-optimizer", language: "Python", stargazers_count: 5, has_pages: true }),
  repoApi({ name: "tienda-react", topics: ["react"], homepage: "https://tienda.example.com", pushed_at: "2026-09-25T10:00:00Z" }),
  repoApi({ name: "un-fork", fork: true }),
  repoApi({ name: "Luisff511.github.io" }),
  repoApi({ name: "LUISFF511" }),
  repoApi({ name: "borrador", topics: ["oculto"] }),
];

const repos = normalizarRepos(API, "Luisff511", OPCIONES);

test("descarta forks, repos excluidos (sin distinguir mayúsculas) y temas ocultos", () => {
  assert.deepEqual(repos.map((r) => r.nombre).sort(), ["nichos-malaga-2026", "route-optimizer", "tienda-react"]);
});

test("marca destacados y no muestra los temas de control", () => {
  const nichos = repos.find((r) => r.nombre === "nichos-malaga-2026");
  assert.equal(nichos.destacado, true);
  assert.deepEqual(nichos.temas, ["pandas"]);
});

test("la demo sale de la web del repo o de GitHub Pages", () => {
  assert.equal(urlDemo({ homepage: "https://x.dev", has_pages: true, name: "a" }, "Luisff511"), "https://x.dev");
  assert.equal(urlDemo({ homepage: "", has_pages: true, name: "a" }, "Luisff511"), "https://luisff511.github.io/a/");
  assert.equal(urlDemo({ homepage: null, has_pages: false, name: "a" }, "Luisff511"), null);
});

test("título legible a partir del nombre del repo", () => {
  assert.equal(tituloLegible("nichos-malaga_2026"), "Nichos malaga 2026");
});

test("los destacados van primero con cualquier orden", () => {
  for (const criterio of ["recientes", "estrellas", "nombre"]) {
    assert.equal(ordenarRepos(repos, criterio)[0].nombre, "nichos-malaga-2026");
  }
  assert.deepEqual(ordenarRepos(repos, "recientes").map((r) => r.nombre), ["nichos-malaga-2026", "tienda-react", "route-optimizer"]);
  assert.equal(ordenarRepos(repos, "estrellas")[1].nombre, "route-optimizer");
});

test("ordenar no modifica el array original", () => {
  const copia = [...repos];
  ordenarRepos(repos, "nombre");
  assert.deepEqual(repos, copia);
});

test("filtra por lenguaje y busca sin tildes en descripción y temas", () => {
  assert.equal(filtrarRepos(repos, { lenguaje: "Python" }).length, 2);
  assert.deepEqual(filtrarRepos(repos, { busqueda: "malaga" }).map((r) => r.nombre), ["nichos-malaga-2026"]);
  assert.deepEqual(filtrarRepos(repos, { busqueda: "REACT" }).map((r) => r.nombre), ["tienda-react"]);
  assert.equal(filtrarRepos(repos, { busqueda: "angular" }).length, 0);
});

test("lenguajes ordenados por número de repos", () => {
  assert.deepEqual(lenguajesDisponibles(repos), [
    { lenguaje: "Python", total: 2 },
    { lenguaje: "JavaScript", total: 1 },
  ]);
});

test("una habilidad solo es pulsable si hay repos que coincidan", () => {
  assert.equal(hayCoincidencias(repos, { lenguaje: "Python" }), true);
  assert.equal(hayCoincidencias(repos, { busqueda: "angular" }), false);
  assert.equal(hayCoincidencias(repos, undefined), false);
});

test("fechas de la trayectoria", () => {
  assert.equal(aAnioDecimal("2016-01"), 2016);
  assert.equal(aAnioDecimal("2025", true), 2025.5);
  assert.equal(formatearPeriodo("2025-08", null, "actualidad"), "08/2025 – actualidad");
  assert.equal(formatearPeriodo("2019-04", "2025", "x"), "04/2019 – 2025");
});
