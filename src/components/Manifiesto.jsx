import "../styles/manifiesto.css";

// Frase grande fija en pantalla: cada palabra se ilumina según avanza el
// scroll (--p lo pone useAnimacionesScroll). Las palabras entre *asteriscos*
// llevan el degradado aurora.
export function Manifiesto({ t }) {
  const tm = t.manifiesto;
  const palabras = [];
  tm.texto.split(/(\*[^*]+\*)/).forEach((trozo) => {
    const destacado = trozo.startsWith("*");
    trozo
      .replaceAll("*", "")
      .split(/\s+/)
      .filter(Boolean)
      .forEach((palabra) => {
        // La puntuación tras un destacado ("pantalla*.") se pega a la palabra anterior.
        const anterior = palabras.at(-1);
        if (anterior && /^[.,;:!?)]+$/.test(palabra)) anterior.palabra += palabra;
        else palabras.push({ palabra, destacado });
      });
  });

  return (
    <section className="manifiesto" data-progreso="fijo" aria-label={tm.etiqueta}>
      <div className="manifiesto__escena">
        <div className="contenedor">
          <p className="etiqueta">{tm.etiqueta}</p>
          <p className="manifiesto__texto" style={{ "--n": palabras.length }}>
            {palabras.map(({ palabra, destacado }, i) => (
              <span
                key={i}
                className={destacado ? "manifiesto__palabra manifiesto__palabra--aurora" : "manifiesto__palabra"}
                style={{ "--i": i }}
              >
                {palabra}{" "}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
