import { test } from "node:test";
import assert from "node:assert/strict";

import { puntosFibonacci, rotarYProyectar } from "../src/utils/esfera.js";

test("genera n puntos sobre la esfera de radio 1", () => {
  const puntos = puntosFibonacci(500);
  assert.equal(puntos.length, 500);
  for (const p of puntos) {
    assert.ok(Math.abs(Math.hypot(p.x, p.y, p.z) - 1) < 1e-9);
  }
});

test("reparte los puntos entre ambos hemisferios", () => {
  const puntos = puntosFibonacci(400);
  const arriba = puntos.filter((p) => p.y > 0).length;
  assert.ok(Math.abs(arriba - 200) <= 2);
});

test("con menos de 2 puntos no divide por cero", () => {
  assert.equal(puntosFibonacci(1).length, 1);
});

test("la rotación conserva la distancia al centro", () => {
  const punto = { x: 0.6, y: 0.48, z: 0.64 };
  const r = rotarYProyectar(punto, 1.1, -0.4);
  const sinPerspectiva = Math.hypot(r.x / r.escala, r.y / r.escala, r.z);
  assert.ok(Math.abs(sinPerspectiva - 1) < 1e-9);
});

test("lo cercano se ve más grande que lo lejano", () => {
  const delante = rotarYProyectar({ x: 0, y: 0, z: 1 }, 0, 0);
  const detras = rotarYProyectar({ x: 0, y: 0, z: -1 }, 0, 0);
  assert.ok(delante.escala > 1 && detras.escala < 1);
});
