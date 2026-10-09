import { Contador } from "./Contador.jsx";
import "../styles/cifras.css";

// Tres cifras del CV. La primera se calcula en directo con los repos de GitHub.
export function Cifras({ t, github }) {
  const tc = t.cifras;
  const cargando = github.fase === "cargando";
  const totalRepos = github.fase === "listo" ? String(github.repos.length) : "—";

  const cifras = [
    { valor: cargando ? "—" : totalRepos, etiqueta: tc.repos, cargando },
    { valor: "3", etiqueta: tc.apps },
    { valor: tc.valorCarga, etiqueta: tc.carga },
  ];

  return (
    <section className="cifras" aria-label={tc.titulo}>
      <div className="contenedor">
        <dl className="cifras__lista">
          {cifras.map((cifra, i) => (
            <div key={cifra.etiqueta} className="cifra" data-revelar="" style={{ "--i": i }}>
              <dt className="cifra__etiqueta">{cifra.etiqueta}</dt>
              <dd className="cifra__valor" aria-busy={cifra.cargando || undefined}>
                {cifra.cargando ? <span aria-label={tc.cargando}>—</span> : <Contador key={cifra.valor} valor={cifra.valor} />}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
