// Geometría de la esfera de partículas del inicio. Funciones puras (sin canvas)
// para poder testearlas con node --test.

const ANGULO_DORADO = Math.PI * (3 - Math.sqrt(5));

/**
 * Reparte n puntos de forma casi uniforme sobre una esfera de radio 1
 * (espiral de Fibonacci). Cada punto lleva una fase para el "latido" y
 * una marca para teñirse de rosa al pasar por el borde.
 */
export function puntosFibonacci(n) {
  if (n < 2) return [{ x: 0, y: 1, z: 0, fase: 0, rosa: false }];
  const puntos = [];
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const radio = Math.sqrt(1 - y * y);
    const theta = ANGULO_DORADO * i;
    puntos.push({
      x: Math.cos(theta) * radio,
      y,
      z: Math.sin(theta) * radio,
      fase: ((i * 0.618034) % 1) * Math.PI * 2,
      rosa: (i * 7919) % 100 < 30,
    });
  }
  return puntos;
}

/**
 * Gira el punto en el eje Y y luego en el X, y lo proyecta con perspectiva.
 * Devuelve la posición en pantalla (unidades de radio), la profundidad z
 * (1 = lo más cerca del espectador) y la escala de perspectiva.
 */
export function rotarYProyectar(punto, anguloY, anguloX, distancia = 2.6) {
  const cosY = Math.cos(anguloY);
  const senY = Math.sin(anguloY);
  const cosX = Math.cos(anguloX);
  const senX = Math.sin(anguloX);

  const x1 = punto.x * cosY + punto.z * senY;
  const z1 = -punto.x * senY + punto.z * cosY;
  const y1 = punto.y * cosX - z1 * senX;
  const z2 = punto.y * senX + z1 * cosX;

  const escala = distancia / (distancia - z2);
  return { x: x1 * escala, y: y1 * escala, z: z2, escala };
}
