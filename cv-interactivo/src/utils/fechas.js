// Utilidades de fechas para la trayectoria y los proyectos.

/** "2025-08" -> 2025.58. Un año sin mes cuenta como mitad de año si es el final. */
export function aAnioDecimal(valor, esFin = false) {
  const [anio, mes] = valor.split("-").map(Number);
  if (!mes) return esFin ? anio + 0.5 : anio;
  return anio + (mes - 1) / 12;
}

export function anioDecimalActual(ahora = new Date()) {
  return ahora.getFullYear() + ahora.getMonth() / 12;
}

/** "2025-08" -> "08/2025"; "2025" -> "2025". */
export function formatearFecha(valor) {
  const [anio, mes] = valor.split("-");
  return mes ? `${mes}/${anio}` : anio;
}

export function formatearPeriodo(inicio, fin, textoActual) {
  return `${formatearFecha(inicio)} – ${fin ? formatearFecha(fin) : textoActual}`;
}

const UNIDADES = [
  ["year", 31_536_000],
  ["month", 2_592_000],
  ["week", 604_800],
  ["day", 86_400],
  ["hour", 3_600],
  ["minute", 60],
  ["second", 1],
];

/** "hace 3 días", "in 12 minutes"... en el idioma indicado. */
export function tiempoRelativo(fecha, idioma, ahora = Date.now()) {
  const formato = new Intl.RelativeTimeFormat(idioma, { numeric: "auto" });
  const segundos = Math.round((new Date(fecha).getTime() - ahora) / 1000);
  for (const [unidad, tamano] of UNIDADES) {
    if (Math.abs(segundos) >= tamano || unidad === "second") {
      return formato.format(Math.round(segundos / tamano), unidad);
    }
  }
  return "";
}
