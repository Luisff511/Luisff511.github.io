// Contenido del CV en español (es) e inglés (en).
// Fechas: "AAAA-MM" o solo "AAAA". fin: null significa "hasta hoy".

export const RESUMEN = {
  es: "Construyo interfaces web con JavaScript, React, HTML y CSS. Llevo más de seis años gestionando operaciones de alto volumen en logística, taller y cocina, y me traigo esa disciplina al código: plazos claros, atención al detalle y soluciones que aguantan el uso real.",
  en: "I build web interfaces with JavaScript, React, HTML and CSS. More than six years running high-volume operations in logistics, a workshop and a kitchen taught me to work under pressure, mind the details and ship things that hold up in real use.",
};

export const EXPERIENCIA = [
  {
    id: "desarrollo",
    puesto: { es: "Desarrollador Full Stack", en: "Full Stack Developer" },
    empresa: { es: "Freelance y proyectos independientes", en: "Freelance and independent projects" },
    lugar: { es: "Remoto", en: "Remote" },
    inicio: "2025-08",
    fin: null,
    logros: {
      es: [
        "Construí interfaces interactivas en JavaScript, HTML5 y CSS3, logrando un 30 % de reducción del tiempo de carga y una mejor experiencia de usuario, con manipulación del DOM, componentes reutilizables y diseño responsive con Bootstrap.",
        "Participé en el desarrollo de 3 aplicaciones web completas, conectando las interfaces con servicios backend en Node.js y persistencia en SQL.",
        "Desplegué las 3 aplicaciones en entornos cloud de producción, gestionando el control de versiones con Git y GitHub durante todo el ciclo de vida del proyecto.",
      ],
      en: [
        "Built interactive interfaces in JavaScript, HTML5 and CSS3, achieving a 30% reduction in load time and improved UX, with DOM manipulation, reusable components and responsive design with Bootstrap.",
        "Took part in developing 3 end-to-end web applications, connecting front-end interfaces to backend services built in Node.js with SQL persistence.",
        "Deployed all 3 web applications to production cloud environments, managing version control with Git and GitHub throughout the full project lifecycle.",
      ],
    },
  },
  {
    id: "conduccion",
    puesto: { es: "Conductor de logística y taxi", en: "Logistics and Taxi Driver" },
    empresa: { es: "Taxisol y Logistransol", en: "Taxisol and Logistransol" },
    lugar: { es: "Marbella", en: "Marbella" },
    inicio: "2016-01",
    fin: null,
    logros: {
      es: [
        "Incrementé un 20 % los servicios completados por turno optimizando rutas con análisis de tráfico en tiempo real.",
        "Logré una tasa de entrega puntual del 98 % en transporte de mercancías y personas, resolviendo incidencias en ruta con decisiones rápidas.",
        "Operé vehículos de hasta 3.500 kg (motos, taxis y camiones) con cero incidentes, cumpliendo la normativa de seguridad vial.",
      ],
      en: [
        "Increased completed services per shift by 20% by optimising routes using real-time traffic analysis.",
        "Achieved a 98% on-time delivery rate for goods and passenger transport, resolving on-road incidents through quick decision-making.",
        "Safely operated vehicles up to 3,500 kg (motorbikes, taxis, lorries) with zero incidents, complying with road safety regulations.",
      ],
    },
  },
  {
    id: "mecanica",
    puesto: { es: "Mecánico de vehículos", en: "Vehicle Mechanic" },
    empresa: { es: "Taller Urbano y Norauto", en: "Taller Urbano and Norauto" },
    lugar: { es: "Marbella", en: "Marbella" },
    inicio: "2019-04",
    fin: "2025",
    logros: {
      es: [
        "Reduje un 15 % los tiempos de entrega con mantenimiento preventivo y correctivo de frenos, suspensión y motor.",
        "Mantuve el índice de devoluciones en garantía cercano al 0 %, cumpliendo estrictamente la normativa de Seguridad y Salud Laboral (EPI).",
        "Gestioné el inventario de filtros, aceites y neumáticos, garantizando la disponibilidad continua de recambios críticos.",
      ],
      en: [
        "Reduced turnaround times by 15% by carrying out preventive and corrective maintenance on brakes, suspension and engine systems.",
        "Maintained a warranty return rate close to 0%, ensuring strict compliance with Health and Safety regulations (PPE).",
        "Managed inventory of filters, oils and tyres, ensuring continuous availability of critical spare parts.",
      ],
    },
  },
  {
    id: "cocina",
    puesto: { es: "Cocinero y atención al cliente", en: "Chef and Customer Service" },
    empresa: { es: "Pad Thai Wok y Amore & Fantasía", en: "Pad Thai Wok and Amore & Fantasía" },
    lugar: { es: "Marbella", en: "Marbella" },
    inicio: "2015-02",
    fin: "2022-02",
    logros: {
      es: [
        "Reduje los tiempos de espera en horas punta reorganizando los flujos de trabajo de la cocina.",
        "Evité roturas de stock y optimicé costes gestionando el inventario de productos perecederos.",
        "Mantuve el 100 % de cumplimiento de los protocolos de higiene y seguridad alimentaria.",
      ],
      en: [
        "Reduced waiting times during peak hours by strategically reorganising kitchen workflows.",
        "Prevented stock shortages and optimised costs by managing inventory of perishable goods.",
        "Maintained 100% compliance with food hygiene and safety protocols throughout the role.",
      ],
    },
  },
];

