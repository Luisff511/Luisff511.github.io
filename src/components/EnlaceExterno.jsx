// Enlace que se abre en otra pestaña y lo anuncia a los lectores de pantalla.
export function EnlaceExterno({ href, aviso, etiqueta, className, children }) {
  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={etiqueta ? `${etiqueta} ${aviso}` : undefined}
    >
      {children}
      {!etiqueta && <span className="solo-lector"> {aviso}</span>}
    </a>
  );
}
