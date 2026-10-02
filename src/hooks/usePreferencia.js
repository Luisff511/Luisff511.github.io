import { useEffect, useState } from "react";

const PREFIJO = "cv:";

export function leerPreferencia(clave) {
  try {
    const guardado = localStorage.getItem(PREFIJO + clave);
    return guardado === null ? null : JSON.parse(guardado);
  } catch {
    return null;
  }
}

/** useState que recuerda su valor en localStorage. null = sin preferencia guardada. */
export function usePreferencia(clave, valorInicial) {
  const [valor, setValor] = useState(() => {
    const guardado = leerPreferencia(clave);
    if (guardado !== null) return guardado;
    return typeof valorInicial === "function" ? valorInicial() : valorInicial;
  });

  useEffect(() => {
    try {
      if (valor === null) localStorage.removeItem(PREFIJO + clave);
      else localStorage.setItem(PREFIJO + clave, JSON.stringify(valor));
    } catch {
      // Navegación privada o almacenamiento lleno: la preferencia dura solo esta visita.
    }
  }, [clave, valor]);

  return [valor, setValor];
}