export const FORMACION = [
  {
    titulo: {
      es: "FP Grado Superior en Desarrollo de Aplicaciones Multiplataforma (DAM)",
      en: "Higher National Diploma (FP Grado Superior) in Multiplatform Application Development (DAM)",
    },
    centro: "IES Aguadulce",
    periodo: { es: "Cursando actualmente", en: "Currently studying" },
  },
  {
    titulo: { es: "Desarrollo Web Full Stack y Desarrollo con IA", en: "Full Stack Web Development and AI Development" },
    centro: "Conquer Blocks y Aula DigitalTech",
    periodo: { es: "2025 – actualidad", en: "2025 – present" },
  },
  {
    titulo: { es: "Data Analytics (Skills Build)", en: "Data Analytics (Skills Build)" },
    centro: "IBM",
    periodo: { es: "2025 – actualidad", en: "2025 – present" },
  },
  {
    titulo: { es: "Certificado de Profesionalidad de Mecánico", en: "Professional Certificate in Vehicle Mechanics" },
    centro: "Marbella",
    periodo: { es: "06/2018 – 05/2019", en: "06/2018 – 05/2019" },
  },
  {
    titulo: { es: "Bachillerato de Ciencias", en: "A-Levels (Bachillerato) in Sciences" },
    centro: "IES Rio Verde, Marbella",
    periodo: { es: "2013 – 2015", en: "2013 – 2015" },
  },
  {
    titulo: { es: "Educación Secundaria Obligatoria (ESO)", en: "Compulsory Secondary Education (ESO)" },
    centro: "IES Pablo del Saz, Marbella",
    periodo: { es: "2007 – 2013", en: "2007 – 2013" },
  },
];

// accion: qué filtro aplicar en Proyectos al pulsar la habilidad.
// { lenguaje } filtra por el lenguaje principal del repo; { busqueda } busca
// en nombre, descripción y temas. Solo se activa si algún repo coincide.
export const HABILIDADES = [
  {
    grupo: { es: "Frontend", en: "Frontend" },
    items: [
      { texto: "JavaScript", accion: { lenguaje: "JavaScript" } },
      { texto: "HTML5", accion: { lenguaje: "HTML" } },
      { texto: "CSS3", accion: { lenguaje: "CSS" } },
      { texto: "React", accion: { busqueda: "react" } },
      { texto: "Angular", accion: { busqueda: "angular" } },
      { texto: "Bootstrap", accion: { busqueda: "bootstrap" } },
      { texto: "DOM" },
      { texto: { es: "Diseño responsive", en: "Responsive design" } },
    ],
  },
  {
    grupo: { es: "Herramientas de desarrollo", en: "Development tools" },
    items: [
      { texto: { es: "Git y GitHub", en: "Git and GitHub" } },
      { texto: "Node.js", accion: { busqueda: "node" } },
      { texto: "SQL", accion: { busqueda: "sql" } },
    ],
  },
  {
    grupo: { es: "Datos", en: "Data" },
    items: [
      { texto: "Python", accion: { lenguaje: "Python" } },
      { texto: "Power BI" },
      { texto: "pandas", accion: { busqueda: "pandas" } },
      { texto: "NumPy" },
      { texto: "Matplotlib" },
    ],
  },
  {
    grupo: { es: "Otros", en: "Other" },
    items: [{ texto: "Linux" }, { texto: "Excel" }, { texto: "Word" }, { texto: "Photoshop" }, { texto: "Canvas" }],
  },
  {
    grupo: { es: "Idiomas", en: "Languages" },
    items: [
      { texto: { es: "Español (nativo)", en: "Spanish (native)" } },
      { texto: { es: "Inglés (B2)", en: "English (B2)" } },
      { texto: { es: "Francés (A2)", en: "French (A2)" } },
    ],
  },
];
