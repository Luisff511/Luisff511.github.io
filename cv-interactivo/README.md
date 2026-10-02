# CV interactivo de Luis Fernando Franco Morales

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-desplegado-222?logo=github)
![Licencia MIT](https://img.shields.io/badge/licencia-MIT-green)

Web personal con mi CV y mis proyectos. Los proyectos se cargan en directo desde la API de GitHub: cada repositorio público que publico aparece en la web automáticamente, sin tocar el código ni volver a desplegar.

**Web:** https://luisff511.github.io

## Qué hace

- **Proyectos automáticos** desde [github.com/Luisff511](https://github.com/Luisff511), con buscador (sin importar tildes), filtro por lenguaje y orden por fecha, estrellas o nombre.
- **Esfera de partículas** animada en el inicio, dibujada con Canvas 2D: gira, se inclina siguiendo el ratón y se detiene cuando no está en pantalla para no gastar batería.
- **Cifras del CV**, con el número de repositorios calculado en directo.
- **Trayectoria interactiva**: cada trabajo es una barra sobre un eje 2015 – hoy, para ver qué trabajos se solapan. Al elegir uno se muestran sus logros.
- **Habilidades conectadas con los proyectos**: si un repositorio usa React, Python, etc., esa habilidad se puede pulsar y filtra los proyectos.
- **Español e inglés**, elegido según el idioma del navegador y recordado entre visitas.
- **Accesible**: navegable con teclado, textos para lector de pantalla y animaciones desactivadas si el sistema pide menos movimiento.
- **Resistente a fallos**: guarda la respuesta de GitHub 30 minutos y, si GitHub no responde, muestra la última copia y explica qué ha pasado.

## Diseño

Sigue la guía de estilo "Auros": un lienzo oscuro verde azulado donde la profundidad se crea con escalones de color (hundido `#011d1c`, lienzo `#012624`, elevado `#003734`) en lugar de sombras. El color está racionado: blancos y platas para el texto, el degradado aurora solo en el botón principal de cada sección, el degradado bioluminiscente para el elemento activo y el rosa fósforo solo para las cifras grandes. Tipografía de peso medio con tracking negativo en los títulos y etiquetas en mayúsculas con tracking amplio. Solo dos radios: 16 px en tarjetas y 6 px en botones.

La fuente original de la guía (Matter) es de pago, así que se usa DM Sans, uno de los sustitutos que propone la propia guía.

## Cómo funciona la carga automática

1. `useGithubRepos` pide `https://api.github.com/users/Luisff511/repos`.
2. `normalizarRepos` descarta forks y repos ocultos y convierte la respuesta en los datos que usa la web.
3. La respuesta se guarda en `localStorage` 30 minutos, porque la API pública permite 60 consultas por hora desde una misma conexión.
4. `filtrarRepos` y `ordenarRepos` (funciones puras, con tests) aplican la búsqueda, el filtro y el orden.

## Controlar qué aparece, desde el propio GitHub

En la página de cada repositorio, en el engranaje de **About**:

| En GitHub | En la web |
|---|---|
| **Description** | Texto de la tarjeta |
| **Topics** | Etiquetas de la tarjeta (y entran en el buscador) |
| Topic `destacado` | El proyecto sale el primero y más grande |
| Topic `oculto` | El proyecto no sale |
| **Website** | Botón "Ver demo" (si tiene GitHub Pages activado, se enlaza solo) |

Los forks no se muestran. Para excluir un repositorio por nombre, añádelo a `excluir` en `src/config.js`.

## Estructura

```
cv-interactivo/
├── .github/workflows/deploy.yml   # Compila y publica en GitHub Pages en cada push a main
├── public/                        # CV en PDF y favicon (se copian tal cual)
├── src/
│   ├── main.jsx                   # Punto de entrada
│   ├── App.jsx                    # Estado global: idioma, tema, repos y filtros
│   ├── config.js                  # Datos personales y opciones de proyectos
│   ├── components/                # Cabecera, Hero, EsferaParticulas, Cifras, Proyectos, TarjetaProyecto,
│   │                              # Trayectoria, Formacion, Contacto, Molecula, EnlaceExterno, Iconos
│   ├── hooks/                     # useGithubRepos, usePreferencia, useConsultaMedia
│   ├── utils/                     # repos.js, fechas.js y esfera.js (lógica pura, testeada)
│   ├── data/                      # cv.js (contenido en es/en) y textos.js (interfaz)
│   └── styles/                    # Una hoja de estilos por componente + base.css con los tokens
├── tests/                         # repos.test.js y esfera.test.js
├── index.html
├── package.json
└── vite.config.js
```

## Desarrollo en local

Requiere Node.js 20 o superior.

```bash
npm install
npm run dev       # http://localhost:5173
npm test          # tests de la lógica
npm run build     # genera dist/
```

## Publicar en GitHub Pages

1. Crea en GitHub un repositorio **público** llamado exactamente `Luisff511.github.io`. Con ese nombre la web queda en `https://luisff511.github.io`.
2. Sube el proyecto:

   ```bash
   cd cv-interactivo
   git init
   git add .
   git commit -m "CV interactivo con proyectos de GitHub"
   git branch -M main
   git remote add origin https://github.com/Luisff511/Luisff511.github.io.git
   git push -u origin main
   ```

3. En el repositorio: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. En la pestaña **Actions** verás el despliegue. Cuando termine en verde, la web estará publicada.

A partir de ahí, cada `git push` a `main` vuelve a publicar la web. Los proyectos nuevos **no** necesitan nada: aparecen solos.

Si usas otro nombre de repositorio, la web quedará en `https://luisff511.github.io/<nombre>/` y funciona igual (Vite está configurado con rutas relativas).

## Personalizar

- **Datos personales y enlaces:** `src/config.js`
- **Experiencia, formación y habilidades:** `src/data/cv.js`
- **Textos de la interfaz:** `src/data/textos.js`
- **CV descargable:** sustituye `public/cv-luis-franco-frontend-en.pdf`
- **Colores, tipografía y radios:** variables al principio de `src/styles/base.css`

## Licencia

[MIT](LICENSE) © 2026 Luis Fernando Franco Morales
