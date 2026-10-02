// Datos personales y opciones de la sección de proyectos.
// Es el único archivo que hay que tocar para adaptar la web.

export const PERFIL = {
  nombre: "Luis Fernando Franco Morales",
  nombreCorto: "Luis Franco",
  githubUsuario: "Luisff511",
  githubUrl: "https://github.com/Luisff511",
  linkedinUrl: "https://www.linkedin.com/in/luis-fernando-franco-morales-167978276/",
  email: "luis4c147896325@gmail.com",
  cvPdf: "cv-luis-franco-frontend-en.pdf",
};

export const PROYECTOS = {
  // Repositorios que nunca se muestran (sin distinguir mayúsculas).
  // El primero es el repo de esta propia web; el segundo, el README de perfil.
  excluir: ["luisff511.github.io", "luisff511"],
  // Temas (topics) de GitHub que controlan la sección desde el propio repo:
  temasDestacado: ["destacado", "featured"], // salen primero y más grandes
  temasOcultos: ["oculto", "hidden"], // no salen
  incluirForks: false,
  // La respuesta de GitHub se guarda en el navegador para no gastar
  // el límite de 60 consultas por hora de la API pública.
  minutosCache: 30,
  temasVisibles: 5,
};
