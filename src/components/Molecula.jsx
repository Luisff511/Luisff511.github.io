// Ilustración geométrica de nodos y conexiones: círculos planos unidos por
// líneas finas. Decorativa; representa la red de contactos.
const NODOS = [
  { x: 210, y: 210, r: 30, anillo: true },
  { x: 108, y: 122, r: 16 },
  { x: 322, y: 104, r: 12, anillo: true },
  { x: 334, y: 292, r: 18 },
  { x: 124, y: 316, r: 12, anillo: true },
  { x: 38, y: 206, r: 6 },
  { x: 212, y: 40, r: 7, anillo: true },
  { x: 390, y: 198, r: 6 },
  { x: 232, y: 386, r: 8, anillo: true },
  { x: 58, y: 56, r: 5 },
  { x: 384, y: 382, r: 5 },
];

const CONEXIONES = [
  [0, 1], [0, 2], [0, 3], [0, 4], [1, 5], [1, 9], [1, 6], [2, 6],
  [2, 7], [3, 7], [3, 10], [3, 8], [4, 8], [4, 5],
];

export function Molecula({ className }) {
  return (
    <svg className={className} viewBox="0 0 420 420" aria-hidden="true" focusable="false">
      <g className="molecula__lineas">
        {CONEXIONES.map(([a, b]) => (
          <line key={`${a}-${b}`} x1={NODOS[a].x} y1={NODOS[a].y} x2={NODOS[b].x} y2={NODOS[b].y} />
        ))}
      </g>
      {NODOS.map((nodo, i) => (
        <circle
          key={i}
          cx={nodo.x}
          cy={nodo.y}
          r={nodo.r}
          className={nodo.anillo ? "molecula__anillo" : "molecula__nodo"}
        />
      ))}
    </svg>
  );
}
