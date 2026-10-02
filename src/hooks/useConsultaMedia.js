import { useEffect, useState } from "react";

/** true/false según una media query, y se actualiza si cambia (p. ej. el tema del sistema). */
export function useConsultaMedia(consulta) {
  const [coincide, setCoincide] = useState(() => window.matchMedia?.(consulta).matches ?? false);

  useEffect(() => {
    const media = window.matchMedia(consulta);
    const alCambiar = (evento) => setCoincide(evento.matches);
    setCoincide(media.matches);
    media.addEventListener("change", alCambiar);
    return () => media.removeEventListener("change", alCambiar);
  }, [consulta]);

  return coincide;
}
